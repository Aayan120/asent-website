// ============================================================
// Event Store — Firebase Firestore + Local Storage Fallback
// ============================================================
// CRUD operations for corporate events & industry engagements,
// backed by Firestore. Auto-seeds from the hardcoded EVENTS_DATA.
// ============================================================

import { db } from './firebaseConfig.js';
import {
  collection, doc, getDocs, getDoc, setDoc, deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { EVENTS_DATA } from './pages/Events.jsx';

const COL = 'events';
const META_DOC = '_meta';

function genId() {
  return 'ev-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}

function normalizeEvent(ev, i = 0) {
  return {
    id: ev.id || `ev-seed-${i}`,
    title: ev.title || '',
    category: ev.category || 'EXHIBITION',
    status: ev.status === 'Past' ? 'Past' : 'Upcoming',
    date: ev.date || '',
    time: ev.time || '',
    location: ev.location || '',
    overview: ev.overview || '',
    highlights: Array.isArray(ev.highlights) ? ev.highlights : [],
    contact: ev.contact || 'events@asent.com.pk',
    order: typeof ev.order === 'number' ? ev.order : i,
  };
}

export const eventStore = {
  /* Return all events sorted by order */
  async all() {
    try {
      const snap = await getDocs(collection(db, COL));
      const docs = [];
      snap.forEach((d) => {
        if (d.id !== META_DOC) docs.push({ id: d.id, ...d.data() });
      });

      // If empty in Firestore → seed from initial data
      if (docs.length === 0) {
        await eventStore.seed();
        return eventStore.all();
      }

      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      return docs;
    } catch (err) {
      console.error('eventStore.all() error:', err);
      // Fallback to local storage or hardcoded data
      try {
        const local = localStorage.getItem('asent_events_data');
        if (local) return JSON.parse(local);
      } catch (e) { /* ignore */ }
      return EVENTS_DATA.map((e, i) => normalizeEvent(e, i));
    }
  },

  /* Find one event by id */
  async byId(id) {
    try {
      const snap = await getDoc(doc(db, COL, id));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (err) {
      console.error('eventStore.byId() error:', err);
      const all = await eventStore.all();
      return all.find((e) => e.id === id) || null;
    }
  },

  /* Create or update an event */
  async save(ev) {
    const id = ev.id || genId();
    const data = normalizeEvent({ ...ev, id });
    if (!ev.id) {
      const all = await eventStore.all();
      data.order = all.length;
    }
    await setDoc(doc(db, COL, id), data);

    // Also update localStorage cache
    try {
      const all = await eventStore.all();
      const updated = all.filter(e => e.id !== id).concat(data);
      localStorage.setItem('asent_events_data', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    return data;
  },

  /* Delete an event */
  async remove(id) {
    await deleteDoc(doc(db, COL, id));
    try {
      const local = localStorage.getItem('asent_events_data');
      if (local) {
        const list = JSON.parse(local).filter(e => e.id !== id);
        localStorage.setItem('asent_events_data', JSON.stringify(list));
      }
    } catch (e) { /* ignore */ }
  },

  /* Seed Firestore with hardcoded EVENTS_DATA */
  async seed() {
    const batch = writeBatch(db);
    EVENTS_DATA.forEach((e, i) => {
      const data = normalizeEvent(e, i);
      batch.set(doc(db, COL, data.id), data);
    });
    await batch.commit();
    try {
      localStorage.setItem('asent_events_data', JSON.stringify(EVENTS_DATA.map((e, i) => normalizeEvent(e, i))));
    } catch (e) { /* ignore */ }
  },

  /* Reset everything back to hardcoded seed data */
  async reset() {
    const snap = await getDocs(collection(db, COL));
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    await eventStore.seed();
  },

  /* Suggested categories */
  getCategories() {
    return [
      'EXHIBITION',
      'CONFERENCE',
      'CEREMONY',
      'INTERNAL / HSE',
      'INAUGURATION',
      'SEMINAR',
      'GROUNDBREAKING',
      'MILESTONE',
    ];
  },

  /* Suggested statuses */
  getStatuses() {
    return ['Upcoming', 'Past'];
  }
};

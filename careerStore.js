// ============================================================
// Career Store — Firebase Firestore + Local Storage Fallback
// ============================================================
// CRUD operations for career/job postings, backed by Firestore.
// Auto-seeds from the hardcoded CAREERS_DATA array on first load.
// ============================================================

import { db } from './firebaseConfig.js';
import {
  collection, doc, getDocs, getDoc, setDoc, deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { CAREERS_DATA } from './pages/Career.jsx';

const COL = 'careers';
const META_DOC = '_meta';

function genId() {
  return 'job-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}

function normalizeJob(job, i = 0) {
  return {
    id: job.id || `job-seed-${i}`,
    title: job.title || '',
    department: job.department || 'Engineering & Design',
    location: job.location || 'Karachi Head Office / Site',
    type: job.type || 'Full-time',
    experience: job.experience || '3+ Years',
    deadline: job.deadline || 'Open until filled',
    overview: job.overview || '',
    responsibilities: Array.isArray(job.responsibilities) ? job.responsibilities : [],
    requirements: Array.isArray(job.requirements) ? job.requirements : [],
    order: typeof job.order === 'number' ? job.order : i,
  };
}

export const careerStore = {
  /* Return all jobs sorted by order */
  async all() {
    try {
      const snap = await getDocs(collection(db, COL));
      const docs = [];
      snap.forEach((d) => {
        if (d.id !== META_DOC) docs.push({ id: d.id, ...d.data() });
      });

      // If empty in Firestore → seed from initial data
      if (docs.length === 0) {
        await careerStore.seed();
        return careerStore.all();
      }

      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      return docs;
    } catch (err) {
      console.error('careerStore.all() error:', err);
      // Fallback to local storage or hardcoded data
      try {
        const local = localStorage.getItem('asent_careers_data');
        if (local) return JSON.parse(local);
      } catch (e) { /* ignore */ }
      return CAREERS_DATA.map((j, i) => normalizeJob(j, i));
    }
  },

  /* Find one job by id */
  async byId(id) {
    try {
      const snap = await getDoc(doc(db, COL, id));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (err) {
      console.error('careerStore.byId() error:', err);
      const all = await careerStore.all();
      return all.find((j) => j.id === id) || null;
    }
  },

  /* Create or update a job */
  async save(job) {
    const id = job.id || genId();
    const data = normalizeJob({ ...job, id });
    if (!job.id) {
      const all = await careerStore.all();
      data.order = all.length;
    }
    await setDoc(doc(db, COL, id), data);

    // Also update localStorage cache
    try {
      const all = await careerStore.all();
      const updated = all.filter(j => j.id !== id).concat(data);
      localStorage.setItem('asent_careers_data', JSON.stringify(updated));
    } catch (e) { /* ignore */ }

    return data;
  },

  /* Delete a job */
  async remove(id) {
    await deleteDoc(doc(db, COL, id));
    try {
      const local = localStorage.getItem('asent_careers_data');
      if (local) {
        const list = JSON.parse(local).filter(j => j.id !== id);
        localStorage.setItem('asent_careers_data', JSON.stringify(list));
      }
    } catch (e) { /* ignore */ }
  },

  /* Seed Firestore with hardcoded CAREERS_DATA */
  async seed() {
    const batch = writeBatch(db);
    CAREERS_DATA.forEach((j, i) => {
      const data = normalizeJob(j, i);
      batch.set(doc(db, COL, data.id), data);
    });
    await batch.commit();
    try {
      localStorage.setItem('asent_careers_data', JSON.stringify(CAREERS_DATA.map((j, i) => normalizeJob(j, i))));
    } catch (e) { /* ignore */ }
  },

  /* Reset everything back to hardcoded seed data */
  async reset() {
    const snap = await getDocs(collection(db, COL));
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    await careerStore.seed();
  },

  /* Suggested departments */
  getDepartments() {
    return [
      'Engineering & Design',
      'Project Management',
      'MEP & HVAC Systems',
      'Quality & HSE',
      'Interior Decoration & Finishing',
      'Commercial & Tendering',
      'Plant & Machinery',
      'Surveying & Geo-technical',
    ];
  },

  /* Suggested employment types */
  getJobTypes() {
    return ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
  }
};

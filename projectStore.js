// ============================================================
// Project Store — Firebase Firestore + Storage
// ============================================================
// CRUD operations for projects, backed by Firestore.
// Image uploads go to Firebase Storage.
// Auto-seeds from the hardcoded PROJECTS array on first load.
// ============================================================

import { db, storage } from './firebaseConfig.js';
import {
  collection, doc, getDocs, getDoc, setDoc, deleteDoc,
  writeBatch, query, orderBy,
} from 'firebase/firestore';
import {
  ref, uploadBytes, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { PROJECTS, FILTERS } from './data.js';
import { IMAGES } from './images.js';

const COL = 'projects';
const META_DOC = '_meta';

/* ---- helpers ---- */
function genId() {
  return 'proj-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 6);
}

function seedProject(p, i) {
  return {
    id: p.id || `proj-seed-${i}`,
    img: p.img || '',
    title: p.title || '',
    status: p.status || '',
    live: !!p.live,
    cats: p.cats || [],
    meta: p.meta || '',
    scope: p.scope || '',
    gallery: p.gallery || [],
    description: p.description || '',
    features: p.features || [],
    client: p.client || '',
    consultant: p.consultant || '',
    area: p.area || '',
    year: p.year || '',
    order: i,
  };
}

/* ---- image compression helper (< 50ms in browser canvas) ---- */
export async function compressImage(file, maxDimension = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const reader = new FileReader();
      reader.onload = (e) => resolve({ blob: file, dataUrl: e.target.result });
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        canvas.toBlob(
          (blob) => resolve({ blob: blob || file, dataUrl }),
          'image/jpeg',
          quality
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---- store ---- */
export const projectStore = {

  /* Returns all projects sorted by order */
  async all() {
    try {
      const snap = await getDocs(collection(db, COL));
      const docs = [];
      snap.forEach((d) => {
        if (d.id !== META_DOC) docs.push({ id: d.id, ...d.data() });
      });

      // If empty → seed from hardcoded data
      if (docs.length === 0) {
        await projectStore.seed();
        return projectStore.all();
      }

      docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      return docs;
    } catch (err) {
      console.error('projectStore.all() error:', err);
      // Fallback to hardcoded data if Firebase is not configured
      return PROJECTS.map((p, i) => seedProject(p, i));
    }
  },

  /* Find one project by id */
  async byId(id) {
    try {
      const snap = await getDoc(doc(db, COL, id));
      if (!snap.exists()) return null;
      return { id: snap.id, ...snap.data() };
    } catch (err) {
      console.error('projectStore.byId() error:', err);
      return null;
    }
  },

  /* Create or update a project */
  async save(project) {
    const id = project.id || genId();
    const data = { ...project, id };
    // If new and no order, put at end
    if (!project.id) {
      const all = await projectStore.all();
      data.order = all.length;
    }
    await setDoc(doc(db, COL, id), data);
    return data;
  },

  /* Delete a project */
  async remove(id) {
    await deleteDoc(doc(db, COL, id));
  },

/* Upload an image with automatic compression and fast timeout/fallback */
  async uploadImage(file, path) {
    let compressedBlob = file;
    let fallbackDataUrl = '';

    try {
      const res = await compressImage(file, 1600, 0.82);
      compressedBlob = res.blob;
      fallbackDataUrl = res.dataUrl;
    } catch (e) {
      console.warn('Image compression note:', e);
    }

    try {
      const safeName = (file.name || 'image.jpg').replace(/[^a-zA-Z0-9.-]/g, '_');
      const filePath = path || `project-images/${Date.now()}-${safeName}`;
      const storageRef = ref(storage, filePath);

      // Race upload with a 4.5s timeout so the UI never freezes
      const uploadTask = (async () => {
        await uploadBytes(storageRef, compressedBlob);
        return await getDownloadURL(storageRef);
      })();

      const timeoutTask = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Storage upload timeout')), 4500)
      );

      const url = await Promise.race([uploadTask, timeoutTask]);
      return url;
    } catch (err) {
      console.warn('Firebase Storage direct upload skipped/failed. Using lightweight compressed image:', err.message);
      if (fallbackDataUrl) return fallbackDataUrl;

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }
  },

  /* Delete an image from Firebase Storage by its URL */
  async deleteImage(url) {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    } catch (err) {
      // Image may not exist in storage (could be a static path)
      console.warn('deleteImage: could not delete', url, err.message);
    }
  },

  /* Seed Firestore with the hardcoded PROJECTS data */
  async seed() {
    const batch = writeBatch(db);
    PROJECTS.forEach((p, i) => {
      const data = seedProject(p, i);
      batch.set(doc(db, COL, data.id), data);
    });
    await batch.commit();
  },

  /* Reset everything back to hardcoded seed data */
  async reset() {
    // Delete all existing documents
    const snap = await getDocs(collection(db, COL));
    const batch = writeBatch(db);
    snap.forEach((d) => batch.delete(d.ref));
    await batch.commit();
    // Re-seed
    await projectStore.seed();
  },

  /* Resolve an image key to a URL — handles both IMAGES keys and full URLs */
  resolveImage(key) {
    if (!key) return '';
    if (IMAGES[key]) return IMAGES[key];
    if (key.startsWith('http') || key.startsWith('./') || key.startsWith('/') || key.startsWith('data:')) return key;
    return IMAGES['mangrove'] || '';
  },

  /* Get all available image keys from the IMAGES registry */
  getImageKeys() {
    return Object.keys(IMAGES).filter(k => !k.startsWith('logo') && !k.startsWith('mark') && !k.startsWith('cert-'));
  },

  /* Get the FILTERS constant for category options */
  getFilters() {
    return FILTERS;
  },
};

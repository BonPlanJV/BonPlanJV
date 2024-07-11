import { vi } from 'vitest';

export const ref = vi.fn();
export const get = vi.fn();
export const set = vi.fn();
export const update = vi.fn();
export const remove = vi.fn();
export const push = vi.fn();
export const query = vi.fn();
export const orderByChild = vi.fn();
export const equalTo = vi.fn();
export const auth = {
  signOut: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  currentUser: {
    updateEmail: vi.fn(),
    updatePassword: vi.fn(),
  },
};
export const db = {}; // Mock database
import { type Firestore, getFirestore } from 'firebase/firestore';
import type React from 'react';
import { createContext } from 'react';

const db = getFirestore();

export const FirestoreContext = createContext<Firestore>(db);

export const FirestoreProvider: React.FC = ({ children }) => {
  return (
      <FirestoreContext.Provider value={db}>{children}</FirestoreContext.Provider>
  );
};

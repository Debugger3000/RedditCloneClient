// src/firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { environment } from '../../../environments/environment';

const app = initializeApp(environment.firebase);

export const storage = getStorage(app);

import { config } from 'dotenv';
import * as admin from 'firebase-admin';
config();

const serviceAccount = {
  project_id: process.env.project_id,
  private_key: process.env.private_key.replace(/\\n/gm, '\n'),
  client_email: process.env.client_email,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://fitnessapp-3f674-default-rtdb.asia-southeast1.firebasedatabase.app/',
});

export const firebaseAdmin = admin;
export const db = admin.database();

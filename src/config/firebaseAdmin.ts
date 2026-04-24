import "server-only";
import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  if (
    !params.projectId ||
    !params.clientEmail ||
    !params.privateKey ||
    !params.storageBucket
  ) {
    throw new Error(
      "Credenciais do Firebase Admin incompletas no servidor. Verifique FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY e FIREBASE_STORAGE_BUCKET."
    );
  }

  const privateKey = formatPrivateKey(params.privateKey);

  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket
  });
}

export async function initAdmin() {
  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL ||
    process.env.GOOGLE_CLOUD_CLIENT_EMAIL ||
    process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
  const storageBucket =
    process.env.FIREBASE_STORAGE_BUCKET ||
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const privateKey =
    process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
    process.env.GOOGLE_CLOUD_PRIVATE_KEY ||
    process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY;

  const params = {
    projectId: projectId as string,
    clientEmail: clientEmail as string,
    storageBucket: storageBucket as string,
    privateKey: privateKey as string
  };

  return createFirebaseAdminApp(params);
}

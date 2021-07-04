import * as admin from 'firebase-admin';
import serviceAccount from '../config/codeblog-cd897-firebase-adminsdk-ii6wb-fbcd739bb0.json';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export {admin};

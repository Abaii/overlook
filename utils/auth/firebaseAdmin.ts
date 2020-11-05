import * as firebaseAdmin from 'firebase-admin';

import serviceAccount from './overlook-23fbe-firebase-adminsdk-ogfh3-a7cff501d4.json';

if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
            projectId: serviceAccount.project_id,
        }),
        databaseURL: 'https://overlook-23fbe.firebaseio.com',
    });
}

export { firebaseAdmin };
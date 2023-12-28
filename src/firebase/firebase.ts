import admin from 'firebase-admin';

export class FirebaseDB {
    private db: admin.firestore.Firestore;

    constructor() {
        const network = process.env.NETWORK;
        if (!network) throw new Error('Network not set in environment');
        const projectId = process.env.FIREBASE_PROJECT_ID;
        if (!projectId) throw new Error('Firebase project ID not set in environment');
        const clientEmail = process.env[`FIREBASE_MARKETPLACE_CLIENT_EMAIL_${network.toUpperCase()}`];
        if (!clientEmail) throw new Error('Firebase client email not set in environment');
        const pkBase64 = process.env[`FIREBASE_MARKETPLACE_PK_${network.toUpperCase()}`];
        if (!pkBase64) throw new Error('Firebase private key not set in environment');
        const pk = Buffer.from(pkBase64, 'base64').toString('ascii');

        admin.initializeApp({ 
            credential: admin.credential.cert({
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: pk
            })
        });

        this.db = admin.firestore();
        
        console.log('  Firebase DB initialized\n');
    }

    public async notifyEvent(blockHeight: number, events: string[]) {
        if (!events.length) return;

        try {
            await this.db.collection('events-emitted')
                .doc(blockHeight.toString().padStart(9, "0")).set({ events });
            // Keep only the last 3 blocks
            const blocks = await this.db.collection('events-emitted').orderBy('__name__', 'desc').get();
            if (blocks.size > 3) {
                const batch = this.db.batch();
                blocks.docs.slice(3).forEach((doc) => batch.delete(doc.ref));
                await batch.commit();
            }
        } catch (e) {
            console.error(`Firebase DB notification error for block ${blockHeight}`);
        }
    }
}

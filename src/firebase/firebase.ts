import admin from 'firebase-admin';
import { Reference } from "firebase-admin/database";

export class FirebaseDB {
    private db: admin.firestore.Firestore;

    constructor() {
        if (!process.env.FIREBASE_PROJECT_ID) throw new Error('Firebase project ID not set in environment');
        if (!process.env.FIREBASE_CLIENT_EMAIL) throw new Error('Firebase client email not set in environment');
        if (!process.env.FIREBASE_PK) throw new Error('Firebase private key not set in environment');

        const firebasePk = Buffer.from(process.env.FIREBASE_PK, 'base64').toString('ascii');

        admin.initializeApp({ 
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: firebasePk
            })
        });

        this.db = admin.firestore();
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

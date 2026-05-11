import { openDB, IDBPDatabase } from "idb";

export interface OfflineResource {
  id: string;
  url: string;
  proxyUrl: string;
  title: string;
  subject: string;
  level: string;
  type: string;
  savedAt: number;
}

const DB_NAME = "educonnect_offline_v1";
const STORE_NAME = "downloads";

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "proxyUrl" });
        }
      },
    });
  }
  return dbPromise;
}

export const offlineDB = {
  async saveResource(resource: OfflineResource) {
    const db = await getDB();
    await db.put(STORE_NAME, resource);
  },

  async removeResource(proxyUrl: string) {
    const db = await getDB();
    await db.delete(STORE_NAME, proxyUrl);
  },

  async getAllResources(): Promise<OfflineResource[]> {
    const db = await getDB();
    return db.getAll(STORE_NAME);
  },

  async getResource(proxyUrl: string): Promise<OfflineResource | undefined> {
    const db = await getDB();
    return db.get(STORE_NAME, proxyUrl);
  }
};

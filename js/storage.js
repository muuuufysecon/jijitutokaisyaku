"use strict";
// storage.js に切り出しやすい領域
// ==============================
const AppConfig = {
    DB_NAME: 'CarrierNoteLocalDB',
    STORE_NAME: 'notes',
};
const StorageService = {
    initDB: () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(AppConfig.DB_NAME, 1);
            request.onupgradeneeded = (e) => {
                if (!e.target.result.objectStoreNames.contains(AppConfig.STORE_NAME)) {
                    e.target.result.createObjectStore(AppConfig.STORE_NAME);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    saveToDB: async (key, data) => {
        try {
            const db = await StorageService.initDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(AppConfig.STORE_NAME, 'readwrite');
                const store = tx.objectStore(AppConfig.STORE_NAME);
                store.put(data, key);
                tx.oncomplete = () => resolve();
                tx.onerror = () => reject(tx.error);
            });
        }
        catch (error) {
            console.warn('IndexedDB save failed:', error);
            throw error;
        }
    },
    loadFromDB: async (key) => {
        try {
            const db = await StorageService.initDB();
            return new Promise((resolve, reject) => {
                const tx = db.transaction(AppConfig.STORE_NAME, 'readonly');
                const store = tx.objectStore(AppConfig.STORE_NAME);
                const request = store.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        }
        catch (error) {
            console.warn('IndexedDB load failed:', error);
            throw error;
        }
    },
    saveToLocalStorage: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        }
        catch (e) {
            console.warn('LocalStorage quota exceeded or not available');
        }
    },
    loadFromLocalStorage: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
        catch (e) {
            return null;
        }
    },
};
const { DB_NAME, STORE_NAME } = AppConfig;
const { initDB, saveToDB, loadFromDB, saveToLocalStorage, loadFromLocalStorage, } = StorageService;
// ==============================

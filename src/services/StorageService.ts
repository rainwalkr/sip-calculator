export class StorageService {

    static #collectionIdKey = '_id';

    /**
     * generate unique identifier for a collection entry
     * @returns string
     */
    generateCollectionId(): string {
        return Math.random().toString(16).slice(2);
    }

    /**
     * add entry to collection
     * @param key 
     * @param entry 
     */
    addCollectionEntry(key: string, entry: object) {
        this.addCollectionEntries(key,[entry])
    }

    /**
     * add entries to collection
     * @param key 
     * @param entries 
     */
    addCollectionEntries(key: string, entries: object[]){
        let collection = this.get(key, []);
        entries.map((entry) => {
            let collectionEntry = {
                [StorageService.#collectionIdKey]: this.generateCollectionId(),
                ...entry
            };
            collection.push(collectionEntry);
        })
        this.set(key, collection);
    }

    /**
     * update an entry in the collection.
     * @param key 
     * @param collectionId 
     * @param patchFunc 
     * @returns object
     */
    patchCollectionEntry(key: string, collectionId: string, patchFunc: (currentVal: object) => object) {
        let collection = this.get(key, []);
        let collectionEntryIndex = collection.findIndex((entry: any) => entry[StorageService.#collectionIdKey] === collectionId)
        if (collectionEntryIndex === -1) {
            return { status: false }
        }
        collection[collectionEntryIndex] = patchFunc(collection[collectionEntryIndex]);
        this.set(key, collection);
        return { status: true }
    }

    /**
     * remove entry from collection
     * 
     * @param key 
     * @param collectionId 
     * @returns 
     */
    removeCollectionEntry(key: string, collectionId: string){
        let collection = this.get(key, []);
        let collectionEntryIndex = collection.findIndex((entry: any) => entry[StorageService.#collectionIdKey] === collectionId)
        if (collectionEntryIndex === -1) {
            return { status: false }
        }
        collection.splice(collectionEntryIndex,1)
        this.set(key, collection);
        return { status: true }
    }

    /**
     * get value by key
     * @param key 
     * @param defaultVal 
     * @returns 
     */
    get(key: string, defaultVal: any = null) {
        let val = localStorage.getItem(key);
        return val ? JSON.parse(val) : defaultVal;
    }

    /**
     * set value by key
     * @param key 
     * @param value 
     */
    set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}
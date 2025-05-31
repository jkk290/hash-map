export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.array = new Array(this.capacity);
        this.count = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * (hashCode + key.charCodeAt(i))) % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        let oldValue = null;

        if ((this.count + 1) / this.capacity >= this.loadFactor) {
            this.resize();
        }

        if (this.array[arrayIndex] === undefined) {
            this.array[arrayIndex] = {key: key, value: value};
            this.count += 1;
        } else {
            oldValue = this.array[arrayIndex];
            this.array[arrayIndex] = {key: key, value: value};
        }

        // refactor to implement linked list to avoid different keys with same hash code

        return oldValue;
    }

    get(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return null;
        } else if (this.array[arrayIndex].key !== key) {
            return null;
        } else {
            return this.array[arrayIndex].value
        }

        // refactor to handle linked list within each index

    }

    has(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return false;
        } else if (this.array[arrayIndex].key !== key) {
            return false;
        } else {
            return true;
        }

        // refactor to handle linked list within each index

    }

    remove(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return false;
        } else if (this.array[arrayIndex].key !== key) {
            return false;
        } else {
            this.array[arrayIndex] = undefined;
            this.count -= 1;
            return true;
        }

        // refactor to handle linked list within each index

    }

    length() {
        return this.count;

    }

    clear() {
        this.array = new Array(this.capacity);
        this.count = 0;
    }

    keys() {
        const filteredItems = this.array.filter(item => item !== undefined);
        const currentKeys = filteredItems.map(item => item.key);

        return currentKeys;

        // refactor to handle linked list

    }

    values() {
        const filteredItems = this.array.filter(item => item !== undefined);
        const currentValues = filteredItems.map(item => item.value);

        return currentValues;

        // refactor to handle linked list

    }

    entries() {
        const filteredItems = this.array.filter(item => item !== undefined);

        const currentEntries = filteredItems.map(item => [item.key, item.value]);

        return currentEntries;

        // refactor to handle linked list
    }

    resize() {
        this.capacity *= 2;

        const currentEntries = this.entries();

        this.clear();
        currentEntries.forEach(item => this.set(item[0], item[1]));
    }


}
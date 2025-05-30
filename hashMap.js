export class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.array = new Array(this.capacity);
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

        if (this.array[arrayIndex] === undefined) {
            this.array[arrayIndex] = {key: key, value: value};
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
}
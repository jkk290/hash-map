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
        let oldValue = null;

        if (this.array[arrayIndex] === undefined) {
            this.array[arrayIndex] = {key: key, value: value};
        } else {
            oldValue = this.array[arrayIndex];
            this.array[arrayIndex] = {key: key, value: value};
        }

        return oldValue;
    }
}
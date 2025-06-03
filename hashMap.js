import { LinkedList } from "./linkedList.js"

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
        const existingKey = this.has(key);

        if (!existingKey && (this.count + 1) / this.capacity >= this.loadFactor) {
            this.resize();
            arrayIndex = this.hash(key);
        }

        if (this.array[arrayIndex] === undefined) {
            this.array[arrayIndex] = {key: key, value: value};
            this.count += 1;

        } else if (this.array[arrayIndex].key === key) {
            oldValue = this.array[arrayIndex].value;
            this.array[arrayIndex] = {key: key, value: value};

        } else if (this.array[arrayIndex].key !== key) {
                if (this.array[arrayIndex] instanceof LinkedList) {
                    let currentNode = this.array[arrayIndex].head;
                    let found = false;

                    while (currentNode !== null && !found) {
                        if (currentNode.value.key ===key) {
                            oldValue = currentNode.value.value;
                            currentNode.value = {key: key, value: value};
                            found = true;
                        } else {
                            currentNode = currentNode.nextNode;
                        }
                    }

                    if (!found) {
                        this.array[arrayIndex].append({key: key, value: value});
                        this.count += 1;
                    }
                } else {
                    
                    let listHead = this.array[arrayIndex];
                    this.array[arrayIndex] = new LinkedList();
                    this.array[arrayIndex].append(listHead);
                    this.array[arrayIndex].append({key: key, value: value});
                    this.count += 1;
                
                }
        }

        return oldValue;
    }

    get(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return null;
        }
        
        else if (this.array[arrayIndex] instanceof LinkedList) {
            let currentNode = this.array[arrayIndex].head;

            while (currentNode != null) {
                if (currentNode.value.key === key) {
                    return currentNode.value; 
                }
                currentNode = currentNode.nextNode; 
            }
            
            return null;
        }
        
        else if (this.array[arrayIndex].key === key) {
            return this.array[arrayIndex].value;
        }
        
        else {
            return null;
        }
    }

    has(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return false;

        } else if (this.array[arrayIndex] instanceof LinkedList) {
            let currentNode = this.array[arrayIndex].head;

            while (currentNode != null) {
                if (currentNode.value.key === key) {
                    return true;
                }
                currentNode = currentNode.nextNode;
            }

            return false;
            
        }  else if (this.array[arrayIndex].key === key){
            return true;

        } else {
            return false;

        }

    }

    remove(key) {
        let arrayIndex = this.hash(key);

        if (arrayIndex < 0 || arrayIndex >= this.array.length) {
            throw new Error("Trying to access index out of bounds");
        }

        if (this.array[arrayIndex] === undefined) {
            return false;
        } else if (this.array[arrayIndex].key === key) {
            this.array[arrayIndex] = undefined;
            this.count -= 1;
            return true;

        } else if (this.array[arrayIndex].key !== key) {
            if (this.array[arrayIndex].head === undefined) {
                return false;
            } else {
                let currentNode = this.array[arrayIndex].head;
                let previousNode = null;

                while (currentNode != null) {
                    if (currentNode.value.key === key) {
                        if (previousNode === null) {
                            this.array[arrayIndex].head = currentNode.nextNode;

                        } else {
                            previousNode.nextNode = currentNode.nextNode;
                            

                        }
                        this.count -= 1;
                        return true;

                    } else {
                        previousNode = currentNode;
                        currentNode = currentNode.nextNode;
                    }
                }

                return false;
            }
        }


    }

    length() {
        return this.count;

    }

    clear() {
        this.array = new Array(this.capacity);
        this.count = 0;
    }

    keys() {
        let currentKeys = [];

        this.array.forEach((item, index) => {
            if (item === undefined) {
                return;

            } else if (item.head === undefined) {
                currentKeys.push(item.key);

            } else {
                currentKeys.push(item.key);
                let currentNode = item.head;
                
                while (currentNode != null) {
                    currentKeys.push(currentNode.value.key);
                    currentNode = currentNode.nextNode;
                }
                
            }
        });

        return currentKeys;

    }

    values() {
        let currentValues = [];

        this.array.forEach((item, index) => {
            if (item === undefined) {
                return;

            } else if (item.head === undefined) {
                currentValues.push(item.value);

            } else {
                currentValues.push(item.value);
                let currentNode = item.head;
                
                while (currentNode != null) {
                    currentValues.push(currentNode.value.value);
                    currentNode = currentNode.nextNode;
                }
                
            }
        });

        return currentValues;
        

    }

    entries() {

        let currentEntries = [];

        this.array.forEach((item) => {
            if (item === undefined) {
                return;
            } 
            
            if (item instanceof LinkedList) {
                let currentNode = item.head;

                while (currentNode != null) {
                    currentEntries.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                }
            } else {
                currentEntries.push(item);
            }
        })

        let formattedEntries = currentEntries.map(item => [item.key, item.value]);

        return formattedEntries;
    }

    resize() {
        this.capacity *= 2;

        const currentEntries = this.entries();

        this.clear();
        currentEntries.forEach(item => {
            if (item === undefined) {
                return;
            }

            this.set(item[0], item[1])
        });
    }


}
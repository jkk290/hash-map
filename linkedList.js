import { Node } from "./node.js";

export class LinkedList {
    constructor() {
        this.head = null;
    }

    append(data) {
        let newNode = new Node();
        newNode.value = data;

        let lastNode = this.tail();
        
        if (lastNode === null) {
            this.head = newNode;
        } else {
            lastNode.nextNode = newNode;
        }
    }

    prepend(data) {
        let newNode = new Node();
        newNode.value = data;

        newNode.nextNode = this.head
        this.head = newNode;  

    }

    size() {
        if (this.head === null) {
            return 0;
        }

        let currentPosition = this.head;
        let count = 1;

        while (currentPosition.nextNode != null) {            
            currentPosition = currentPosition.nextNode;
            count += 1;
        }

        return count;
    }

    getHead() { // rename method from head() to getHead.  Using .head() method had conflict? issues with this.head property
        return this.head;
    }

    tail() {
        if (this.head === null) {
            return null;
        }

        let currentPosition = this.head;

        while (currentPosition.nextNode != null) {
            currentPosition = currentPosition.nextNode;
        }

        return currentPosition;
    }

    at(index) {
        if (this.head === null) {
            return null;
        }

        let currentPosition = this.head;
        let currentIndex = 0;

        while (currentIndex < index && currentPosition.nextNode !== null) {
            currentPosition = currentPosition.nextNode;
            currentIndex += 1;
        }

        if (currentIndex === index) {
            return currentPosition.value;
        } else {
            return null;
        }        
    }

    pop(){
        if (this.head === null) {
            return null;
        } else if (this.head.nextNode === null) {
            this.head = null;
            return;
        }

        let currentPosition = this.head;
        let previousPosition = null;

        while (currentPosition.nextNode !== null) {
            previousPosition = currentPosition;
            currentPosition = currentPosition.nextNode;
        }
        
        previousPosition.nextNode = null;
    }

    contains(value) {
        if (this.head === null) {
            return false;
        }

        let currentPosition = this.head;

        while (currentPosition !== null && currentPosition.value !== value) {
            currentPosition = currentPosition.nextNode;
        }

        return currentPosition !== null;

    }

    find(value) {
        if (this.head === null) {
            return null;
        }

        let currentPosition = this.head;
        let index = 0;

        while (currentPosition !== null && currentPosition.value !== value) {
            currentPosition = currentPosition.nextNode;
            index += 1;
        }

        if (currentPosition === null) {
            return null;
        } else if (currentPosition.value === value) {
            return index;
        }

    }

    toString() {
        if (this.head === null) {
            return '';
        }

        let currentPosition = this.head;
        let stringList = '';

        while (currentPosition !== null) {
            stringList = stringList + `( ${currentPosition.value} ) -> `;
            currentPosition = currentPosition.nextNode;
        }

        stringList = stringList + `null`;

        return stringList;

    }

    insertAt(value, index) {
        if (this.head === null) {
            if (index === 0) {
                let newNode = new Node();
                newNode.value = value;
                this.head = newNode;
            return;
            } else {
                return null;
            }
            
        } else if (index === 0) {
            let newNode = new Node();
            newNode.value = value;
            newNode.nextNode = this.head;
            this.head = newNode;
            return;
        } 

        let currentPosition = this.head;
        let currentIndex = 0;
        let previousPosition = null;        

        while(currentIndex < index && currentPosition !== null) {
            previousPosition = currentPosition;
            currentPosition = currentPosition.nextNode;
            currentIndex += 1;
        }

        if (currentPosition === null || currentIndex > index) {
            return null;
        }
        
        let newNode = new Node();
        newNode.value = value;

        if (currentIndex === index && currentPosition.nextNode !== null) {
            previousPosition.nextNode = newNode;
            newNode.nextNode = currentPosition;
        } else {
            previousPosition.nextNode = newNode;
        }
    }

    removeAt(index) {
        if (this.head === null) {
            return null;
        } else if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }

        let currentPosition = this.head;
        let previousPosition = null;
        let currentIndex = 0;

        while (currentIndex < index && currentPosition !== null) {
            previousPosition = currentPosition;
            currentPosition = currentPosition.nextNode;
            currentIndex += 1;
        }

        if (currentIndex === index && currentPosition !== null) {
            previousPosition.nextNode = currentPosition.nextNode;
        } else {
            return null;
        }

    }
    
}
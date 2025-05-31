Start by creating a `HashMap` class or factory function. It’s up to you which you want to use. It should have at least two variables for `load factor` and `capacity`. Then proceed to create the following methods:

`hash(key)` takes a key and produces a hash code with it. We already implemented a fairly good `hash` function in the previous lesson.

`set(key, value)` takes two arguments: the first is a key, and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten, and we can say that we update the key’s value (e.g. `Carlos` is our key but it is called twice: once with value `I am the old value.`, and once with value `I am the new value.`. Following this logic, `Carlos` should contain only the latter value).

Recall that collisions occur when TWO DIFFERENT keys generate the same hash code and get assigned to the same bucket. (e.g. `Rama` and `Sita` are both hashed to `3`, so `3` becomes a location for `Rama` AND `Sita`. However, we know that this is not an update because the keys are different). Review the dealing with collisions section of the previous lesson to find a way to handle our collisions.

Remember to grow your buckets to double their capacity when your hash map reaches the `load factor`. The methods mentioned later in this assignment can help you handle the growth logic, so you may want to implement this feature near the end. However, we mention this with `set()` because it’s important to grow buckets exactly as they are being expanded.

`get(key)` takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return `null`.

`has(key)` takes a key as an argument and returns `true` or `false` based on whether or not the key is in the hash map.

`remove(key)` takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return `true`. If the key isn’t in the hash map, it should return `false`.

`length()` returns the number of stored keys in the hash map.

`clear()` removes all entries in the hash map.

`keys()` returns an array containing all the keys inside the hash map.

`values()` returns an array containing all the values.

`entries()` returns an array that contains each `key, value` pair. Example: `[[firstKey, firstValue], [secondKey, secondValue]]`



growing bucket
    when setting a new object, check if load capacity will be reached
    count + 1 / capacity >= load factor
        if so, double the load capacity - this.capacity *= 2
        get all entries from current bucket
        clear bucket
        set new objects for each item within the array from entries
        set initial new object


implementing linked list
    when setting a new object, check if key exist
        if doesnt exist, set new object at array index
        if exist, check if same key
            if same key, update value
            if different key, check if already linked list
                if not, get key and value of existing object
                    create new LinkedList
                    set to current array index
                    create current object as new node
                    set as head
                    create new object as another node linked to previous
            if linked list, traverse to end
                if find a same key
                    update that key value
                if dont find same key
                    create new object as another node linked to previous
        
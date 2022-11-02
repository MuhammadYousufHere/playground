import { useCallback, useMemo, useState } from 'react';

const useArrayState = (initialArray = []) => {
    const [array, setArray] = useState(initialArray);
    const push = useCallback(
        (value) => {
            setArray([...array, value]);
        },
        [array]
    );
    const pop = useCallback(
        (value) => {
            setArray(array.slice(0, array.length - 1));
        },
        [array]
    );
    const unshift = useCallback(
        (value) => {
            setArray([value, ...array]);
        },
        [array]
    );
    const shift = useCallback(
        (value) => {
            setArray(array.slice(1));
        },
        [array]
    );
    const reverse = useCallback(() => {
        setArray([...array].reverse());
    }, [array]);
    const concat = useCallback(
        (value) => {
            setArray([...array, ...value]);
        },
        [array]
    );
    const clear = useCallback(() => {
        setArray([]);
    }, []);
    const fill = useCallback(
        (value, start, end) => {
            setArray([...array].fill(value, start, end));
        },
        [array]
    );
    const updateItemAtIndex = useCallback(
        (index, value) => {
            setArray((prevArray) => {
                const newArr = [...prevArray];
                newArr[index] = value;
                return newArr;
            });
        },
        [setArray]
    );
    const splice = useCallback(
        (...args) => {
            setArray((prevArray) => {
                const newArr = [...prevArray];
                newArr.slice(...args);
                return newArr;
            });
        },
        [setArray]
    );
    const removeItemAtIndex = useCallback(
        (index, value) => {
            setArray((prevArray) => {
                const newArr = [...prevArray];
                newArr.slice(index, 1);
                return newArr;
            });
        },
        [setArray]
    );
    const replaceItemAtIndex = useCallback(
        (index, value) => {
            setArray((prevArray) => {
                const newArr = [...prevArray];
                newArr.splice(index, 1, value);
                return newArr;
            });
        },
        [setArray]
    );
    const insertItemAtIndex = useCallback(
        (index, value) => {
            setArray((prevArray) => {
                const newArray = [...prevArray];
                newArray.splice(index, 0, value);
                return newArray;
            });
        },
        [setArray]
    );
    const sort = useCallback(
        (compareFunc) => {
            setArray([...array].sort(compareFunc));
        },
        [array]
    );
    const controls = useMemo(() => {
        return {
            push,
            pop,
            clear,
            unshift,
            shift,
            reverse,
            concat,
            fill,
            updateItemAtIndex,
            setArray,
            splice,
            removeItemAtIndex,
            replaceItemAtIndex,
            insertItemAtIndex,
            sort,
        };
    }, [
        push,
        pop,
        clear,
        unshift,
        shift,
        reverse,
        concat,
        fill,
        updateItemAtIndex,
        setArray,
        splice,
        removeItemAtIndex,
        replaceItemAtIndex,
        insertItemAtIndex,
        sort,
    ]);
    const returnValue = useMemo(() => {
        return [array, controls];
    }, [array, controls]);
    return returnValue;
};

export default useArrayState;

/*
 * const [array, controls] = useArrayState([1, 2, 3]);
 *
 * controls.push(4); // [1, 2, 3, 4]
 * controls.pop(); // [1, 2, 3]
 * controls.unshift(0); // [0, 1, 2, 3]
 * controls.shift(); // [1, 2, 3]
 * controls.reverse(); // [3, 2, 1]
 * controls.concat([4, 5, 6]); // [3, 2, 1, 4, 5, 6]
 * controls.fill(0); // [0, 0, 0, 0, 0, 0]
 * controls.updateItemAtIndex(0, 1); // [1, 0, 0, 0, 0, 0]
 * controls.clear(); // []
 * controls.setArray([1, 2, 3]); // [1, 2, 3]
 * controls.splice(1, 1); // [1, 3]
 * controls.removeItemAtIndex(1); // [1]
 * controls.replaceItemAtIndex(0, 2); // [2]
 * controls.insertItemAtIndex(0, 1); // [1, 2]
 * controls.sort((a, b) => a - b); // [1, 2]
 *
 */

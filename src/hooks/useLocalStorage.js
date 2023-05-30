import { useState } from "react";

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storeData = localStorage.getItem(key);
        // console.log(storeData);
        return storeData ? JSON.parse(storeData) : defaultValue;/////////////
        // return defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };

    return[
        value,
        setLocalStorageValue,
    ];
}
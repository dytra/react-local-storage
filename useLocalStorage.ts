import { useState, Dispatch, SetStateAction, useEffect } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;
/**
 * Custom hook for managing local storage and state.
 *
 * @template T - The type/interface of the value stored in local storage.
 * @param {string} key - The key used to store and retrieve the value from local storage.
 * @param {T} [initialValue] - The initial value to use if the key is not found in local storage.
 * @returns {[T, SetValue<T>, () => void]} - An array containing the current value, a function to update the value, and a function to clear the value from the local storage.
 */
const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, SetValue<T>, () => void] => {
  // Read from localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? storedValue : initialValue ? initialValue : null;

  // State to hold the current value
  const [value, setValue] = useState<T>(initial as T);

  // Function to update the value in localStorage and the state
  const updateValue: SetValue<T> = (newValue) => {
    setValue(newValue);
    const valueToStore =
      newValue instanceof Object ? JSON.stringify(newValue) : newValue;
    localStorage.setItem(key, valueToStore as string);
  };

  // Function to delete the item from localStorage and the state
  const deleteValue = () => {
    setValue(undefined as T);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    if (!key) return;
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      try {
        const parsedValue = JSON.parse(storageValue);
        setValue(parsedValue as SetStateAction<T>);
      } catch (error) {
        // If parsing fails, set the value as is
        setValue(storageValue as SetStateAction<T>);
      }
    }
  }, []);

  useEffect(() => {
    if(!storedValue && initial) {
      updateValue(initial as T);
    }
  },[storedValue,initial]);

  return [value, updateValue, deleteValue];
};

export default useLocalStorage;

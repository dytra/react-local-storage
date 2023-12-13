import { useState, Dispatch, SetStateAction, useEffect } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(
  key: string
  // initialValue: T
): [T, SetValue<T>, () => void] => {
  // Read from localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? storedValue : null;

  // State to hold the current value
  const [value, setValue] = useState<T>(null as T);

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
  },[storedValue]);

  return [value, updateValue, deleteValue];
};

export default useLocalStorage;

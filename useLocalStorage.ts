import { useState, Dispatch, SetStateAction, useEffect } from 'react';


type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>, () => void] => {
  // Read from localStorage
  const storedValue = localStorage.getItem(key);
  const initial = storedValue ? (JSON.parse(storedValue) as T) : initialValue;

  // State to hold the current value
  const [value, setValue] = useState<T>(initial);

    // Function to update the value in localStorage and the state
    const updateValue: SetValue<T> = (newValue) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Function to delete the item from localStorage and the state
  const deleteValue = () => {
        setValue(initialValue);
      localStorage.removeItem(key);
  };

  useEffect(() => {
    if(key && initialValue) {
      updateValue(initialValue);
      return;
    } 
    const storageValue = localStorage.getItem(key);
    if(key && storageValue) {
      setValue(storageValue as SetStateAction<T>);
    }
  },[]);

      return [value, updateValue, deleteValue];
};

      export default useLocalStorage;


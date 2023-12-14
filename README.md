# react-storage-helper

A custom React hook for managing data from localStorage easily.

## Installation

```bash
npm install react-storage-helper
```

## Usage

```js
import React from 'react';
import useLocalStorage from 'react-storage-helper';

const MyComponent = () => {
  const [data, setData, deleteData] = useLocalStorage('mySecret');

  return (
    <div>
      <p>Data from localStorage: {data}</p>
      <button onClick={() => setData('new value')}>Update Data</button>
      <button onClick={deleteData}>Delete Data</button>
    </div>
  );
};

export default MyComponent;
```


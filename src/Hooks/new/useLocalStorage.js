import React from 'react';

const useLocalStorage = (key, defaultValue = '') => {
  const [state, setState] = React.useState(
    // lazy
    () => window.localStorage.getItem(key) ?? defaultValue
  );
  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
  return [key, setState];
};

export default useLocalStorage;

// const [name,setName]= useLocalStorage('name','Yousuf')

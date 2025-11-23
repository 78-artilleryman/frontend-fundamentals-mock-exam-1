import { useState } from 'react';

export const useToggle = (
  initialValue = false
): { value: boolean; toggle: () => void; setToggle: (value: boolean) => void } => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue(prev => !prev);
  const setToggle = (newValue: boolean) => setValue(newValue);

  return {
    value,
    toggle,
    setToggle,
  };
};

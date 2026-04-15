import { useState } from 'react';

export const InputAdd2 = ({ onAdd }) => {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button onClick={() => {
        if (!value.trim()) return;
        onAdd(value);
        setValue('');
      }}>
        Adicionar
      </button>
    </div>
  );
};

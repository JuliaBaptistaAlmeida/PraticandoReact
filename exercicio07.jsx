import { useState } from 'react';

export const InputAdd = ({setList}) => {
  const [value, setValue] = useState('');

  const handleAdd = () => {
    if (!value.trim()) return;

    setList(prevList => [
      ...prevList,
      {
        id: Date.now().toString(),
        texto: value,
        concluido: false
      }
    ]);

    setValue('');
  };

  return (
    <div>
      <input 
        value={value} 
        onChange={e => setValue(e.target.value)}
      />

      <button onClick={handleAdd}>
        Adicionar
      </button>
    </div>
  );
};

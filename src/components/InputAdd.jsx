import { useState } from 'react';

export const InputAdd = ({ setList }) => {
    const [value, setValue] = useState('');

    return (
        <div>
            <input 
        value={value} 
        onChange={e => setValue(e.target.value)}
      />

      <button 
        onClick={() => {
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
        }}
      >
        Adicionar
      </button>
        </div>
    )
}


  

import { useState } from 'react';

export function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  return (
    <div>
      <h1>Adicione Tarefas a Fazer</h1>

      <input 
        value={value} 
        onChange={e => setValue(e.target.value)}
      /> 
      
      <button 
        onClick={() => {
          setList(prevList => [
            ...prevList,
            { id: Date.now().toString(), texto: value }
          ]);
          setValue('');
        }}
      >
        Adicionar
      </button>

      <ol>
        {list.map((listItem) => (
          <li key={listItem.id}>
            {listItem.texto}

            <button
              onClick={() =>
                setList(prevList =>
                  prevList.filter(item => item.id !== listItem.id)
                )
              }
            >
              Concluir
            </button>

            <button
              onClick={() =>
                setList(prevList =>
                  prevList.filter(item => item.id !== listItem.id)
                )
              }
            >
              Remover
            </button>
          </li>
        ))}
      </ol> 
    </div>
  );
}

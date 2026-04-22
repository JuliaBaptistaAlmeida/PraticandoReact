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
          if (!value.trim()) return; // evita adicionar vazio

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

      <ol>
        {list.map((listItem) => (
          <li key={listItem.id}>

            <span
              style={{
                textDecoration: listItem.concluido ? 'line-through' : 'none',
                marginRight: '5px'
              }}
            >
              {listItem.texto}
            </span>

            {listItem.concluido && "✅  "}

            <button
              onClick={() =>
                setList(prevList =>
                  prevList.map(item =>
                    item.id === listItem.id
                      ? { ...item, concluido: !item.concluido }
                      : item
                  )
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
              style={{ marginLeft: '5px' }}
            >
              Remover
            </button>

          </li>
        ))}
      </ol>
    </div>
  );
}

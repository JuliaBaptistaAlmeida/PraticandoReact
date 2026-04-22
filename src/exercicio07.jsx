import { useState } from 'react';
import { InputAdd2 } from './components/InputAdd2';
import './App.css';

export function App() {
  const [list, setList] = useState([]);

  const handleAdd = (texto) => {
    setList(prevList => [
      ...prevList,
      {
        id: Date.now().toString(),
        texto,
        concluido: false
      }
    ]);
  };

  return (
    <div className="container">
      <h1>Adicione Tarefas a Fazer</h1>

      <InputAdd2 onAdd={handleAdd} />

      <ol>
        {list.map((listItem) => (
          <li key={listItem.id} style={{marginBottom: '10px'}}>

            <span
              style={{
                textDecoration: listItem.concluido ? 'line-through' : 'none',
                marginRight: '5px'
              }}
            >
              {listItem.texto}
            </span>

            {listItem.concluido && "✅"}

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
            style={{background: '#49D153', borderRadius: '3px'}} >
              Concluir
            </button>

            <button
              onClick={() =>
                setList(prevList =>
                  prevList.filter(item => item.id !== listItem.id)
                )
              }
              style={{background: '#FF3D1A', marginLeft: '5px', borderRadius: '3px'}}
            >
              Remover
            </button>

          </li>
        ))}
      </ol>
    </div>
  );
}

import { useState } from 'react';
import { InputAdd } from './components/InputAdd';

export function App() {
  const [list, setList] = useState([]);

  return (
    <div>
      <h1>Adicione Tarefas a Fazer</h1>

      <InputAdd setList={setList}/>

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

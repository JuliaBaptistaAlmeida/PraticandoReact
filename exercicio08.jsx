import { useState } from 'react';
import { InputAdd2 } from './components/InputAdd2';
import { ToDoItem } from './components/ToDoItem';
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
          <ToDoItem
            key={listItem.id}
            listItem={listItem}
            setList={setList}
          />
        ))}
      </ol>
    </div>
  );
}

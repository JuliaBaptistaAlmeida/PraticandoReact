import { useState } from 'react';
import { InputAdd2 } from './components/InputAdd2';
import { ToDoItem } from './components/ToDoItem2';
import './App.css';

export function App() {
  const [list, setList] = useState([]);

  // adicionar nova tarefa
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

  // concluir tarefa
  const handleToggle = (id) => {
    setList(prevList =>
      prevList.map(item =>
        item.id === id
          ? { ...item, concluido: !item.concluido }
          : item
      )
    );
  };

  // remover tarefa
  const handleRemove = (id) => {
    setList(prevList =>
      prevList.filter(item => item.id !== id)
    );
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
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        ))}
      </ol>
    </div>
  );
}

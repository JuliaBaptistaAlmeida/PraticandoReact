import { useState, useEffect } from "react";
import { InputAdd2 } from "./components/InputAdd2";
import { ToDoItem } from "./components/ToDoItem2";
import { ToDoAPI } from "./shared/services/api/ToDoAPI";
import "./App.css";

export function App() {
  const [list, setList] = useState(() => {
    const listaSalva = localStorage.getItem('lista')
    return listaSalva ? JSON.parse(listaSalva) : []
  })
  
  // Carregar tarefas ao iniciar
  useEffect(() => {
    localStorage.setItem('lista', JSON.stringify(list))
  }, [list])

  // Adicionar nova tarefa
  const handleAdd = (title) => {
    ToDoAPI.create({ title, completed: false })
    .then((novaTarefa) => {
      if (!novaTarefa) return;

      setList((prev) => [...prev, novaTarefa]);
    });
  };

  // Alternar concluído
  const handleToggle = (id) => {
    const item = list.find((i) => String(i.id) === String(id));
    if (!item) return;

    const novoStatus = !item.completed;

    // Atualização imediata 
    setList((prev) =>
      prev.map((i) =>
        String(i.id) === String(id)
          ? { ...i, completed: novoStatus }
          : i
      )
    );

    // Atualiza na API
    ToDoAPI.update(id, {
      title: item.title,
      completed: novoStatus,
    });
  };

  // Remover tarefa
  const handleRemove = (id) => {
    ToDoAPI.remove(id).then(() => {
      setList((prev) =>
        prev.filter((i) => String(i.id) !== String(id))
      );
    });
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

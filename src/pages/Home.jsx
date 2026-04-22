import { useState, useEffect } from "react";
import { InputAdd2 } from "../components/InputAdd2";
import { ToDoItem } from "../components/ToDoItem2";
import { ToDoAPI } from "../shared/services/api/ToDoAPI";
import { PageLayout } from "../shared/layout/PageLayout";
import "../App.css";

function newId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadLista() {
  try {
    const itensSalvos = JSON.parse(localStorage.getItem("lista") || "[]");
    if (!Array.isArray(itensSalvos)) return [];

    const ids = new Set();
    return itensSalvos.map((item) => {
      if (typeof item === "string") {
        const id = newId();
        ids.add(id);
        return { id, title: item.trim() || "(sem título)", completed: false };
      }
      if (!item || typeof item !== "object") {
        const id = newId();
        ids.add(id);
        return { id, title: "(sem título)", completed: false };
      }

      let id =
        item.id != null && String(item.id) !== "" ? String(item.id) : newId();
      while (ids.has(id)) id = newId();
      ids.add(id);

      const title = String(
        item.title || item.text || item.name || "(sem título)",
      );
      const c = item.completed;
      const completed = c === true || c === "true" || c === 1;

      return { id, title, completed };
    });
  } catch {
    return [];
  }
}

export function Home() {
  const [list, setList] = useState(loadLista);

  // Carregar tarefas ao iniciar
  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(list));
  }, [list]);

  // Adicionar nova tarefa
  const handleAdd = (title) => {
    const trimmed = title.trim() || "(sem título)";
    ToDoAPI.create({ title: trimmed, completed: false }).then((novaTarefa) => {
      setList((prev) => {
        let id =
          novaTarefa?.id != null && String(novaTarefa.id) !== ""
            ? String(novaTarefa.id)
            : newId();
        while (prev.some((p) => String(p.id) === id)) id = newId();

        const item = {
          id,
          title: String(novaTarefa?.title ?? trimmed),
          completed: Boolean(novaTarefa?.completed),
        };
        return [...prev, item];
      });
    });
  };

  // Alternar concluído
  const handleToggle = (id) => {
    const idStr = String(id);
    let payload = null;
    setList((prev) => {
      const item = prev.find((i) => String(i.id) === idStr);
      if (!item) return prev;
      const novoStatus = !item.completed;
      payload = { title: item.title, completed: novoStatus };
      return prev.map((i) =>
        String(i.id) === idStr ? { ...i, completed: novoStatus } : i,
      );
    });
    if (payload) {
      void ToDoAPI.update(idStr, payload).catch(() => {});
    }
  };

  // Remover tarefa
  const handleRemove = (id) => {
    const idStr = String(id);
    setList((prev) => prev.filter((i) => String(i.id) !== idStr));
    void ToDoAPI.remove(idStr).catch(() => {});
  };

  return (
    <PageLayout>
      <h2>Adicione Tarefas a Fazer</h2>

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
    </PageLayout>
  );
}

export const ToDoItem = ({ listItem, onToggle, onRemove }) => {
  return (
    <li style={{ marginBottom: '10px' }}>

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
        onClick={() => onToggle(listItem.id)}
        style={{ background: '#49D153', borderRadius: '3px' }}
      >
        Concluir
      </button>

      <button
        onClick={() => onRemove(listItem.id)}
        style={{
          background: '#FF3D1A',
          marginLeft: '5px',
          borderRadius: '3px'
        }}
      >
        Remover
      </button>

    </li>
  );
};

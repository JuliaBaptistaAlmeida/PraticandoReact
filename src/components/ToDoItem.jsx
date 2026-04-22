export const ToDoItem = ({ listItem, setList }) => {
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
        onClick={() =>
          setList(prevList =>
            prevList.map(item =>
              item.id === listItem.id
                ? { ...item, concluido: !item.concluido }
                : item
            )
          )
        }
        style={{ background: '#49D153', borderRadius: '3px' }}
      >
        Concluir
      </button>

      <button
        onClick={() =>
          setList(prevList =>
            prevList.filter(item => item.id !== listItem.id)
          )
        }
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

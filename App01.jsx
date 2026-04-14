import { useState } from 'react';

export function App() {
    const [value, setValue] = useState('');
    const [list, setList] = useState([
        {id: 1, name: 'Item 1'},
        {id: 2, name: 'Item 2'},
        {id: 3, name: 'Item 3'},
        {id: 4, name: 'Item 4'},
    ]);

  return (
    <div>

      <ol>
       {list.map((listItem) => (
        <li key={listItem.id}>
            {listItem.name}
        </li>
       ))}
      </ol>
       
      {/*//e é o evento de mudança do input, e.target.value é o valor atual do input*/}
      <input value = {value} onChange={e => setValue(e.target.value)} /> 
      <button onClick={() => setList([...list, {id: list.length + 1, name: value}])}>Adicionar</button>

    </div>
  );
}

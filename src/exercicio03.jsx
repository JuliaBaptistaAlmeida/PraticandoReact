import { useState } from 'react';

export function App() {
    const [value, setValue] = useState('');
    const [list, setList] = useState([]);

  return (
    <div>
       {/*//e é o evento de mudança do input, e.target.value é o valor atual do input*/}
      <input value = {value} onChange={e => setValue(e.target.value)} /> 
      
      <button onClick={() => {
        setList([...list, { id: (list.length + 1).toString(), label: value }]);
        setValue('');
      }}>Adicionar</button>

      <ol>
       {list.map((listItem) => (
        <li key={listItem.id}>
            {listItem.label}
        </li>
       ))}
      </ol> 
    </div>
  );
}

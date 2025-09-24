import '../main.css'
interface Props {
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function Dropdown({ name, options, value, onChange }: Props) {
  const inputId = `${name}-input`;
  const listId = `${name}-options`;

  return (
    <div className='flex-horizontal'>
      <label htmlFor={inputId}>{name}</label>
      <input
        list={listId}
        id={inputId}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <datalist id={listId}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt} />
        ))}
      </datalist>
    </div>
  );
}

export default Dropdown;

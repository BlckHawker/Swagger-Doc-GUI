import '../main.css'
interface Props {
  name: string;
  options: string[];
  value: string;
  required?: boolean
  onChange: (value: string) => void;
}

function AutoCompleteDropdown({ name, options, value, onChange, required }: Props) {
  const inputId = `${name}-input`;
  const listId = `${name}-options`;

  return (
    <div className='flex-horizontal'>
      <label htmlFor={inputId}>{name}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
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

export default AutoCompleteDropdown;

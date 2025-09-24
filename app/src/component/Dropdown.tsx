import '../main.css'
interface Props {
    name: string
    options: string[],

}
function Dropdown({ name, options }: Props) {
  const inputId = `${name}-input`;
  const listId = `${name}-options`;

  return (
    <div className='flex-horizontal'>
      <label htmlFor={inputId}>{name}:</label>
      <input list={listId} id={inputId} name={name} />

      <datalist id={listId}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt} />
        ))}
      </datalist>
    </div>
  );
}


export default Dropdown;
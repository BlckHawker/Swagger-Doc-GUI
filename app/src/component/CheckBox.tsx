import '../main.css'
interface Props {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
function CheckBox({ name, checked, onChange }: Props) {
  const id = `${name}-checkbox`;
  return (
    <div>
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}

export default CheckBox;
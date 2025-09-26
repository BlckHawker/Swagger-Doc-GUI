import '../main.css'
interface Props {
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
}
function CheckBox({ name, checked, onChange, required = false }: Props) {
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
      <label htmlFor={id}>
        {name}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
    </div>
  );
}

export default CheckBox;
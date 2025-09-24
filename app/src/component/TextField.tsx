interface Props {
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean
}

function TextField({ name, value, onChange, required }: Props) {
  return (
    <div className="flex-horizontal">
      <label>{name}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TextField;
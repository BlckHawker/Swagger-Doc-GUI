interface Props {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

function TextField({ name, value, onChange }: Props) {
  return (
    <div className="flex-horizontal">
      <label>{name}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default TextField;
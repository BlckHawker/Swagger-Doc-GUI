interface Props {
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  required?: boolean
}

function TagsField({ name, value, onChange, required }: Props) {
  const id = `${name}-input`;

  return (
    <div className="flex-horizontal">
      <label htmlFor={id}>{name}
        {required && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        value={value.join(",")} // show tags as comma-separated string
        onChange={(e) => {
          const tags = e.target.value
            .split(",")
          onChange(tags);
        }}
      />
    </div>
  );
}

export default TagsField;

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
        value={value.join(", ")} // show tags as comma-separated string
        onChange={(e) => {
          // split by comma, trim whitespace, filter out empty strings
          const tags = e.target.value
            .split(",")
            .map((t) => t.trim())
            .filter((t) => t.length > 0);
          onChange(tags);
        }}
      />
    </div>
  );
}

export default TagsField;

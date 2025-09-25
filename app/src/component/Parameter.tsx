import CheckBox from "./CheckBox";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
import TextField from "./TextField";
import { ParameterData } from "../interfaces";
import Schema from "./Schema";

interface Props {
  index: number,
  data: ParameterData;
  onChange: (data: ParameterData) => void;
  onDelete: () => void;
}

function Parameter({ index, data, onChange, onDelete }: Props) {
  return (
    <fieldset>
      <legend>{"Parameter " + (index + 1)}</legend>

      <AutoCompleteDropdown
        name="In"
        options={["path", "query"]}
        value={data.in}
        onChange={(v) => onChange({ ...data, in: v })}
        required={true}
      />

      <TextField
        name="Name"
        value={data.name}
        onChange={(v: any) => onChange({ ...data, name: v })}
        required={true}

      />

      <CheckBox
        name="Required"
        checked={data.required}
        onChange={(v) => onChange({ ...data, required: v })}
      />

      <TextField
        name="Description"
        value={data.description}
        onChange={(v: any) => onChange({ ...data, description: v })}
      />

      <Schema/>

      <TextField
        name="Example"
        value={data.example}
        onChange={(v: any) => onChange({ ...data, example: v })}
      />

      <button type="button" onClick={onDelete}>
        Delete Parameter
      </button>
    </fieldset>
  );
}

export default Parameter;

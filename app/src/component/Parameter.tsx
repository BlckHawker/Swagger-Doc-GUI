import CheckBox from "./CheckBox";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import { ParameterData } from "../interfaces";

interface Props {
  data: ParameterData;
  onChange: (data: ParameterData) => void;
  onDelete: () => void;
}

function Parameter({ data, onChange, onDelete }: Props) {
  return (
    <fieldset>
      <legend>Parameter</legend>

      <Dropdown
        name="In"
        options={["path", "query"]}
        value={data.in}
        onChange={(v) => onChange({ ...data, in: v })}
      />

      <Dropdown
        name="Type"
        options={["Array", "Boolean", "Number", "Object", "String"]}
        value={data.type}
        onChange={(v) => onChange({ ...data, type: v })}
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

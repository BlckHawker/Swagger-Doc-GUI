import CheckBox from "./CheckBox";
import TextField from "./TextField";
import { PropertyData } from "../interfaces";

interface Props {
    index: number,
    data: PropertyData;
    onChange: (data: PropertyData) => void;
    onDelete: () => void;
}

function Property({ index, data, onChange, onDelete }: Props) {
    return (
        <fieldset>
            <legend>{"Property " + (index + 1)}</legend>

            <TextField
                name="Name"
                value={data.name ?? ""}
                onChange={(v: any) => onChange({ ...data, name: v })}
                required={true}
            />

            <TextField
                name="Description"
                value={data.description ?? ""}
                onChange={(v: any) => onChange({ ...data, description: v })}
            />

            <CheckBox
                name="Required"
                checked={data.required ?? false}
                onChange={(v) => onChange({ ...data, required: v })}
            />

            <CheckBox
                name="Depreciated"
                checked={data.deprecated ?? false}
                onChange={(v) => onChange({ ...data, deprecated: v })}
            />
            <CheckBox
                name="Read Only"
                checked={data.readOnly ?? false}
                onChange={(v) => onChange({ ...data, readOnly: v })}
            />

            <CheckBox
                name="Write Only"
                checked={data.writeOnly ?? false}
                onChange={(v) => onChange({ ...data, writeOnly: v })}
            />


            <button type="button" onClick={onDelete}>
                Delete Property
            </button>
        </fieldset>
    );
}

export default Property;

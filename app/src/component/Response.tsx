import CheckBox from "./CheckBox";
import TextField from "./TextField";
import { PropertyData, ResponseData } from "../interfaces";
import Dropdown from "./Dropdown";

interface Props {
    httpStatusDescriptions: Record<number, string>
    index: number,
    data: ResponseData;
    onChange: (data: ResponseData) => void;
    onDelete: () => void,
}

function Response({ index, data, onChange, onDelete, httpStatusDescriptions }: Props) {
    return (
        <fieldset>
            <legend>{"Response " + (index + 1)}</legend>

            <Dropdown
                name={"Status Code"}
                options={getStatusCodeOptions(httpStatusDescriptions)}
                value={`${data.statusCode} (${httpStatusDescriptions[data.statusCode]})`}
                onChange={(v: any) => onChange({ ...data, statusCode: Number(v.split(" ")[0].trim()) })}
                required={true}
            />

            <TextField
                name="Description"
                value={data.description}
                onChange={(v: any) => onChange({ ...data, description: v })}
                required={true}
            />

            <button type="button" onClick={onDelete}>
                Delete Response
            </button>
        </fieldset>
    );
}

function getStatusCodeOptions(httpStatusDescriptions: Record<number, string>) {
    const arr: string[] = [];
    for (const [key, value] of Object.entries(httpStatusDescriptions)) {
        arr.push(`${key} (${value})`)
    }

    return arr;
}

export default Response;

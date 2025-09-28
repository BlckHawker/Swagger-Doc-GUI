import CheckBox from "./CheckBox";
import TextField from "./TextField";
import { PropertyData, ResponseData } from "../interfaces";
import Dropdown from "./Dropdown";
import { useState } from "react";

interface Props {
    httpStatusDescriptions: Record<number, string>
    index: number,
    data: ResponseData;
    onChange: (data: ResponseData) => void;
    onDelete: () => void,
}

function Response({ index, data, onChange, onDelete, httpStatusDescriptions }: Props) {
    const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
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

            <fieldset>
              <legend>Content</legend>
              <Dropdown
                name={"Content Type"}
                options={["", "application/json"]}
                value={selectedContentType ?? ""}
                onChange={(v) => {
                  setSelectedContentType(v);
                  updateResponseContentType(v, data, onChange);
                }} />
            </fieldset>

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

const updateResponseContentType = (
  selectedType: string,
  response: ResponseData,
  onChange: (updated: ResponseData) => void
) => {
  if (selectedType === "") {
    // User cleared selection → remove content
    onChange({ ...response, content: {} });
  } else {
    // Ensure schema exists for the selected content type
    onChange({
      ...response,
      content: {
        ...response.content,
        [selectedType]: response.content?.[selectedType] ?? {
          schema: { type: "object", properties: {} },
        },
      },
    });
  }
};

export default Response;

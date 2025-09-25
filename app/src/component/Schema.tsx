import {SchemaType} from "../interfaces"
import { useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
function Schema() {
    const [schemaType, setSchemaType] = useState<SchemaType>({
    type: "string",
  });
  return (
        <fieldset>
            <legend>Schema</legend>
            <Dropdown
        name="Type"
        options={["string", "number", "integer", "boolean", "array", "object"]}
        value={schemaType.type}
        onChange={(v) =>
          setSchemaType(changeSchemaType(v as SchemaType["type"]))
        }
        required={true}

       
      />
       {schemaType.type === "string" && 
        <TextField 
        name="format"
        value={schemaType.format ?? ""}
        onChange={(value) =>
            setSchemaType(prev => ({
            ...prev,
            format: value
            }))
  }
/>
       }
      <pre>{JSON.stringify(schemaType, null, 2)}</pre>
        </fieldset>
      
  );

  
}

const changeSchemaType = (type: SchemaType["type"]): SchemaType => {
        switch (type) {
        case "string":
        return { type: "string" }
        case "number":
        return { type: "number" }
        case "integer":
        return { type: "integer" }
        case "boolean":
        return { type: "boolean" }
        case "array":
        return { type: "array", items: [] }
        case "object":
        return { type: "object", properties: {} }
        default:
            return { type: "string" }
    }
  }

export default Schema;

import { SchemaType } from "../interfaces"
import { useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import TagsField from "./TagsField";
import CheckBox from "./CheckBox";
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
        (
          <>
            <TextField
              name="format"
              value={schemaType.format ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  format: v
                }))} />
            <TagsField
              name={"enum"}
              value={schemaType.enum ?? []}
              onChange={(v) => setSchemaType(prev => ({
                ...prev,
                enum: v
              }))} />

            <TextField
              name="pattern"
              value={schemaType.pattern ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  pattern: v
                }))} />

            <TextField
              name="minLength"
              value={schemaType.minLength?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  minLength: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

            <TextField
              name="maxLength"
              value={schemaType.maxLength?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  maxLength: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

          </>)}

      {(schemaType.type === "number" || schemaType.type === "integer") &&
        <>
        <TextField
              name="minimum"
              value={schemaType.minimum?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  minimum: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

            <TextField
              name="maximum"
              value={schemaType.maximum?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  maximum: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

            <TextField
              name="exclusiveMinimum"
              value={schemaType.exclusiveMinimum?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  exclusiveMinimum: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

            <TextField
              name="exclusiveMaximum"
              value={schemaType.exclusiveMaximum?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  exclusiveMaximum: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />

            <TextField
              name="multipleOf"
              value={schemaType.multipleOf?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  multipleOf: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />
        </>
      }

      {schemaType.type === "array" && 
        <>
        <Dropdown
        name="items"
        options={["string", "number", "integer", "boolean", "object"]}
        value={schemaType.items}
        onChange={(v) =>
          setSchemaType(prev => ({
                  ...prev,
                  items: v
                }))
        }
        required={true}
      />
      <TextField
              name="minItems"
              value={schemaType.minItems?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  minItems: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />
            <TextField
              name="maxItems"
              value={schemaType.maxItems?.toString() ?? ""}
              onChange={(v) =>
                setSchemaType(prev => ({
                  ...prev,
                  maxItems: v === "" ? undefined : Number(v)
                }))
              }
              type="number"
            />
            <CheckBox
        name="uniqueItems"
        checked={schemaType.uniqueItems ?? false}
        onChange={(v: any) =>
                setSchemaType(prev => ({
                  ...prev,
                  uniqueItems: v
                }))
              }
      />

            
        </>
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
      return { type: "array", items: "string" }
    case "object":
      return { type: "object", properties: {} }
    default:
      return { type: "string" }
  }
}

export default Schema;

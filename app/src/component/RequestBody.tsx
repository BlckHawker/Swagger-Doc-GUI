import { PropertyData, RequestBodyData, SchemaType } from "../interfaces"
import { SetStateAction, useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import CheckBox from "./CheckBox";
import PropertiesManager from "./PropertiesManager";
interface Props {
  requestBodyData: RequestBodyData | null,
  setRequestBodyData: React.Dispatch<SetStateAction<RequestBodyData | null>>
}
function RequestBody({requestBodyData, setRequestBodyData}: Props) {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  const [selectedContentType, setSelectedContentType] = useState<string | null>(null);
  const defaultRequestBodyData: RequestBodyData = {
    required: false,
    content: {}
  }
  return (
    <>
      {showComponent ?
        <>
          <fieldset>
            <legend>{"Request Body"}</legend>
            <CheckBox
              name={"Required"}
              checked={requestBodyData!.required}
              onChange={(v: any) => setRequestBodyData({ ...requestBodyData!, required: v })}
              required={true}
            />
            <TextField
              name={"Description"}
              value={requestBodyData!.description ?? ""}
              onChange={(v: any) => setRequestBodyData({ ...requestBodyData!, description: v })} />
            <fieldset>
              <legend>Content</legend>
              <Dropdown
                name={"Content Type"}
                options={["", "application/json"]}
                value={selectedContentType ?? ""}
                onChange={(v) => {
                  setSelectedContentType(v);
                  updateContentType(v, requestBodyData!, setRequestBodyData);
                }} />
            </fieldset>
            <button onClick={() => { setShowComponent(false); setRequestBodyData(null); }}>Remove Request Body</button>
            <>
              {selectedContentType !== null ?
                <>

                  <PropertiesManager
                    properties={getSchemaPropertiesArray(requestBodyData, selectedContentType)}

                    setProperties={(newProps) =>
                      setRequestBodyData((prev) => updateRequestBodyWithProperties(prev, newProps))
                    }
                    contentType={selectedContentType ?? ""}
                  />
                </>
                :
                <>
                </>
              }
            </>
          </fieldset>
        </>

        :
        <>
          <button onClick={() => { setShowComponent(true); setRequestBodyData(defaultRequestBodyData); }}>Add Request Body</button>
        </>
      }

    </>
  );

  // Updates requestBodyData with new property array
  function updateRequestBodyWithProperties(
  requestBodyData: RequestBodyData | null,
  newProps: PropertyData[]
): RequestBodyData | null {
  if (!requestBodyData) return requestBodyData;
  const contentType = selectedContentType;
  if (!contentType) return requestBodyData;

  const propertiesObj = propertyArrayToObject(newProps);
  const requiredNames = newProps.filter(p => p.required).map(p => p.name);

  const newSchema: any = {
    type: "object",
    properties: propertiesObj,
  };

  if (requiredNames.length > 0) {
    newSchema.required = requiredNames;
  }

  return {
    ...requestBodyData,
    content: {
      ...requestBodyData.content,
      [contentType]: {
        ...requestBodyData.content[contentType],
        schema: newSchema as SchemaType,
      },
    },
  };
}

}

// Converts PropertyData[] -> Record<string, SchemaType>
// preserves description, deprecated, readOnly, writeOnly, example by copying them into the property schema
const propertyArrayToObject = (properties: PropertyData[]): Record<string, SchemaType> => {
  return properties.reduce((acc, prop) => {
    const { name, schema, description, example, deprecated, readOnly, writeOnly } = prop;

    // Merge metadata into the schema object so it persists in OpenAPI format
    const merged = {
      ...schema,
      // only add the optional fields if present
      ...(description !== undefined ? { description } : {}),
      ...(example !== undefined ? { example } : {}),
      ...(deprecated !== undefined ? { deprecated } : {}),
      ...(readOnly !== undefined ? { readOnly } : {}),
      ...(writeOnly !== undefined ? { writeOnly } : {}),
    };

    acc[name] = merged as SchemaType;
    return acc;
  }, {} as Record<string, SchemaType>);
};

// Converts Record<string, SchemaType> -> PropertyData[]
// reads metadata out of each property schema and uses the parent's required list for per-property required flag
const propertyObjectToArray = (
  obj: Record<string, SchemaType>,
  requiredList: string[] = []
): PropertyData[] => {
  return Object.entries(obj).map(([name, schema]) => {
    const s = schema as any; // use any to access metadata fields that your union might not list
    return {
      name,
      schema,
      required: requiredList.includes(name),
      description: s.description,
      example: s.example,
      deprecated: s.deprecated,
      readOnly: s.readOnly,
      writeOnly: s.writeOnly,
    } as PropertyData;
  });
};

// Safe getter: returns PropertyData[] from requestBodyData if schema exists and is an object
function getSchemaPropertiesArray(
  requestBodyData: RequestBodyData | null,
  selectedContentType: string | null
): PropertyData[] {
  if (
    !selectedContentType ||
    !requestBodyData?.content[selectedContentType]?.schema
  ) return [];

  const schema = requestBodyData.content[selectedContentType].schema;

  // Narrow to object
  if (schema.type !== "object" || !("properties" in schema)) return [];

  const propsObj = (schema as any).properties as Record<string, SchemaType>;
  const requiredList = (schema as any).required ?? [];

  return propertyObjectToArray(propsObj, requiredList);
}






const updateContentType = (
  selectedType: string,
  requestBodyData: RequestBodyData,
  setRequestBodyData: React.Dispatch<React.SetStateAction<RequestBodyData | null>>
) => {
  if (selectedType === "") {
    // User cleared selection
    setRequestBodyData({ ...requestBodyData, content: {} });
  } else {
    // Ensure schema exists for the selected content type
    setRequestBodyData({
      ...requestBodyData,
      content: {
        [selectedType]:
          requestBodyData.content[selectedType] ?? {
            schema: { type: "object", properties: {} }
          }
      }
    });
  }
}


export default RequestBody;

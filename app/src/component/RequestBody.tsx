import { PropertyData, RequestBodyData, SchemaType } from "../interfaces"
import { SetStateAction, useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import TagsField from "./TagsField";
import CheckBox from "./CheckBox";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
import PropertiesManager from "./PropertiesManager";
function RequestBody() {
  const [showComponent, setShowComponent] = useState<boolean>(false)
  const [requestBodyData, setRequestBodyData] = useState<RequestBodyData | null>(null);
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
            <pre>{JSON.stringify(requestBodyData, null, 2)}</pre>
            <>
              {selectedContentType !== null ?
                <>

                  <PropertiesManager
                    properties={getSchemaPropertiesArray(requestBodyData, selectedContentType)}

                    setProperties={(newProps) =>
                      setRequestBodyData((prev) => updateRequestBodyWithProperties(prev, newProps))
                    }
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

    return {
      ...requestBodyData,
      content: {
        ...requestBodyData.content,
        [contentType]: {
          ...requestBodyData.content[contentType],
          schema: {
            type: "object",
            properties: propertyArrayToObject(newProps),
          },
        },
      },
    };
  }
}

// Converts PropertyData[] → object keyed by name
const propertyArrayToObject = (properties: PropertyData[]): Record<string, SchemaType> => {
  return properties.reduce((acc, prop) => {
    acc[prop.name] = prop.schema;
    return acc;
  }, {} as Record<string, SchemaType>);
}

// Converts object keyed by property name → PropertyData[]
const propertyObjectToArray = (obj: Record<string, SchemaType>): PropertyData[] => {
  return Object.entries(obj).map(([name, schema]) => ({
    name,
    schema,
  }));
};

// get properties array from requestBodyData
function getSchemaPropertiesArray(
  requestBodyData: RequestBodyData | null,
  selectedContentType: string | null
): PropertyData[] {
  if (
    !selectedContentType ||
    !requestBodyData?.content[selectedContentType]?.schema
  ) return [];

  const schema = requestBodyData.content[selectedContentType].schema;

  // Type narrowing: only proceed if schema is an object
  if (schema.type !== "object" || !("properties" in schema)) return [];

  return propertyObjectToArray(schema.properties);
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

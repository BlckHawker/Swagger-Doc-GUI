import { useState } from "react";
import Parameter from "./Parameter";
import { ParameterData, PropertyData } from "../interfaces";
import Property from "./Property";

const schemaTypes = ["string", "number", "integer", "boolean", "array", "object"];

interface Props {
  properties: PropertyData[];
  setProperties: (props: PropertyData[]) => void;
  contentType: string
}

function PropertyManager({properties, setProperties, contentType}: Props) {
  const addProperty = () => {
    const newProperties = [
      ...properties,
      { name: "", schema: { type: "string" } } as PropertyData,
    ]
    console.log(newProperties)
    setProperties(newProperties);
  };

  const updateProperty = (index: number, updated: PropertyData) => {
    const newProps = [...properties];
    newProps[index] = updated;
    setProperties(newProps);
  };

  const deleteProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  return (
    <>
      {properties.map((prop, index) => (
        <Property
          index={index}
          key={index}
          data={prop}
          onChange={(updated) => updateProperty(index, updated)}
          onDelete={() => deleteProperty(index)}
        />
      ))}

      {}
      <button hidden={contentType === ""} onClick={addProperty}>Add Property</button>
    </>
  );
}



export default PropertyManager;

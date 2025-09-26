import { useState } from "react";
import Parameter from "./Parameter";
import { ParameterData, PropertyData } from "../interfaces";
import Property from "./Property";

const schemaTypes = ["string", "number", "integer", "boolean", "array", "object"];

interface Props {
  properties: PropertyData[];
  setProperties: (props: PropertyData[]) => void;
}

function PropertyManager({properties, setProperties}: Props) {
  const addProperty = () => {
    setProperties([
      ...properties,
      { name: "", schema: { type: "string" } },
    ]);
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
    <div>
      {properties.map((prop, index) => (
        <Property
          index={index}
          key={index}
          data={prop}
          onChange={(updated) => updateProperty(index, updated)}
          onDelete={() => deleteProperty(index)}
        />
      ))}

      
      <button onClick={addProperty}>Add Property</button>
    </div>
  );
}



export default PropertyManager;

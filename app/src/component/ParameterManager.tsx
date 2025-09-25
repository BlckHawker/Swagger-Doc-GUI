import { useState } from "react";
import Parameter from "./Parameter";
import { ParameterData } from "../interfaces";

  interface Props {
    parameters: ParameterData[],
    setParameters: React.Dispatch<React.SetStateAction<ParameterData[]>>

  }
function ParameterManager({parameters, setParameters}: Props) {
  const addParameter = () => {
    setParameters([
      ...parameters,
      { in: "", name: "", type: "", required: false, description: "", example: "" },
    ]);
  };

  const updateParameter = (index: number, updated: ParameterData) => {
    const newParams = [...parameters];
    newParams[index] = updated;
    setParameters(newParams);
  };

  const deleteParameter = (index: number) => {
    setParameters(parameters.filter((_, i) => i !== index));
  };

  return (
    <div>
      {parameters.map((param, index) => (
        <Parameter
          index={index}
          key={index}
          data={param}
          onChange={(updated) => updateParameter(index, updated)}
          onDelete={() => deleteParameter(index)}
        />
      ))}
      <button onClick={addParameter}>Add Parameter</button>
    </div>
  );
}

export default ParameterManager;

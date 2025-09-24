import { useState } from "react";
import Parameter from "./Parameter";
import { ParameterData } from "../interfaces";

function ParameterManager() {
  const [parameters, setParameters] = useState<ParameterData[]>([]);

  const addParameter = () => {
    setParameters([
      ...parameters,
      { in: "", type: "", required: false, description: "", example: "" },
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
      <pre>{JSON.stringify(parameters, null, 2)}</pre>
      <button onClick={addParameter}>Add Parameter</button>
    </div>
  );
}

export default ParameterManager;

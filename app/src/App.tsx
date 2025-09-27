import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'
import { EndpointData, ParameterData } from "./interfaces";
import { useState } from "react";
import RequestBody from "./component/RequestBody";

function App() {
  const methodOptions = ["GET", "PUT", "POST", "DELETE", "PATCH"];
  const inOptions = ["path", "query"]
  const [endpointData, setEndpointData] = useState<EndpointData>({path: "",
    method: "",
    summary: "",
    description: "",
    tags: []})

  const [parametersData, setParametersData] = useState<ParameterData[]>([]);
  const [endpointErrors, setEndpointErrors] = useState<string[]>([]);
  const [parameterErrors, setParameterErrors] = useState<string[]>([]);


  return (
    <div className="flex-vertical">
      <Endpoint methodOptions={methodOptions} data={endpointData} onChange={(updated: EndpointData) => setEndpointData(updated)} />
      <ParameterManager parameters={parametersData} setParameters={setParametersData} inOptions={inOptions}/>
      <RequestBody/>
      <button onClick={() => validateData()}>Generate</button>
      <p>Endpoint</p>
      <pre>{JSON.stringify(endpointData, null, 2)}</pre>
      <p>Parameters</p>
      <pre>{JSON.stringify(parametersData, null, 2)}</pre>

      <>
      {renderErrorList("endpoint", endpointErrors)}
      {renderErrorList("parameters", parameterErrors)}

      </>

    </div>
  );

  function validateData () {
    validateEndpoint();
    validateParameters();
  }

  function validateEndpoint () {
    const errors = [];

    if(!endpointData.path.trim()) {
      errors.push("path can't be empty")
    }

    const method = endpointData.method.trim();
    if(!methodOptions.includes(method.toUpperCase())) {
      errors.push(`"${method}" is not a valid method`)
    }
    setEndpointErrors(errors);
  }

  function validateParameters() {

    const errors=[];
    for(let i = 0; i < parametersData.length; i++) {
      const parameter = parametersData[i];
      const pStr = `in parameter ${i + 1}`
    const inValue = parameter.in.trim();

    if(!inOptions.includes(inValue.toLocaleLowerCase())) {
      errors.push(`"${inValue}" is not a valid in ${pStr}`)

    }

    if(!parameter.name.trim()) {
      errors.push(`name can't be empty ${pStr}`)
    }


    }

    setParameterErrors(errors);

    
    
  }

    function renderErrorList(name: string, errors: string[]) {
  if (errors.length === 0) return null;

  return (
    <>
      <p style={{ color: "red" }}>
        The following errors are in the {name}
      </p>
      <ul>
        {errors.map((err, index) => (
          <li key={index} style={{ color: "red" }}>
            {err}
          </li>
        ))}
      </ul>
    </>
  );
}




  
}



export default App;

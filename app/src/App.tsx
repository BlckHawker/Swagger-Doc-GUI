import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'
import { EndpointData, ParameterData } from "./interfaces";
import { useState } from "react";
import RequestBody from "./component/RequestBody";

function App() {
  const methodOptions = ["GET", "PUT", "POST", "DELETE", "PATCH"];
  const [endpointData, setEndpointData] = useState<EndpointData>({path: "",
    method: "",
    summary: "",
    description: "",
    tags: []})

  const [parametersData, setParametersData] = useState<ParameterData[]>([]);
  const [endpointErrors, setEndpointErrors] = useState<string[]>([]);

  return (
    <div className="flex-vertical">
      <Endpoint methodOptions={methodOptions} data={endpointData} onChange={(updated: EndpointData) => setEndpointData(updated)} />
      <ParameterManager parameters={parametersData} setParameters={setParametersData}/>
      <RequestBody/>
      <button onClick={() => validateData()}>Generate</button>
      <p>Endpoint</p>
      <pre>{JSON.stringify(endpointData, null, 2)}</pre>
      <p>Parameters</p>
      <pre>{JSON.stringify(parametersData, null, 2)}</pre>

      <>
      {renderErrorList("endpoint", endpointErrors)}
      </>

    </div>
  );

  function validateData () {
    validateEndpoint();
  }

  function validateEndpoint () {
    const errors = [];

    if(!endpointData.path.trim()) {
      errors.push("path can't be empty")
    }
    //method can't be empty (and must be one of the valid strings)
    const method = endpointData.method.trim();
    if(!methodOptions.includes(method.toUpperCase())) {
      errors.push(`"${method}" is not a valid method`)
    }
    setEndpointErrors(errors);
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

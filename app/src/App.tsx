import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'
import { EndpointData, ParameterData } from "./interfaces";
import { SetStateAction, useState } from "react";
import RequestBody from "./component/RequestBody";

function App() {
  const [endpointData, setEndpointData] = useState<EndpointData>({path: "",
    method: "",
    summary: "",
    description: "",
    tags: []})

  const [parametersData, setParametersData] = useState<ParameterData[]>([]);

  return (
    <div className="flex-vertical">
      <Endpoint data={endpointData} onChange={(updated: EndpointData) => setEndpointData(updated)} />
      <ParameterManager parameters={parametersData} setParameters={setParametersData}/>
      <RequestBody/>
      <button>Generate</button>
      <p>Endpoint</p>
      <pre>{JSON.stringify(endpointData, null, 2)}</pre>
      <p>Parameters</p>
      <pre>{JSON.stringify(parametersData, null, 2)}</pre>
    </div>
  );

  const validateData = () => {

  }

  const validateEndpoint = () => {
    //todo path can't be empty
    //todo Summary can't be empty
  }
}

export default App;

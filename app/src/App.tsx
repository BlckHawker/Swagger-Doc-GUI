import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'
import { EndpointData } from "./interfaces";
import { useState } from "react";

function App() {
  const [endpointData, setEndpointData] = useState<EndpointData>({path: "",
    method: "",
    summary: "",
    description: "",
    tags: []})
  return (
    <div className="flex-vertical">
      <Endpoint data={endpointData} onChange={(updated: EndpointData) => setEndpointData(updated)} />
      <ParameterManager/>
      <button>Generate</button>
    </div>
  );
}

export default App;

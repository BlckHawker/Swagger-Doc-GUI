import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import Parameter from "./component/Parameter";
import './main.css'

function App() {
  return (
    <div className="flex-vertical">
      <Endpoint/>
      <Parameter/>
      <ParameterManager/>
      <button>Generate</button>
    </div>
  );
}

export default App;

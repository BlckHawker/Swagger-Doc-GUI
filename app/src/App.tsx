import Endpoint from "./component/Endpoint"
import ParameterManager from "./component/ParameterManager";
import './main.css'

function App() {
  return (
    <div className="flex-vertical">
      <Endpoint/>
      <ParameterManager/>
      <button>Generate</button>
    </div>
  );
}

export default App;

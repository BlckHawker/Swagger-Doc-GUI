import '../main.css'
import Dropdown from './Dropdown';
function Endpoint() {
  return (
    
    <fieldset >
  <legend>Endpoint</legend>
    <div className="flex-horizontal">
        <p>Path:</p>
        <input type="text" />
    </div>
    <Dropdown
  name="Methods"
  options={["DELETE", "GET", "PATCH", "POST", "PUT"]}
/>
<div className="flex-horizontal">
        <p>Summary:</p>
        <input type="text" />
    </div>
    <div className="flex-horizontal">
        <p>Description:</p>
        <input type="text" />
    </div>
    <div className="flex-horizontal">
        <p>Tags:</p>
        <input type="text" />
    </div>
</fieldset>
  );
}

export default Endpoint;
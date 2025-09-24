import '../main.css'
import Dropdown from './Dropdown';
import TextField from './TextField';
function Endpoint() {
  return (
    
    <fieldset >
  <legend>Endpoint</legend>
    <div className="flex-horizontal">
        <p>Path:</p>
        <input type="text" />
    </div>
    {/* <Dropdown
  name="Methods"
  options={["DELETE", "GET", "PATCH", "POST", "PUT"]}
/> */}
{/* <TextField
  name="Summary"
/>
<TextField
  name="Description"
/>
<TextField
  name="Tags"
/> */}
</fieldset>
  );
}

export default Endpoint;
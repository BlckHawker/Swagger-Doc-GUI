import '../main.css'
function Endpoint() {
  return (
    <fieldset >
  <legend>Endpoint</legend>
    <div className="flex-horizontal">
        <p>Path:</p>
        <input type="text" />
    </div>
          <div className="flex-horizontal">
    <label htmlFor="method-input">Method:</label>
    <input list="methods" name="method-input" />
    <datalist id="methods">
      <option value="DELETE" />
      <option value="GET" />
      <option value="PATCH" />
      <option value="POST" />
      <option value="PUT" />
    </datalist>
  </div>
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
    
    // <div className="flex-vertical border">
    //     <p>Endpoint</p>
    //     <div className="flex-horizontal">
    //         <p>Path:</p>
    //         <input type="text" />
    //     </div>
    //         <div className="flex-horizontal">
    //   <label htmlFor="method-input">Method:</label>
    //   <input list="methods" name="method-input" />
    //   <datalist id="methods">
    //     <option value="DELETE" />
    //     <option value="GET" />
    //     <option value="PATCH" />
    //     <option value="POST" />
    //     <option value="PUT" />
    //   </datalist>
    // </div>
    // <div className="flex-horizontal">
    //         <p>Summary:</p>
    //         <input type="text" />
    //     </div>
    //     <div className="flex-horizontal">
    //         <p>Description:</p>
    //         <input type="text" />
    //     </div>
    //     <div className="flex-horizontal">
    //         <p>Tags:</p>
    //         <input type="text" />
    //     </div>
    // </div>
  );
}

export default Endpoint;
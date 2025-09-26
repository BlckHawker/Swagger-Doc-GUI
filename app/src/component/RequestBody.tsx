import { RequestBodyData, SchemaType } from "../interfaces"
import { useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import TagsField from "./TagsField";
import CheckBox from "./CheckBox";
function RequestBody() {
    const [showComponent, setShowComponent] = useState<boolean>(false)
    const [requestBodyData, setRequestBodyData] = useState<RequestBodyData|null>(null);
    const defaultRequestBodyData: RequestBodyData = {
      required: false,
      content: {}
    }
  return (
    <>
    {showComponent ?  
    <>
    <fieldset>
      <legend>{"Request Body"}</legend>
      <TextField 
      name={"Description"} 
      value={requestBodyData?.description ?? ""} 
      onChange={(v: any) => setRequestBodyData({ ...requestBodyData!, description: v })}/>
    <button onClick={() => {setShowComponent(false); setRequestBodyData(null); }}>Remove Request Body</button>
     <pre>{JSON.stringify(requestBodyData, null, 2)}</pre>
    </fieldset>
    </>
    
     : 
     <>
     <button onClick={() => {setShowComponent(true); setRequestBodyData(defaultRequestBodyData);}}>Add Request Body</button>
     </>
     }
     
    </>
  );


}

export default RequestBody;

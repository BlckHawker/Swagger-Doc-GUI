import { RequestBodyData, SchemaType } from "../interfaces"
import { useState } from "react";
import Dropdown from "./Dropdown";
import TextField from "./TextField";
import TagsField from "./TagsField";
import CheckBox from "./CheckBox";
import AutoCompleteDropdown from "./AutoCompleteDropdown";
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
      <CheckBox 
      name={"Required"} 
      checked={requestBodyData!.required} 
      onChange={(v: any) => setRequestBodyData({ ...requestBodyData!, required: v })}
      required={true}
      />
      <TextField 
      name={"Description"} 
      value={requestBodyData!.description ?? ""} 
      onChange={(v: any) => setRequestBodyData({ ...requestBodyData!, description: v })}/>
    <fieldset>
        <legend>Content</legend>
        <Dropdown 
        name={"Content Type"} 
        options={["", "application/json"]} 
        value={Object.keys(requestBodyData!.content)[0]} 
        onChange={(v) => updateContentType(v, requestBodyData!, setRequestBodyData)}/>
    </fieldset>
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

const updateContentType = (
  selectedType: string,
  requestBodyData: RequestBodyData,
  setRequestBodyData: React.Dispatch<React.SetStateAction<RequestBodyData | null>>
) => {
  if (selectedType === "") {
    // User cleared selection
    setRequestBodyData({ ...requestBodyData, content: {} });
  } else {
    // Ensure schema exists for the selected content type
    setRequestBodyData({
      ...requestBodyData,
      content: {
        [selectedType]:
          requestBodyData.content[selectedType] ?? {
            schema: { type: "object", properties: {} }
          }
      }
    });
  }
}


export default RequestBody;

import '../main.css'
import AutoCompleteDropdown from './AutoCompleteDropdown';
import TextField from './TextField';
import {EndpointData} from '../interfaces'
import TagsField from './TagsField';
interface Props {
  methodOptions: string[]
  data: EndpointData;
  onChange: (data: EndpointData) => void;
}
function Endpoint({ data, onChange, methodOptions }: Props) {
  return (
    
    <fieldset >
  <legend>Endpoint</legend>

    <TextField
        name="Path"
        value={data.path}
        onChange={(v: any) => onChange({ ...data, path: v })}
        required={true}
      />

      <AutoCompleteDropdown 
      name={'Method'}
      options={methodOptions} 
      value={data.method}
      onChange={(v: any) => onChange({ ...data, method: v })}
      required={true}
      />
<TextField
        name="Summary"
        value={data.summary}
        onChange={(v: any) => onChange({ ...data, summary: v })}
      />
<TextField
        name="Description"
        value={data.description}
        onChange={(v: any) => onChange({ ...data, description: v })}
      />
      <TagsField name={'Tags'} value={data.tags} onChange={(v) => onChange({ ...data, tags: v })}/>
</fieldset>
  );
}

export default Endpoint;
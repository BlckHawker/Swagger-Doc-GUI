import '../main.css'
import Dropdown from './Dropdown';
import TextField from './TextField';
import {EndpointData} from '../interfaces'
import TagsField from './TagsField';
interface Props {
  data: EndpointData;
  onChange: (data: EndpointData) => void;
}
function Endpoint({ data, onChange }: Props) {
  return (
    
    <fieldset >
  <legend>Endpoint</legend>

    <TextField
        name="Path"
        value={data.path}
        onChange={(v: any) => onChange({ ...data, path: v })}
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
</fieldset>
  );
}

export default Endpoint;
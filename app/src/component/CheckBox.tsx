import '../main.css'
interface Props {
    name: string

}
function CheckBox({name}: Props) {
  return (
    <div className="flex-horizontal">
        <p>{name + ":"}</p>
        <input type="checkbox" />
    </div>
  );
}

export default CheckBox;
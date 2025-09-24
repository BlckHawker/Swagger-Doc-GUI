import '../main.css'
interface Props {
    name: string

}
function TextField({name}: Props) {
  return (
    <div className="flex-horizontal">
        <p>{name + ":"}</p>
        <input type="text" />
    </div>
  );
}

export default TextField;
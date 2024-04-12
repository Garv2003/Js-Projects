import useToggle from "./UseToggle";

export default function ToggleContainer() {
  const [value, toggleValue] = useToggle(false);

  return (
    <div>
      <p>Value: {value.toString()}</p>
      <button onClick={() => toggleValue()}>Toggle</button>
      <button onClick={() => toggleValue(true)}>Set to true</button>
      <button onClick={() => toggleValue(false)}>Set to false</button>
    </div>
  );
}
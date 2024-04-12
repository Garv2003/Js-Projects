import { useState } from "react";

type ToggleFunction = (value?: boolean) => void;

export default function useToggle(
  defaultValue: boolean
): [boolean, ToggleFunction] {
  const [value, setValue] = useState(defaultValue);

  const toggleValue: ToggleFunction = (newValue?: boolean) => {
    setValue((currentValue) =>
      typeof newValue === "boolean" ? newValue : !currentValue
    );
  };

  return [value, toggleValue];
}

import { useState } from "react";

export function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  return [
    values,
    function(event) {
      setValues({
        ...values,
        [event.target.id]: event.target.value
      });
    }
  ];
}
import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const updateState = <T extends StateType>(
  event: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  setState: Dispatch<SetStateAction<T>>
) => {
  const { name, value } = event.target;

  setState((prevState) => ({ ...prevState, [name]: value }));
};

//# region Imports

import { useState } from "react";

import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";

import { Eye, EyeSlash } from "@phosphor-icons/react";

//#endregion

export function InputPassword({
  value,
  valueChange,
  required,
}: InputPasswordProps) {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        name="password"
        value={value}
        placeholder="Insira sua senha..."
        required={required}
        onChange={(e) => valueChange(e)}
      />
      <InputRightElement>
        <IconButton
          onClick={handleClick}
          aria-label="Toggle password input"
          icon={show ? <Eye size={20} /> : <EyeSlash size={20} />}
        />
      </InputRightElement>
    </InputGroup>
  );
}

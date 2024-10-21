import { Text, Button } from "@chakra-ui/react";

export function AuthModeToggle({ mode, setMode }: AuthModeToggleProps) {
  return mode === "login" ? (
    <Text textAlign="center">
      Não possui uma conta?{" "}
      <Button
        colorScheme="primary"
        variant="link"
        onClick={() => setMode("register")}
      >
        Crie uma gratuitamente.
      </Button>
    </Text>
  ) : (
    <Text textAlign="center">
      Já possui conta?{" "}
      <Button
        colorScheme="primary"
        variant="link"
        onClick={() => setMode("login")}
      >
        Basta você logar então.
      </Button>
    </Text>
  );
}

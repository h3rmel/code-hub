import { useLoginModel } from "./model";
import { LoginView } from "./view";

export function Login() {
  const loginModel = useLoginModel();

  return <LoginView {...loginModel} />;
}

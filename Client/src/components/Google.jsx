import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleBtn } from "./GoogleBtn";
import { ClientId } from "../lib/contant";

export const Google = () => {
  // console.log(ClientId);
  return (
    <GoogleOAuthProvider clientId={ClientId}>
      <GoogleBtn />
    </GoogleOAuthProvider>
  );
};

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const GoogleBtn = () => {
  const responseGoogle = async (authResponse) => {
    try {
      const code = authResponse.code;
      console.log("code: ", code);
      const res = await axios.post(
        "http://localhost:5000/auth/google",
        {
          code,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return <button onClick={handleLogin}>Login with google</button>;
};

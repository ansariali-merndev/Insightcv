import { useGoogleLogin } from "@react-oauth/google";

export const GoogleBtn = () => {
  const responseGoogle = async (authResponse) => {
    try {
      const code = authResponse.code;
      console.log("code: ", code);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  return (
    <button
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
      onClick={handleLogin}
    >
      Login with google
    </button>
  );
};

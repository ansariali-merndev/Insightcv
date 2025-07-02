import { useGoogleLogin } from "@react-oauth/google";
import { FaGooglePlusG } from "react-icons/fa";
import { handleGoogle } from "../lib/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../context/userContext";

export const GoogleBtn = () => {
  const navigate = useNavigate();
  const { setIsAuthorized, setCheck } = UseUser();

  const responseGoogle = async (authResponse) => {
    try {
      const code = authResponse.code;
      console.log("code: ", code);

      const res = await handleGoogle({ code });

      if (!res.success) {
        Swal.fire({
          title: "Something went wrong",
        });
        return;
      }

      setIsAuthorized(true);
      setCheck((prev) => !prev);
      navigate("/");
      Swal.fire({
        title: "Logged In Successful",
        timer: 2000,
      });
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
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition flex justify-center items-center gap-2 cursor-pointer"
      onClick={handleLogin}
    >
      <FaGooglePlusG className="text-2xl" />
      <span>Continue with google</span>
    </button>
  );
};

import { useState } from "react";
import { Password } from "../components/Password";
import { Link, useNavigate } from "react-router-dom";
import { Google } from "../components/Google";
import { handleLogin } from "../lib/axios";
import Swal from "sweetalert2";
import { UseUser } from "../context/userContext";

export const SignIn = () => {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setIsAuthorized, setCheck } = UseUser();

  const handleUsername = (e) => {
    setLoginForm((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };

  const handlePass = (e) => {
    setLoginForm((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  const handlePassword = {
    confirmPass: false,
    name: "login_password",
    setPassword: handlePass,
    Password: loginForm.password,
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login detail: ", loginForm);

    const res = await handleLogin({
      username: loginForm.username,
      password: loginForm.password,
    });

    if (!res.success) {
      Swal.fire({
        title: "Credential Wrong",
        text: res.message,
        icon: "warning",
      });
      return;
    }

    setCheck((prev) => !prev);

    setIsAuthorized(true);

    setLoginForm({
      username: "",
      password: "",
    });

    navigate("/");
  };

  return (
    <section className="flex flex-col justify-center items-center py-12">
      <div className="py-8 px-14 rounded-2xl border border-gray-300 backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please enter your credentials to continue.
        </p>

        <form onSubmit={handleLoginFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              autoComplete="off"
              required
              value={loginForm.username}
              onChange={handleUsername}
              className="w-full px-3 py-2 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <Password value={handlePassword} />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Google />
      </div>

      <p>
        Don&apos;t have an account?{" "}
        <Link to={"/sign-up"} className="text-indigo-600">
          Register
        </Link>
      </p>
    </section>
  );
};

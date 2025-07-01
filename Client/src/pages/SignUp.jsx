import { useState } from "react";
import { Password } from "../components/Password";
import { Link } from "react-router-dom";
import { Google } from "../components/Google";

export const SignUp = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const passValue = {
    confirmPass: false,
    name: "RegisterPassword",
    setPassword: (e) => {
      setRegisterForm((prev) => {
        return {
          ...prev,
          password: e.target.value,
        };
      });
    },
    Password: registerForm.password,
  };

  const confirmPassValue = {
    confirmPass: true,
    name: "ConfirmRegisterPassword",
    setPassword: (e) => {
      setRegisterForm((prev) => {
        return {
          ...prev,
          confirmPassword: e.target.value,
        };
      });
    },
    Password: registerForm.confirmPassword,
  };

  const handleUsername = (e) => {
    setRegisterForm((prev) => {
      return {
        ...prev,
        username: e.target.value,
      };
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("register Form: ", registerForm);
    setRegisterForm({
      username: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <section className="flex flex-col justify-center items-center py-12">
      <div className="py-8 px-14 rounded-2xl border border-gray-300 backdrop-blur-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Fill in Your Details to Register.
        </p>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              autoComplete="off"
              value={registerForm.username}
              required
              onChange={handleUsername}
              placeholder="Enter username"
              className="w-full px-3 py-2 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <Password value={passValue} />
          <Password value={confirmPassValue} />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold transition"
          >
            Sign up
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
        Already have a account?{" "}
        <Link to={"/sign-in"} className="text-indigo-600">
          Login
        </Link>
      </p>
    </section>
  );
};

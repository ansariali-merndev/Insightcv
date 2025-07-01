import { useState } from "react";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

export const Password = ({ value }) => {
  const { confirmPass, name, setPassword, Password } = value;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={name} className="block font-medium mb-1">
        {confirmPass ? "Confirm Password" : "Password"}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id={name}
        name={name}
        autoComplete="off"
        value={Password}
        onChange={setPassword}
        required
        placeholder={confirmPass ? "Confirm your password" : "Enter password"}
        className="w-full px-3 py-2 bg-gray-100 rounded outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <span className="text-xl absolute top-10 right-2 cursor-pointer">
        {showPassword ? (
          <BiSolidHide onClick={() => setShowPassword(false)} />
        ) : (
          <BiSolidShow onClick={() => setShowPassword(true)} />
        )}
      </span>
    </div>
  );
};

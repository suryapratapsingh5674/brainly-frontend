import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_BASE_URL } from "../../config";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        { email, password, username },
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      console.log("erroe: ", err);
      setIsError(true);
      setLoginError("failed to register, try again");
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-200">
      <form
        autoComplete="off"
        onSubmit={submitHandler}
        className="flex pb-2 flex-col items-center relative gap-4 rounded-2xl justify-center h-[70vh] w-[40vw] bg-blue-300"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          id="email"
          className="w-[80%] border-2 border-white h-[10%] rounded-2xl p-2"
          placeholder="Enetr your name"
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[80%] border-2 border-white h-[10%] rounded-2xl p-2"
          placeholder="Enetr your email"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[80%] border-2 border-white h-[10%] rounded-2xl p-2"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="text-blue-200 bg-white px-6 py-3 cursor-pointer hover:bg-blue-300 transition-all hover:text-white mt-[2vh] rounded-2xl"
        >
          Submit
        </button>
        <p className="text-white mt-[2vh]">
          Already have account.{" "}
          <Link className="text-blue-400" to={"/login"}>
            Login insted
          </Link>
        </p>
        {isError && (
          <p className="text-red-500 absolute bottom-0 bg-red-200 px-6 py-4 rounded-2xl mt-2">
            {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;

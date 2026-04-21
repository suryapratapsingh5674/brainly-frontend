import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { API_BASE_URL } from "../../config";

const Login = () => {
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
        `${API_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true },
      );
      navigate("/");
    } catch (err) {
      console.log("erroe: ", err);
      setIsError(true);
      setLoginError("failed to login, try again or register first.");
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] bg-blue-200">
      <form
        autoComplete="off"
        onSubmit={(e) => submitHandler(e)}
        className="flex flex-col items-center gap-4 rounded-2xl justify-center h-[70vh] w-[40vw] bg-blue-300"
      >
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
        <label htmlFor="password" className="mt-[5vh]">
          Password
        </label>
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
        <p className="text-white mt-[10vh]">
          Don't have account.{" "}
          <Link className="text-blue-400" to={"/register"}>
            register first
          </Link>
        </p>
        {isError && (
          <p className="text-red-500 bg-red-200 px-6 py-4 rounded-2xl mt-4">
            {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;

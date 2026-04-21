import axios from "axios";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../config";

const Navbar = () => {
  const navigate = useNavigate();

  const logoutHnadler = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar z-50 w-[80vw] h-[8vh] mt-[3vh] absolute top-1 justify-between rounded-4xl flex items-center px-6 text-white">
      <h3 className="font-bold text-2xl">Brainly</h3>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => navigate("/create")}
          className=" bg-white text-blue-200 px-4 py-2 rounded-2xl hover:bg-blue-400 cursor-pointer transition-all hover:text-white"
        >
          Create Note
        </button>
        <button
          onClick={logoutHnadler}
          className=" bg-white text-blue-200 px-4 py-2 rounded-2xl hover:bg-blue-400 cursor-pointer transition-all hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

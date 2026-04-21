import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router";
import { API_BASE_URL } from "../../config";

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getnotes() {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/content/`, {
          withCredentials: true,
        });
        setNotes(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    getnotes();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/content/${id}`, {
        withCredentials: true,
      });
      const res = await axios.get(`${API_BASE_URL}/api/content/`, {
        withCredentials: true,
      });
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const shareHandler = async (id) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/content/share`,
        { contentId: id },
        { withCredentials: true },
      );
      console.log(res);
      alert(
        `Copy link to share : http://localhost:5173/share/${res.data.link.hash}`,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh] relative bg-blue-200">
      <Navbar />
      <div className="cardbox h-[80vh] w-[80vw] overflow-x-hidden overflow-y-scroll scrollbar-hide flex items-start justify-start gap-2 p-4 mt-[12vh] rounded-2xl">
        {notes.length < 1 ? (
          <h3 className="text-blue-300">
            Create a notes to start showing here.
          </h3>
        ) : (
          notes.map((item) => (
            <div
              key={item._id}
              className="h-[25vh] flex flex-col items-start justify-start gap-1 overflow-x-hidden overflow-y-scroll scrollbar-hide relative p-4 text-white w-[25vw] rounded-2xl bg-blue-200"
            >
              <h1>
                <span className="text-blue-400 font-bold">Title: </span>
                {item.title}
              </h1>
              <h1>
                <span className="text-blue-400 font-bold">Type: </span>
                {item.type}
              </h1>
              <h1>
                <span className="text-blue-400 font-bold">Link: </span>
                <Link target="_blank" to={item.link}>
                  {item.link}
                </Link>
              </h1>
              <div className=" absolute bottom-2 right-2 flex items-center justify-center gap-2">
                <button
                  onClick={() => {
                    shareHandler(item._id);
                  }}
                  className="bg-white text-blue-200 px-2 rounded-2xl cursor-pointer hover:bg-blue-400 transition-all hover:text-white py-1"
                >
                  Share
                </button>
                <button
                  onClick={() => {
                    deleteHandler(item._id);
                  }}
                  className="bg-white text-blue-200 px-2 rounded-2xl cursor-pointer hover:bg-blue-400 transition-all hover:text-white py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

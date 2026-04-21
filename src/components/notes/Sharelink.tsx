import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_BASE_URL } from "../../config";

type SharedNote = {
  _id: string;
  title: string;
  type: string;
  link: string;
};

const Sharelink = () => {
  const { sharehash } = useParams();

  const [note, setNote] = useState<SharedNote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchNote() {
      if (!sharehash) {
        setError("Invalid share link.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/content/share/${sharehash}`,
          {
            withCredentials: true,
          },
        );
        setNote(res.data.content ?? null);
      } catch (err) {
        console.error(err);
        setError("No note found with this shared link.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchNote();
  }, [sharehash]);

  return (
    <div className="w-screen h-screen bg-blue-200 flex items-center justify-center p-4">
      <div className="h-[80vh] w-[60vw] bg-blue-300 rounded-2xl text-white p-6">
        {isLoading && <h3>Loading shared note...</h3>}

        {!isLoading && (error || !note) && (
          <h3>
            {error ||
              "No note found with provided link, check your link again."}
          </h3>
        )}

        {!isLoading && note && (
          <div className="h-[25vh] flex flex-col items-start justify-start gap-1 overflow-x-hidden overflow-y-scroll scrollbar-hide relative p-4 text-white w-full rounded-2xl bg-blue-200">
            <h1>
              <span className="text-blue-400 font-bold">Title: </span>
              {note.title}
            </h1>
            <h1>
              <span className="text-blue-400 font-bold">Type: </span>
              {note.type}
            </h1>
            <h1>
              <span className="text-blue-400 font-bold">Link: </span>
              <Link target="_blank" to={note.link}>
                {note.link}
              </Link>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sharelink;

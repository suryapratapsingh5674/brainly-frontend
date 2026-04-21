import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../config";

const CreateNotes = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isError, setIsError] = useState(false);
  const [loginError, setLoginError] = useState("");

  const typeOptions = [
    { value: "video", label: "Video" },
    { value: "image", label: "Image" },
    { value: "article", label: "Article" },
    { value: "audio", label: "Audio" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!typeDropdownRef.current) return;
      if (!typeDropdownRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    async function createNote() {
      if (!selectedType) {
        setIsError(true);
        setLoginError("please select a type before creating the note.");
        return;
      }

      try {
        await axios.post(
          `${API_BASE_URL}/api/content/`,
          { title, link, type: selectedType },
          { withCredentials: true },
        );
        navigate("/");
      } catch (err) {
        console.error(err);
        setIsError(true);
        setLoginError("failed to create new note, try again.");
      }
    }

    createNote();
  };

  return (
    <div className="w-screen h-screen relative bg-blue-200 flex items-center justify-center">
      <button
        onClick={() => navigate(-1)}
        className="absolute font-bold text-2xl top-[6vh] left-[4vw] transition-all text-blue-500 px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded-4xl"
      >
        ←
      </button>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="h-[80vh] w-[60vw] bg-blue-300 rounded-2xl text-white flex flex-col items-center gap-4 justify-center"
      >
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[80%] border-2 border-white h-[10%] rounded-2xl p-2"
          placeholder="Enetr title"
        />
        <label htmlFor="type">Type:</label>

        <div ref={typeDropdownRef} className="relative w-[80%] h-[10%]">
          <button
            type="button"
            id="type"
            className="cardselect w-full h-full flex items-center justify-between"
            onClick={() => setIsTypeOpen((prev) => !prev)}
          >
            <span className={selectedType ? "text-white" : "text-white/80"}>
              {selectedType
                ? typeOptions.find((option) => option.value === selectedType)
                    ?.label
                : "Select type"}
            </span>
            <span
              className={`transition-transform ${isTypeOpen ? "rotate-180" : ""}`}
            >
              ⌄
            </span>
          </button>

          {isTypeOpen && (
            <ul className="cardbox-dropdown absolute top-[calc(100%+0.4rem)] left-0 w-full z-20 p-2">
              {typeOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    className={`cardbox-option ${selectedType === option.value ? "is-selected" : ""}`}
                    onClick={() => {
                      setSelectedType(option.value);
                      setIsTypeOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <input type="hidden" name="type" value={selectedType} />
        </div>

        <label htmlFor="link">Link: </label>
        <input
          type="text"
          name="link"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-[80%] border-2 border-white h-[10%] rounded-2xl p-2"
          placeholder="Enter Link"
        />
        <button
          className="px-4 transition-all bg-white py-2 text-blue-400 rounded-2xl mt-4 cursor-pointer hover:bg-blue-500 hover:text-white active:bg-blue-400 active:scale-50"
          type="submit"
        >
          Create New Note
        </button>
        {isError && (
          <p className="text-red-500 bg-red-200 px-6 py-4 rounded-2xl mt-4">
            {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateNotes;

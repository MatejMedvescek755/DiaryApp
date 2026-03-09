import "./App.css";
import { useState, useEffect } from "react";
import {
  postData,
  getFiles as getFilesAPI,
  getFile as getFileAPI,
  deleteFile as deleteFileAPI,
} from "./scripts/main";

function App() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(undefined);

  const getFile = async (el) => {
    console.log(el);
    setFile(el);
    const content = await getFileAPI(el);
    setText(content);
  };

  const newFile = () => {
    setText("");
    setFile(undefined);
  };

  const saveFile = async () => {
    await postData(text);
    setFiles(await getFilesAPI());
  };

  const deleteFile = async (fileName) => {
    await deleteFileAPI(fileName);
    setFiles(await getFilesAPI());
  };

  useEffect(() => {
    const getFiles = async () => {
      setFiles(await getFilesAPI());
    };
    getFiles();
  }, []);
  return (
    <div className="main">
      <div className="sidebar">
        <div
          onClick={() => {
            newFile();
          }}
        >
          New
        </div>
        {files.map((el) => {
          return (
            <div className="file-item" key={el}>
              <span className="file-name" onClick={() => getFile(el)}>
                {el}
              </span>

              <img
                className="delete-icon"
                src="./assets/thrash.svg"
                alt="delete"
                onClick={() => deleteFile(el)}
              />
            </div>
          );
        })}
      </div>
      <div className="editor">
        <textarea
          onChange={(e) => setText(e.target.value)}
          className="editor-text"
          name="text"
          id="text"
          value={text}
        ></textarea>
      </div>
      <button
        onClick={() => {
          saveFile();
        }}
        className="boton-elegante"
      >
        Save
      </button>
    </div>
  );
}

export default App;

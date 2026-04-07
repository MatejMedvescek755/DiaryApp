import React from "react";
import "../styles/Entries.css";
import { useState, useEffect, useCallback } from "react";
import {
  getFile as getFileAPI,
  getFiles as getFilesAPI,
  postData,
  deleteFile as deleteFileAPI,
} from "../scripts/main";
import Thrash from "../components/Thrash";
export const Entries = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);

  const getFile = async (el) => {
    try {
      console.log(el);
      const content = await getFileAPI(el);
      setText(content);
    } catch (error) {
      console.error(error);
    }
  };

  const newFile = () => {
    setText("");
  };

  const saveFile = async () => {
    try {
      await postData(text);
      setFiles(await getFilesAPI());
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFile = async (fileName) => {
    try {
      await deleteFileAPI(fileName);
      setFiles(await getFilesAPI());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = useCallback((file) => {
    deleteFile(file);
  }, []);

  useEffect(() => {
    const getFiles = async () => {
      setFiles(await getFilesAPI());
    };
    getFiles();
  }, []);
  return (
    <div className="main-editor">
      <div className="sidebar">
        <button className="new-file-btn" onClick={newFile}>
          + New
        </button>

        <div className="file-list">
          {files.map((file) => (
            <div className="file-item" key={file}>
              <span className="file-name" onClick={() => getFile(file)}>
                {file}
              </span>
              <Thrash removeFile={() => handleDelete(file)} />
            </div>
          ))}
        </div>
      </div>

      <div className="editor-area">
        <textarea
          className="editor-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing your entry..."
        />
        <button className="save-btn" onClick={saveFile}>
          Save
        </button>
      </div>
    </div>
  );
};

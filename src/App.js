import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import EditMemoPanel from "./EditMemoPanel";

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [memos, setMemos] = useState(null);
  const [memoInEdit, setMemoInEdit] = useState({ id: null, content: "" });

  // useEffect を使う練習用のコード
  useEffect(() => {
    const memoList = JSON.parse(localStorage.getItem("react-memo-spa"));
    setMemos(memoList);
  }, []);

  function commitNewMemos(newMemos) {
    localStorage.setItem("react-memo-spa", JSON.stringify(newMemos));
    setMemos(newMemos);
  }

  function saveMemoInEdit() {
    const { id, content } = memoInEdit;
    const title = extractTitleFromContent(content);
    const newMemos = memos.map((m) => {
      if (m.id === id) {
        return {
          id,
          title,
          content,
        };
      }
      return m;
    });
    commitNewMemos(newMemos);
  }

  function deleteMemoInEdit() {
    const newMemos = memos.filter((m) => m.id !== memoInEdit.id);
    commitNewMemos(newMemos);
  }

  return (
    <div className="flex">
      <List
        updateIsEditing={setIsEditing}
        memos={memos}
        memoInEdit={memoInEdit}
        updateMemoInEdit={setMemoInEdit}
        commitNewMemos={commitNewMemos}
      />
      {isEditing && (
        <EditMemoPanel
          updateIsEditing={setIsEditing}
          memos={memos}
          updateMemos={setMemos}
          memoInEdit={memoInEdit}
          updateMemoInEdit={setMemoInEdit}
          saveMemoInEdit={saveMemoInEdit}
          deleteMemoInEdit={deleteMemoInEdit}
        />
      )}
    </div>
  );
}

export function extractTitleFromContent(content) {
  return content.split(/\r\n|\n|\r/)[0];
}

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
    const memoList = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const id = localStorage.key(i);
      const regex = /^memo-/g;
      if (regex.test(id)) {
        const content = localStorage.getItem(id);
        const title = extractTitleFromContent(content);
        memoList.push({
          id,
          title,
          content,
        });
      }
    }
    setMemos(memoList);
  }, []);

  function saveMemoInEdit() {
    const id = memoInEdit.id;
    const { content } = memoInEdit;
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);

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
    setMemos(newMemos);
  }

  function deleteMemoInEdit() {
    localStorage.removeItem(memoInEdit.id);
    setMemos(memos.filter((m) => m.id !== memoInEdit.id));
  }

  return (
    <div className="flex">
      <List
        updateIsEditing={setIsEditing}
        memos={memos}
        updateMemos={setMemos}
        memoInEdit={memoInEdit}
        updateMemoInEdit={setMemoInEdit}
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

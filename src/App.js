import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import EditMemoPanel from "./EditMemoPanel";

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [memos, setMemos] = useState(null);
  const [activeMemo, setActiveMemo] = useState({ id: null, content: "" });

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

  return (
    <div className="flex">
      <List
        updateIsEditing={setIsEditing}
        memos={memos}
        updateMemos={setMemos}
        activeMemo={activeMemo}
        updateActiveMemo={setActiveMemo}
      />
      {isEditing && (
        <EditMemoPanel
          updateIsEditing={setIsEditing}
          memos={memos}
          updateMemos={setMemos}
          activeMemo={activeMemo}
          updateActiveMemo={setActiveMemo}
        />
      )}
    </div>
  );
}

export function extractTitleFromContent(content) {
  return content.split(/\r\n|\n|\r/)[0];
}

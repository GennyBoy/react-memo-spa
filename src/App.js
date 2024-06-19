import { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import EditMemoPanel from "./EditMemoPanel";

export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [memos, setMemos] = useState(() => {
    const memoList = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const id = localStorage.key(i);
      const content = localStorage.getItem(id);
      const title = extractTitleFromContent(content);
      memoList.push({
        id,
        title,
        content,
      });
    }
    return memoList;
  });
  const [memo, setMemo] = useState({ id: null, content: "" });

  // useEffect を使う練習用のコード
  useEffect(() => {
    console.log(`LocalStorageに保存されているメモの数: ${localStorage.length}`);
  }, [memos]);

  return (
    <div className="flex">
      <List
        updateIsEditing={setIsEditing}
        memos={memos}
        updateMemos={setMemos}
        memo={memo}
        updateMemo={setMemo}
      />
      {isEditing === true && (
        <EditMemoPanel
          isEditing={isEditing}
          updateIsEditing={setIsEditing}
          memos={memos}
          updateMemos={setMemos}
          memo={memo}
          updateMemo={setMemo}
        />
      )}
    </div>
  );
}

export function extractTitleFromContent(content) {
  return content.split(/\r\n|\n|\r/)[0];
}

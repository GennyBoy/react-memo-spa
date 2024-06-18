import { useState } from "react";
import "./App.css";
import List from "./List";
import EditMemoPanel from "./EditMemoPanel";

export default function App() {
  const [status, setStatus] = useState("viewing"); // 'viewing', 'adding' or 'editing'
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

  return (
    <div className="flex">
      <List
        updateStatus={setStatus}
        memos={memos}
        updateMemos={setMemos}
        memo={memo}
        updateMemo={setMemo}
      />
      {status !== "viewing" && (
        <EditMemoPanel
          status={status}
          updateStatus={setStatus}
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

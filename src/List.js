import { useState } from "react";
import EditMemoPanel from "./EditMemoPanel";

export default function List() {
  const [status, setStatus] = useState("viewing"); // 'viewing', 'adding' or 'editing'
  const [memo, setMemo] = useState({ id: null, content: "" });
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
  const [submittingEmptyMemo, setSubmittingEmptyMemo] = useState(false);

  function clearMemoState() {
    setMemo({ id: null, content: "" });
  }

  function extractTitleFromContent(content) {
    return content.split(/\r\n|\n|\r/)[0];
  }

  function handleEditButtonClick() {
    if (!memo.content) {
      setSubmittingEmptyMemo(true);
      return;
    }

    const id = memo.id;
    const { content } = memo;
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

    setStatus("viewing");
    clearMemoState();
    setSubmittingEmptyMemo(false);
  }

  function handleDeleteButtonClick() {
    setMemos(memos.filter((m) => m.id !== memo.id));
    localStorage.removeItem(memo.id);
    setStatus("viewing");
  }

  function handleAddButtonClick(e) {
    e.preventDefault();
    const id = window.self.crypto.randomUUID();
    const content = "新規メモ";
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);
    setMemo({id: id, content: content})
    setMemos([
      ...memos,
      {
        id,
        title,
        content,
      },
    ]);
    setSubmittingEmptyMemo(false);
    setStatus("adding");
  }

  function handleMemoDetailLinkClick(e, m) {
    e.preventDefault();
    setMemo({ id: m.id, content: m.content });
    setSubmittingEmptyMemo(false);
    setStatus("editing");
  }

  function onMemoTextAreaChange(e) {
    setMemo({ id: memo.id || null, content: e.target.value });
  }

  return (
    <div className="flex">
      <div className="section">
        <ul>
          {memos?.map((m) => (
            <li key={m.id}>
              {m.id === memo.id ? (
                <span>{m.title}</span>
              ) : (
                <a href="." onClick={(e) => handleMemoDetailLinkClick(e, m)}>
                  {m.title}
                </a>
              )}
            </li>
          ))}
          <a
            className="new-memo-button"
            href="."
            onClick={handleAddButtonClick}
          >
            +
          </a>
        </ul>
      </div>
      {status !== "viewing" && (
        <EditMemoPanel
          status={status}
          memoContent={memo.content}
          submittingEmptyMemo={submittingEmptyMemo}
          onMemoTextAreaChange={onMemoTextAreaChange}
          handleEditButtonClick={handleEditButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
        />
      )}
    </div>
  );
}

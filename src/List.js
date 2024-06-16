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
      const title = content.split(/\r\n|\n|\r/)[0];
      memoList.push({
        id,
        title,
        content,
      });
    }
    return memoList;
  });
  const [submittingEmptyMemo, setSubmittingEmptyMemo] = useState(false);

  function clearMemo() {
    setMemo({ id: null, content: "" });
  }

  function handleEditButtonClick() {
    if (!memo.content) {
      setSubmittingEmptyMemo(true);
      return;
    }
    // 編集の時はidが既にあるのでそれを代入し、新規の時はランダムUUIDを生成して代入する
    const id = memo.id || window.self.crypto.randomUUID();
    const { content } = memo;
    const title = content.split(/\r\n|\n|\r/)[0];
    localStorage.setItem(id, content);

    if (status === "editing") {
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
    } else if (status === "adding") {
      setMemos([
        ...memos,
        {
          id,
          title,
          content,
        },
      ]);
    }

    setStatus("viewing");
    clearMemo();
    setSubmittingEmptyMemo(false);
  }

  function handleDeleteButtonClick() {
    setMemos(memos.filter((m) => m.id !== memo.id));
    localStorage.removeItem(memo.id);
    clearMemo();
    setStatus("viewing");
  }

  function handleAddButtonClick(e) {
    e.preventDefault();
    clearMemo();
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

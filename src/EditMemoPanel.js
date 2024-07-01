import { extractTitleFromContent } from "./App";

export default function EditMemoPanel({
  isEditing,
  updateIsEditing,
  memos,
  updateMemos,
  memo,
  updateMemo,
}) {
  function clearMemo() {
    updateMemo({ id: null, content: "" });
  }

  function handleEditButtonClick() {
    if (!memo.content) {
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
    updateMemos(newMemos);
    updateIsEditing(false);
    clearMemo();
  }

  function handleDeleteButtonClick() {
    localStorage.removeItem(memo.id);
    updateMemos(memos.filter((m) => m.id !== memo.id));
    updateIsEditing(false);
  }

  function onMemoTextAreaChange(e) {
    updateMemo({ id: memo.id || null, content: e.target.value });
  }

  return (
    <div className="section">
      <textarea value={memo.content || ""} onChange={onMemoTextAreaChange} />
      <button
        className="add-button"
        type="submit"
        onClick={handleEditButtonClick}
      >
        編集
      </button>
      <button
        className="delete-button"
        type="submit"
        onClick={handleDeleteButtonClick}
      >
        削除
      </button>
      {memo.content === "" ? (
        <div className="error-message">空のメモは保存できません</div>
      ) : null}
    </div>
  );
}

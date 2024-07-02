import { extractTitleFromContent } from "./App";

export default function EditMemoPanel({
  updateIsEditing,
  memos,
  updateMemos,
  activeMemo,
  updateActiveMemo,
}) {
  function clearMemo() {
    updateActiveMemo({ id: null, content: "" });
  }

  function handleEditButtonClick() {
    if (!activeMemo.content) {
      return;
    }

    const id = activeMemo.id;
    const { content } = activeMemo;
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
    localStorage.removeItem(activeMemo.id);
    updateMemos(memos.filter((m) => m.id !== activeMemo.id));
    updateIsEditing(false);
  }

  function onMemoTextAreaChange(e) {
    updateActiveMemo({ id: activeMemo.id || null, content: e.target.value });
  }

  return (
    <div className="section">
      <textarea value={activeMemo.content || ""} onChange={onMemoTextAreaChange} />
      <button
        className="add-button"
        type="submit"
        onClick={handleEditButtonClick}
      >
        保存
      </button>
      <button
        className="delete-button"
        type="submit"
        onClick={handleDeleteButtonClick}
      >
        削除
      </button>
      {activeMemo.content === "" ? (
        <div className="error-message">空のメモは保存できません</div>
      ) : null}
    </div>
  );
}

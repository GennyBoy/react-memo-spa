export default function EditMemoPanel({
  updateIsEditing,
  memoInEdit,
  updateMemoInEdit,
  saveMemoInEdit,
  deleteMemoInEdit,
}) {
  function clearMemoInEdit() {
    updateMemoInEdit({ id: null, content: "" });
  }

  function handleEditButtonClick() {
    if (!memoInEdit.content) {
      return;
    }

    saveMemoInEdit();
    updateIsEditing(false);
    clearMemoInEdit();
  }

  function handleDeleteButtonClick() {
    deleteMemoInEdit();
    updateIsEditing(false);
  }

  function onMemoTextAreaChange(e) {
    updateMemoInEdit({ id: memoInEdit.id || null, content: e.target.value });
  }

  return (
    <div className="section">
      <textarea value={memoInEdit.content || ""} onChange={onMemoTextAreaChange} />
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
      {memoInEdit.content === "" ? (
        <div className="error-message">空のメモは保存できません</div>
      ) : null}
    </div>
  );
}

export default function EditMemoPanel({
  status,
  memoContent,
  submittingEmptyMemo,
  onMemoTextAreaChange,
  handleEditButtonClick,
  handleDeleteButtonClick,
}) {
  return (
    <div className="section">
      <textarea value={memoContent || ""} onChange={onMemoTextAreaChange} />
      <button
        className="add-button"
        type="submit"
        onClick={handleEditButtonClick}
      >
        編集
      </button>
      {status === "adding" ? null : (
        <button
          className="delete-button"
          type="submit"
          onClick={handleDeleteButtonClick}
        >
          削除
        </button>
      )}
      {submittingEmptyMemo ? (
        <div className="error-message">空のメモは保存できません</div>
      ) : null}
    </div>
  );
}

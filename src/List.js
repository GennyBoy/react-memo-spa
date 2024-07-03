import { extractTitleFromContent } from "./App";

export default function List({
  updateIsEditing,
  memos,
  updateMemos,
  memoInEdit,
  updateMemoInEdit,
}) {
  function handleAddButtonClick(e) {
    e.preventDefault();
    const id = `memo-${window.self.crypto.randomUUID()}`;
    const content = "新規メモ";
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);
    updateMemoInEdit({ id: id, content: content });
    updateMemos([
      ...memos,
      {
        id,
        title,
        content,
      },
    ]);
    updateIsEditing(true);
  }

  function handleMemoDetailLinkClick(e, memo) {
    e.preventDefault();
    updateMemoInEdit({ id: memo.id, content: memo.content });
    updateIsEditing(true);
  }

  return (
    <div className="section">
      <ul>
        {memos?.map((memo) => (
          <li key={memo.id}>
            {memo.id === memoInEdit.id ? (
              <span>{memo.title}</span>
            ) : (
              <a href="." onClick={(e) => handleMemoDetailLinkClick(e, memo)}>
                {memo.title}
              </a>
            )}
          </li>
        ))}
        <a className="new-memo-button" href="." onClick={handleAddButtonClick}>
          +
        </a>
      </ul>
    </div>
  );
}

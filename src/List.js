import { extractTitleFromContent } from "./App";

export default function List({
  updateIsEditing,
  memos,
  updateMemos,
  memo,
  updateMemo,
}) {
  function handleAddButtonClick(e) {
    e.preventDefault();
    const id = window.self.crypto.randomUUID();
    const content = "新規メモ";
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);
    updateMemo({ id: id, content: content });
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

  function handleMemoDetailLinkClick(e, m) {
    e.preventDefault();
    updateMemo({ id: m.id, content: m.content });
    updateIsEditing(true);
  }

  return (
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
        <a className="new-memo-button" href="." onClick={handleAddButtonClick}>
          +
        </a>
      </ul>
    </div>
  );
}

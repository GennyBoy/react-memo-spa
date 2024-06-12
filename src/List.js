import { useState } from 'react';

export default function List() {
  const [status, setStatus] = useState('viewing'); // 'viewing', 'adding' or 'editing'
  const [memo, setMemo] = useState({ id: null, content: '' });
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

  function handleEditButtonClick() {
    if (!memo.content) {
      alert('メモを入力してください');
      return;
    }
    // 編集の時はidが既にあるのでそれを代入し、新規の時はランダムUUIDを生成して代入する
    const id = memo.id || window.self.crypto.randomUUID();
    const { content } = memo;
    const title = content.split(/\r\n|\n|\r/)[0];
    localStorage.setItem(id, content);

    if (status === 'editing') {
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
      setStatus('viewing');
    } else if (status === 'adding') {
      setMemos([
        ...memos,
        {
          id,
          title,
          content,
        },
      ]);
      setStatus('viewing');
    }

    setMemo({ id: null, content: '' });
  }

  function handleDeleteButtonClick() {
    setMemos(memos.filter((m) => m.id !== memo.id));
    localStorage.removeItem(memo.id);
    setMemo({ id: null, content: '' }); // TODO : この処理共通化する
    setStatus('viewing');
  }

  function handleAddButtonClick(e) {
    e.preventDefault();
    setMemo({ id: null, content: '' });
    setStatus('adding');
  }

  function handleMemoDetailLinkClick(e, m) {
    e.preventDefault();
    setMemo({ id: m.id, content: m.content });
    setStatus('editing');
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
      {status !== 'viewing' && (
        <div className="section">
          <textarea
            value={memo.content || ''}
            onChange={(e) => setMemo({ id: memo.id || null, content: e.target.value })}
          />
          <button className="add-button" type="submit" onClick={handleEditButtonClick}>
            編集
          </button>
          {status === 'adding' ? null : (
            <button className="delete-button" type="submit" onClick={handleDeleteButtonClick}>
              削除
            </button>
          )}
        </div>
      )}
    </div>
  );
}

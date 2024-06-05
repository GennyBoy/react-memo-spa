import { useState } from "react";

export default function List() {
  const [status, setStatus] = useState('viewing') // 'viewing', 'adding' or 'editing'
  const [memo, setMemo] = useState({id: null, content: ''});
  const [memos, setMemos] = useState(() => {
    let memoList = [];
    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      const content = localStorage.getItem(id);
      const title = extractTitleFromContent(content);
      memoList.push({
        id: id,
        title: title,
        content: content
      });
    }
    return memoList;
  });

  function extractTitleFromContent(content) {
    return content.split(/\r\n|\n|\r/)[0];
  }

  function handleEditButtonClick(e) {
    if (!memo.content) {
      alert("メモを入力してください");
      return;
    }
    // 編集の時はidが既にあるのでそれを代入し、新規の時はランダムUUIDを生成して代入する
    const id = memo.id || window.self.crypto.randomUUID();
    const content = memo.content;
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);

    if (status === 'editing') {
      const newMemos = memos.map((memo) => {
        if (memo.id === id) {
          return {
            id: id,
            title: title,
            content: content
          }
        } else {
          return memo;
        }
      });
      setMemos(newMemos);
      setStatus('viewing');
    } else if (status === 'adding') {
      setMemos([...memos, {
        id: id,
        title: title,
        content: content
      }]);
      setStatus('viewing');
    }

    setMemo({id: null, content: ''});
  }

  function handleDeleteButtonClick() {
    setMemos(
      memos.filter(m =>
        m.id !== memo.id
      )
    );
    localStorage.removeItem(memo.id);
    setMemo({id: null, content: ''}) // TODO : この処理共通化する
    setStatus('viewing');
  }

  function handleAddButtonClick(e) {
    e.preventDefault();
    setMemo({id: null, content: ""});
    setStatus('adding');
  }

  function handleMemoDetailLinkClick(e, m) {
    e.preventDefault();
    setMemo({id: m.id, content: m.content});
    setStatus('editing');
  }

  return (
    <div className="flex">
      <div className="section">
        <ul>
          {memos?.map(m => {
            return (
              <li key={m.id}>
                {m.id === memo.id ?
                  (<span>{m.title}</span>) :
                  (<a href="." onClick={(e) => handleMemoDetailLinkClick(e, m)}>{m.title}</a>)
                }
              </li>
            );
          })}
          <a className="new-memo-button" href="." onClick={handleAddButtonClick}>+</a>
        </ul>
      </div>
      {status !== 'viewing' &&
        <div class="section">
          <textarea value={memo.content || ''} onChange={e => setMemo({id: memo.id || null, content: e.target.value})}></textarea>
          <button className="add-button" onClick={handleEditButtonClick}>編集</button>
          {status === 'adding' ? null : <button className="delete-button" onClick={handleDeleteButtonClick}>削除</button>}
        </div>
      }
    </div>
  )
}

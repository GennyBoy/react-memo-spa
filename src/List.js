import { useState } from "react";

export default function List() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
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

    if (isEditing) {
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
      setIsEditing(false);
    }

    if (isAdding) {
      setMemos([...memos, {
        id: id,
        title: title,
        content: content
      }]);
      setIsAdding(false);
    }

    setMemo({id: null, content: ''});
  }

  return (
    <>
      <ul>
        {memos?.map(memo => {
          return (
            <li key={memo.id}>
              <a href="." onClick={(e) => {
                e.preventDefault();
                setMemo({id: memo.id, content: localStorage.getItem(memo.id)});
                setIsEditing(true);
              }}>{memo.title}</a>
            </li>
          );
        })}
      </ul>
      <a href="." onClick={e => {
        e.preventDefault();
        setIsAdding(true);
      }}>+</a>
      {(isEditing || isAdding) &&
        <div>
          <textarea value={memo.content || ''} onChange={e => setMemo({id: memo.id || null, content: e.target.value})}></textarea>
          <button onClick={handleEditButtonClick}>編集</button>
          <button>削除</button>
        </div>
      }
    </>
  )
}

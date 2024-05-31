import { useState } from "react";

export default function List() {
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState('');
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
    const id = window.self.crypto.randomUUID();
    const content = memo;
    const title = extractTitleFromContent(content);
    localStorage.setItem(id, content);
    setMemos([...memos, {
      id: id,
      title: title,
      content: content
    }]);
  }

// TODO : 編集ボタンをクリックしたら一覧の状態に戻るようにする


  return (
    <>
      <ul>{memos?.map(memo => <li key={memo.id}>{memo.title}</li>)}</ul>
      <a href="." onClick={e => {
        e.preventDefault();
        setIsEditing(true);
      }}>+</a>
      {isEditing &&
        <div>
          <textarea onChange={e => setMemo(e.target.value)}></textarea>
          <button onClick={handleEditButtonClick}>編集</button>
          <button>削除</button>
        </div>
      }
    </>
  )
}

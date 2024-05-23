export default function List() {
  let memoList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const id = localStorage.key(i);
    const memo = localStorage.getItem(id);
    const title = memo.split(/\r\n|\n|\r/)[0];
    memoList.push({
      id: id,
      title: title,
      memo: memo
    });
  }

  return (
    <ul>{memoList?.map(item => <li key={item.id}>{item.title}</li>)}</ul>
  )
}

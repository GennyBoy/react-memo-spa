import './App.css';
import List from  './List.js';

// TODO: データ追加する機能を実装したら消す
localStorage.clear();
localStorage.setItem("memo1", `これはタイトルです

これは3行目です
これは4行目です`);
localStorage.setItem("memo2", "メモ2");

export default function App() {
  return (
    <List />
  );
}

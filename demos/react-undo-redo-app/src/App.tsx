import React, { useState } from 'react';

const Editor = () => {
  // 使用 TypeScript 定义状态类型
  const [content, setContent] = useState<string>("");
  const [history, setHistory] = useState<string[]>([content]);
  const [index, setIndex] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (index < history.length - 1) {
      // 如果我们不在历史记录栈的末尾，则替换当前状态为新状态
      setHistory(prevHistory => [...prevHistory.slice(0, index + 1), newContent]);
    } else {
      // 否则，直接在历史记录中添加新的内容
      setHistory(prevHistory => [...prevHistory, newContent]);
    }
    setIndex(prevIndex => prevIndex + 1);
  };

  const handleUndo = () => {
    if (index > 0) {
      setIndex(prevIndex => prevIndex - 1);
      setContent(history[index - 1]);
    }
  };

  const handleRedo = () => {
    if (index < history.length - 1) {
      setIndex(prevIndex => prevIndex + 1);
      setContent(history[index + 1]);
    }
  };

  return (
    <div>
      <textarea value={content} onChange={handleChange}></textarea>
      <br />
      <button onClick={handleUndo} disabled={index === 0}>Undo</button>
      <button onClick={handleRedo} disabled={index === history.length - 1}>Redo</button>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Editor />
    </div>
  );
}

export default App;
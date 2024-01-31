import './App.css';
import { useState } from 'react';

const Homework = () => {
  const [inputText, setInputText] = useState('');
  const [comments, setComments] = useState([
    "안녕하세요",
    "교육세션 끝",
    "신입기수 프로젝트"
  ]);

  const handleNewComment = () => {
    if(inputText.trim() !== ''){
      setComments([...comments, inputText]);
      setInputText('');
    }
  }

  return (
    <>
      <header>
        <img alt="logo" src="https://avatars.githubusercontent.com/u/16025679?s=200&v=4" height="64" />
        <p>YBIGTA 교육세션</p>
      </header>
      <div className="body">
        <div className="publish">
          <input 
            type="text" 
            value={inputText} 
            onChange={(e) => { setInputText(e.target.value); }}
          />
          <button onClick={() => handleNewComment()}>
            등록
          </button>
        </div>
        {comments.map((item, idx) => (
          <div key={idx} className="comments">
            <p>{item}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Homework;
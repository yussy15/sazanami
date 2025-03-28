import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [classname, setClassname] = useState('');
  const [classnumber, setClassnumber] = useState('');
  const [name, setName] = useState('');
  const [studentid, setStudentid] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !classname || !classnumber || !name || !studentid) {
      alert('すべてのフィールドを入力してください。');
      return;
    }

    const data = {
      email,
      classname,
      classnumber,
      name,
      studentid
    };

    try {
      // サーバーにデータを送信
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Signup successful:', result);
        navigate('/'); 
      } else {
        console.error('Signup failed:', result.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>サインアップ</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>メールアドレス</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>クラス</label>
          <input
            type="text"
            value={classname}
            onChange={(e) => setClassname(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>出席番号</label>
          <input
            type="text"
            value={classnumber}
            onChange={(e) => setClassnumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>氏名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>学籍番号</label>
          <input
            type="text"
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
            required
          />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Signup;

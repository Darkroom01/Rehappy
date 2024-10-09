import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // API 호출
    axios.get('http://localhost:8080/api/hello')
        .then(response => {
          setMessage(response.data); // API에서 받은 데이터 설정
        })
        .catch(error => {
          console.error('There was an error!', error);
        });
  }, []);

  return (
      <div className="App">
        <h1>{message}</h1>
      </div>
  );
}

export default App;

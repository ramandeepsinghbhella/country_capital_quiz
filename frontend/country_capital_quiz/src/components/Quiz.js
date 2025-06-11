import React, { useEffect, useState } from 'react';

const Quiz = () => {
  const [country, setCountry] = useState('');
  const [id, setId] = useState(null);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState(null);
  const [correctCapital, setCorrectCapital] = useState('');

  const fetchCountry = async () => {
    setResult(null);
    setAnswer('');
    try {
      const res = await fetch('/get_country');
      const data = await res.json();
      setCountry(data.country);
      setId(data.id);
    } catch (err) {
      console.error('Failed to fetch country', err);
    }
  };

  const checkAnswer = async () => {
    try {
      const res = await fetch('/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id,
          country,
          capital: answer
        })
      });

      if (res.status === 200) {
        setResult('correct');
      } else if (res.status === 400) {
        const data = await res.json();
        setResult('incorrect');
        setCorrectCapital(data.correct_answer);
      }
    } catch (err) {
      console.error('Error checking answer', err);
    }
  };

  useEffect(() => {
    fetchCountry();
  }, []);

return (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Arial, sans-serif'
  }}>
    <div style={{
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      minWidth: '350px'
    }}>
      {/* Feedback message (above question) */}
      {result === 'correct' && (
        <p style={{ color: 'green', fontSize: '14px', marginBottom: '8px' }}>
          ✅ Correct!
        </p>
      )}
      {result === 'incorrect' && (
        <p style={{ color: 'red', fontSize: '14px', marginBottom: '8px' }}>
          ❌ Incorrect. Correct answer is: <strong>{correctCapital}</strong>
        </p>
      )}

      {/* Question */}
      <h2 style={{ marginBottom: '20px' }}>
        What is the capital of <strong style={{ color: '#007BFF' }}>{country}</strong>?
      </h2>

      {/* Input */}
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Enter capital"
        style={{
          padding: '10px',
          width: '100%',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '20px',
          fontSize: '16px'
        }}
      />

      {/* Buttons side by side */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '10px'
      }}>
        <button
          onClick={checkAnswer}
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            flex: 1
          }}
        >
          Submit
        </button>

        <button
          onClick={fetchCountry}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            flex: 1
          }}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);
}

export default Quiz;

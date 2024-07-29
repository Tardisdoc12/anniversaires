import React, { useState } from 'react';
import { addBirthday } from '../../services/birthdayApiService.js';

function formatDate(date) {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

function AddBirthdayForm() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addBirthday(firstname, lastname, formatDate(birthdate), email);
    if (result && result.success) {
      setMessage('Birthday added successfully!');
    } else {
      setMessage('Failed to add birthday');
    }
  };

  return (
    <div>
      <h1>Add Birthday</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
        </div>
        <div>
          <label>Birthdate:</label>
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit">Add Birthday</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBirthdayForm;

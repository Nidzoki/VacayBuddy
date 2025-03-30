import React, { useState } from 'react';
import '../css/BuddyReservation.css';

const BuddyReservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    duration: '2',
    language: 'en',
    specialRequests: '',
    meetupLocation: 'city-center'
  });

  const [submitted, setSubmitted] = useState(false);
  const [availableBuddies, setAvailableBuddies] = useState([]);
  const [searching, setSearching] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearching(true);
    
    // Simuliramo API poziv za pronalaženje dostupnih buddyja
    setTimeout(() => {
      const buddies = [
        { id: 1, name: 'Marko', languages: ['en', 'de'], rating: 4.8, image: 'marko.jpg' },
        { id: 2, name: 'Ana', languages: ['en', 'fr', 'es'], rating: 4.9, image: 'ana.jpg' },
        { id: 3, name: 'Ivan', languages: ['en', 'it'], rating: 4.7, image: 'ivan.jpg' }
      ];
      setAvailableBuddies(buddies);
      setSearching(false);
    }, 1500);
  };

  const confirmReservation = (buddyId) => {
    // Ovdje bi bio poziv na backend za potvrdu rezervacije
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="confirmation-container">
        <h2>Hvala na rezervaciji!</h2>
        <p>Vaš buddy će vas kontaktirati putem emaila ili telefona kako biste dogovorili detalje.</p>
        <p>Uživajte u posjeti našem gradu!</p>
        <button onClick={() => setSubmitted(false)}>Nova rezervacija</button>
      </div>
    );
  }

  if (availableBuddies.length > 0) {
    return (
      <div className="buddies-container">
        <h2>Dostupni buddyji za vaš termin</h2>
        <div className="buddies-list">
          {availableBuddies.map(buddy => (
            <div key={buddy.id} className="buddy-card">
              <div className="buddy-image">
                <img src={buddy.image} alt={buddy.name} />
              </div>
              <div className="buddy-info">
                <h3>{buddy.name}</h3>
                <p>Jezici: {buddy.languages.join(', ')}</p>
                <p>Ocjena: {buddy.rating}/5</p>
                <button onClick={() => confirmReservation(buddy.id)}>Rezerviraj</button>
              </div>
            </div>
          ))}
        </div>
        <button className="back-button" onClick={() => setAvailableBuddies([])}>Natrag</button>
      </div>
    );
  }

  return (
    <div className="reservation-container">
        <h1 id="logo" >vacayBuddy</h1>
      <p>Our local buddies will help you discover culture of our city!</p>
      <form className='form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name and surname:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Telephone:</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date:</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input 
              type="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Duration (sati):</label>
          <select 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange}
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">Whole day (5+ hours)</option>
          </select>
        </div>
              
        <div className="form-group">
          <label>Meeting place:</label>
          <select 
            name="meetupLocation" 
            value={formData.meetupLocation} 
            onChange={handleChange}
          >
            <option value="city-center">City center</option>
            <option value="train-station">Train station</option>
            <option value="bus-station">Bus station</option>
            <option value="airport">Airport</option>
            <option value="hotel">My hotel</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Special requests (optional):</label>
          <textarea 
            name="specialRequests" 
            value={formData.specialRequests} 
            onChange={handleChange} 
            rows="3"
          />
        </div>
        
        <button type="submit" disabled={searching}>
          {searching ? 'Looking for buddy...' : 'Find buddy'}
        </button>
      </form>
    </div>
  );
};

export default BuddyReservation;
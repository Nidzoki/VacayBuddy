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
      <h1>Rezervirajte svog turističkog buddyja</h1>
      <p>Naši lokalni vodiči će vam pomoći da se snađete u gradu i otkrijete najbolje lokale!</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ime i prezime:</label>
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
          <label>Telefon:</label>
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
            <label>Datum:</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Vrijeme:</label>
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
          <label>Trajanje (sati):</label>
          <select 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange}
          >
            <option value="1">1 sat</option>
            <option value="2">2 sata</option>
            <option value="3">3 sata</option>
            <option value="4">4 sata</option>
            <option value="5">Cijeli dan (5+ sati)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Preferirani jezik:</label>
          <select 
            name="language" 
            value={formData.language} 
            onChange={handleChange}
          >
            <option value="en">Engleski</option>
            <option value="de">Njemački</option>
            <option value="fr">Francuski</option>
            <option value="es">Španjolski</option>
            <option value="it">Talijanski</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Mjesto okupljanja:</label>
          <select 
            name="meetupLocation" 
            value={formData.meetupLocation} 
            onChange={handleChange}
          >
            <option value="city-center">Gradski centar</option>
            <option value="train-station">Željeznički kolodvor</option>
            <option value="bus-station">Autobusni kolodvor</option>
            <option value="airport">Zračna luka</option>
            <option value="hotel">Moj hotel</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Posebni zahtjevi (opcionalno):</label>
          <textarea 
            name="specialRequests" 
            value={formData.specialRequests} 
            onChange={handleChange} 
            rows="3"
          />
        </div>
        
        <button type="submit" disabled={searching}>
          {searching ? 'Tražim dostupne buddyje...' : 'Pronađi buddyja'}
        </button>
      </form>
    </div>
  );
};

export default BuddyReservation;
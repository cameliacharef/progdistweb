import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import './App.css';

function App() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${config.API_URLS.rooms}/rooms`);
        setRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  if (loading) return <div>Chargement des salles...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="App">
      <h1>Liste des salles de réunion</h1>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <strong>{room.name}</strong> - Capacité : {room.capacity} personnes
            <br />
            Équipement : {room.equipment}
            <br />
            Tarif horaire : {room.hourlyRate} €
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
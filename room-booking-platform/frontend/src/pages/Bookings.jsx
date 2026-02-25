import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ roomId: '', startTime: '', endTime: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get(config.API_URLS.bookings)
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(config.API_URLS.bookings, form)
      .then(() => {
        fetchBookings();
        setForm({ roomId: '', startTime: '', endTime: '' });
      })
      .catch(err => console.error(err));
  };

  const cancelBooking = (id) => {
    axios.delete(`${config.API_URLS.bookings}/${id}`)
      .then(() => fetchBookings())
      .catch(err => console.error(err));
  };

  if (loading) return <div className="text-center mt-8">Chargement...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes réservations</h1>
      
      // Formulaire
<form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl shadow-md mb-8">
  <h2 className="text-xl font-semibold mb-4 text-gray-800">Nouvelle réservation</h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <input type="text" placeholder="ID de la salle" value={form.roomId} onChange={e => setForm({...form, roomId: e.target.value})}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    <input type="datetime-local" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    <input type="datetime-local" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}
      className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />
    <button type="submit" className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition font-semibold">
      Réserver
    </button>
  </div>
</form>

// Liste des réservations
<div className="space-y-4">
  {bookings.map(booking => (
    <div key={booking.id} className="bg-white p-5 rounded-lg shadow flex justify-between items-center border-l-4 border-blue-500">
      <div>
        <p className="text-gray-800"><span className="font-semibold">Salle :</span> {booking.roomId}</p>
        <p className="text-gray-600 text-sm">Début : {new Date(booking.startTime).toLocaleString()}</p>
        <p className="text-gray-600 text-sm">Fin : {new Date(booking.endTime).toLocaleString()}</p>
      </div>
      <button onClick={() => cancelBooking(booking.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
        Annuler
      </button>
    </div>
  ))}
</div>
    </div>
  );
}
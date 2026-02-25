import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { FaUser, FaCalendarAlt, FaEuroSign } from 'react-icons/fa';
export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(config.API_URLS.rooms)
      .then(res => { setRooms(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center mt-8">Chargement...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Salles disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {rooms.map(room => (
    <div key={room.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-indigo-500"></div> {/* bandeau coloré */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Capacité :</span> {room.capacity} personnes</p>
        <p className="text-gray-600 mb-2"><FaUser className="inline mr-1" /> Capacité : {room.capacity}</p>
        <p className="text-gray-600 mb-2"><span className="font-semibold">Équipement :</span> {room.equipment}</p>
        <p className="text-gray-600 mb-4"><span className="font-semibold">Tarif :</span> {room.hourlyRate} €/h</p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
          Réserver
        </button>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
}
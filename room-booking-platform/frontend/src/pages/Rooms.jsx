import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import { FaUsers, FaEuroSign, FaWifi, FaVideo, FaChalkboard, FaClock } from 'react-icons/fa';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [form, setForm] = useState({ startTime: '', endTime: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  // helper to pick a background color (either provided by API or derived from index)
  const presetColors = ['#fde68a','#a7f3d0','#bfdbfe','#fbcfe8','#fed7aa'];
  const isLight = (hex) => {
    // simple luma check for contrast
    if (!hex) return true;
    const c = hex.replace('#','');
    const rgb = parseInt(c,16);
    const r = (rgb>>16)&255;
    const g = (rgb>>8)&255;
    const b = rgb&255;
    const luma = 0.299*r + 0.587*g + 0.114*b;
    return luma > 186;
  };
  const getRoomBg = (room, idx) => {
    // allow API to send a color field, otherwise cycle through presets
    return room.color || presetColors[idx % presetColors.length];
  };

  useEffect(() => {
    axios.get(config.API_URLS.rooms)
      .then(res => { setRooms(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const handleReserve = (room) => {
    setSelectedRoom(room);
    setForm({ startTime: '', endTime: '' });
    setMessage({ type: '', text: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId') || '1'; // temporaire
    axios.post(config.API_URLS.bookings, {
      room_id: selectedRoom.id,
      user_id: userId,
      start_time: form.startTime,
      end_time: form.endTime,
      title: `Réservation ${selectedRoom.name}`
    })
    .then(() => {
      setMessage({ type: 'success', text: 'Réservation confirmée !' });
      setTimeout(() => setSelectedRoom(null), 1500);
    })
    .catch(err => {
      setMessage({ type: 'error', text: err.response?.data?.detail || 'Erreur lors de la réservation' });
    });
  };

  // Fonction pour afficher les icônes d'équipement
  const renderEquipment = (equipment) => {
    const items = equipment.split(',').map(e => e.trim());
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {items.map((item, idx) => {
          let icon = null;
          if (item.toLowerCase().includes('wifi')) icon = <FaWifi className="text-blue-500" />;
          else if (item.toLowerCase().includes('video')) icon = <FaVideo className="text-purple-500" />;
          else if (item.toLowerCase().includes('whiteboard')) icon = <FaChalkboard className="text-green-500" />;
          else icon = <FaClock className="text-gray-500" />;
          return (
            <span key={idx} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm">
              {icon} {item}
            </span>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            Salles de réunion disponibles
          </span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => {
            const bg = getRoomBg(room, idx);
            const textClass = isLight(bg) ? 'text-gray-900' : 'text-white';
            return (
              <div
                key={room.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 relative" style={{ backgroundColor: bg }}>
                  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}></div>
                  <div className={`absolute bottom-4 left-4 ${textClass}`}> 
                    <h2 className="text-2xl font-bold">{room.name}</h2>
                    <p className="text-sm opacity-90 drop-shadow-md">{room.location}</p>
                  </div>
                </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-blue-600" />
                    <span>{room.capacity} personnes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaEuroSign className="text-green-600" />
                    <span>{room.hourlyRate} €/h</span>
                  </div>
                </div>
                
                {renderEquipment(room.equipment)}
                
                <p className="mt-4 text-gray-600 text-sm">{room.description}</p>
                
                <button
                  onClick={() => handleReserve(room)}
                  className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-900 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Réserver cette salle
                </button>
              </div>
            </div>
          );
          })}
        </div>
      </div>

      {/* Modal de réservation */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transform transition-all">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Réserver <span className="text-blue-600">{selectedRoom.name}</span>
            </h2>
            <p className="text-gray-600 mb-6">Sélectionnez les dates et heures</p>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Début</label>
                  <input
                    type="datetime-local"
                    value={form.startTime}
                    onChange={e => setForm({...form, startTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Fin</label>
                  <input
                    type="datetime-local"
                    value={form.endTime}
                    onChange={e => setForm({...form, endTime: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                {message.text && (
                  <div className={`p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.text}
                  </div>
                )}
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRoom(null)}
                    className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-gray-900 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition"
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
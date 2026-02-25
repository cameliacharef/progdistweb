import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition">
            🏢 RoomBooking
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">Salles</Link>
            <Link to="/bookings" className="hover:text-blue-200 transition">Réservations</Link>
            <Link to="/login" className="hover:text-blue-200 transition">Connexion</Link>
            <Link to="/register" className="hover:text-blue-200 transition">Inscription</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">RoomBooking</Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200">Salles</Link>
            <Link to="/bookings" className="hover:text-blue-200">Réservations</Link>
            <Link to="/login" className="hover:text-blue-200">Connexion</Link>
            <Link to="/register" className="hover:text-blue-200">Inscription</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
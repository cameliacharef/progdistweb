// frontend/src/config.js
const config = {
  // Pour le développement local avec docker-compose
  API_URLS: {
    rooms: '/api/rooms',      // ✅ chemin relatif
    bookings: '/api/bookings',
    users: '/api/users'
  
  }
  // Plus tard, vous pourrez changer ces URLs pour Kubernetes
  // en utilisant une variable d'environnement
};

export default config;
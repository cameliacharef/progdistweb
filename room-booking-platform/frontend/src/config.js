// frontend/src/config.js
const config = {
  // Pour le développement local avec docker-compose
  API_URLS: {
    rooms: 'http://localhost:8080/api',
    bookings: 'http://localhost:8000',
    users: 'http://localhost:3000/api'
  }
  // Plus tard, vous pourrez changer ces URLs pour Kubernetes
  // en utilisant une variable d'environnement
};

export default config;
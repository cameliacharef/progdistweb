# 🏢 Room Booking Platform - Microservices Project

## 📋 Description
Une plateforme de réservation de salles de réunion développée avec une architecture microservices.

## 🏗️ Architecture
- **Room Service** (Java Spring Boot) : Gestion des salles
- **Booking Service** (Python FastAPI) : Gestion des réservations
- **User Service** (Node.js Express) : Authentification et gestion utilisateurs
- **API Gateway** (Node.js) : Point d'entrée unique
- **Frontend** (React) : Interface utilisateur

## 🚀 Démarrage rapide

### Prérequis
- Docker
- Docker Compose

### 1. Cloner le projet
```bash
git clone <votre-repo>
cd room-booking-platform

## 📡 API Endpoints

### Room Service (Java - Port 8080)
```
GET    /api/rooms                    # Liste des salles
GET    /api/rooms/{id}              # Détails d'une salle
POST   /api/rooms                   # Créer une salle
GET    /api/rooms/health            # Health check
```

### Booking Service (Python - Port 8000)
```
POST   /bookings/                   # Créer une réservation
GET    /bookings/                   # Liste des réservations
DELETE /bookings/{id}               # Annuler une réservation
GET    /health                      # Health check
```

### User Service (Node.js - Port 3000)
```
POST   /auth/register              # Inscription
POST   /auth/login                 # Connexion
GET    /users/profile              # Profil utilisateur
GET    /health                     # Health check
```

## 🐳 Docker Images
Les images sont disponibles sur Docker Hub :
- `votrenom/room-service:1.0`
- `votrenom/booking-service:1.0`
- `votrenom/user-service:1.0`

## 📊 Stack Technique
- **Backend** : Java 17, Python 3.9, Node.js 18
- **Frameworks** : Spring Boot, FastAPI, Express
- **Base de données** : H2 (Java), SQLite (Python), In-memory (Node.js)
- **Conteneurisation** : Docker, Docker Compose
- **Orchestration** : Kubernetes (à venir)

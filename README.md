# progdistweb

# 🎯 **IDÉE DE PROJET Plateforme de Réservation de Salles de Réunion**

## 📋 **Description du projet**
Une application pour réserver des salles de réunion dans une entreprise. Simple, concret et idéal pour illustrer les microservices.

**Pourquoi ce projet est parfait :**
1. **Domaine simple** mais avec des règles métier intéressantes
2. **Plusieurs entités** (salles, réservations, utilisateurs, équipements)
3. **Fonctionnalités claires** : recherche, réservation, annulation, notifications
4. **Scalabilité évidente** : entreprise → multi-sites → multi-entreprises

---

## 🏢 **Architecture Microservices**

### **Service 1 : Service des Salles (Java Spring Boot)**
- Gestion du catalogue des salles
- Capacité, équipements, localisation
- Disponibilités (horaire d'ouverture, maintenance)
```java
// Endpoints REST
GET /rooms                 # Liste toutes les salles
GET /rooms/{id}           # Détails d'une salle
GET /rooms/available      # Salles disponibles à une date
POST /rooms               # Ajouter une salle (admin)
```

### **Service 2 : Service des Réservations (Python FastAPI)**
- Création/modification/annulation des réservations
- Vérification des conflits
- Gestion des règles (durée min/max, annulation)
```python
# Endpoints REST
POST /bookings           # Créer une réservation
GET /bookings/{id}       # Voir une réservation  
DELETE /bookings/{id}    # Annuler une réservation
GET /bookings/user/{userId}  # Historique d'un utilisateur
```

### **Service 3 : Service Utilisateurs (Node.js Express)**
- Authentification (JWT)
- Gestion des profils
- Rôles (employé, manager, admin)
```javascript
// Endpoints REST
POST /auth/login         # Connexion
POST /auth/register      # Inscription
GET /users/{id}          # Profil utilisateur
PUT /users/{id}          # Mettre à jour le profil
```

### **Service 4 : Service de Notifications (Node.js ou Python)**
- Envoi d'emails de confirmation
- Rappels avant les réunions
- Notifications en temps réel (WebSocket optionnel)
```javascript
POST /notifications      # Envoyer une notification
GET /notifications/user/{userId}  # Notifications d'un utilisateur
```

### **Service 5 : API Gateway (Node.js Express)**
- Point d'entrée unique
- Routing vers les microservices
- Authentification centralisée
- Rate limiting

### **Frontend : React Application**
- Interface utilisateur intuitive
- Calendrier des réservations
- Recherche de salles disponibles
- Gestion des réservations

---

## 🗓️ **Fonctionnalités MVP (Minimum Viable Product)**

### **Pour les utilisateurs :**
1. **Recherche de salles** disponibles par date/heure
2. **Réservation** en 3 clics
3. **Visualisation** de ses réservations
4. **Annulation** jusqu'à 1h avant

### **Pour les administrateurs :**
1. **Gestion** du catalogue de salles
2. **Vue globale** des réservations
3. **Reporting** d'utilisation
4. **Gestion** des utilisateurs

---

## 🏗️ **Structure du code**

```
room-booking-platform/
├── room-service/          # Java Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── booking-service/       # Python FastAPI
│   ├── app/
│   ├── requirements.txt
│   └── Dockerfile
├── user-service/          # Node.js Express
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── notification-service/  # Node.js
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── api-gateway/           # Node.js Express
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── frontend/              # React
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── k8s/
│   ├── room-deployment.yaml
│   ├── booking-deployment.yaml
│   ├── user-deployment.yaml
│   ├── notification-deployment.yaml
│   ├── gateway-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── ingress.yaml
└── README.md
```

---

## 📊 **Plan de développement (binôme)**

### **Semaine 1 : Un seul service (10/20 points)**
**Service des Salles (Java Spring Boot) :**
- [ ] Configuration Spring Boot
- [ ] Modèle : `Room(id, name, capacity, equipment[], location)`
- [ ] Repository avec H2 database
- [ ] Controller REST
- [ ] Tests unitaires
- [ ] Dockerfile
- [ ] Tester localement avec Docker

### **Semaine 2 : Deuxième service + Frontend**
**Binôme A : Service Réservations (Python FastAPI)**
- [ ] Configuration FastAPI
- [ ] Modèle : `Booking(id, roomId, userId, startTime, endTime, status)`
- [ ] Logique de vérification des conflits
- [ ] Dockerfile

**Binôme B : Frontend React**
- [ ] Setup React avec Vite
- [ ] Page liste des salles
- [ ] Formulaire de recherche
- [ ] Appel API au service Salles

### **Semaine 3 : Services restants + Communication**
**Binôme A : Service Utilisateurs (Node.js)**
- [ ] Authentification JWT
- [ ] Modèle User
- [ ] Routes login/register/profile

**Binôme B : API Gateway + Docker Compose**
- [ ] Configuration Express Gateway
- [ ] Routes vers tous les services
- [ ] docker-compose.yml qui lance tout

### **Semaine 4 : Kubernetes + Bonus**
**Ensemble :**
- [ ] Déploiement Kubernetes
- [ ] Services et Ingress
- [ ] Tests sur Minikube
- [ ] Documentation

**Bonus (si temps) :**
- [ ] Service Notifications
- [ ] gRPC entre services
- [ ] Déploiement cloud

---

## 🎯 **Points techniques couverts**

| Exigence | Comment c'est couvert |
|----------|----------------------|
| Microservices REST | 4-5 services distincts |
| Langages multiples | Java, Python, Node.js |
| Docker | Dockerfile par service |
| Kubernetes | Déploiements, Services, Ingress |
| Frontend | React moderne |
| Patterns | API Gateway, Circuit Breaker (option) |
| Communication inter-services | REST API calls |
| Base de données | Polyglot persistence (H2, SQLite, MongoDB) |


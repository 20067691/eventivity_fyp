# eventivity_fyp
# Eventivity – Adaptive Web App for Events

**Eventivity** is a progressive web application (PWA) designed for managing and enhancing real-world events like conferences, cultural festivals, and educational workshops. While the app's core features remain consistent, the interface adapts visually to suit each event’s unique theme.

---

## 🌐 Live Demo (Coming Soon)
> A themed landing page for EASA Seanchai 2026 will be showcased here.

---

## Features

-  Themed landing pages per event
-  Event schedule/timetable
-  Google Maps integration
-  Forum/blog area for attendees
-  User authentication via AWS Cognito
-  QR codes that link to workshop videos
-  PWA with offline support 

---

## Tech Stack

### Frontend
- HTML, JavaScript, Tailwind CSS / Material UI
- ReactJS 
- Google Maps Embed/API
- QR Code generator

### Backend
- Node.js + Express

### Cloud Infrastructure (via AWS)
- S3 + CloudFront (PWA hosting)
- EC2 (backend)
- DynamoDB (data storage)
- Cognito (user authentication)

---

## 🚀 Improvements Log (Post-Launch Ideas)

| Feature | Status | Notes |
|:--------|:-------|:------|
| Password Visibility Toggle | ❌ | Add a toggle icon (👁️) to show/hide password fields in SignUp and SignIn forms for better usability. |
| Enforce Unique Email During SignUp | ❌ | Modify backend/user pool rules to enforce unique emails like usernames, preventing duplicate accounts. |
| Sign In / Sign Up navigation | ❌ | Have links on the home page to give options if a user already has an account or needs to sign up  |


---

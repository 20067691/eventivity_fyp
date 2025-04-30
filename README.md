# Eventivity

**Dynamic Event Management Progressive Web App**

Eventivity is a responsive, installable progressive web app (PWA) built with React and AWS. It provides a themed, adaptive event experience featuring workshop schedules, interactive maps, a user forum, and QR-enhanced content navigation.

---

## 🚀 Live Demo

Hosted on [AWS Amplify](https://main.abcdef123.amplifyapp.com)\
📱 Installable as a PWA on desktop and mobile.

---

## 🧠 Key Features

### 🗺️ Adaptive Landing Page

- Google Map with event markers
- Click marker to reskin the app and enter event-specific content
- Minimalist UI with dynamic theming per event

### 📅 Workshop Schedule

- Responsive Bento Grid layout with visual variety
- Each card opens a modal with quick info
- "View Full" button opens Workshop Detail tabbed view:
  - **Overview**
  - **Video** (static demo video)
  - **QR Code** (to share the workshop page)

### 👥 Forum System

- Users can create and delete posts with media (image/video)
- Post filtering
- Comments are supported per post
- Media stored in AWS S3
- Forum fully themed per event

### 📆 Personal Calendar

- Add events or workshops to your calendar
- Accessible from avatar dropdown menu
- Static-only (non-persistent) for demo purposes

### 🔐 Authentication

- Uses AWS Cognito + OIDC
- Avatar dropdown shows user info and session controls
- Protected routes redirect unauthenticated users

### 🛠️ Tech Stack

- **Frontend**: React + Vite + TailwindCSS
- **Auth**: AWS Cognito (OIDC)
- **Storage**: AWS S3
- **Backend**: AWS Lambda + API Gateway + DynamoDB
- **Hosting**: AWS Amplify

---

## 📂 Folder Structure

```
/src
  /components       // Shared UI components
  /pages            // Route components (Landing, WorkshopPage, etc.)
  /data             // Static data (events, workshops)
  /context          // React context (Auth, Event, Calendar)
  /hooks            // Custom hooks (useTheme, useAuth)
  /ui               // Reusable design components (BentoGrid, AvatarDropdown)
  /assets           // Icons, logos, etc.
```

---

## 🧪 Setup Locally

```bash
git clone https://github.com/dean/eventivity_fyp.git
cd eventivity_fyp
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start.

---

## 📦 Build for Production

```bash
npm run build
```

This generates a PWA-ready `/dist` folder deployed via AWS Amplify.

---

## 🔗 QR Demo Links

- Event QR codes lead to `/app/workshops/:slug`
- Generated using `react-qr-code`

---

## 📱 PWA Support

- Install from browser (desktop or Android)
- Offline support via service worker
- `manifest.json` included for icons/splash

---

## 📋 Future Improvements

- Persistent calendar integration (e.g. localStorage or DynamoDB)
- Workshop-specific video uploads
- Real-time chat or updates

---

## 👨‍💻 Author

Dean Sinnott | BSc (Hons) in Applied Computing @ Southeast Technological University

---



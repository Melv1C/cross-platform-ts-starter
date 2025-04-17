# Cross-Platform TypeScript Starter

A starter template for building cross-platform applications using TypeScript, with separate projects for:

- 🌐 Web frontend
- 📱 Mobile (React Native/Expo)
- 🖥️ Desktop (Electron)
- 🖧 Backend server

## Project Structure

```
cross-platform-ts-starter/
├── web/         # Web application
├── mobile/      # Mobile application (React Native)
├── desktop/     # Desktop application (Electron)
├── backend/     # Backend server
└── shared/      # Shared code between platforms
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/cross-platform-ts-starter.git
   cd cross-platform-ts-starter
   ```

2. Install dependencies for each platform

   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install web dependencies
   cd ../web
   npm install

   # Install mobile dependencies
   cd ../mobile
   npm install

   # Install desktop dependencies
   cd ../desktop
   npm install
   ```

## Development

### Running the backend

```
cd backend
npm run dev
```

### Running the web app

```
cd web
npm run dev
```

### Running the mobile app

```
cd mobile
npm run android # or npm run ios for iOS
```

### Running the desktop app

```
cd desktop
npm run dev
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

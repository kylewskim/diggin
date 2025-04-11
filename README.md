# Diggin

A web clipping and organization service that automatically saves content when users copy text, images, and insights from the web.

## Project Structure

- `web`: Main dashboard app (React + TypeScript + TailwindCSS + Vite)
- `extension`: Chrome extension (React + TypeScript + TailwindCSS + Vite)
- `shared`: Shared code (Firebase initialization, type definitions, etc.)

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
Create `.env` files in both `web` and `extension` directories with the following variables:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

3. Start development servers:
```bash
# Start web app
pnpm dev:web

# Start extension development
pnpm dev:extension
```

4. Build for production:
```bash
# Build web app
pnpm build:web

# Build extension
pnpm build:extension
```

## Features

- Automatic content saving from Chrome extension
- Firebase storage for user data
- Web dashboard for content management
- Firebase Authentication (email/password)

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite
- Firebase
- Chrome Extension API



## Contact Information
Lead Developer & Designer: Zeyi Chen
Email: zeyi19@uw.edu
GitHub: github.com/babu111
Client Contact: Kyle Kim

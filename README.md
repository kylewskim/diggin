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
- Google Authentication (OAuth 2.0)
- Bookmark and tagging system for saved content

## Tech Stack

- React
- TypeScript
- TailwindCSS
- Vite
- Firebase (Auth, Firestore)
- Chrome Extension API

## Data Model

The application uses the following data model:

### User
- Basic profile information from Google Auth
- Timestamp of the last login

### Hole
- Container for organizing content by topic/purpose
- Each hole has a name and an icon
- Users can have multiple holes

### Session
- Represents a period of active collection
- Each hole can have multiple sessions
- Only one active session per hole at a time

### TextEntry
- Text content captured when a user copies text
- Source URL and domain are tracked
- Can be bookmarked and tagged

For more details on the backend implementation, see [Backend Documentation](./shared/src/services/README.md).

### Progress
- Completed most components used on extension
- Migrating web-based version to chrome extension
- Handling login issue (Google-firebase login crash)

## Contact Information
- Lead Developer & Designer: Zeyi Chen
- Email: zeyi19@uw.edu
- GitHub: github.com/babu111
- Client Contact: Kyle Kim

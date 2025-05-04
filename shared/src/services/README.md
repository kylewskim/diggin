# Diggin Backend Implementation

This directory contains the backend services for the Diggin application, which are built with Firebase services including Firebase Auth and Firestore.

## Authentication

Authentication is handled using Google Auth through Firebase Authentication. The `auth.ts` service provides the following functionality:

- `signInWithGoogle()`: Authenticates the user with Google and creates/updates the user document in Firestore
- `signOut()`: Signs out the current user
- `getCurrentUserData()`: Retrieves the user's data from Firestore
- `onAuthStateChange()`: Provides a listener for auth state changes

## Data Model

The application uses the following data model:

### User
- `uid`: Unique identifier
- `email`: User's email
- `displayName`: User's name
- `photoURL`: User's profile photo
- `lastLogin`: Timestamp of the last login

### Hole
- `id`: Unique identifier
- `userId`: Owner's user ID
- `name`: Name of the hole
- `icon`: Icon identifier
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

### Session
- `id`: Unique identifier
- `holeId`: Parent hole ID
- `name`: Session name
- `startTime`: Start timestamp
- `endTime`: End timestamp (null if still active)
- `isActive`: Boolean indicating if session is active

### TextEntry
- `id`: Unique identifier
- `sessionId`: Parent session ID
- `content`: Copied text content
- `sourceUrl`: URL where the text was copied from
- `sourceDomain`: Domain extracted from the URL
- `capturedAt`: Timestamp when the text was captured
- `isBookmarked`: Boolean indicating if the entry is bookmarked
- `tags`: Optional array of tags

## Services

### Hole Service
- `createHole()`: Creates a new hole
- `getHole()`: Gets a hole by ID
- `getUserHoles()`: Gets all holes for a user
- `updateHole()`: Updates a hole
- `deleteHole()`: Deletes a hole

### Session Service
- `createSession()`: Creates a new session
- `getSession()`: Gets a session by ID
- `getHoleSessions()`: Gets all sessions for a hole
- `getActiveSession()`: Gets the active session for a hole, if any
- `updateSession()`: Updates a session
- `endSession()`: Ends a session

### Text Entry Service
- `createTextEntry()`: Creates a new text entry
- `getTextEntry()`: Gets a text entry by ID
- `getSessionEntries()`: Gets all text entries for a session with pagination
- `getBookmarkedEntries()`: Gets all bookmarked text entries
- `toggleBookmark()`: Toggles bookmark status of a text entry
- `updateTags()`: Updates tags for a text entry

## React Contexts

The application provides React contexts for state management:

### AuthContext
- Provides authentication state and methods
- Tracks current user and authentication status
- Provides signin and signout functionality

### HoleContext
- Manages hole state and related data (sessions, entries)
- Provides methods for creating, updating, and deleting holes
- Manages active session and text entries for the selected hole

## Firestore Security Rules

The Firestore database should be secured with appropriate rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /holes/{holeId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    match /sessions/{sessionId} {
      allow read, write: if request.auth != null && exists(/databases/$(database)/documents/holes/$(resource.data.holeId)) && 
                           get(/databases/$(database)/documents/holes/$(resource.data.holeId)).data.userId == request.auth.uid;
    }
    
    match /textEntries/{entryId} {
      allow read, write: if request.auth != null && 
                          exists(/databases/$(database)/documents/sessions/$(resource.data.sessionId)) && 
                          exists(/databases/$(database)/documents/holes/$(get(/databases/$(database)/documents/sessions/$(resource.data.sessionId)).data.holeId)) && 
                          get(/databases/$(database)/documents/holes/$(get(/databases/$(database)/documents/sessions/$(resource.data.sessionId)).data.holeId)).data.userId == request.auth.uid;
    }
  }
} 
 
 
 
 
# Diggin 🔍

**An intelligent web research companion that automatically captures and organizes your insights while browsing.**

Diggin transforms how you collect and manage insights from the web by automatically saving content when you copy text, helping researchers, students, and professionals organize their findings without breaking their flow.

## 🌟 What is Diggin?

In today's information-rich world, we often find ourselves copy-pasting valuable insights from multiple sources during research. Diggin was born from the need to streamline this process and eliminate the friction between discovering insights and organizing them effectively.

### Key Problems We Solve:
- **Fragmented Research**: No more losing track of important insights across multiple tabs and sessions
- **Context Loss**: Automatically captures source URLs and timestamps with every insight
- **Manual Organization**: Smart categorization through "Holes" (research topics) and Sessions
- **Workflow Disruption**: Seamless capture that doesn't interrupt your browsing experience

### How It Works:
1. **Install Extension**: Add our Chrome extension to your browser
2. **Create Research Holes**: Organize your research by topics (e.g., "AI Research", "Market Analysis")
3. **Start Sessions**: Begin focused research sessions within each hole
4. **Auto-Capture**: Simply copy text as you normally would - we'll save it automatically
5. **Analyze & Review**: Use our web dashboard to review, highlight, and analyze your collected insights

## 🚀 Live Demo

**Try it now: [https://famous-donut-955ac6.netlify.app](https://famous-donut-955ac6.netlify.app)**

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- Chrome Browser
- Firebase Account (for authentication)

### Chrome Extension Setup

1. **Build the Extension:**
```bash
cd extension
npm install
npx vite build
```

2. **Install in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (top right toggle)
   - Click "Load unpacked"
   - Select the `extension/dist` folder
   - The Diggin extension should now appear in your extensions bar

3. **Start Using:**
   - Click the Diggin icon in your Chrome toolbar
   - Sign in with Google
   - Create your first "Hole" (research topic)
   - Start a session and begin copying insights!

### Web Dashboard

**Option 1: Use Live Site**
- Visit [https://famous-donut-955ac6.netlify.app](https://famous-donut-955ac6.netlify.app)
- Sign in with the same Google account used in the extension

**Option 2: Run Locally**
```bash
cd web
npm install
npm run dev
```
Then visit `http://localhost:5173`

## 🛠 Development Setup

### Project Structure
```
diggin/
├── web/              # React dashboard application
├── extension/        # Chrome extension
├── shared/          # Shared code (Firebase, types, services)
└── README.md
```

### Environment Variables
Create `.env` files in both `web` and `extension` directories:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Development Commands
```bash
# Install all dependencies
pnpm install

# Start web development server
pnpm dev:web

# Start extension development
pnpm dev:extension

# Build for production
pnpm build:web
pnpm build:extension
```

## ✨ Features

### 🔍 **Smart Capture**
- Automatic text saving when copying content
- Source URL and timestamp tracking
- Context preservation across browsing sessions

### 📂 **Organized Research**
- **Holes**: Topic-based organization (e.g., "AI Research", "Market Analysis")
- **Sessions**: Time-bounded research periods within each hole
- **Insights**: Individual pieces of captured content with full context

### 🎯 **Intelligent Dashboard**
- Visual insights overview with source thumbnails
- Advanced search and filtering capabilities
- Highlight and bookmark important findings
- Session analytics (time spent, insights collected)

### 🔐 **Secure & Private**
- Google OAuth authentication
- Firebase security rules
- Personal data ownership

## 🏗 Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS
- **Build Tool**: Vite
- **Backend**: Firebase (Auth, Firestore)
- **Extension**: Chrome Extension Manifest V3
- **Deployment**: Netlify (Web), Chrome Web Store (Extension)

## 📊 Data Architecture

### Core Entities
- **User**: Google Auth profile with research preferences
- **Hole**: Research topic container with custom icons
- **Session**: Time-bound research periods with analytics
- **TextEntry**: Captured insights with source attribution
- **Highlights**: Important insights marked for quick access

For detailed API documentation, see [Backend Documentation](./shared/src/services/README.md).

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
1. Follow TypeScript best practices
2. Use conventional commit messages
3. Add tests for new features
4. Update documentation as needed

## 📞 Contact & Support

- **Lead Developer**: Kyle Kim
- **Email**: kylewskim@uw.edu
- **Project Repository**: [GitHub](https://github.com/your-repo/diggin)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Research! 🎉**

*Diggin helps you dig deeper into your research while keeping everything organized and accessible.*

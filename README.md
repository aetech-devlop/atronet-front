# Atronet Frontend

A modern React-based frontend application for monitoring and managing industrial automation systems.

## Project Structure

```
atronet-front/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard/       # Dashboard-specific components
│   │   └── ProtectedRoute   # Authentication route wrapper
│   ├── config/             # Configuration files
│   ├── contexts/           # React contexts
│   ├── entities/          # Domain entities and API integration
│   ├── pages/             # Page components
│   ├── shared/            # Shared utilities and hooks
│   │   ├── api/           # API configuration and types
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions and libraries
│   │   ├── store/         # State management
│   │   └── ui/            # UI components (shadcn/ui)
│   └── mocks/             # API mocking setup
├── public/                # Static assets
└── rtsp-config/          # RTSP streaming configuration
```

## Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Query, Zustand
- **API Integration:** Axios
- **Development:** ESLint, PostCSS

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm or Bun package manager
- Git

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_TOKEN_KEY=auth_token

# RTSP Stream Configuration
VITE_RTSP_SERVER_URL=ws://localhost:8083
VITE_STREAM_KEY=your_stream_key

# Feature Flags
VITE_ENABLE_MOCK_API=false
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd atronet-front
   ```

2. Install dependencies:
   ```bash
   # Using npm
   npm install

   # Using Bun
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   # Using npm
   npm run dev

   # Using Bun
   bun dev
   ```

5. For RTSP streaming setup:
   ```bash
   # Start the RTSP server
   docker-compose -f docker-compose.rtsp.yml up
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Code Organization

- Components should be placed in appropriate directories under `src/components`
- Shared components should go in `src/shared/ui`
- API integration code should be organized by domain in `src/entities`
- Use hooks from `src/shared/hooks` for common functionality

### Best Practices

- Use TypeScript for type safety
- Follow the established project structure
- Implement proper error handling
- Write meaningful commit messages
- Keep components small and focused
- Use proper code formatting

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request
4. Ensure all tests pass and code meets quality standards

## Deployment

For deployment instructions, please refer to your specific hosting platform's documentation. The project can be built using:

```bash
npm run build
```

This will create a `dist` directory with the production-ready files.

## License

[Add your license information here]
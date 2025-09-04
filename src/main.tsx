import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Start app without MSW for real API calls
async function startApp() {
  createRoot(document.getElementById("root")!).render(<App />);
}

startApp();

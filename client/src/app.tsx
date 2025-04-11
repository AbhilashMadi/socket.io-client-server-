import ChatApp from "@chat-app/chat-app"
import { ThemeProvider } from "@/components/context/theme-provider"

function App() {
  return (<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <ChatApp />
  </ThemeProvider>)
}

export default App

import { useState } from "react"
import AppShell from "./components/AppShell"
import LoginPage from "./pages/LoginPage"
import StudentDashboard from "./pages/StudentDashboard"
import TeacherDashboard from "./pages/TeacherDashboard"
import CampusFeed from "./pages/CampusFeed"
import MessagesPage from "./pages/MessagesPage"
import type { Role, View } from "./types"

export default function App() {
  const [role, setRole] = useState<Role | null>(null)
  const [view, setView] = useState<View>("dashboard")
  const [darkMode, setDarkMode] = useState(false)

  if (!role) {
    return (
      <div className={darkMode ? "dark" : ""}>
        <LoginPage
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode((value) => !value)}
          onLogin={(selectedRole) => {
            setRole(selectedRole)
            setView("dashboard")
          }}
        />
      </div>
    )
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <AppShell
        currentView={view}
        darkMode={darkMode}
        role={role}
        onLogout={() => setRole(null)}
        onNavigate={setView}
        onThemeToggle={() => setDarkMode((value) => !value)}
      >
        {view === "dashboard" && role === "student" && <StudentDashboard />}
        {view === "dashboard" && role === "teacher" && <TeacherDashboard />}
        {view === "feed" && <CampusFeed role={role} />}
        {view === "messages" && <MessagesPage />}
      </AppShell>
    </div>
  )
}

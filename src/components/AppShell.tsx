import type { ReactNode } from "react"
import { useState } from "react"
import {
  Award,
  BarChart,
  Bell as BellIcon,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CreditCard,
  FileCheck2,
  FileText,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  MessageSquareText,
  Moon,
  Search as SearchIcon,
  ShieldCheck,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
  UsersRound,
  X,
} from "./icons"
import Brand from "./Brand"
import Modal from "./Modal"
import { useStore, setState, visibleNotice } from "../store.js"
import { timeAgo } from "../util.js"

const TAB_ICONS: Record<string, any> = {
  home: LayoutDashboard,
  connect: UsersRound,
  notices: Megaphone,
  events: Award,
  marks: BarChart,
  attendance: Clock3,
  assignments: FileCheck2,
  timetable: CalendarDays,
  leave: FileText,
  fees: CreditCard,
  lostfound: HelpCircle,
  counselling: MessageSquareText,
  documents: FileText,
  staff: Users,
  profile: GraduationCap,
  people: UsersRound,
  users: Users,
  reports: BarChart,
  teachers: GraduationCap,
  feedback: Star,
  assistant: Sparkles,
  library: BookOpen,
  sports: Trophy,
  od: FileCheck2,
}

const GROUPS = [
  {
    title: "Core Workspace",
    keys: ["home", "connect", "assistant", "notices", "documents", "profile"],
  },
  {
    title: "Academics & Records",
    keys: ["marks", "attendance", "assignments", "timetable", "events", "od", "leave"],
  },
  {
    title: "Campus Services",
    keys: ["library", "sports", "fees", "counselling", "lostfound", "staff", "feedback"],
  },
  {
    title: "Administration",
    keys: ["people", "users", "teachers", "reports"],
  },
]

type AppShellProps = {
  children: ReactNode
  user: any
  tabs: [string, string][]
  currentTab: string
  onNavigate: (tabKey: string) => void
  onMoveHistory: (direction: number) => void
  canBack: boolean
  canForward: boolean
  darkMode: boolean
  onThemeToggle: () => void
  onLogout: () => void
}

export default function AppShell({
  children,
  user,
  tabs,
  currentTab,
  onNavigate,
  onMoveHistory,
  canBack,
  canForward,
  darkMode,
  onThemeToggle,
  onLogout,
}: AppShellProps) {
  const s = useStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [bellOpen, setBellOpen] = useState(false)
  const [snap, setSnap] = useState(0)
  const [q, setQ] = useState("")

  const initials = (user?.name || "U")
    .split(" ")
    .map((w: string) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const userDetail =
    user?.role === "student"
      ? `${user.branch || "Campus"} · ${user.batch || ""} Sec ${user.section || ""}`
      : `${user?.designation || user?.role?.replace("_", " ") || "Faculty"}${user?.dept ? ` · ${user.dept}` : ""}`

  // Project A Search logic
  const t = q.trim().toLowerCase()
  const has = (x: string) => (x || "").toLowerCase().includes(t)
  const searchResults = !t
    ? []
    : [
        ...(user?.role !== "student"
          ? s.users
              .filter((u: any) => u.role === "student" && has(u.name))
              .map((u: any) => ["Student", u.name, "people"])
          : []),
        ...(user?.role === "admin"
          ? s.users
              .filter((u: any) => u.role === "teacher" && has(u.name))
              .map((u: any) => ["Teacher", u.name, "teachers"])
          : []),
        ...s.events.filter((e: any) => has(e.title)).map((e: any) => ["Event", e.title, "events"]),
        ...s.assignments
          .filter((a: any) => has(a.title))
          .map((a: any) => ["Assignment", a.title, "assignments"]),
        ...s.channels
          .filter((c: any) => has(c.name))
          .map((c: any) => [c.type === "club" ? "Club" : "Group", c.name, "connect"]),
        ...s.notices
          .filter((n: any) => visibleNotice(n, user) && has(n.title))
          .map((n: any) => ["Notice", n.title, "notices"]),
        ...s.staff
          .filter((f: any) => has(f.name) || has(f.role))
          .map((f: any) => ["Staff", `${f.name} · ${f.role}`, "staff"]),
      ].slice(0, 8)

  // Project A Notification Bell logic
  const today = new Date().toISOString().slice(0, 10)
  const loanAlerts = s.libraryIssues
    .filter(
      (issue: any) =>
        issue.studentId === user?.id &&
        issue.status === "issued" &&
        issue.dueDate &&
        issue.dueDate <= new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)
    )
    .map((issue: any) => ({
      id: "loan-reminder-" + issue.id,
      userId: user.id,
      text:
        issue.dueDate < today
          ? `${issue.bookTitle} is overdue. It was due ${issue.dueDate}.`
          : `Return ${issue.bookTitle} by ${issue.dueDate}.`,
      time: Date.parse(issue.dueDate + "T00:00:00") - 3 * 86400000,
    }))
  const mineAlerts = [
    ...s.notifications.filter((n: any) => n.userId === "all" || n.userId === user?.id),
    ...loanAlerts,
  ].sort((a: any, b: any) => b.time - a.time)
  const readAt = s.readAt[user?.id] || 0
  const unread = mineAlerts.filter((n: any) => n.time > readAt).length

  const toggleBell = () => {
    if (!bellOpen && user?.id) {
      setSnap(readAt)
      setState((d: any) => ((d.readAt[user.id] = Date.now()), d))
    }
    setBellOpen(!bellOpen)
  }

  const navigate = (tabKey: string) => {
    onNavigate(tabKey)
    setMenuOpen(false)
  }

  const availableKeys = new Set(tabs?.map(([k]) => k) || [])
  const tabLabelMap = Object.fromEntries(tabs?.map(([k, label]) => [k, label]) || [])

  return (
    <div className="min-h-screen bg-[#f6f6f2] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-[#0d0e10] px-5 py-6 text-white transition-transform lg:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Brand inverse />
          <button
            aria-label="Close navigation"
            className="grid size-9 place-items-center rounded-full border border-white/10 text-white/60 lg:hidden"
            onClick={() => setMenuOpen(false)}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-6 overflow-y-auto pr-1">
          {GROUPS.map((group) => {
            const groupTabs = group.keys.filter((k) => availableKeys.has(k))
            if (groupTabs.length === 0) return null
            return (
              <div key={group.title}>
                <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                  {group.title}
                </p>
                <nav className="mt-2 space-y-1">
                  {groupTabs.map((key) => {
                    const Icon = TAB_ICONS[key] || LayoutDashboard
                    const active = key === currentTab
                    return (
                      <button
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-white text-slate-950 shadow-sm"
                            : "text-white/60 hover:bg-white/7 hover:text-white"
                        }`}
                        key={key}
                        onClick={() => navigate(key)}
                        type="button"
                      >
                        <Icon className="size-[18px]" strokeWidth={1.8} />
                        <span className="truncate">{tabLabelMap[key]}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            )
          })}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/55">
            <GraduationCap className="size-4" />
            Academic year 2025–26
          </div>
          <div className="flex items-center gap-3 border-t border-white/10 pt-3">
            {user?.photo ? (
              <img
                src={user.photo}
                alt={user?.name}
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <div className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-500 text-xs font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{user?.name}</p>
              <p className="truncate text-xs text-white/40">{userDetail}</p>
            </div>
            <button
              aria-label="Log out"
              className="text-white/40 transition hover:text-white"
              onClick={onLogout}
              title="Log out"
              type="button"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>

      {menuOpen && (
        <button
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuOpen(false)}
          type="button"
        />
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center gap-2 border-b border-slate-200/80 bg-[#f6f6f2]/90 px-4 backdrop-blur-xl sm:px-8 dark:border-slate-800 dark:bg-slate-950/90">
          <button
            aria-label="Open navigation

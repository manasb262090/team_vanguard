import type { ReactNode } from "react"
import {
  Bell,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquareText,
  Moon,
  Search,
  ShieldCheck,
  Sun,
  UsersRound,
  X,
} from "./icons"
import { useState } from "react"
import type { Role, View } from "../types"
import Brand from "./Brand"
import Modal from "./Modal"

type AppShellProps = {
  children: ReactNode
  currentView: View
  darkMode: boolean
  role: Role
  onLogout: () => void
  onNavigate: (view: View) => void
  onThemeToggle: () => void
}

const navItems = [
  { id: "dashboard" as const, label: "Overview", icon: LayoutDashboard },
  { id: "feed" as const, label: "Campus feed", icon: UsersRound },
  { id: "messages" as const, label: "Messages", icon: MessageSquareText },
]

export default function AppShell({
  children,
  currentView,
  darkMode,
  role,
  onLogout,
  onNavigate,
  onThemeToggle,
}: AppShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profile =
    role === "student"
      ? { name: "Arjun Mehta", detail: "B.Tech · CSE", initials: "AM" }
      : { name: "Dr. Maya Rao", detail: "Faculty · CSE", initials: "MR" }

  const navigate = (view: View) => {
    onNavigate(view)
    setMenuOpen(false)
  }

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

        <div className="mt-12">
          <p className="px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
            Workspace
          </p>
          <nav className="mt-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = item.id === currentView
              return (
                <button
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-white/60 hover:bg-white/7 hover:text-white"
                  }`}
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  type="button"
                >
                  <Icon className="size-[18px]" strokeWidth={1.8} />
                  {item.label}
                  {item.id === "messages" && (
                    <span className="ml-auto grid size-5 place-items-center rounded-full bg-indigo-500 text-[10px] font-bold text-white">
                      3
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/55">
            <GraduationCap className="size-4" />
            Academic year 2025–26
          </div>
          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <div className="grid size-10 place-items-center rounded-full bg-indigo-500 text-xs font-bold">
              {profile.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{profile.name}</p>
              <p className="truncate text-xs text-white/40">{profile.detail}</p>
            </div>
            <button
              aria-label="Log out"
              className="text-white/40 transition hover:text-white"
              onClick={onLogout}
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
        <header className="sticky top-0 z-20 flex h-20 items-center border-b border-slate-200/80 bg-[#f6f6f2]/90 px-4 backdrop-blur-xl sm:px-8 dark:border-slate-800 dark:bg-slate-950/90">
          <button
            aria-label="Open navigation"
            className="mr-3 grid size-10 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden dark:border-slate-700 dark:bg-slate-900"
            onClick={() => setMenuOpen(true)}
            type="button"
          >
            <Menu className="size-5" />
          </button>
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              aria-label="Search portal"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-indigo-950"
              placeholder="Search people, files or communities..."
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              aria-label="Toggle color theme"
              className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-white"
              onClick={onThemeToggle}
              type="button"
            >
              {darkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
            </button>
            <button
              aria-label="Notifications"
              className="relative grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
              type="button"
            >
              <Bell className="size-4" />
              <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <button
              aria-label="Open student profile"
              className="ml-1 hidden items-center gap-2 rounded-xl px-2 py-1.5 text-sm font-semibold sm:flex"
              onClick={() => setProfileOpen(true)}
              type="button"
            >
              <span className="grid size-8 place-items-center overflow-hidden rounded-full bg-slate-950 text-[10px] text-white dark:bg-white dark:text-slate-950">
                {role === "student" ? (
                  <img
                    alt="Arjun Mehta"
                    className="size-full object-cover"
                    src="https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?crop=faces&fit=crop&fm=jpg&h=160&q=85&w=160"
                  />
                ) : (
                  profile.initials
                )}
              </span>
              <ChevronDown className="size-3.5 text-slate-400" />
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
      {profileOpen && (
        <Modal
          eyebrow={
            role === "student" ? "Verified student profile" : "Faculty profile"
          }
          onClose={() => setProfileOpen(false)}
          title={profile.name}
        >
          <div className="overflow-hidden rounded-2xl bg-slate-950 text-white">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">
              {role === "student" ? (
                <img
                  alt="Arjun Mehta student ID photograph"
                  className="size-28 rounded-2xl border-2 border-white/20 object-cover"
                  src="https://images.unsplash.com/photo-1698510047345-ff32de8a3b74?crop=faces&fit=crop&fm=jpg&h=320&q=90&w=320"
                />
              ) : (
                <span className="grid size-28 place-items-center rounded-2xl bg-indigo-500 text-2xl font-bold">
                  {profile.initials}
                </span>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-3xl">{profile.name}</p>
                  <ShieldCheck className="size-5 text-emerald-400" />
                </div>
                <p className="mt-1 text-sm text-white/50">
                  {role === "student"
                    ? "B.Tech · Computer Science & Engineering"
                    : "Associate Professor · Computer Science"}
                </p>
                <span className="mt-4 inline-flex rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                  Institution verified
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
              {(role === "student"
                ? [
                    ["Student ID", "22CSE1048"],
                    ["Section", "CSE–A"],
                    ["Semester", "VI"],
                    ["Admission", "2022"],
                  ]
                : [
                    ["Faculty ID", "F-CSE-018"],
                    ["Department", "CSE"],
                    ["Office", "B-214"],
                    ["Joined", "2018"],
                  ]
              ).map(([label, value]) => (
                <div
                  className="border-r border-white/10 p-4 last:border-0"
                  key={label}
                >
                  <p className="text-[9px] font-bold uppercase tracking-wider text-white/35">
                    {label}
                  </p>
                  <p className="mt-1 text-xs font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              [
                "Institutional email",
                role === "student"
                  ? "arjun.mehta@campus.edu"
                  : "maya.rao@campus.edu",
              ],
              [
                "Phone",
                role === "student" ? "+91 98765 43210" : "+91 98110 24680",
              ],
              ["Date of birth", role === "student" ? "14 August 2004" : "—"],
              [
                "Academic status",
                role === "student" ? "Active · Regular" : "Active faculty",
              ],
            ].map(([label, value]) => (
              <div
                className="rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                key={label}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {label}
                </p>
                <p className="mt-1 text-sm font-semibold">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              Quick actions
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <button
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-3 text-xs font-semibold text-white dark:bg-white dark:text-slate-950"
                onClick={() => {
                  navigate("dashboard")
                  setProfileOpen(false)
                }}
                type="button"
              >
                <FileText className="size-4" />
                {role === "student" ? "Open my vault" : "Open dashboard"}
              </button>
              <button
                className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold dark:border-slate-700"
                onClick={() => {
                  navigate("feed")
                  setProfileOpen(false)
                }}
                type="button"
              >
                Campus activity
              </button>
              <button
                className="rounded-xl border border-slate-200 px-3 py-3 text-xs font-semibold dark:border-slate-700"
                onClick={() => {
                  navigate("messages")
                  setProfileOpen(false)
                }}
                type="button"
              >
                Open messages
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

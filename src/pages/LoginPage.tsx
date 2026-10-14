import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  LockKeyhole,
  Moon,
  Sun,
  Users,
} from "../components/icons"
import { useState } from "react"
import Brand from "../components/Brand"
import type { Role } from "../types"
import { supabase } from "../supabaseClient"

type LoginPageProps = {
  darkMode: boolean
  onThemeToggle: () => void
  onLogin: (role: Role) => void
}

const institutionalDirectory = {
  "arjun.mehta@campus.edu": {
    branch: "Computer Science & Engineering",
    section: "CSE–A",
    studentId: "22CSE1048",
  },
  "ananya.singh@campus.edu": {
    branch: "Computer Science & Engineering",
    section: "CSE–A",
    studentId: "22CSE1052",
  },
  "rohan.kapoor@campus.edu": {
    branch: "Electronics & Communication",
    section: "ECE–B",
    studentId: "23ECE1021",
  },
} as const

export default function LoginPage({
  darkMode,
  onThemeToggle,
  onLogin,
}: LoginPageProps) {
  const [role, setRole] = useState<Role>("student")
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState("arjun.mehta@campus.edu")
  const [password, setPassword] = useState("campusvault")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)

  const detectedStudent =
    role === "student"
      ? institutionalDirectory[
          (email.trim().toLowerCase() as keyof typeof institutionalDirectory)
        ]
      : null

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    try {
      if (signup) {
        // 1. Handle Registration
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName || "New User",
              role: role, // Passes 'student' or 'teacher' to your database trigger
              enrollment_no: detectedStudent?.studentId || null,
            },
          },
        })

        if (signUpError) throw signUpError

        alert("Account created successfully! You can now sign in.")
        setSignup(false)
      } else {
        // 2. Handle Login Authentication
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (authError) throw authError

        // 3. Fetch role from database profiles table
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("role, status")
          .eq("id", authData.user.id)
          .single()

        if (profileError || !profile) {
          throw new Error("User profile not found in database.")
        }

        // 4. Validate tab role mismatch
        if (role === "teacher" && profile.role === "student") {
          alert("Access Denied: This account is registered as a Student, not a Teacher.")
          await supabase.auth.signOut()
          return
        }

        if (role === "student" && profile.role === "teacher") {
          alert("Access Denied: Please use the Teacher login tab.")
          await supabase.auth.signOut()
          return
        }

        // 5. Trigger successful application login state
        onLogin(profile.role)
      }
    } catch (error: any) {
      alert("Authentication Error: " + (error.message || error))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_0.95fr] dark:bg-slate-950">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#0d0e10] p-12 text-white lg:flex lg:flex-col xl:p-16">
        <div className="absolute -right-40 top-1/3 size-96 rounded-full bg-indigo-500/15 blur-3xl" />
        <Brand inverse />
        <div className="relative my-auto max-w-2xl">
          <p className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-white/45">
            <span className="h-px w-10 bg-white/30" />
            One campus. One trusted space.
          </p>
          <h1 className="font-display text-6xl leading-[0.98] tracking-[-0.04em] xl:text-7xl">
            Academics.
            <br />
            Identity.
            <br />
            Community.
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-8 text-white/55">
            A secure digital campus for verified records, meaningful
            collaboration, and supervised student–faculty connection.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3">
          {[
            { icon: FileCheck2, label: "Verified records" },
            { icon: Users, label: "Campus community" },
            { icon: LockKeyhole, label: "Secure by design" },
          ].map(({ icon: Icon, label }) => (
            <div
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
              key={label}
            >
              <Icon className="mb-3 size-5 text-indigo-300" strokeWidth={1.6} />
              <p className="text-xs font-medium text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-screen flex-col bg-[#f7f7f3] px-5 py-5 dark:bg-slate-950 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Brand />
          </div>
          <button
            aria-label="Toggle color theme"
            className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            onClick={onThemeToggle}
            type="button"
          >
            {darkMode ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
        </div>

        <div className="mx-auto my-auto w-full max-w-md py-10">
          <div className="mb-9">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              {signup ? "Create your account" : "Welcome back"}
            </p>
            <h2 className="font-display pb-0 pl-0 pr-[34px] pt-0 text-4xl leading-tight text-slate-950 dark:text-white sm:text-5xl">
              {signup ? "Join your campus." : "Sign in to continue."}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Use your institutional credentials to access CampusVault.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-200/70 p-1 dark:bg-slate-800">
            {(["student", "teacher"] as const).map((item) => (
              <button
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  role === item
                    ? "bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white"
                    : "text-slate-500 dark:text-slate-400"
                }`}
                key={item}
                onClick={() => {
                  setRole(item)
                  setEmail(
                    item === "student"
                      ? "arjun.mehta@campus.edu"
                      : "maya.rao@campus.edu",
                  )
                }}
                type="button"
              >
                {item === "student" ? "Student" : "Teacher / Admin"}
              </button>
            ))}
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {signup && (
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Full name
                </span>
                <input
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-indigo-950"
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Your full name"
                  value={fullName}
                  required
                />
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Institutional email
              </span>
              <input
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-indigo-950"
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                value={email}
                required
              />
            </label>
            {detectedStudent && (
              <div className="-mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900 dark:bg-emerald-950/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="size-4" />
                  Institutional record detected
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-emerald-200/70 pt-3 dark:border-emerald-900">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/60 dark:text-emerald-400/60">
                      Branch
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-950 dark:text-emerald-200">
                      {detectedStudent.branch}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/60 dark:text-emerald-400/60">
                      Section
                    </p>
                    <p className="mt-1 text-xs font-semibold text-emerald-950 dark:text-emerald-200">
                      {detectedStudent.section}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <label className="block">
              <span className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
                {!signup && (
                  <button
                    className="text-xs text-indigo-600 dark:text-indigo-400"
                    type="button"
                  >
                    Forgot password?
                  </button>
                )}
              </span>
              <input
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-indigo-950"
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                value={password}
                required
              />
            </label>
            <button
              className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400 disabled:opacity-50"
              disabled={loading}
              type="submit"
            >
              {loading
                ? "Processing..."
                : signup
                ? "Create account"
                : `Continue as ${role === "student" ? "student" : "faculty"}`}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="mt-7 flex items-center justify-center gap-2 text-sm text-slate-500">
            {signup ? "Already registered?" : "New to CampusVault?"}
            <button
              className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-4 dark:text-white"
              onClick={() => setSignup((value) => !value)}
              type="button"
            >
              {signup ? "Sign in" : "Create account"}
            </button>
          </div>

          <p className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-400">
            <BookOpen className="size-3.5" />
            Secured by your institution’s identity provider
          </p>
        </div>
      </section>
    </div>
  )
}

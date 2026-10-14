import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileImage,
  FileText,
  Filter,
  Mail,
  Search,
  Send,
  UsersRound,
} from "../components/icons"
import { useMemo, useState } from "react"
import Modal from "../components/Modal"
import type { Student } from "../types"

const students: Student[] = [
  {
    id: "22CSE1048",
    name: "Arjun Mehta",
    initials: "AM",
    className: "Third Year",
    section: "A",
    program: "Computer Science",
    documents: ["Semester IV Marksheet", "National Hackathon", "Student ID"],
  },
  {
    id: "22CSE1052",
    name: "Ananya Singh",
    initials: "AS",
    className: "Third Year",
    section: "A",
    program: "Computer Science",
    documents: ["Semester IV Marksheet", "Research Internship"],
  },
  {
    id: "23ECE1021",
    name: "Rohan Kapoor",
    initials: "RK",
    className: "Second Year",
    section: "B",
    program: "Electronics",
    documents: ["Semester II Marksheet", "Student ID"],
  },
  {
    id: "24CSE1117",
    name: "Sara Khan",
    initials: "SK",
    className: "First Year",
    section: "C",
    program: "Computer Science",
    documents: ["Admission Letter", "Student ID"],
  },
  {
    id: "23ME1034",
    name: "Dev Patel",
    initials: "DP",
    className: "Second Year",
    section: "A",
    program: "Mechanical Engineering",
    documents: ["Semester II Marksheet"],
  },
]

const initialQueries = [
  {
    id: 1,
    student: "Ananya Singh",
    initials: "AS",
    subject: "Elective registration deadline",
    detail:
      "Could you confirm whether Data Visualization is still open for registration?",
    time: "18 min ago",
    category: "Academic",
  },
  {
    id: 2,
    student: "Rohan Kapoor",
    initials: "RK",
    subject: "Bonafide certificate request",
    detail:
      "I need a bonafide certificate for my summer internship application.",
    time: "2 hr ago",
    category: "Administrative",
  },
]

export default function TeacherDashboard() {
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("All classes")
  const [sectionFilter, setSectionFilter] = useState("All sections")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [queries, setQueries] = useState(initialQueries)
  const [replying, setReplying] = useState<number | null>(null)

  const filtered = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch = `${student.name} ${student.id}`
          .toLowerCase()
          .includes(search.toLowerCase())
        const matchesClass =
          classFilter === "All classes" || student.className === classFilter
        const matchesSection =
          sectionFilter === "All sections" || student.section === sectionFilter
        return matchesSearch && matchesClass && matchesSection
      }),
    [classFilter, search, sectionFilter],
  )

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Faculty console
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Good morning, Dr. Rao.
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Computer Science Department · 2025–26
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-500" />
          Student records live
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Students assigned", value: "128", sub: "+8 this semester" },
          {
            label: "Pending queries",
            value: String(queries.length),
            sub: "Oldest: 2 hours",
          },
          { label: "Documents reviewed", value: "42", sub: "This month" },
        ].map((stat, index) => (
          <article
            className={`rounded-2xl border p-5 ${
              index === 0
                ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
                : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
            }`}
            key={stat.label}
          >
            <p
              className={`text-xs font-medium ${
                index === 0 ? "opacity-50" : "text-slate-400"
              }`}
            >
              {stat.label}
            </p>
            <div className="mt-3 flex items-end justify-between">
              <p className="font-display text-4xl">{stat.value}</p>
              <p
                className={`text-xs ${
                  index === 0 ? "opacity-50" : "text-slate-400"
                }`}
              >
                {stat.sub}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.45fr_0.75fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl text-slate-950 dark:text-white">
                  Student directory
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {filtered.length} student records
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <UsersRound className="size-5" />
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
              <label className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950"
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name or student ID"
                  value={search}
                />
              </label>
              <select
                className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium outline-none dark:border-slate-700 dark:bg-slate-950"
                onChange={(event) => setClassFilter(event.target.value)}
                value={classFilter}
              >
                <option>All classes</option>
                <option>First Year</option>
                <option>Second Year</option>
                <option>Third Year</option>
              </select>
              <select
                className="h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-medium outline-none dark:border-slate-700 dark:bg-slate-950"
                onChange={(event) => setSectionFilter(event.target.value)}
                value={sectionFilter}
              >
                <option>All sections</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:border-slate-800">
                  <th className="px-5 py-3 font-bold">Student</th>
                  <th className="px-4 py-3 font-bold">Class</th>
                  <th className="px-4 py-3 font-bold">Section</th>
                  <th className="px-4 py-3 font-bold">Vault</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((student) => (
                  <tr
                    className="cursor-pointer border-b border-slate-100 transition last:border-0 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60"
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {student.initials}
                        </span>
                        <div>
                          <p className="text-sm font-semibold">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-400">{student.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {student.className}
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {student.section}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3.5" />
                        {student.documents.length} files
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="size-4 text-slate-300" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="p-12 text-center">
                <Filter className="mx-auto mb-3 size-6 text-slate-300" />
                <p className="text-sm font-semibold">No matching students</p>
                <p className="mt-1 text-xs text-slate-400">
                  Try changing your filters.
                </p>
              </div>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl text-slate-950 dark:text-white">
                Query management
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Awaiting your response
              </p>
            </div>
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              {queries.length} pending
            </span>
          </div>
          <div className="space-y-3">
            {queries.map((query) => (
              <article
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                key={query.id}
              >
                <div className="flex items-start gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {query.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-semibold">
                        {query.student}
                      </p>
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {query.time}
                      </span>
                    </div>
                    <span className="mt-1 inline-block text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                      {query.category}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-semibold">{query.subject}</p>
                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {query.detail}
                </p>
                {replying === query.id ? (
                  <form
                    className="mt-4"
                    onSubmit={(event) => {
                      event.preventDefault()
                      setQueries((current) =>
                        current.filter((item) => item.id !== query.id),
                      )
                      setReplying(null)
                    }}
                  >
                    <textarea
                      autoFocus
                      className="min-h-20 w-full rounded-xl border border-indigo-300 bg-indigo-50/50 p-3 text-xs outline-none dark:border-indigo-800 dark:bg-indigo-950/20"
                      placeholder="Write your response..."
                      required
                    />
                    <button
                      className="mt-2 flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white"
                      type="submit"
                    >
                      Send response
                      <Send className="size-3" />
                    </button>
                  </form>
                ) : (
                  <button
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold transition hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-700"
                    onClick={() => setReplying(query.id)}
                    type="button"
                  >
                    <Mail className="size-3.5" />
                    Respond
                  </button>
                )}
              </article>
            ))}
            {queries.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
                <CheckCircle2 className="mx-auto mb-3 size-6 text-emerald-500" />
                <p className="text-sm font-semibold">All caught up</p>
                <p className="mt-1 text-xs text-slate-400">
                  No pending student queries.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedStudent && (
        <Modal
          eyebrow={`${selectedStudent.className} · Section ${selectedStudent.section}`}
          onClose={() => setSelectedStudent(null)}
          title={selectedStudent.name}
        >
          <div className="mb-6 flex items-center gap-4 rounded-2xl bg-slate-950 p-5 text-white dark:bg-slate-800">
            <span className="grid size-14 place-items-center rounded-xl bg-indigo-500 text-base font-bold">
              {selectedStudent.initials}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{selectedStudent.id}</p>
                <CheckCircle2 className="size-4 text-emerald-400" />
              </div>
              <p className="mt-1 text-xs text-white/50">
                {selectedStudent.program}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-white/40">
              <Clock3 className="size-3" />
              Live vault
            </div>
          </div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
            Documents & achievements
          </h3>
          <div className="space-y-2">
            {selectedStudent.documents.map((document, index) => (
              <div
                className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-700"
                key={document}
              >
                <span
                  className={`grid size-10 place-items-center rounded-lg ${
                    index % 2 === 0
                      ? "bg-rose-50 text-rose-500 dark:bg-rose-950/40"
                      : "bg-amber-50 text-amber-500 dark:bg-amber-950/40"
                  }`}
                >
                  {index % 2 === 0 ? (
                    <FileText className="size-4" />
                  ) : (
                    <FileImage className="size-4" />
                  )}
                </span>
                <div>
                  <p className="text-sm font-semibold">{document}</p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Verified · Updated this semester
                  </p>
                </div>
                <button
                  className="ml-auto rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold dark:border-slate-700"
                  type="button"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </>
  )
}

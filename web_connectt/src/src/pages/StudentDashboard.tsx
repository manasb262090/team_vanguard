import {
  Award,
  Check,
  CheckCircle2,
  Clock3,
  CloudUpload,
  Eye,
  FileImage,
  FileText,
  GraduationCap,
  MessageSquarePlus,
  MoreHorizontal,
  Send,
  Sparkles,
} from "../components/icons"
import { useRef, useState } from "react"
import Modal from "../components/Modal"

type Document = {
  id: number
  name: string
  meta: string
  type: "pdf" | "image"
  category: string
  previewUrl?: string
}

const initialDocuments: Document[] = [
  {
    id: 1,
    name: "Semester IV Marksheet",
    meta: "PDF · 1.8 MB",
    type: "pdf",
    category: "Academic",
  },
  {
    id: 2,
    name: "National Hackathon",
    meta: "JPG · 2.4 MB",
    type: "image",
    category: "Achievement",
  },
  {
    id: 3,
    name: "Student Identity Card",
    meta: "PDF · 860 KB",
    type: "pdf",
    category: "Identity",
  },
]

export default function StudentDashboard() {
  const [documents, setDocuments] = useState(initialDocuments)
  const [preview, setPreview] = useState<Document | null>(null)
  const [querySent, setQuerySent] = useState(false)
  const [query, setQuery] = useState("")
  const uploadRef = useRef<HTMLInputElement>(null)

  const handleUpload = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    const type = file.type.includes("pdf") ? "pdf" : "image"
    const newDocument: Document = {
      id: Date.now(),
      name: file.name.replace(/\.[^/.]+$/, ""),
      meta: `${
        type === "pdf" ? "PDF" : "IMAGE"
      } · ${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type,
      category: "New upload",
      previewUrl: URL.createObjectURL(file),
    }
    setDocuments((current) => [newDocument, ...current])
    setPreview(newDocument)
  }

  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Student workspace
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Good morning, Arjun.
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Here’s what’s happening across your academic space today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Clock3 className="size-4" />
          Last synced today, 9:42 AM
        </div>
      </div>

      <section className="mb-8 overflow-hidden rounded-3xl bg-[#0d0e10] text-white shadow-xl shadow-slate-950/10">
        <div className="grid lg:grid-cols-[1.4fr_0.6fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute right-0 top-0 size-48 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-indigo-500 text-2xl font-bold">
                AM
              </div>
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-3xl">Arjun Mehta</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[11px] font-bold text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
                    <CheckCircle2 className="size-3" />
                    Verified student
                  </span>
                </div>
                <p className="text-sm text-white/50">
                  B.Tech in Computer Science & Engineering
                </p>
                <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {[
                    ["Roll number", "22CSE1048"],
                    ["Class", "Third Year"],
                    ["Section", "CSE–A"],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-white/10 lg:border-l lg:border-t-0">
            <div className="flex flex-col justify-center border-r border-white/10 p-6">
              <FileText className="mb-5 size-5 text-indigo-300" />
              <p className="font-display text-4xl">{documents.length + 5}</p>
              <p className="mt-1 text-xs text-white/40">Verified documents</p>
            </div>
            <div className="flex flex-col justify-center p-6">
              <Award className="mb-5 size-5 text-amber-300" />
              <p className="font-display text-4xl">12</p>
              <p className="mt-1 text-xs text-white/40">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.55fr_0.75fr]">
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-slate-950 dark:text-white">
                My documents & vault
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your secure, verified academic record.
              </p>
            </div>
            <button
              className="hidden items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 sm:flex"
              onClick={() => uploadRef.current?.click()}
              type="button"
            >
              <CloudUpload className="size-4" />
              Upload file
            </button>
            <input
              accept=".pdf,image/*"
              className="hidden"
              onChange={(event) => handleUpload(event.target.files)}
              ref={uploadRef}
              type="file"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              className="group flex min-h-44 flex-col items-center justify-center rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/50 p-5 text-center transition hover:border-indigo-500 hover:bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/20 dark:hover:border-indigo-600"
              onClick={() => uploadRef.current?.click()}
              type="button"
            >
              <span className="mb-3 grid size-11 place-items-center rounded-xl bg-white text-indigo-600 shadow-sm dark:bg-slate-900 dark:text-indigo-400">
                <CloudUpload className="size-5" />
              </span>
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Add to your vault
              </span>
              <span className="mt-1 text-xs text-slate-400">
                PDF, PNG or JPG up to 10 MB
              </span>
            </button>

            {documents.map((document) => (
              <article
                className="group flex min-h-44 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                key={document.id}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`grid size-11 place-items-center overflow-hidden rounded-xl ${
                      document.type === "pdf"
                        ? "bg-rose-50 text-rose-500 dark:bg-rose-950/40"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-950/40"
                    }`}
                  >
                    {document.type === "image" && document.previewUrl ? (
                      <img
                        alt=""
                        className="size-full object-cover"
                        src={document.previewUrl}
                      />
                    ) : document.type === "pdf" ? (
                      <FileText className="size-5" />
                    ) : (
                      <FileImage className="size-5" />
                    )}
                  </div>
                  <button
                    aria-label={`Options for ${document.name}`}
                    className="text-slate-400"
                    type="button"
                  >
                    <MoreHorizontal className="size-5" />
                  </button>
                </div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {document.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {document.meta}
                    </p>
                  </div>
                  <button
                    aria-label={`Preview ${document.name}`}
                    className="grid size-8 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-500 opacity-100 transition hover:bg-slate-100 sm:opacity-0 sm:group-hover:opacity-100 dark:border-slate-700 dark:hover:bg-slate-800"
                    onClick={() => setPreview(document)}
                    type="button"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <MessageSquarePlus className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-xl text-slate-950 dark:text-white">
                  Raise a query
                </h2>
                <p className="text-xs text-slate-400">
                  Faculty usually replies within 24h
                </p>
              </div>
            </div>
            {querySent ? (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-xl bg-emerald-50 p-6 text-center dark:bg-emerald-950/20">
                <span className="mb-3 grid size-10 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="size-5" />
                </span>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-300">
                  Query submitted
                </p>
                <p className="mt-1 text-xs text-emerald-700/70 dark:text-emerald-400/60">
                  Tracking ID: QRY-1042
                </p>
                <button
                  className="mt-4 text-xs font-semibold text-emerald-800 underline dark:text-emerald-300"
                  onClick={() => {
                    setQuerySent(false)
                    setQuery("")
                  }}
                  type="button"
                >
                  Raise another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  setQuerySent(true)
                }}
              >
                <select className="mb-3 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-indigo-400 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300">
                  <option>Academic</option>
                  <option>Administrative</option>
                  <option>Technical support</option>
                </select>
                <textarea
                  className="min-h-28 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:focus:ring-indigo-950"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Describe your question..."
                  required
                  value={query}
                />
                <button
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950"
                  type="submit"
                >
                  Submit query
                  <Send className="size-3.5" />
                </button>
              </form>
            )}
          </section>

          <section className="overflow-hidden rounded-2xl bg-indigo-600 p-5 text-white">
            <Sparkles className="mb-6 size-5 text-indigo-200" />
            <p className="font-display text-xl">
              Your profile is 85% complete.
            </p>
            <p className="mt-2 text-xs leading-5 text-indigo-100/70">
              Add your Semester V marksheet to keep your vault current.
            </p>
            <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/20">
              <div className="h-full w-[85%] rounded-full bg-white" />
            </div>
          </section>
        </aside>
      </div>

      {preview && (
        <Modal
          eyebrow={preview.category}
          onClose={() => setPreview(null)}
          title={preview.name}
        >
          <div className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-8 dark:border-slate-700 dark:bg-slate-950">
            {preview.type === "pdf" && preview.previewUrl ? (
              <iframe
                className="min-h-[430px] w-full rounded-xl bg-white"
                src={preview.previewUrl}
                title={`Preview of ${preview.name}`}
              />
            ) : preview.type === "pdf" ? (
              <div className="w-full max-w-sm rounded-sm bg-white p-8 shadow-xl">
                <div className="mb-8 h-2 w-24 bg-slate-900" />
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-200" />
                  <div className="h-2 w-5/6 bg-slate-200" />
                  <div className="h-2 w-3/4 bg-slate-200" />
                </div>
                <div className="my-10 grid grid-cols-3 gap-3">
                  <div className="h-16 bg-indigo-50" />
                  <div className="h-16 bg-indigo-50" />
                  <div className="h-16 bg-indigo-50" />
                </div>
                <div className="ml-auto size-14 rounded-full border-4 border-indigo-500/60" />
              </div>
            ) : preview.previewUrl ? (
              <img
                alt={`Uploaded document: ${preview.name}`}
                className="max-h-[520px] w-full rounded-xl object-contain shadow-xl"
                src={preview.previewUrl}
              />
            ) : (
              <div className="flex aspect-[4/3] w-full max-w-md flex-col items-center justify-center rounded-xl border-8 border-white bg-gradient-to-br from-indigo-700 via-indigo-500 to-amber-300 text-center text-white shadow-xl">
                <GraduationCap className="mb-5 size-12" />
                <p className="font-display text-3xl">Certificate</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/70">
                  Award of excellence
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <span>{preview.meta}</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              Institution verified
            </span>
          </div>
        </Modal>
      )}
    </>
  )
}

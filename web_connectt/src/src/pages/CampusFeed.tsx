import {
  Bookmark,
  CalendarDays,
  Check,
  Heart,
  Image,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
} from "../components/icons"
import { useState } from "react"
import type { Role } from "../types"

type CampusFeedProps = {
  role: Role
}

const initialPosts = [
  {
    id: 1,
    name: "Priya Nair",
    initials: "PN",
    group: "AI/ML Club",
    time: "28 min ago",
    text: "We’re opening registrations for this weekend’s beginner-friendly model building sprint. Bring a laptop and your curiosity — datasets, mentors, and snacks are on us.",
    tag: "Club update",
    likes: 42,
    comments: 8,
    accent: "from-indigo-600 to-violet-500",
  },
  {
    id: 2,
    name: "Prof. Aditya Sen",
    initials: "AS",
    group: "Computer Science Department",
    time: "2 hr ago",
    text: "The shortlist for the Inter-University Innovation Challenge is now available. Congratulations to all five teams representing our campus this year.",
    tag: "Faculty announcement",
    likes: 67,
    comments: 12,
    accent: "from-slate-900 to-slate-700",
  },
]

const communities = [
  { name: "AI/ML Club", members: "1.2k", initials: "AI", joined: true },
  { name: "First Year B.Tech", members: "864", initials: "FY", joined: true },
  { name: "Design & Debate", members: "540", initials: "DD", joined: false },
]

export default function CampusFeed({ role }: CampusFeedProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [draft, setDraft] = useState("")
  const [joined, setJoined] = useState(
    () => new Set(["AI/ML Club", "First Year B.Tech"]),
  )

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Supervised campus space
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Campus feed
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Discover conversations, communities, and ideas across campus.
          </p>
        </div>
        <div className="flex max-w-sm items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
          <ShieldCheck className="size-4 shrink-0" />
          All activity is moderated under faculty supervision
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {role === "student" ? "AM" : "MR"}
              </span>
              <textarea
                className="min-h-20 flex-1 resize-none bg-transparent pt-2 text-sm outline-none placeholder:text-slate-400"
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Share an update with your campus..."
                value={draft}
              />
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                className="flex items-center gap-2 text-xs font-semibold text-slate-500"
                type="button"
              >
                <Image className="size-4 text-indigo-500" />
                Add media
              </button>
              <button
                className="flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-950"
                disabled={!draft.trim()}
                onClick={() => {
                  setPosts((current) => [
                    {
                      id: Date.now(),
                      name: role === "student" ? "Arjun Mehta" : "Dr. Maya Rao",
                      initials: role === "student" ? "AM" : "MR",
                      group: "Campus community",
                      time: "Just now",
                      text: draft,
                      tag:
                        role === "student" ? "Student post" : "Faculty update",
                      likes: 0,
                      comments: 0,
                      accent: "from-indigo-600 to-cyan-500",
                    },
                    ...current,
                  ])
                  setDraft("")
                }}
                type="button"
              >
                Post
                <Send className="size-3.5" />
              </button>
            </div>
          </section>

          {posts.map((post) => (
            <article
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              key={post.id}
            >
              <div className="p-5 sm:p-6">
                <div className="flex items-start">
                  <span
                    className={`grid size-11 place-items-center rounded-full bg-gradient-to-br ${post.accent} text-xs font-bold text-white`}
                  >
                    {post.initials}
                  </span>
                  <div className="ml-3">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold">{post.name}</p>
                      <span className="grid size-4 place-items-center rounded-full bg-indigo-500">
                        <Check
                          className="size-2.5 text-white"
                          strokeWidth={3}
                        />
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {post.group} · {post.time}
                    </p>
                  </div>
                  <span className="ml-auto rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {post.tag}
                  </span>
                </div>
                <p className="mt-5 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                  {post.text}
                </p>
                {post.id === 1 && (
                  <div className="mt-5 overflow-hidden rounded-2xl bg-[#0d0e10] p-6 text-white">
                    <div className="flex items-start justify-between">
                      <Sparkles className="size-6 text-indigo-300" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                        Build sprint 02
                      </span>
                    </div>
                    <p className="mt-12 font-display text-3xl leading-tight">
                      From idea
                      <br />
                      to intelligent.
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-xs text-white/50">
                      <CalendarDays className="size-4" />
                      Saturday · Innovation Lab
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-5 border-t border-slate-100 px-5 py-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:px-6">
                <button
                  className="flex items-center gap-2 transition hover:text-rose-500"
                  type="button"
                >
                  <Heart className="size-4" />
                  {post.likes}
                </button>
                <button
                  className="flex items-center gap-2 transition hover:text-indigo-500"
                  type="button"
                >
                  <MessageCircle className="size-4" />
                  {post.comments}
                </button>
                <button
                  className="ml-auto transition hover:text-slate-950 dark:hover:text-white"
                  type="button"
                >
                  <Bookmark className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl text-slate-950 dark:text-white">
                  Communities
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  Spaces for every interest
                </p>
              </div>
              <Users className="size-5 text-indigo-500" />
            </div>
            <div className="space-y-4">
              {communities.map((community) => {
                const isJoined = joined.has(community.name)
                return (
                  <div className="flex items-center gap-3" key={community.name}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {community.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {community.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {community.members} members
                      </p>
                    </div>
                    <button
                      aria-label={`${
                        isJoined ? "Leave" : "Join"
                      } ${community.name}`}
                      className={`grid size-8 place-items-center rounded-lg transition ${
                        isJoined
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30"
                          : "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30"
                      }`}
                      onClick={() =>
                        setJoined((current) => {
                          const next = new Set(current)
                          isJoined
                            ? next.delete(community.name)
                            : next.add(community.name)
                          return next
                        })
                      }
                      type="button"
                    >
                      {isJoined ? (
                        <Check className="size-4" />
                      ) : (
                        <Plus className="size-4" />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="rounded-2xl bg-indigo-600 p-5 text-white">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">
              Campus pulse
            </p>
            <p className="mt-3 font-display text-2xl">1,248</p>
            <p className="mt-1 text-xs text-indigo-100/70">
              Students active this week
            </p>
            <div className="mt-5 flex -space-x-2">
              {["AM", "PN", "RK", "SK", "+9"].map((initials, index) => (
                <span
                  className="grid size-8 place-items-center rounded-full border-2 border-indigo-600 bg-white text-[9px] font-bold text-indigo-700"
                  key={`${initials}-${index}`}
                >
                  {initials}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

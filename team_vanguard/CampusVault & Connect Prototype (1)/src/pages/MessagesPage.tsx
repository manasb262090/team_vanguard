import {
  Info,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  ShieldCheck,
  Users,
} from "../components/icons"
import { useState } from "react"

const conversations = [
  {
    id: 1,
    name: "AI/ML Club",
    initials: "AI",
    preview: "Priya: See you at the lab!",
    time: "9:41",
    unread: 2,
  },
  {
    id: 2,
    name: "Prof. Aditya Sen",
    initials: "AS",
    preview: "The resources are now uploaded.",
    time: "8:15",
    unread: 1,
  },
  {
    id: 3,
    name: "Project Atlas",
    initials: "PA",
    preview: "Rohan: I’ve pushed the changes.",
    time: "Tue",
    unread: 0,
  },
  {
    id: 4,
    name: "First Year B.Tech",
    initials: "FY",
    preview: "New orientation schedule",
    time: "Mon",
    unread: 0,
  },
]

const initialMessages = [
  {
    id: 1,
    own: false,
    author: "Priya",
    text: "Quick reminder: the model building sprint starts at 10 AM on Saturday.",
    time: "9:32 AM",
  },
  {
    id: 2,
    own: false,
    author: "Rohan",
    text: "Do we need to bring our own datasets, or will some be provided?",
    time: "9:35 AM",
  },
  {
    id: 3,
    own: true,
    author: "You",
    text: "The organizers said they’ll provide three starter datasets. We can bring our own too.",
    time: "9:38 AM",
  },
  {
    id: 4,
    own: false,
    author: "Priya",
    text: "Exactly. Mentors will be there throughout the day. See you at the lab!",
    time: "9:41 AM",
  },
]

export default function MessagesPage() {
  const [active, setActive] = useState(conversations[0])
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState("")

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Campus communication
          </p>
          <h1 className="font-display text-4xl tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            Messages
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-400">
          <ShieldCheck className="size-4" />
          All chats are moderated under faculty supervision
        </div>
      </div>

      <div className="grid min-h-[650px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-[300px_1fr]">
        <aside className="border-b border-slate-200 dark:border-slate-800 md:border-b-0 md:border-r">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-xl bg-slate-100 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800"
                placeholder="Search messages"
              />
            </label>
          </div>
          <div className="flex overflow-x-auto p-2 md:block md:overflow-visible">
            {conversations.map((conversation) => (
              <button
                className={`flex min-w-[250px] items-center gap-3 rounded-xl p-3 text-left transition md:min-w-0 md:w-full ${
                  active.id === conversation.id
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
                key={conversation.id}
                onClick={() => setActive(conversation)}
                type="button"
              >
                <span
                  className={`grid size-10 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                    active.id === conversation.id
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  {conversation.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold">
                      {conversation.name}
                    </p>
                    <span className="ml-2 text-[10px] opacity-50">
                      {conversation.time}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="truncate text-xs opacity-50">
                      {conversation.preview}
                    </p>
                    {conversation.unread > 0 && (
                      <span className="ml-auto grid size-4 shrink-0 place-items-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex min-h-[520px] flex-col">
          <header className="flex h-18 items-center border-b border-slate-200 px-5 dark:border-slate-800">
            <span className="grid size-10 place-items-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {active.initials}
            </span>
            <div className="ml-3">
              <p className="text-sm font-semibold">{active.name}</p>
              <p className="mt-0.5 flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {active.id === 1 ? "84 members · 12 online" : "Active now"}
              </p>
            </div>
            <div className="ml-auto flex gap-1">
              <button
                aria-label="Conversation information"
                className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                type="button"
              >
                <Info className="size-4" />
              </button>
              <button
                aria-label="More conversation options"
                className="grid size-9 place-items-center rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                type="button"
              >
                <MoreHorizontal className="size-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-5 dark:bg-slate-950/40 sm:p-7">
            <div className="flex justify-center">
              <span className="rounded-full bg-slate-200/70 px-3 py-1 text-[10px] font-semibold text-slate-500 dark:bg-slate-800">
                Today
              </span>
            </div>
            {messages.map((message) => (
              <div
                className={`flex ${
                  message.own ? "justify-end" : "justify-start"
                }`}
                key={message.id}
              >
                <div
                  className={`max-w-md ${
                    message.own ? "items-end" : "items-start"
                  } flex flex-col`}
                >
                  {!message.own && (
                    <p className="mb-1.5 px-1 text-[10px] font-bold text-indigo-500">
                      {message.author}
                    </p>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.own
                        ? "rounded-br-md bg-indigo-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                    }`}
                  >
                    {message.text}
                  </div>
                  <p className="mt-1 px-1 text-[9px] text-slate-400">
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            className="flex items-end gap-2 border-t border-slate-200 p-4 dark:border-slate-800"
            onSubmit={(event) => {
              event.preventDefault()
              if (!draft.trim()) return
              setMessages((current) => [
                ...current,
                {
                  id: Date.now(),
                  own: true,
                  author: "You",
                  text: draft,
                  time: "Now",
                },
              ])
              setDraft("")
            }}
          >
            <button
              aria-label="Attach a file"
              className="grid size-10 shrink-0 place-items-center rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              type="button"
            >
              <Paperclip className="size-4" />
            </button>
            <input
              className="h-11 flex-1 rounded-xl bg-slate-100 px-4 text-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-300 dark:bg-slate-800"
              onChange={(event) => setDraft(event.target.value)}
              placeholder={`Message ${active.name}`}
              value={draft}
            />
            <button
              aria-label="Send message"
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-slate-950 text-white transition hover:bg-indigo-600 dark:bg-white dark:text-slate-950"
              type="submit"
            >
              <Send className="size-4" />
            </button>
          </form>
          <div className="flex items-center justify-center gap-1.5 pb-3 text-[9px] text-slate-400">
            <Users className="size-3" />
            Faculty moderation is active in this conversation
          </div>
        </section>
      </div>
    </div>
  )
}

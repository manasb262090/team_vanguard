export type Role = "student" | "teacher"
export type View = "dashboard" | "feed" | "messages"

export type Student = {
  id: string
  name: string
  initials: string
  className: string
  section: string
  program: string
  documents: string[]
}

# Connect Web

Campus portal for students, teachers and admins: verified participation tracking, marks, attendance,
assignments, notifications and anonymous counselling. Stack: React (Vite) + Supabase + Vercel.

## 1. Set up Supabase (about 15 minutes)

1. Create a free project at supabase.com.
2. Open **SQL Editor** and run these files **in this order**:
   1. `db/connect_web_schema.sql`
   2. `db/connect_web_schema_v2.sql`
   3. `db/connect_web_patch_v3.sql` (fixes signup, adds sample branches)
3. Open **Authentication > Providers > Email** and turn **off "Confirm email"** (so signup works instantly during the demo).
4. Open **Storage** and create private buckets: `assignments`, `documents`, `certificates`, `post-images`.
5. Copy the project URL and anon key from **Project Settings > API**.

## 2. Run locally

```bash
cp .env.example .env      # then paste your URL and anon key into .env
npm install
npm run dev
```

## 3. Create your first admin

1. Open the app and sign up with your email (it creates a student account).
2. In Supabase SQL Editor run (use your own email):

```sql
update profiles set role = 'admin', status = 'verified' where email = 'your-email@example.com';
```

3. Log in again. You now see the admin dashboard, where you can promote teachers and mark counsellors.

## 4. Deploy to Vercel

1. Push this folder to GitHub.
2. In Vercel choose **Add New > Project**, import the repo (framework: Vite).
3. Add the two environment variables from `.env` in Vercel settings, then deploy.
4. `vercel.json` is already included, so refreshing any page works.

## What works now

- Signup, login, logout (Supabase Auth)
- Three roles with role-based routing: student, teacher, admin
- Student verification: new students wait on a "pending" screen until a teacher or admin verifies them
- Teacher dashboard: verification queue
- Admin dashboard: change role, status and counsellor flag for any user
- Student dashboard: low-attendance warning and notifications (reads live data from the database)

## Next modules to build (one at a time)

1. Event tracker (upload certificate, teacher verification, live counts)
2. Marks and report
3. Attendance marking
4. Assignments and grading
5. AI certificate reader, then the chatbot
6. Counselling inbox, campus feed, branch groups

## Folder guide

```
db/                SQL files for Supabase
src/AuthContext    session + profile + role helpers
src/App.jsx        routes and role protection
src/pages/         Login, Signup, Pending, three dashboards
src/components/    Layout (top bar)
```

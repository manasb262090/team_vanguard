import { useState } from 'react'
import { useStore, setState, resetData, SUBJECTS } from './store.js'
import { supabase, supabaseConfigured } from './supabase.js'
import { Home } from './home.jsx'
import { Events, Marks, Attendance, Assignments } from './pages.jsx'
import { CampusConnect } from './social.jsx'
import { Notices, Staff, Counselling, Documents, People, Assistant } from './more.jsx'
import { Teachers, Feedback } from './teachers.jsx'
import { Timetable, Leave, Fees, LostFound } from './campus.jsx'
import { Users, Profile, Reports } from './admin.jsx'
import Library from './modules/src/modules/Library.jsx'
import Sports from './modules/src/modules/Sports.jsx'
import AttendanceOD from './modules/src/modules/AttendanceOD.jsx'
import AppShell from './components/AppShell.tsx'   // <-- Remove .jsx extension here
import Brand from './components/Brand.tsx'         // <-- Remove .jsx extension here
import {
  ArrowRight,
  BookOpen,
  FileCheck2,
  LockKeyhole,
  Moon,
  Sun,
  Users as UsersIcon,
} from './components/icons.tsx'                      // <-- Remove .jsx extension here
import './extra.css'

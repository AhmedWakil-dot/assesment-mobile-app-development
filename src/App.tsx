/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  Bell, 
  ChevronRight, 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  User, 
  Timer, 
  School, 
  DoorOpen,
  Clock,
  QrCode,
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  ArrowLeft,
  X,
  Compass,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
  Wifi,
  Battery,
  SignalMedium,
  Star,
  Play
} from 'lucide-react';

import { 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';

// --- Types ---
type UserRole = 'student' | 'teacher';
type Screen = 'login' | 'dashboard' | 'timetable' | 'map' | 'community' | 'attendance' | 'profile' | 'messages' | 'attendance_faculty' | 'tasks';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isTeacher: boolean;
  avatar: string;
  status?: 'online' | 'offline';
  role?: string;
}

// --- Components ---

const StatusBar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-2 h-10 w-full z-50 absolute top-0 pointer-events-none select-none">
      <div className="text-[12px] font-bold text-on-surface-variant">{time}</div>
      <div className="flex items-center gap-1.5 text-on-surface-variant">
        <SignalMedium className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>
    </div>
  );
};

const Layout = ({ 
  children, 
  title, 
  onMenuClick, 
  activeScreen, 
  setScreen 
}: { 
  children: React.ReactNode; 
  title: string; 
  onMenuClick: () => void;
  activeScreen: Screen;
  setScreen: (s: Screen) => void;
}) => (
  <div className="flex flex-col h-full bg-surface relative overflow-hidden">
    <StatusBar />
    
    {/* Header */}
    <header className="absolute top-0 w-full z-40 glass border-b border-white/20 flex justify-between items-center px-4 py-4 pt-10 h-24 shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="p-2 hover:bg-white/30 rounded-full active:opacity-70 transition-colors">
          <Menu className="w-6 h-6 text-indigo-dark" />
        </button>
        <h1 className="font-bold text-lg text-indigo-dark">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-white/30 rounded-full transition-colors">
          <Bell className="w-6 h-6 text-indigo-dark/60" />
        </button>
        <div 
          onClick={() => setScreen('profile')}
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-lg cursor-pointer transition-transform active:scale-95"
        >
          <img 
            src="https://picsum.photos/seed/student/100/100" 
            alt="Profile" 
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>

    {/* Content */}
    <main className="flex-1 overflow-y-auto mt-24 pb-24 px-2">
      {children}
    </main>

    {/* Bottom Nav */}
    <nav className="absolute bottom-0 w-full bg-indigo-dark/95 backdrop-blur-xl border-t border-white/10 flex justify-around items-center px-4 py-3 pb-8 z-40 h-24">
      <NavItem icon={LayoutDashboard} active={activeScreen === 'dashboard'} onClick={() => setScreen('dashboard')} label="Home" />
      <NavItem icon={Calendar} active={activeScreen === 'timetable'} onClick={() => setScreen('timetable')} label="Class" />
      <NavItem icon={Compass} active={activeScreen === 'map'} onClick={() => setScreen('map')} label="Map" />
      <NavItem icon={Users} active={activeScreen === 'community'} onClick={() => setScreen('community')} label="Social" />
      <NavItem icon={User} active={activeScreen === 'profile'} onClick={() => setScreen('profile')} label="Profile" />
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/10 rounded-full"></div>
    </nav>
  </div>
);

const NavItem = ({ icon: Icon, active, onClick, label }: { icon: any, active: boolean, onClick: () => void, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary-container' : 'text-white/50'}`}
  >
    <Icon className="w-6 h-6" />
    <span className="text-[10px] font-semibold">{label}</span>
  </button>
);

// --- Individual Screens ---

const LoginScreen = ({ onLogin }: { onLogin: (role: UserRole) => void }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || pass !== '1234') {
      setError(true);
    } else {
      onLogin(role);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Brand Header */}
      <div className="bg-[#050038] p-10 pt-16 relative overflow-hidden shrink-0">
        <div className="relative z-10">
          <h1 className="text-3xl font-black text-white tracking-tight">My Campus</h1>
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mt-1">University of Salford</p>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className="flex-1 -mt-6 bg-white rounded-t-[2.5rem] shadow-2xl p-8 flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-[#050038]">Welcome Back</h2>
          <p className="text-slate-400 text-sm font-medium">Please select your role and enter your credentials.</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 mb-8">
           <button 
             onClick={() => setRole('student')}
             className={`flex-1 py-4 text-sm font-bold transition-all relative ${role === 'student' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             Student
             {role === 'student' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
           </button>
           <button 
             onClick={() => setRole('teacher')}
             className={`flex-1 py-4 text-sm font-bold transition-all relative ${role === 'teacher' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             Teacher
             {role === 'teacher' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />}
           </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{role === 'teacher' ? 'Faculty ID' : 'Student ID'} / Email</label>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 focus-within:border-blue-600 transition-all">
              <User className="w-5 h-5 text-slate-400" />
              <input 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-on-surface text-sm font-medium" 
                placeholder={role === 'teacher' ? 't.user@salford.ac.uk' : 's.user@salford.ac.uk'}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            </div>
            <div className={`flex items-center gap-3 p-4 bg-slate-50 rounded-xl border transition-all ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-100 focus-within:border-blue-600'}`}>
              <AlertCircle className={`w-5 h-5 ${error ? 'text-red-500' : 'text-slate-400'}`} />
              <input 
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-on-surface text-sm font-medium" 
                placeholder="••••••••••••"
              />
            </div>
            {error && (
              <p className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> Invalid Password. Please try again or reset it.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600" />
              <span className="text-[11px] font-bold text-slate-500">Remember me</span>
            </label>
            <button type="button" className="text-[11px] font-bold text-blue-600">Forgot password?</button>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
           <div className="relative flex items-center py-2">
              <div className="flex-1 border-t border-slate-100"></div>
              <span className="bg-white px-4 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Or</span>
              <div className="flex-1 border-t border-slate-100"></div>
           </div>
           
           <button className="w-full py-3 border border-slate-200 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
              <div className="w-5 h-5 bg-black rounded p-1 flex items-center justify-center">
                 <div className="w-full h-full bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-slate-700">Continue with Institutional Google Account</span>
           </button>
        </div>

        <div className="mt-auto pt-8 flex flex-col items-center gap-6">
          <p className="text-[11px] font-medium text-slate-400">Need help? <span className="text-blue-600 font-bold underline cursor-pointer">Contact Campus Support</span></p>
          
          {/* Status Indicator */}
          <div className="bg-[#050038] py-3 px-6 rounded-2xl flex items-center gap-3">
             <div className="flex flex-col">
                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">System Status:</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                   <span className="text-[10px] font-bold text-white tracking-wide">All Services Operational</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = ({ setScreen }: { setScreen: (s: Screen) => void }) => {
  const chartData = [
    { day: 'MON', value: 65 },
    { day: 'TUE', value: 45 },
    { day: 'WED', value: 75 },
    { day: 'THU', value: 85 },
    { day: 'FRI', value: 35 },
    { day: 'SAT', value: 15 },
    { day: 'SUN', value: 12 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#f8fafc] min-h-full pb-10"
    >
      <div className="p-6 pt-10">
        {/* Welcome Header */}
        <div className="mb-8 p-2">
          <h2 className="text-[32px] font-black text-[#050038] tracking-tight leading-[1.1]">Welcome back,<br />Professor</h2>
          <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
            You have <span className="text-blue-600 font-bold underline">4 lectures</span> scheduled for today and <span className="text-blue-600 font-bold underline">12 pending</span> student queries.
          </p>
        </div>

        {/* Today's Lectures */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-[#050038]">Today's Lectures</h3>
            <button onClick={() => setScreen('timetable')} className="text-blue-600 text-xs font-bold flex items-center gap-1">Full Calendar <ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: '101', type: 'LECTURE', title: 'Introduction to Digital Media', time: '09:00 AM', color: 'bg-blue-600' },
              { id: 'SEM', type: 'SEMINAR', title: 'Advanced UX Research Methods', time: '11:30 AM', color: 'border-l border-slate-200' },
              { id: 'WS', type: 'WORKSHOP', title: 'Visual Storytelling & Narrative', time: '02:00 PM', color: 'border-l border-slate-200' },
            ].map((lecture, i) => (
              <div key={i} className={`flex items-start gap-6 p-6 rounded-2xl ${i === 0 ? 'bg-slate-50 border-l-4 border-blue-600 shadow-sm shadow-blue-500/5' : 'border border-slate-100 hover:bg-slate-50 transition-colors'}`}>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-[#050038] tracking-tight">{lecture.time.split(' ')[0]}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lecture.time.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] block mb-1">{lecture.type} {lecture.id}</span>
                  <h4 className="text-sm font-black text-[#050038] leading-tight">{lecture.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Queries - THE DARK SECTION */}
        <div className="bg-[#020122] rounded-[2rem] p-8 shadow-xl shadow-slate-300 relative overflow-hidden mb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white">Pending Queries</h3>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-[9px] font-black text-white uppercase tracking-widest">Urgent</span>
          </div>

          <div className="flex items-end gap-3 mb-8">
             <span className="text-5xl font-black text-blue-500 italic">12</span>
             <span className="text-slate-400 text-xs font-bold mb-1.5 uppercase tracking-widest">Unread messages</span>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { name: 'Liam Carter', query: 'Question about Assignment 2 deadline...', avatar: 'https://picsum.photos/seed/liam/100/100' },
              { name: 'Sophia Martinez', query: 'Cannot access the Library portal...', avatar: 'https://picsum.photos/seed/sophia/100/100' }
            ].map((q, i) => (
              <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                <img src={q.avatar} className="w-10 h-10 rounded-full border border-white/10 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white line-clamp-1">{q.name}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{q.query}</p>
                </div>
                <MessageSquare className="w-4 h-4 text-blue-500" />
              </div>
            ))}
          </div>

          <button onClick={() => setScreen('messages')} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
             <span>Open Communications Center</span>
          </button>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-start justify-between mb-4">
             <div>
                <h3 className="text-lg font-black text-[#050038]">Class Engagement</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest leading-none">Average interaction rate<br />across all modules</p>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 flex items-center gap-4 cursor-pointer">
                <span className="text-[10px] font-black text-[#050038]">Last 7 Days</span>
                <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
             </div>
          </div>
          
          <div className="h-48 w-full mt-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <Bar dataKey="value" radius={[6, 6, 6, 6]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#4262ff' : '#e2e8f0'} />
                  ))}
                </Bar>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 9, fontWeight: 700, fill: '#64748b' }} 
                  dy={10}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grading Progress */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-blue-600">
               <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-[15px] font-black text-[#050038]">Grading Progress</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Assignment 1 • Media Ethics</p>
            </div>
          </div>
          
          <div className="space-y-3">
             <div className="flex justify-between items-end">
                <span className="text-[9px] font-black text-[#050038] uppercase tracking-widest">68/84 Submitted</span>
                <span className="text-[11px] font-black text-blue-600">82%</span>
             </div>
             <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '82%' }}
                  className="h-full bg-blue-600 rounded-full"
                />
             </div>
          </div>
        </div>

        {/* Faculty Notice */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 mb-6 relative overflow-hidden group">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-6">Faculty Notice</span>
           <div className="relative h-28 rounded-2xl overflow-hidden cursor-pointer">
              <img src="https://picsum.photos/seed/building/600/300" className="w-full h-full object-cover grayscale transition-all group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020122]/90 to-transparent p-4 flex flex-col justify-end">
                 <h4 className="text-white text-sm font-black leading-tight">Faculty Meeting:<br />Curriculum Review 2024</h4>
                 <p className="text-white/60 text-[9px] font-bold mt-1">Tomorrow, 10:00 AM in Boardroom A</p>
              </div>
           </div>
           
           <button onClick={() => setScreen('attendance_faculty')} className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center active:scale-90 transition-transform z-10">
              <span className="text-3xl font-light">+</span>
           </button>
        </div>
      </div>
    </motion.div>
  );
};

const AttendanceFacultyScreen = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button className="text-blue-600 bg-blue-50 p-2 rounded-xl">
             <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-lg font-black text-[#050038]">Attendance Monitor</h2>
            <div className="bg-blue-50 px-2 py-0.5 rounded text-[8px] font-black text-blue-600 uppercase tracking-widest w-fit mt-0.5">Faculty</div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Active Module */}
        <section>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block">Active Module</span>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-black text-[#050038] tracking-tight">Creative Media Practice</h3>
            <div className="flex items-center gap-2 bg-blue-600 text-white px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest animate-pulse">Live</div>
          </div>
          <p className="text-sm font-bold text-slate-500">Room 4.12 • New Media Wing</p>

          <div className="mt-8 relative aspect-square bg-[#f8fafc] rounded-3xl border border-slate-100 p-10 flex items-center justify-center">
             <div className="w-full h-full bg-[#050038] rounded-xl flex flex-wrap p-4 gap-2 border-[12px] border-white shadow-2xl">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded ${i % 3 === 0 ? 'bg-white' : 'bg-transparent border border-white/20'}`} />
                ))}
             </div>
             <p className="absolute bottom-6 text-[10px] font-bold text-slate-400 text-center px-10">Students should point their camera at the screen to check in automatically.</p>
          </div>
          
          <button className="w-full py-4 mt-6 bg-blue-600 text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-transform">
             Reset Session Code
          </button>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-[#020122] p-5 rounded-3xl text-white">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Checked In</span>
              <div className="flex items-end gap-2">
                 <span className="text-3xl font-black italic">42</span>
                 <span className="text-[9px] font-bold text-green-400 mb-1.5 leading-none">↑ 12% vs last week</span>
              </div>
           </div>
           <div className="bg-[#f8fafc] p-5 rounded-3xl border border-slate-100">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Expected</span>
              <div className="flex items-end gap-2">
                 <span className="text-3xl font-black text-[#050038] italic">55</span>
                 <span className="text-[9px] font-bold text-slate-400 mb-1.5 leading-none">76% attendance</span>
              </div>
           </div>
        </div>

        {/* Check-in Feed */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-[#050038]">Check-in Feed</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Updates</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Alice Marshall', id: 'UOS-2394', time: '09:02 AM', status: 'ON TIME' },
              { name: 'James Dawson', id: 'UOS-1102', time: '09:04 AM', status: 'ON TIME' },
              { name: 'Elena Rodriguez', id: 'UOS-4481', time: '09:08 AM', status: 'LATE' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-50 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-[10px] font-black text-blue-600">{s.name.split(' ').map(n=>n[0]).join('')}</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-[#050038]">{s.name}</h4>
                  <p className="text-[9px] font-bold text-slate-400 mt-0.5">{s.id}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-black text-[#050038]">{s.time}</p>
                   <span className={`text-[7px] font-black px-1.5 py-0.5 rounded ${s.status === 'LATE' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'} uppercase`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

const Dashboard = ({ setScreen, role }: { setScreen: (s: Screen) => void, role: UserRole }) => {
  if (role === 'teacher') return <TeacherDashboard setScreen={setScreen} />;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-4 space-y-6"
    >
      {/* Next Class Hero */}
      <div className="w-full bg-[#ef4444] rounded-3xl overflow-hidden relative shadow-xl shadow-red-500/30 group cursor-pointer active:scale-[0.99] transition-transform" onClick={() => setScreen('map')}>
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 p-8 flex flex-col gap-4">
          <div className="space-y-1">
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
              Next Class
            </span>
            <h2 className="text-white font-bold text-3xl leading-tight">
              Advanced Architecture
            </h2>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex items-center text-white/80 gap-2">
                <DoorOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">Hall B7 • Starts in 12 mins</span>
              </div>
            </div>
          </div>
          <button className="bg-white text-[#ef4444] px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
            <span>Open Map</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Attendance Circle */}
      <div 
        onClick={() => setScreen('attendance')}
        className="bg-white rounded-3xl p-8 flex flex-col items-center justify-center border border-slate-100 shadow-xl cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="#F1F5F9" strokeWidth="12" fill="transparent" />
            <circle cx="64" cy="64" r="56" stroke="#ef4444" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset="28.1" />
          </svg>
          <div className="text-center">
            <span className="text-3xl font-bold text-indigo-dark">92%</span>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Attendance</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-500 text-center px-4">Click to view Live QR Code for check-in</p>
      </div>

      {/* Assignments Section */}
      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-lg text-indigo-dark">Assignments</h3>
          <button className="text-primary-container font-bold text-xs">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
          {[
            { title: "Cognitive Mapping", time: "2 Days", color: "bg-error/10 text-error", icon: Timer },
            { title: "Vector Illustration", time: "5 Days", color: "bg-primary-container/10 text-primary-container", icon: School }
          ].map((item, i) => (
            <div key={i} className="min-w-[280px] bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 rounded-2xl ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${item.color}`}>In {item.time}</span>
              </div>
              <h4 className="font-bold text-on-surface mb-1 text-lg">{item.title} Case Study</h4>
              <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">A detailed analysis of user behaviors in digital spaces.</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Psychology 301</span>
                <ChevronRight className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const MessageBoardScreen = ({ role }: { role: UserRole }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Dr. Eleanor Vance', text: "Dear Alex, I've reviewed your molecular biology project draft.", time: '10:22 AM', isTeacher: true, avatar: 'https://picsum.photos/seed/eleanor/100/100', status: 'online', role: 'SENIOR LECTURER' },
    { id: '2', sender: 'Dr. Eleanor Vance', text: 'The methodology is robust. Please see my attached notes in the PDF.', time: '10:22 AM', isTeacher: true, avatar: 'https://picsum.photos/seed/eleanor/100/100', status: 'online' },
    { id: '3', sender: 'Alex Johnson', text: "Thank you, Dr. Vance. I'll make the adjustments to the sampling section immediately.", time: '10:24 AM', isTeacher: false, avatar: 'https://picsum.photos/seed/alex/100/100', role: 'SENIOR STUDENT' },
    { id: '4', sender: 'Alex Johnson', text: 'Can we schedule a 10-minute call tomorrow?', time: '10:24 AM', isTeacher: false, avatar: 'https://picsum.photos/seed/alex/100/100' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson',
      text: inputValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isTeacher: role === 'teacher',
      avatar: role === 'teacher' ? 'https://picsum.photos/seed/eleanor/100/100' : 'https://picsum.photos/seed/alex/100/100'
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Community Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button className="text-slate-400 p-2"><ArrowLeft className="w-5 h-5" /></button>
            <div className="flex items-center gap-3">
               <div className="relative">
                  <img src="https://picsum.photos/seed/eleanor/100/100" className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
               </div>
               <div>
                  <h3 className="text-sm font-black text-[#050038]">Dr. Eleanor Vance</h3>
                  <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">• Online</p>
               </div>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <button className="text-slate-400"><SignalMedium className="w-5 h-5" /></button>
            <button className="text-slate-400 font-black">•••</button>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
          <div className="text-center py-4">
             <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-4 py-1.5 rounded-full uppercase tracking-widest">Today, Oct 26</span>
          </div>

          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 max-w-[90%] ${msg.sender === (role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson') ? 'self-end flex-row-reverse' : 'self-start'}`}
            >
              {!msg.sender.includes(role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson') && (
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-2 shadow-sm">
                  <img src={msg.avatar} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="space-y-1.5">
                 <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === (role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson') ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white text-[#050038] border border-slate-100 shadow-sm'}`}>
                   {msg.text}
                 </div>
                 {/* Attachment Example if it's the second message of Dr. Vance */}
                 {msg.id === '2' && (
                   <div className="bg-white border border-blue-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                         <div className="bg-red-50 text-red-500 p-2 rounded-xl">
                            <span className="text-[10px] font-black">PDF</span>
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-[#050038]">Vance_Feedback_v2.pdf</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">4.2 MB • PDF</p>
                         </div>
                      </div>
                      <button className="text-blue-600 bg-blue-50 p-2 rounded-xl"><ArrowLeft className="w-4 h-4 rotate-[270deg]" /></button>
                   </div>
                 )}
                 <div className={`text-[9px] font-bold text-slate-400 mt-1 flex items-center gap-1 ${msg.sender === (role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson') ? 'justify-end' : 'justify-start'}`}>
                    {msg.time} {msg.sender === (role === 'teacher' ? 'Dr. Eleanor Vance' : 'Alex Johnson') && <CheckCircle2 className="w-3 h-3 text-blue-500" />}
                 </div>
              </div>
            </motion.div>
          ))}
          
          <div className="py-4 flex justify-center">
             <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 flex items-center gap-2">
                <AlertCircle className="w-3 h-3 text-blue-600" />
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest">Messages are encrypted</span>
             </div>
          </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-slate-100">
         <div className="flex items-center gap-3 mb-6">
            <button className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-100 transition-colors">
               <span className="text-xl font-light text-slate-400">+</span>
            </button>
            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 flex items-center gap-3 group focus-within:border-blue-600 focus-within:bg-white transition-all">
               <input 
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                 placeholder="Academic inquiry..."
                 className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-[#050038] placeholder:text-slate-300"
               />
               <button 
                 onClick={sendMessage}
                 className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
               >
                  <ArrowLeft className="w-5 h-5 rotate-[180deg]" />
               </button>
            </div>
         </div>
         
         <div className="flex items-center justify-around">
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors">
               <Play className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Meeting</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors">
               <CheckCircle2 className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Submit</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors">
               <LinkIcon className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-widest">Attach</span>
            </button>
         </div>
      </div>
    </div>
  );
};

const TimetableScreen = () => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="p-4 space-y-6"
  >
    <div className="flex items-center justify-between mb-4">
      <div>
        <span className="text-[10px] font-bold text-primary-container uppercase tracking-widest">Schedule</span>
        <h2 className="text-2xl font-bold text-indigo-dark">Monday, Oct 23</h2>
      </div>
      <div className="flex gap-2">
        <button className="p-2 border border-white/40 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/60 transition-colors"><ArrowLeft className="w-5 h-5 text-indigo-dark/60" /></button>
        <button className="p-2 border border-white/40 bg-white/40 backdrop-blur-sm rounded-xl hover:bg-white/60 transition-colors"><ChevronRight className="w-5 h-5 text-indigo-dark/60" /></button>
      </div>
    </div>

    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-16 text-right pt-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{8 + i*2}:00 AM</span>
          </div>
          <div className="relative flex-1 bg-white rounded-3xl p-6 shadow-xl border border-slate-50 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ef4444]"></div>
            <span className="text-[10px] font-bold text-[#ef4444] uppercase mb-1 block tracking-wider">Lecture</span>
            <h4 className="font-bold text-indigo-dark mb-3 text-lg leading-tight">Computational Mathematics</h4>
            <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><DoorOpen className="w-3.5 h-3.5" /> Hall B</span>
              <span className="flex items-center gap-1.5"><Timer className="w-3.5 h-3.5" /> 2h</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const MapScreen = () => {
  const [searching, setSearching] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 glass border-b border-white/20 shrink-0 z-10">
        <div className={`flex items-center gap-3 p-3 bg-white/50 backdrop-blur-md rounded-2xl border transition-all ${searching ? 'border-primary-container ring-1 ring-primary-container' : 'border-white/40'}`}>
          <Search className="w-5 h-5 text-indigo-dark/40" />
          <input 
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
            className="bg-transparent border-none outline-none flex-1 text-sm text-indigo-dark placeholder:text-indigo-dark/30" 
            placeholder="Search campus architecture..."
          />
        </div>
      </div>
      <div className="flex-1 relative bg-slate-200 overflow-hidden">
        <img src="https://picsum.photos/seed/map/1000/1000" className="w-full h-full object-cover opacity-60 grayscale scale-110" />
        
        {/* Highlighted Building */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div className="bg-[#ef4444] text-white p-4 rounded-2xl shadow-2xl relative border-2 border-white">
            <School className="w-8 h-8" />
            <div className="absolute inset-0 animate-ping bg-[#ef4444] rounded-2xl opacity-30"></div>
          </div>
          <div className="mt-3 glass px-4 py-2 rounded-xl whitespace-nowrap shadow-xl text-indigo-dark font-bold text-xs">
            BLOCK C • UX DESIGN LAB
          </div>
        </motion.div>

        {/* Search Result Overlay */}
        <AnimatePresence>
          {searching && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-4 left-4 right-4 glass p-5 rounded-3xl shadow-2xl border border-white/40 z-50"
            >
              <p className="text-[10px] font-bold text-[#ef4444] mb-1 uppercase tracking-widest">Closest Match</p>
              <h4 className="font-bold text-indigo-dark text-lg leading-tight">Main Library (Building A)</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">2 mins walk • Crowded right now</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="absolute bottom-8 right-8 p-5 bg-[#ef4444] rounded-2xl shadow-2xl text-white active:scale-95 transition-transform border-2 border-white">
          <MapPin className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};

const CommunityScreen = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 space-y-6"
  >
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden shrink-0">
        <img src="https://picsum.photos/seed/user/100/100" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 bg-slate-50 rounded-xl p-3 text-slate-400 text-sm cursor-text">
        Share something with your campus...
      </div>
      <div className="flex gap-2 items-center">
        <button className="p-2 text-slate-400"><ImageIcon className="w-5 h-5" /></button>
        <button className="p-2 text-slate-400"><LinkIcon className="w-5 h-5" /></button>
      </div>
    </div>

    <div className="space-y-6">
      {[1, 2].map((post) => (
        <div key={post} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-50">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src={`https://picsum.photos/seed/p${post}/100/100`} className="w-11 h-11 rounded-full border border-slate-100 shadow-sm" />
              <div>
                <h4 className="font-bold text-indigo-dark text-sm">Maya Chen</h4>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Architecture • 2h ago</p>
              </div>
            </div>
            <p className="text-on-surface text-sm leading-relaxed mb-4 font-medium">
              Just finished the final model for the library redesign project! 📐 Coffee was the only thing that kept me going...
            </p>
            <div className="rounded-2xl overflow-hidden mb-4 border border-slate-50 shadow-sm">
              <img src="https://picsum.photos/seed/model/600/400" className="w-full h-48 object-cover" />
            </div>
            <div className="flex items-center gap-6 pt-5 border-t border-slate-50">
              <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-[#ef4444] transition-colors"><CheckCircle2 className="w-4 h-4" /> 124</button>
              <button onClick={() => setScreen('community')} className="flex items-center gap-2 text-[#ef4444] text-xs font-bold hover:opacity-80 transition-opacity"><MessageSquare className="w-4 h-4" /> 18</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const AttendanceScreen = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-6 h-full flex flex-col items-center"
  >
    <div className="text-center mb-12">
      <h2 className="text-2xl font-bold text-indigo-dark">Live Attendance</h2>
      <p className="text-slate-500">Advanced Software Architecture</p>
    </div>

    <div className="bg-white p-12 rounded-[2rem] border border-slate-100 shadow-2xl relative mb-12 group">
      <QrCode className="w-48 h-48 text-indigo-dark" />
      <div className="absolute inset-0 bg-primary-container/5 rounded-[2rem] animate-pulse"></div>
      
      {/* Corner Brackets */}
      <div className="absolute top-4 left-4 w-10 h-10 border-t-4 border-l-4 border-primary-container rounded-tl-xl"></div>
      <div className="absolute top-4 right-4 w-10 h-10 border-t-4 border-r-4 border-primary-container rounded-tr-xl"></div>
      <div className="absolute bottom-4 left-4 w-10 h-10 border-b-4 border-l-4 border-primary-container rounded-bl-xl"></div>
      <div className="absolute bottom-4 right-4 w-10 h-10 border-b-4 border-r-4 border-primary-container rounded-br-xl"></div>
    </div>

    <div className="flex items-center gap-3 text-primary-container font-bold text-sm mb-4">
      <Timer className="w-5 h-5 animate-spin-pulse" />
      REGENERATING IN 42S
    </div>
    
    <p className="text-center text-slate-400 text-sm max-w-[240px]">
      Scan this code at the entrance of Hall B for instant attendance credit.
    </p>

    <div className="mt-auto w-full space-y-4">
      <button className="w-full py-4 bg-indigo-dark text-white rounded-xl font-bold">Manual Entry If Failed</button>
      <button className="w-full text-slate-400 font-bold text-sm">Issue with scanner?</button>
    </div>
  </motion.div>
);

const ProfileScreen = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6"
  >
    <div className="flex flex-col items-center mb-12">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-container/10 p-1 mb-4">
        <img src="https://picsum.photos/seed/student/300/300" className="w-full h-full rounded-full object-cover" />
      </div>
      <h2 className="text-2xl font-bold text-indigo-dark">Alex Johnson</h2>
      <p className="text-slate-500">B.Sc Computer Science • 3rd Year</p>
    </div>

    <div className="space-y-4">
      {[
        { label: 'GPA', value: '3.82', icon: CheckCircle2 },
        { label: 'Credits earned', value: '142', icon: School },
        { label: 'Attendance', value: '92%', icon: Users }
      ].map((stat, i) => (
        <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl shadow-xl border border-slate-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#ef4444]/10 rounded-2xl text-[#ef4444]">
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-indigo-dark text-lg">{stat.label}</span>
          </div>
          <span className="font-black text-[#ef4444] text-xl">{stat.value}</span>
        </div>
      ))}
    </div>

    <button className="w-full mt-12 py-4 border-2 border-error text-error font-bold rounded-xl active:bg-error-container/10 transition-colors">
      Sign Out
    </button>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('login');
  const [role, setRole] = useState<UserRole>('student');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getTitle = () => {
    switch (screen) {
      case 'dashboard': return 'Dashboard';
      case 'timetable': return role === 'teacher' ? 'Teaching Schedule' : 'Timetable';
      case 'map': return 'Campus Map';
      case 'community': return 'Community';
      case 'attendance': return 'Attendance';
      case 'profile': return 'My Profile';
      case 'messages': return 'Message Board';
      default: return '';
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard': return <Dashboard setScreen={setScreen} role={role} />;
      case 'timetable': return <TimetableScreen />;
      case 'map': return <MapScreen />;
      case 'community': return <CommunityScreen setScreen={setScreen} />;
      case 'attendance': return <AttendanceScreen />;
      case 'attendance_faculty': return <AttendanceFacultyScreen />;
      case 'profile': return <ProfileScreen />;
      case 'messages': return <MessageBoardScreen role={role} />;
      default: return null;
    }
  };

  if (screen === 'login') return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative scale-90 sm:scale-100 origin-center">
        <div className="w-[393px] h-[852px] bg-slate-900 overflow-hidden relative shadow-2xl border-[10px] border-slate-800 rounded-[3.5rem] device-shell">
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-9 bg-black rounded-[1.2rem] z-50 flex items-center justify-end px-4">
            <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
          </div>
          
          <StatusBar />
          <div className="h-full pt-10">
            <LoginScreen onLogin={(userRole) => { setRole(userRole); setScreen('dashboard'); }} />
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full z-50"></div>
        </div>
        
        {/* Physical Buttons Simulation */}
        <div className="absolute top-32 -left-3 w-1.5 h-8 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-48 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-68 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-48 -right-3 w-1.5 h-24 bg-slate-800 rounded-l shadow-sm"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="relative scale-90 sm:scale-100 origin-center transition-transform">
        <div className="w-[393px] h-[852px] bg-slate-900 overflow-hidden relative shadow-2xl border-[10px] border-slate-800 rounded-[3.5rem] device-shell">
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-9 bg-black rounded-[1.2rem] z-50 flex items-center justify-end px-4">
            <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
          </div>

          {/* Side Drawer Overlay */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDrawerOpen(false)}
                  className="absolute inset-0 bg-indigo-dark/60 backdrop-blur-sm z-[100]"
                />
                <motion.aside
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute left-0 top-0 h-full w-[280px] bg-indigo-dark text-white shadow-2xl z-[101] flex flex-col p-8 pt-16 rounded-r-3xl"
                >
            <div className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-[0.2em] mb-4 w-fit shadow-lg shadow-blue-500/20">Faculty</div>
            <div className="flex flex-col gap-6">
              <DrawerItem icon={LayoutDashboard} label="Dashboard" active={screen === 'dashboard'} onClick={() => { setScreen('dashboard'); setDrawerOpen(false); }} />
              <DrawerItem icon={School} label="Library" active={false} onClick={() => setDrawerOpen(false)} />
              <DrawerItem icon={MapPin} label="Campus Map" active={screen === 'map'} onClick={() => { setScreen('map'); setDrawerOpen(false); }} />
              <DrawerItem icon={Star} label="Financials" active={false} onClick={() => setDrawerOpen(false)} />
              <DrawerItem icon={MessageSquare} label="Community" active={screen === 'community'} onClick={() => { setScreen('community'); setDrawerOpen(false); }} />
              <DrawerItem icon={Star} label="Settings" active={false} onClick={() => setDrawerOpen(false)} />
            </div>
                  
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 group active:scale-95 transition-transform cursor-pointer">
                    <img src="https://picsum.photos/seed/salford/100/100" className="w-12 h-12 rounded-full border border-white/20" />
                    <div>
                      <h4 className="text-white font-black text-sm text-left">Salford User</h4>
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest text-left">Faculty of Arts & Media</p>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          <Layout 
            activeScreen={screen} 
            setScreen={setScreen} 
            title={getTitle()} 
            onMenuClick={() => setDrawerOpen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </Layout>
        </div>

        {/* Physical Buttons Simulation */}
        <div className="absolute top-32 -left-3 w-1.5 h-8 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-48 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-68 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
        <div className="absolute top-48 -right-3 w-1.5 h-24 bg-slate-800 rounded-l shadow-sm"></div>
      </div>
    </div>
  );
}

const DrawerItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary-container text-white shadow-lg shadow-red-500/20' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </button>
);


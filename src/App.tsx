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
  SignalMedium
} from 'lucide-react';

// --- Types ---
type Screen = 'login' | 'dashboard' | 'timetable' | 'map' | 'community' | 'attendance' | 'profile';

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
    <div className="flex justify-between items-center px-6 py-2 h-10 w-full z-50 fixed top-0 pointer-events-none select-none">
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
    <header className="sticky top-0 w-full z-40 glass border-b border-white/20 flex justify-between items-center px-4 py-4 pt-10 h-24 shrink-0 shadow-sm">
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
    <main className="flex-1 overflow-y-auto pb-24 px-2">
      {children}
    </main>

    {/* Bottom Nav */}
    <nav className="fixed bottom-0 w-full bg-indigo-dark/95 backdrop-blur-xl border-t border-white/10 flex justify-around items-center px-4 py-3 pb-8 z-40 h-24">
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

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => {
  const [id, setId] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !pass) {
      setError(true);
    } else {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-indigo-dark p-8 relative overflow-hidden shrink-0 h-48 flex items-center">
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-2"
          >
            My Campus
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/70"
          >
            Your academic gateway.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
      </header>

      <main className="flex-1 p-6 bg-white flex flex-col justify-center">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-indigo-dark mb-1">Welcome Back</h2>
          <p className="text-slate-500">Sign in to your student account.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Student ID</label>
            <div className={`flex items-center gap-3 p-4 bg-slate-50 rounded-xl border transition-all ${error && !id ? 'border-error ring-1 ring-error' : 'border-slate-100 focus-within:border-primary-container'}`}>
              <User className={`w-5 h-5 ${error && !id ? 'text-error' : 'text-slate-400'}`} />
              <input 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-on-surface" 
                placeholder="e.g. STU-2024"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <button type="button" className="text-xs font-bold text-primary-container">Forgot?</button>
            </div>
            <div className={`flex items-center gap-3 p-4 bg-slate-50 rounded-xl border transition-all ${error && !pass ? 'border-error ring-1 ring-error' : 'border-slate-100 focus-within:border-primary-container'}`}>
              <AlertCircle className={`w-5 h-5 ${error && !pass ? 'text-error' : 'text-slate-400'}`} />
              <input 
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-on-surface" 
                placeholder="••••••••"
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-error flex items-center gap-1 mt-2"
              >
                <AlertCircle className="w-3 h-3" /> Wrong Password. Please try again.
              </motion.p>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-primary-container text-white font-bold rounded-xl shadow-lg shadow-primary-container/20 active:scale-[0.98] transition-transform"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-auto pt-8 flex items-center justify-center gap-2">
          <p className="text-sm text-slate-500">Need help?</p>
          <button className="text-sm font-bold text-primary-container underline">Contact Registrar</button>
        </div>
      </main>
    </div>
  );
};

const Dashboard = ({ setScreen }: { setScreen: (s: Screen) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="p-4 space-y-6"
  >
    {/* Next Class Hero */}
    <div className="w-full bg-[#4262ff] rounded-3xl overflow-hidden relative shadow-xl shadow-blue-500/30 group cursor-pointer active:scale-[0.99] transition-transform" onClick={() => setScreen('map')}>
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="relative z-10 p-8 flex flex-col gap-4">
        <div className="space-y-1">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">Next Class</span>
          <h2 className="text-white font-bold text-3xl leading-tight">Advanced Architecture</h2>
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center text-white/80 gap-2">
              <DoorOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Hall B7 • Starts in 12 mins</span>
            </div>
          </div>
        </div>
        <button className="bg-white text-[#4262ff] px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform">
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
          <circle cx="64" cy="64" r="56" stroke="#4262ff" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset="28.1" />
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
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4262ff]"></div>
            <span className="text-[10px] font-bold text-[#4262ff] uppercase mb-1 block tracking-wider">Lecture</span>
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
          <div className="bg-[#4262ff] text-white p-4 rounded-2xl shadow-2xl relative border-2 border-white">
            <School className="w-8 h-8" />
            <div className="absolute inset-0 animate-ping bg-[#4262ff] rounded-2xl opacity-30"></div>
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
              <p className="text-[10px] font-bold text-[#4262ff] mb-1 uppercase tracking-widest">Closest Match</p>
              <h4 className="font-bold text-indigo-dark text-lg leading-tight">Main Library (Building A)</h4>
              <p className="text-xs text-slate-500 mt-1 font-medium">2 mins walk • Crowded right now</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button className="absolute bottom-8 right-8 p-5 bg-[#4262ff] rounded-2xl shadow-2xl text-white active:scale-95 transition-transform border-2 border-white">
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
              <button className="flex items-center gap-2 text-slate-500 text-xs font-bold hover:text-[#4262ff] transition-colors"><CheckCircle2 className="w-4 h-4" /> 124</button>
              <button onClick={() => setScreen('community')} className="flex items-center gap-2 text-[#4262ff] text-xs font-bold hover:opacity-80 transition-opacity"><MessageSquare className="w-4 h-4" /> 18</button>
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
            <div className="p-3 bg-[#4262ff]/10 rounded-2xl text-[#4262ff]">
              <stat.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-indigo-dark text-lg">{stat.label}</span>
          </div>
          <span className="font-black text-[#4262ff] text-xl">{stat.value}</span>
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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getTitle = () => {
    switch (screen) {
      case 'dashboard': return 'Dashboard';
      case 'timetable': return 'Timetable';
      case 'map': return 'Campus Map';
      case 'community': return 'Community';
      case 'attendance': return 'Attendance';
      case 'profile': return 'My Profile';
      default: return '';
    }
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard': return <Dashboard setScreen={setScreen} />;
      case 'timetable': return <TimetableScreen />;
      case 'map': return <MapScreen />;
      case 'community': return <CommunityScreen setScreen={setScreen} />;
      case 'attendance': return <AttendanceScreen />;
      case 'profile': return <ProfileScreen />;
      default: return null;
    }
  };

  if (screen === 'login') return (
    <div className="relative p-8">
      <div className="w-[430px] h-[932px] bg-slate-900 overflow-hidden relative shadow-2xl border-[12px] border-slate-800 rounded-[3.5rem] device-shell">
        {/* Dynamic Island Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-9 bg-black rounded-[1.2rem] z-50 flex items-center justify-end px-4">
          <div className="w-2.5 h-2.5 bg-[#1a1a1a] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"></div>
        </div>
        
        <StatusBar />
        <div className="h-full pt-10">
          <LoginScreen onLogin={() => setScreen('dashboard')} />
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/10 rounded-full z-50"></div>
      </div>
      
      {/* Physical Buttons Simulation */}
      <div className="absolute top-48 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
      <div className="absolute top-72 -left-3 w-1.5 h-24 bg-slate-800 rounded-r shadow-sm"></div>
      <div className="absolute top-72 -right-3 w-1.5 h-24 bg-slate-800 rounded-l shadow-sm"></div>
    </div>
  );

  return (
    <div className="relative p-8 scale-95 origin-center">
      <div className="w-[430px] h-[932px] bg-slate-900 overflow-hidden relative shadow-2xl border-[12px] border-slate-800 rounded-[3.5rem] device-shell">
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
                <div className="flex items-center gap-3 mb-12">
                  <div className="w-10 h-10 bg-[#4262ff] rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">C</div>
                  <span className="text-2xl font-bold tracking-tight">My Campus</span>
                </div>
                <div className="space-y-4 flex-1">
                  <DrawerItem icon={LayoutDashboard} label="Dashboard" active={screen === 'dashboard'} onClick={() => { setScreen('dashboard'); setDrawerOpen(false); }} />
                  <DrawerItem icon={Calendar} label="Timetable" active={screen === 'timetable'} onClick={() => { setScreen('timetable'); setDrawerOpen(false); }} />
                  <DrawerItem icon={Compass} label="Campus Map" active={screen === 'map'} onClick={() => { setScreen('map'); setDrawerOpen(false); }} />
                  <DrawerItem icon={Users} label="Community" active={screen === 'community'} onClick={() => { setScreen('community'); setDrawerOpen(false); }} />
                  <DrawerItem icon={User} label="Profile" active={screen === 'profile'} onClick={() => { setScreen('profile'); setDrawerOpen(false); }} />
                </div>
                
                <div className="mt-auto">
                    <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                      <p className="text-[10px] opacity-60 mb-1 uppercase tracking-widest font-bold">Student ID</p>
                      <p className="text-sm font-mono text-white/90">#2024-883921</p>
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
      <div className="absolute top-48 -left-3 w-1.5 h-16 bg-slate-800 rounded-r shadow-sm"></div>
      <div className="absolute top-72 -left-3 w-1.5 h-24 bg-slate-800 rounded-r shadow-sm"></div>
      <div className="absolute top-72 -right-3 w-1.5 h-24 bg-slate-800 rounded-l shadow-sm"></div>
    </div>
  );
}

const DrawerItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${active ? 'bg-primary-container text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </button>
);


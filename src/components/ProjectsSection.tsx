import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "Unscatter",
    description: "A minimalist, AI-powered bookmark manager inspired by Craft.do's clean aesthetic. Securely save bookmarks and leverage AI to automatically generate concise summaries of web pages.",
    liveUrl: "https://github.com/SreejaSadhu/Unscatter",
    githubUrl: "https://github.com/SreejaSadhu/Unscatter",
    imageUrl: "/projects/unscatter_real.png",
    tags: ["React", "Node.js", "Gemini AI"],
  },
  {
    id: "02",
    title: "Under The Hood",
    description: "Learn how real software systems work through the lens of data structures. Exploring deep concepts, technical trade-offs, and real-world usage.",
    liveUrl: "https://under-the-hood-six.vercel.app/",
    githubUrl: "https://github.com/SreejaSadhu/under-the-hood",
    imageUrl: "https://under-the-hood-six.vercel.app/og-image.png",
    tags: ["Data Structures", "Systems", "React"],
  },
  {
    id: "03",
    title: "JobVault",
    description: "A comprehensive application designed to securely track and manage job applications. Built for performance and a seamless, distraction-free user experience.",
    liveUrl: "https://job-vault-bice.vercel.app/",
    githubUrl: "https://github.com/SreejaSadhu/JobVault",
    imageUrl: "https://job-vault-bice.vercel.app/logo512.png",
    tags: ["React", "State Management", "UI/UX"],
  },
  {
    id: "04",
    title: "TrackO",
    description: "An intuitive tracking platform built for modern workflows. Designed to provide real-time insights with a minimal, unobtrusive interface.",
    liveUrl: "https://track-o.vercel.app/",
    githubUrl: "https://github.com/SreejaSadhu/track-o",
    imageUrl: "https://track-o.vercel.app/tracko-icon.jpeg",
    tags: ["Vite", "Dashboard", "Analytics"],
  },
  {
    id: "05",
    title: "KeyStone",
    description: "A robust architectural foundation application ensuring secure access, stable integrations, and optimized state handling across complex systems.",
    liveUrl: "https://github.com/SreejaSadhu/KeyStoneapp",
    githubUrl: "https://github.com/SreejaSadhu/KeyStoneapp",
    imageUrl: "https://opengraph.githubassets.com/36ff43c7c4ea724c6f25291634d5fdae7eeb40d7d4811a010c122b403a61f228/SreejaSadhu/KeyStoneapp",
    tags: ["Architecture", "Security", "Fullstack"],
  }
];

const DesktopFolder = ({ title, onClick }: { title: string, onClick: () => void }) => (
  <div 
    onDoubleClick={onClick}
    onClick={() => {
      if (window.innerWidth < 768) onClick();
      else onClick(); 
    }}
    className="flex flex-col items-center gap-1.5 w-16 md:w-20 p-2 rounded-xl hover:bg-white/10 cursor-pointer group transition-colors pointer-events-auto"
  >
    <div className="w-10 h-8 md:w-14 md:h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform relative overflow-hidden flex flex-col justify-end">
      <div className="absolute top-0 left-0 w-4 md:w-5 h-1.5 md:h-2 bg-white/30 rounded-br-md border-b border-r border-white/20"></div>
      <div className="w-full h-1/2 bg-white/10 border-t border-white/20"></div>
    </div>
    <span className="text-white text-[9px] md:text-[10px] font-sans text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] line-clamp-2 px-1 leading-tight font-medium">
      {title}
    </span>
  </div>
);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const desktopRef = useRef<HTMLDivElement>(null);
  
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(10);
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return () => clearInterval(interval);
  }, []);

  const openProject = (id: string) => {
    if (!openWindows.includes(id)) {
      setOpenWindows(prev => [...prev, id]);
    }
    focusWindow(id);
  };

  const focusWindow = (id: string) => {
    setActiveWindow(id);
    setHighestZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenWindows(prev => prev.filter(wId => wId !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  return (
    <section ref={sectionRef} id="projects" className="w-full py-16 md:py-24 border-t border-os-tealdark/10 relative overflow-hidden bg-[#FDFBF7]">
      
      {/* THE NICHE MINIMALIST IVORY BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-os-tealdark/5 z-0 pointer-events-none hidden md:block"></div>
      <div className="absolute top-8 left-8 md:top-12 md:left-12 w-4 h-4 z-0 pointer-events-none flex items-center justify-center opacity-[0.15]"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
      <div className="absolute top-8 right-8 md:top-12 md:right-12 w-4 h-4 z-0 pointer-events-none flex items-center justify-center opacity-[0.15]"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
      <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-4 h-4 z-0 pointer-events-none flex items-center justify-center opacity-[0.15]"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-4 h-4 z-0 pointer-events-none flex items-center justify-center opacity-[0.15]"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center">
        
        {/* Intro Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 w-full flex flex-col items-center text-center"
        >
          <span className="inline-block py-2 px-6 rounded-none bg-transparent text-os-tealdark font-mono text-[10px] tracking-widest uppercase font-bold mb-4 border border-os-tealdark/10 shadow-sm">
            Interactive Architecture
          </span>
          <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-os-tealdark font-bold leading-none px-10 py-3 rounded-2xl">
            Selected Works.
          </h2>
        </motion.div>

        {/* --- THE PHYSICAL RETRO MONITOR COMPONENT --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1100px] flex flex-col items-center"
        >
          
          {/* Monitor Outer Casing (Beige Plastic) */}
          <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[16/11] lg:aspect-[16/10] bg-[#E5E0D5] rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(255,255,255,0.8)] border-t border-white border-b-[20px] md:border-b-[30px] border-[#C4BBA5] flex flex-col relative z-20">
            
            {/* Monitor Inner Depth (The Bezel Drop) */}
            <div className="flex-1 w-full bg-[#1A2626] rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] border-b-[6px] border-r-[4px] border-l-[2px] border-[#C8C2B3] relative flex flex-col overflow-hidden">
              
              {/* --- THE SCREEN (Where the OS runs) --- */}
              <div ref={desktopRef} className="flex-1 w-full relative bg-os-tealdark rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                 
                 {/* The Lo-Fi Wallpaper inside the screen */}
                 <div 
                   className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
                   style={{ backgroundImage: "url('/projects/retro_desk_bg.png')" }}
                 ></div>
                 <div className="absolute inset-0 bg-[#0F172A]/40 mix-blend-multiply pointer-events-none"></div>
                 
                 {/* OS Content Container */}
                 <div className="absolute inset-0 pb-12 pt-4 px-4 md:px-6 z-10 pointer-events-none overflow-hidden">
                    
                    {/* Desktop Folders */}
                    <div className="flex flex-col flex-wrap h-full gap-2 md:gap-4 items-start content-start pt-2 pointer-events-auto">
                      {projects.map(p => (
                        <DesktopFolder 
                          key={p.id} 
                          title={p.title} 
                          onClick={() => openProject(p.id)} 
                        />
                      ))}
                    </div>

                    {/* Draggable Windows */}
                    <AnimatePresence>
                      {projects.map((p, i) => {
                        if (!openWindows.includes(p.id)) return null;

                        const isFocused = activeWindow === p.id;
                        // Keep windows smaller so they fit inside the monitor screen comfortably
                        const initialTop = typeof window !== 'undefined' && window.innerWidth < 768 ? '5%' : `${5 + (i * 2)}%`;
                        const initialLeft = typeof window !== 'undefined' && window.innerWidth < 768 ? '5%' : `${15 + (i * 3)}%`;

                        return (
                          <motion.div
                            key={p.id}
                            drag
                            dragConstraints={desktopRef}
                            dragElastic={0.1}
                            dragMomentum={false}
                            onPointerDown={() => focusWindow(p.id)}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`absolute w-[85%] md:w-[500px] lg:w-[600px] h-[75%] md:h-[450px] bg-[#FDFBF7]/95 backdrop-blur-2xl rounded-xl border border-white/50 overflow-hidden flex flex-col pointer-events-auto shadow-2xl ${isFocused ? 'ring-2 ring-white/20' : ''}`}
                            style={{ 
                              zIndex: isFocused ? highestZIndex : highestZIndex - 1,
                              top: initialTop,
                              left: initialLeft
                            }}
                          >
                            {/* Window Chrome / Titlebar */}
                            <div className="h-8 md:h-10 bg-white/50 border-b border-os-tealdark/5 flex items-center px-4 justify-between cursor-grab active:cursor-grabbing shrink-0">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={(e) => closeWindow(p.id, e)} 
                                  onPointerDown={(e) => e.stopPropagation()}
                                  className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] hover:brightness-110 flex items-center justify-center group/close transition-all"
                                >
                                  <svg className="w-1.5 h-1.5 text-black/50 opacity-0 group-hover/close:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
                              </div>
                              <span className="font-mono text-[9px] md:text-[10px] text-os-tealdark/60 font-bold uppercase tracking-[0.2em] pointer-events-none select-none">
                                {p.title}.exe
                              </span>
                              <div className="w-10"></div>
                            </div>

                            {/* Window Content */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-gradient-to-b from-transparent to-os-tealdark/[0.02]">
                               <div className="w-full h-32 md:h-48 rounded-lg shadow-sm border border-os-tealdark/10 overflow-hidden mb-4 md:mb-6 group relative bg-white">
                                  <img src={p.imageUrl} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" alt={p.title} />
                               </div>
                               <div className="flex flex-col gap-4">
                                 <div>
                                    <div className="flex flex-wrap gap-1.5 mb-2 md:mb-3">
                                      {p.tags.map(t => (
                                        <span key={t} className="px-2 py-0.5 md:py-1 bg-os-tealdark/5 text-os-tealdark text-[8px] md:text-[9px] uppercase tracking-widest font-mono rounded border border-os-tealdark/10 font-bold">
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-sans font-bold text-os-tealdark mb-2 tracking-tight leading-none">{p.title}</h3>
                                    <p className="text-os-tealdark/70 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 font-light">{p.description}</p>
                                 </div>
                                 <div className="flex gap-2">
                                   <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 bg-os-tealdark text-white text-[9px] md:text-[10px] uppercase font-mono tracking-widest font-bold rounded hover:bg-[#4A8B8C] transition-colors shadow-sm">
                                     Launch
                                   </a>
                                   <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-4 py-2 border border-os-tealdark/20 bg-white/50 text-os-tealdark text-[9px] md:text-[10px] uppercase font-mono tracking-widest font-bold rounded hover:bg-os-tealdark/5 transition-colors">
                                     Source
                                   </a>
                                 </div>
                               </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                 </div>

                 {/* Taskbar inside screen */}
                 <div className="absolute bottom-0 w-full h-8 md:h-10 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-3 md:px-4 z-50 pointer-events-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                       {openWindows.map(id => (
                          <div key={`dock-${id}`} className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
                       ))}
                    </div>
                    <div className="text-white/90 text-[10px] md:text-xs font-mono font-bold tracking-wider">
                      {time}
                    </div>
                 </div>

                 {/* --- CRT GLASS OVERLAYS --- */}
                 <div className="absolute inset-0 pointer-events-none rounded-xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1)_0%,transparent_60%)] z-[100]"></div>
                 <div className="absolute inset-0 pointer-events-none rounded-xl bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.05)_0%,transparent_40%)] z-[100]"></div>
                 <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(rgba(0,0,0,0.5)_50%,transparent_50%)] bg-[length:100%_4px] z-[100]"></div>
                 <div className="absolute inset-0 pointer-events-none rounded-xl shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-[100]"></div>

              </div>
            </div>

            {/* Monitor Chin / Physical Controls */}
            <div className="h-10 md:h-16 w-full mt-2 md:mt-4 flex items-center justify-between px-4 md:px-10 shrink-0">
               {/* Branding Badge */}
               <div className="flex items-center gap-1.5 opacity-50 select-none bg-black/5 px-3 py-1 md:py-1.5 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] border border-white/50">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#27C93F]"></div>
                  <span className="font-mono text-[8px] md:text-[10px] uppercase font-bold text-black/60 ml-2 tracking-[0.2em]">SREEJA // 95</span>
               </div>
               
               {/* Vents */}
               <div className="flex gap-2 opacity-30 mix-blend-multiply">
                 <div className="w-1.5 md:w-2 h-4 md:h-6 rounded-full bg-black/40 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-1.5 md:w-2 h-4 md:h-6 rounded-full bg-black/40 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-1.5 md:w-2 h-4 md:h-6 rounded-full bg-black/40 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-1.5 md:w-2 h-4 md:h-6 rounded-full bg-black/40 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]"></div>
                 <div className="w-1.5 md:w-2 h-4 md:h-6 rounded-full bg-black/40 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]"></div>
               </div>

               {/* Physical Power Button */}
               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E5E0D5] shadow-[inset_0_-2px_5px_rgba(0,0,0,0.1),0_2px_4px_rgba(255,255,255,0.8),-2px_-2px_4px_rgba(0,0,0,0.1)] border border-[#C4BBA5] flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                 <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
               </div>
            </div>
          </div>

          {/* Monitor Stand Base */}
          <div className="w-[30%] md:w-[25%] h-6 md:h-10 bg-[#D8D2C4] shadow-[inset_0_5px_15px_rgba(0,0,0,0.3)] rounded-b-xl border-x-[8px] border-b-[8px] border-[#C4BBA5] z-10 relative -mt-1"></div>
          <div className="w-[50%] md:w-[45%] h-3 md:h-6 bg-[#C4BBA5] rounded-b-xl md:rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-0 relative -mt-1 flex justify-center">
            <div className="w-[90%] h-full bg-black/10 rounded-b-xl blur-[2px]"></div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

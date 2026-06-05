import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import deskBg from "@/assets/desk-bg.png";
import folderImg from "@/assets/folderimg.png";
import unscatterImg from "@/assets/unscatter.png";
import underTheHoodImg from "@/assets/underthehood.png";
import jobVaultImg from "@/assets/jobvault.png";
import trackoImg from "@/assets/tracko.png";
import keystoneImg from "@/assets/keystone.png";
import visitHyderabadImg from "@/assets/visithyderabad.png";
import codeNyxImg from "@/assets/codenyx.png";
import gdgcvrImg from "@/assets/gdgcvr.png";
import gtmImg from "@/assets/gtm.png";

const projects = [
    {
        id: "01",
        title: "Unscatter",
        description: "An organizational tool that brings clarity to digital clutter. Designed with a clean interface to effortlessly sort and visualize unstructured data.",
        liveUrl: "https://github.com/SreejaSadhu/Unscatter",
        githubUrl: "https://github.com/SreejaSadhu/Unscatter",
        imageUrl: unscatterImg,
        tags: ["Organization", "Productivity", "React"],
        type: "main"
    },
    {
        id: "02",
        title: "Under The Hood",
        description: "Learn how real software systems work through the lens of data structures. Exploring deep concepts, technical trade-offs, and real-world usage.",
        liveUrl: "https://under-the-hood-six.vercel.app/",
        githubUrl: "https://github.com/SreejaSadhu/under-the-hood",
        imageUrl: underTheHoodImg,
        tags: ["Data Structures", "Systems", "React"],
        type: "main"
    },
    {
        id: "03",
        title: "JobVault",
        description: "A comprehensive application designed to securely track and manage job applications. Built for performance and a seamless, distraction-free user experience.",
        liveUrl: "https://job-vault-bice.vercel.app/",
        githubUrl: "https://github.com/SreejaSadhu/JobVault",
        imageUrl: jobVaultImg,
        tags: ["React", "State Management", "UI/UX"],
        type: "main"
    },
    {
        id: "04",
        title: "TrackO",
        description: "An intuitive tracking platform built for modern workflows. Designed to provide real-time insights with a minimal, unobtrusive interface.",
        liveUrl: "https://track-o.vercel.app/",
        githubUrl: "https://github.com/SreejaSadhu/track-o",
        imageUrl: trackoImg,
        tags: ["Vite", "Dashboard", "Analytics"],
        type: "main"
    },
    {
        id: "05",
        title: "KeyStone",
        description: "A robust architectural foundation application ensuring secure access, stable integrations, and optimized state handling across complex systems.",
        liveUrl: "https://github.com/SreejaSadhu/KeyStoneapp",
        githubUrl: "https://github.com/SreejaSadhu/KeyStoneapp",
        imageUrl: keystoneImg,
        tags: ["Architecture", "Security", "Fullstack"],
        type: "main"
    },
    {
        id: "visit-hyderabad",
        title: "Visit Hyderabad",
        description: "A frontend project built in my free time as a hobby, showcasing interesting places to visit in Hyderabad. It explores my interest in building engaging user interfaces.",
        tags: ["Frontend", "Hobby", "UI/UX"],
        imageUrl: visitHyderabadImg,
        liveUrl: "https://visit-hyderabad-umber.vercel.app/",
        githubUrl: "https://github.com/SreejaSadhu/VisitHyderabad",
        type: "hobby"
    },
    {
        id: "code-nyx",
        title: "CodeNyx",
        description: "A frontend hobby project that I built in my free time because it interests me. Focuses on delivering a sleek, modern technical aesthetic.",
        tags: ["Frontend", "Hobby", "Web Design"],
        imageUrl: codeNyxImg,
        liveUrl: "https://www.code-nyx.tech/",
        githubUrl: "https://github.com/SreejaSadhu/CodeNyx",
        type: "hobby"
    },
    {
        id: "gdgcvr",
        title: "GDG CVR",
        description: "A frontend website built as a hobby project for GDG CVR in my free time. It's an exploration into community-focused web design and development.",
        tags: ["Frontend", "Hobby", "Community"],
        imageUrl: gdgcvrImg,
        liveUrl: "https://gdgcvrwebsite.vercel.app/",
        githubUrl: "https://github.com/SreejaSadhu/gdgcvrwebsite",
        type: "hobby"
    },
    {
        id: "gtm-case-study",
        title: "GTM",
        description: "A personal case study focusing on Go-To-Market (GTM) strategy. This highlights my marketing skills, strategic planning, and product positioning capabilities.",
        tags: ["Marketing", "GTM", "Strategy", "Case Study"],
        imageUrl: gtmImg,
        liveUrl: "https://unsiloedstudy.framer.website/",
        type: "hobby"
    }
];

const DesktopFolder = ({ title, onClick }: { title: string, onClick: () => void }) => (
    <motion.div
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1 p-2 rounded-lg cursor-pointer w-16 md:w-20 group relative z-50"
    >
        <div className="w-10 h-8 md:w-12 md:h-10 group-hover:brightness-110 transition-all drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center justify-center">
            <img src={folderImg} alt={`${title} Folder`} className="w-full h-full object-contain" />
        </div>
        <span className="text-white text-[10px] md:text-xs font-medium text-center font-sans tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-1 group-hover:bg-os-tealdark group-hover:rounded">
            {title}
        </span>
    </motion.div>
);

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    // OS State Management
    const [isPoweredOn, setIsPoweredOn] = useState(false);
    const [isBooting, setIsBooting] = useState(false);
    const [hasBootedBefore, setHasBootedBefore] = useState(false);
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const [highestZIndex, setHighestZIndex] = useState(10);
    
    // Interactive Mouse Tracking for Background
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const [time, setTime] = useState("");

    const handlePowerClick = () => {
        if (!isPoweredOn && !hasBootedBefore) {
            setIsPoweredOn(true);
            setIsBooting(true);
            setTimeout(() => {
                setIsBooting(false);
                setHasBootedBefore(true);
            }, 3500);
        } else {
            setIsPoweredOn(!isPoweredOn);
        }
    };

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
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full overflow-hidden bg-[#FDFBF7] flex flex-col items-center justify-center pt-24 pb-32"
        >
            {/* THE NICHE MINIMALIST IVORY BACKGROUND & NOISE */}
            <div className="absolute inset-0 bg-[#FDFBF7] z-[-2]"></div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-[5]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

            {/* INTERACTIVE SPOTLIGHT GRID */}
            <div 
                className="absolute inset-0 z-[-1] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.06) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    WebkitMaskImage: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`,
                    maskImage: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, black, transparent)`
                }}
            />

            {/* FLOATING GEOMETRIC SHAPES */}
            <motion.div 
                animate={{ rotate: 360, y: [0, -30, 0] }} 
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-[15%] left-[10%] w-48 h-48 border border-[#E2725B]/20 rounded-full z-[-1] pointer-events-none" 
            />
            <motion.div 
                animate={{ rotate: -360, y: [0, 40, 0] }} 
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] right-[10%] w-64 h-64 border border-os-tealdark/10 rounded-sm rotate-45 z-[-1] pointer-events-none" 
            />

            {/* RADIAL GLOW BEHIND THE MONITOR */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-os-tealdark/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            {/* TECHNICAL GRID & CROSSHAIRS */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-os-tealdark/5 z-0 pointer-events-none hidden md:block"></div>
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-os-tealdark/5 z-0 pointer-events-none hidden md:block"></div>
            
            <div className="absolute top-24 left-8 md:top-32 md:left-24 w-6 h-6 z-0 pointer-events-none flex items-center justify-center opacity-20"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
            <div className="absolute top-24 right-8 md:top-32 md:right-24 w-6 h-6 z-0 pointer-events-none flex items-center justify-center opacity-20"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
            <div className="absolute bottom-24 left-8 md:bottom-32 md:left-24 w-6 h-6 z-0 pointer-events-none flex items-center justify-center opacity-20"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>
            <div className="absolute bottom-24 right-8 md:bottom-32 md:right-24 w-6 h-6 z-0 pointer-events-none flex items-center justify-center opacity-20"><div className="absolute w-full h-[1px] bg-os-tealdark"></div><div className="absolute h-full w-[1px] bg-os-tealdark"></div></div>

            {/* MASSIVE BACKGROUND TYPOGRAPHY */}
            <div className="absolute top-20 md:top-32 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
                <h1 className="text-[12vw] md:text-[10vw] font-bold font-sans text-os-tealdark/[0.03] whitespace-nowrap tracking-tighter leading-none">
                    SYSTEMS ARCHITECT
                </h1>
            </div>
            <div className="absolute bottom-20 md:bottom-40 left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0">
                <h1 className="text-[12vw] md:text-[10vw] font-bold font-sans text-os-tealdark/[0.03] whitespace-nowrap tracking-tighter leading-none">
                    CREATIVE DEVELOPER
                </h1>
            </div>

            <motion.div
                className="relative w-full max-w-[850px] flex flex-col items-center z-10 px-4 md:px-8 mt-4 md:mt-8"
            >
                {/* --- THE PHYSICAL RETRO MONITOR COMPONENT --- */}
                <div className="w-full aspect-[4/5] sm:aspect-square md:aspect-[16/11] lg:aspect-[16/10] bg-[#E5E0D5] rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.2),inset_0_2px_5px_rgba(255,255,255,0.8)] border-t border-white border-b-[20px] md:border-b-[30px] border-[#C4BBA5] flex flex-col relative z-20">

                    {/* Monitor Inner Depth (The Bezel Drop) */}
                    <div className="flex-1 w-full bg-[#1A2626] rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] border-b-[6px] border-r-[4px] border-l-[2px] border-[#C8C2B3] relative flex flex-col overflow-hidden">

                        {/* --- THE SCREEN (Where the OS runs) --- */}
                        <div ref={desktopRef} className={`flex-1 w-full relative ${isPoweredOn ? 'bg-[#050808]' : 'bg-[#050808]'} rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-colors duration-700`}>

                            <AnimatePresence mode="wait">
                                {isPoweredOn && isBooting && (
                                    <motion.div 
                                        key="boot-sequence"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.8 } }}
                                        className="absolute inset-0 bg-[#050808] z-40 flex items-center justify-center pointer-events-none"
                                    >
                                        <motion.div 
                                            initial="hidden" 
                                            animate="visible" 
                                            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                                            className="text-[#E2725B] font-mono text-lg md:text-2xl font-bold tracking-widest flex items-center"
                                        >
                                            {"Hi, I'm Sreeja Sadhu".split("").map((char, i) => (
                                                <motion.span key={i} variants={{ hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline-block" } }}>
                                                    {char === " " ? "\u00A0" : char}
                                                </motion.span>
                                            ))}
                                            <motion.span 
                                                animate={{ opacity: [1, 0, 1] }} 
                                                transition={{ repeat: Infinity, duration: 0.8 }}
                                                className="w-3 h-5 bg-[#E2725B] ml-1 inline-block"
                                            ></motion.span>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {isPoweredOn && !isBooting && (
                                    <motion.div
                                        key="os-desktop"
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 pointer-events-none"
                                    >
                                        {/* The Lo-Fi Wallpaper inside the screen */}
                                        <div
                                            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.02]"
                                            style={{ backgroundImage: `url(${deskBg})` }}
                                        ></div>
                                        <div className="absolute inset-0 bg-[#0F172A]/40 mix-blend-multiply pointer-events-none"></div>

                                        {/* OS Content Container */}
                                        <div className="absolute inset-0 pb-12 pt-4 px-4 md:px-6 z-10 pointer-events-none overflow-hidden">

                                            {/* Main Projects (Left) */}
                                            <div className="absolute top-4 bottom-10 left-4 md:left-6 flex flex-col flex-wrap gap-2 md:gap-4 items-start content-start pointer-events-auto">
                                                {projects.filter(p => p.type !== "hobby").map(p => (
                                                    <DesktopFolder
                                                        key={p.id}
                                                        title={p.title}
                                                        onClick={() => openProject(p.id)}
                                                    />
                                                ))}
                                            </div>

                                            {/* Hobby Projects (Right) */}
                                            <div className="absolute top-4 bottom-10 right-4 md:right-6 flex flex-col flex-wrap gap-2 md:gap-4 items-end content-end pointer-events-auto">
                                                {projects.filter(p => p.type === "hobby").map(p => (
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
                                                className={`absolute w-[85%] md:w-[460px] lg:w-[540px] h-[75%] md:h-[260px] lg:h-[300px] bg-[#FDFBF7]/95 backdrop-blur-2xl rounded-xl border border-white/50 overflow-hidden flex flex-col pointer-events-auto shadow-2xl ${isFocused ? 'ring-2 ring-white/20' : ''}`}
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
                                                <div className="flex-1 overflow-y-auto p-3 md:p-5 custom-scrollbar bg-gradient-to-b from-transparent to-os-tealdark/[0.02]">
                                                    <div className="flex flex-col sm:flex-row gap-4 h-full">
                                                        <div className="w-full sm:w-[150px] lg:w-[190px] shrink-0 h-32 sm:h-auto min-h-[140px] rounded-lg shadow-sm border border-os-tealdark/10 overflow-hidden group relative bg-white">
                                                            <img src={p.imageUrl} className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out" alt={p.title} />
                                                        </div>
                                                        <div className="flex flex-col gap-2.5 flex-1">
                                                            <h3 className="text-lg md:text-xl font-semibold text-os-tealdark leading-tight font-sans tracking-tight">
                                                                {p.title}
                                                            </h3>
                                                            <p className="text-xs md:text-sm text-os-tealdark/70 leading-relaxed font-sans">
                                                                {p.description}
                                                            </p>
                                                            <div className="flex flex-wrap gap-1.5 mt-1">
                                                                {p.tags.map(tag => (
                                                                    <span key={tag} className="px-2 py-0.5 rounded-md bg-os-tealdark/5 text-os-tealdark/70 text-[10px] md:text-xs font-medium border border-os-tealdark/10 font-sans tracking-wide">
                                                                        {tag}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                            <div className="flex gap-2 mt-2 pt-1 border-t border-os-tealdark/5">
                                                                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 md:px-4 md:py-2 bg-os-tealdark text-white text-[9px] md:text-[10px] uppercase font-mono tracking-widest font-bold rounded hover:bg-[#4A8B8C] transition-colors shadow-sm">
                                                                    Launch
                                                                </a>
                                                                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex-1 text-center px-3 py-1.5 md:px-4 md:py-2 border border-os-tealdark/20 bg-white/50 text-os-tealdark text-[9px] md:text-[10px] uppercase font-mono tracking-widest font-bold rounded hover:bg-os-tealdark/5 transition-colors">
                                                                    Source
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                            </AnimatePresence>
                                        </div>

                                        {/* Taskbar inside screen */}
                                        <div className="absolute bottom-0 w-full h-6 md:h-7 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center justify-between px-3 md:px-4 z-50 pointer-events-auto">
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-[4px] bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors cursor-pointer">
                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                                                </div>
                                            </div>
                                            <div className="flex gap-1.5">
                                                {openWindows.map(id => (
                                                    <div key={`dock-${id}`} className="w-1 h-1 rounded-full bg-white/60 shadow-[0_0_5px_rgba(255,255,255,0.5)]"></div>
                                                ))}
                                            </div>
                                            <div className="text-white/90 text-[8px] md:text-[10px] font-mono font-bold tracking-wider">
                                                {time}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

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
                        <div 
                            onClick={handlePowerClick}
                            className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#E5E0D5] shadow-[inset_0_-2px_5px_rgba(0,0,0,0.1),0_2px_4px_rgba(255,255,255,0.8),-2px_-2px_4px_rgba(0,0,0,0.1)] border border-[#C4BBA5] flex items-center justify-center cursor-pointer active:scale-95 transition-transform group"
                        >
                            <motion.div 
                                animate={isPoweredOn 
                                    ? { backgroundColor: "#22c55e", boxShadow: "0 0 10px rgba(34,197,94,0.8)", opacity: 1 } 
                                    : { backgroundColor: ["#22c55e", "#14532d", "#22c55e"], boxShadow: ["0 0 8px rgba(34,197,94,0.6)", "0 0 0px rgba(34,197,94,0)", "0 0 8px rgba(34,197,94,0.6)"], opacity: [1, 0.4, 1] }
                                }
                                transition={isPoweredOn 
                                    ? { duration: 0.2 } 
                                    : { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                                }
                                className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Monitor Stand Base */}
                <div className="w-[30%] md:w-[25%] h-6 md:h-10 bg-[#D8D2C4] shadow-[inset_0_5px_15px_rgba(0,0,0,0.3)] rounded-b-xl border-x-[8px] border-b-[8px] border-[#C4BBA5] z-10 relative -mt-1"></div>
                <div className="w-[50%] md:w-[45%] h-3 md:h-6 bg-[#C4BBA5] rounded-b-xl md:rounded-b-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] z-0 relative -mt-1 flex justify-center">
                    <div className="w-[90%] h-full bg-black/10 rounded-b-xl blur-[2px]"></div>
                </div>

            </motion.div>



            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[2px] h-10 bg-os-tealdark/30 rounded-full"
                />
            </motion.div>
        </section>
    );
};

export default HeroSection;

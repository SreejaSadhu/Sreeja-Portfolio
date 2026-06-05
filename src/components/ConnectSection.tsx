import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const ConnectSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cards = [
    { 
        id: "github",
        title: "GitHub", 
        icon: <Github strokeWidth={1.5} className="w-16 h-16 md:w-24 md:h-24 mb-4 text-[#FDFBF7]" />, 
        href: "https://github.com/SreejaSadhu",
        baseRotate: -20,
        baseY: 80,
        baseX: -380,
        bgColor: "bg-[#E2725B]",
        textColor: "text-[#FDFBF7]"
    },
    { 
        id: "linkedin",
        title: "LinkedIn", 
        icon: <Linkedin strokeWidth={1.5} className="w-16 h-16 md:w-24 md:h-24 mb-4 text-[#FDFBF7]" />, 
        href: "https://linkedin.com/in/sreejasadhu",
        baseRotate: -7,
        baseY: 15,
        baseX: -130,
        bgColor: "bg-[#4A8B8C]",
        textColor: "text-[#FDFBF7]"
    },
    { 
        id: "email",
        title: "Email", 
        icon: <Mail strokeWidth={1.5} className="w-16 h-16 md:w-24 md:h-24 mb-4 text-[#1A2626]" />, 
        href: "mailto:sreejasadhu06@gmail.com",
        baseRotate: 7,
        baseY: 15,
        baseX: 130,
        bgColor: "bg-[#C4BBA5]",
        textColor: "text-[#1A2626]"
    },
    { 
        id: "resume",
        title: "Resume", 
        icon: <FileText strokeWidth={1.5} className="w-16 h-16 md:w-24 md:h-24 mb-4 text-[#FDFBF7]" />, 
        href: "/SreejaSadhu_Resume.pdf",
        baseRotate: 20,
        baseY: 80,
        baseX: 380,
        bgColor: "bg-[#1A2626]",
        textColor: "text-[#FDFBF7]"
    },
  ];

  return (
    <section ref={sectionRef} id="connect" className="relative w-full min-h-screen py-32 md:py-48 bg-[#FDFBF7] overflow-hidden flex flex-col items-center justify-center border-t border-os-border/10">
      
      {/* Massive Background Typography */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] overflow-hidden">
        <motion.h2 
            style={{ x: textX }}
            className="text-[12rem] md:text-[22rem] font-sans font-bold whitespace-nowrap text-os-tealdark"
        >
          INITIATE CONNECTION
        </motion.h2>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center w-full px-4">
        
        <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#E2725B] uppercase mb-6 font-semibold block">
          Connect
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tight text-os-tealdark font-medium leading-tight mb-20 md:mb-32">
          Let's build something.
        </h2>

        {/* Fanned Cards Container */}
        <div className="relative flex justify-center items-center w-full max-w-5xl h-[250px] md:h-[400px]">
          {cards.map((card, i) => {
            const isHovered = hoveredIndex === i;
            
            // Tighter spread on mobile so they fit nicely
            const xOffset = isMobile ? card.baseX * 0.45 : card.baseX;
            const yOffset = isMobile ? card.baseY * 0.6 : card.baseY;

            return (
              <motion.a
                href={card.href}
                target={card.id !== "email" ? "_blank" : undefined}
                key={card.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ zIndex: isHovered ? 50 : 10 + i }}
                animate={{
                  rotate: isHovered ? 0 : card.baseRotate,
                  y: isHovered ? -30 : yOffset,
                  x: xOffset,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`absolute w-36 h-52 md:w-64 md:h-80 ${card.bgColor} rounded-2xl md:rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/10 flex flex-col items-center justify-center cursor-pointer group hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transition-shadow duration-300`}
              >
                {/* Physical Card Detailing */}
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl md:rounded-t-3xl pointer-events-none"></div>
                
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -10 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    {card.icon}
                </motion.div>
                
                <h3 className={`text-lg md:text-2xl font-sans font-bold ${card.textColor} tracking-tight opacity-90 group-hover:opacity-100 transition-opacity mt-2`}>
                  {card.title}
                </h3>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ConnectSection;

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LogoBox = ({ icon, name }: { icon: string; name: string }) => (
  <div className="aspect-square border-b border-r border-os-tealdark/10 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 group hover:bg-white transition-all duration-300 cursor-default relative overflow-hidden hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] z-0 hover:z-10">
    <i className={`${icon} colored text-5xl lg:text-7xl filter drop-shadow-sm group-hover:scale-110 group-hover:-translate-y-3 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]`} />
    <span className="absolute bottom-4 lg:bottom-6 font-mono text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-os-tealdark opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
      {name}
    </span>
  </div>
);

const EmptyBox = ({ text }: { text?: string }) => (
  <div className="aspect-square border-b border-r border-os-tealdark/10 bg-os-tealdark/[0.015] flex items-center justify-center p-4 relative overflow-hidden">
    {text && <span className="font-mono text-[9px] text-os-tealdark/20 text-center tracking-widest leading-relaxed uppercase">{text}</span>}
    {/* Subtle diagonal lines in empty boxes */}
    {!text && <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #2A3D3D 10px, #2A3D3D 11px)' }}></div>}
  </div>
);

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-4 h-4 flex items-center justify-center pointer-events-none z-50 ${className}`}>
    <div className="w-full h-[1px] bg-os-tealdark/40 absolute"></div>
    <div className="w-[1px] h-full bg-os-tealdark/40 absolute"></div>
  </div>
);

const Marquee = () => (
  <div className="w-full border-t border-b border-os-tealdark/10 overflow-hidden flex bg-white/30 backdrop-blur-md mt-24 md:mt-32 py-4">
    <motion.div 
      animate={{ x: ["0%", "-50%"] }} 
      transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      className="flex whitespace-nowrap"
    >
      {[...Array(8)].map((_, i) => (
        <span key={i} className="text-os-tealdark/40 font-mono text-sm uppercase tracking-widest px-8 flex items-center gap-8">
          <span>// SYS.SPECS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-os-red/50"></span>
          <span>BUILT FOR SCALE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-os-teal/50"></span>
          <span>ZERO COMPROMISE</span>
        </span>
      ))}
    </motion.div>
  </div>
);

const TechStackSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Physics Scroll Calculations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Tumble Physics: Y translation and Rotation based on scroll progress
  const leftDonutY = useTransform(scrollYProgress, [0, 1], ["-20vh", "120vh"]);
  const leftDonutRotate = useTransform(scrollYProgress, [0, 1], [0, 720]);

  const leftPillY = useTransform(scrollYProgress, [0, 1], ["100vh", "-30vh"]);
  const leftPillRotate = useTransform(scrollYProgress, [0, 1], [-45, -540]);

  const rightCubeY = useTransform(scrollYProgress, [0, 1], ["-10vh", "110vh"]);
  const rightCubeRotate = useTransform(scrollYProgress, [0, 1], [45, 1080]);

  const rightSphereY = useTransform(scrollYProgress, [0, 1], ["110vh", "-20vh"]);
  const rightSphereScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.5, 0.5]);

  return (
    <section 
      ref={sectionRef} 
      id="tech" 
      className="relative w-full pt-32 md:pt-48 bg-[#FDFBF7] overflow-hidden"
    >
      {/* Noise Texture Overlay for physical paper feel */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Playful Ambient Background Blobs */}
      <div className="absolute top-20 left-0 md:left-20 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-os-red/10 rounded-full blur-[120px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-20 right-0 md:right-20 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-os-teal/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '12s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-os-gold/15 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-pulse" style={{ animationDuration: '10s' }}></div>

      {/* --- SCROLL PHYSICS INTERACTIVE SHAPES --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden md:block">
        
        {/* Left Side: Falling Red Donut */}
        <motion.div 
          style={{ y: leftDonutY, rotate: leftDonutRotate, willChange: "transform" }}
          className="absolute top-0 left-12 w-32 h-32 rounded-full border-[16px] border-os-red/30 backdrop-blur-sm shadow-[0_10px_30px_rgba(232,68,42,0.15)]"
        />

        {/* Left Side: Rising Gold Pill */}
        <motion.div 
          style={{ y: leftPillY, rotate: leftPillRotate, willChange: "transform" }}
          className="absolute top-0 left-24 w-16 h-40 rounded-full bg-gradient-to-br from-os-gold/40 to-os-gold/10 backdrop-blur-md border border-white/40 shadow-2xl"
        />

        {/* Right Side: Tumbling Teal Cube */}
        <motion.div 
          style={{ y: rightCubeY, rotate: rightCubeRotate, willChange: "transform" }}
          className="absolute top-0 right-20 w-24 h-24 bg-os-teal/20 backdrop-blur-md border-2 border-white/50 rounded-xl shadow-[0_20px_40px_rgba(74,139,140,0.2)]"
        />

        {/* Right Side: Looming Dark Sphere */}
        <motion.div 
          style={{ y: rightSphereY, scale: rightSphereScale, willChange: "transform" }}
          className="absolute top-0 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-[#2A3D3D]/30 to-transparent backdrop-blur-3xl border border-white/20"
        />

      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20 flex flex-col items-center text-center"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-os-teal/10 text-os-teal font-mono text-xs tracking-widest uppercase font-bold mb-6 border border-os-teal/20">
            System Specifications
          </span>
          <h2 className="text-4xl md:text-5xl font-sans tracking-tight text-os-tealdark font-medium">
            The Toolbox.
          </h2>
        </motion.div>

        {/* The Architectural Grid */}
        <div className="relative">
          {/* Blueprint Corner Crosshairs */}
          <Crosshair className="-top-2 -left-2" />
          <Crosshair className="-top-2 -right-2" />
          <Crosshair className="-bottom-2 -left-2" />
          <Crosshair className="-bottom-2 -right-2" />

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-os-tealdark/10 bg-white/20 backdrop-blur-3xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] overflow-hidden"
          >
            {/* --- FRONTEND GROUP --- */}
            <div className="col-span-2 row-span-2 border-b border-r border-os-tealdark/10 p-8 md:p-12 flex flex-col justify-between bg-os-red text-white group overflow-hidden relative transition-transform hover:scale-[1.02] hover:z-20 hover:shadow-2xl z-10 origin-top-left">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="font-mono text-xs tracking-widest font-bold opacity-80 relative z-10">01 / INTERFACE</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight relative z-10 leading-none">Frontend<br/>Ecosystem</h3>
            </div>
            <LogoBox icon="devicon-react-original" name="React" />
            <LogoBox icon="devicon-nextjs-plain" name="Next.js" />
            <LogoBox icon="devicon-typescript-plain" name="TypeScript" />
            <LogoBox icon="devicon-javascript-plain" name="JavaScript" />
            <LogoBox icon="devicon-tailwindcss-plain" name="Tailwind" />
            <LogoBox icon="devicon-html5-plain" name="HTML5" />
            <EmptyBox text="Render pipeline optimized" />
            <EmptyBox />

            {/* --- BACKEND GROUP --- */}
            <LogoBox icon="devicon-nodejs-plain" name="Node.js" />
            <LogoBox icon="devicon-python-plain" name="Python" />
            <LogoBox icon="devicon-fastapi-plain" name="FastAPI" />
            <LogoBox icon="devicon-express-original" name="Express" />
            
            <div className="col-span-2 row-span-2 border-b border-r border-os-tealdark/10 p-8 md:p-12 flex flex-col justify-between bg-os-teal text-white group overflow-hidden relative transition-transform hover:scale-[1.02] hover:z-20 hover:shadow-2xl z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="font-mono text-xs tracking-widest font-bold opacity-80 relative z-10">02 / SYSTEMS</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight relative z-10 leading-none">Backend<br/>Architecture</h3>
            </div>
            
            <LogoBox icon="devicon-java-plain" name="Java" />
            <EmptyBox />
            <EmptyBox text="Microservices Ready" />
            <EmptyBox />

            {/* --- INFRASTRUCTURE GROUP --- */}
            <div className="col-span-2 row-span-2 border-b border-r border-os-tealdark/10 p-8 md:p-12 flex flex-col justify-between bg-os-gold text-os-tealdark group overflow-hidden relative transition-transform hover:scale-[1.02] hover:z-20 hover:shadow-2xl z-10 origin-bottom-left">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="font-mono text-xs tracking-widest font-bold opacity-70 relative z-10">03 / INFRA</span>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight relative z-10 leading-none">Data &<br/>Deployment</h3>
            </div>
            <LogoBox icon="devicon-postgresql-plain" name="PostgreSQL" />
            <LogoBox icon="devicon-mongodb-plain" name="MongoDB" />
            <LogoBox icon="devicon-redis-plain" name="Redis" />
            <LogoBox icon="devicon-docker-plain" name="Docker" />
            <LogoBox icon="devicon-git-plain" name="Git" />
            <LogoBox icon="devicon-figma-plain" name="Figma" />
            <LogoBox icon="devicon-vscode-plain" name="VS Code" />
            <EmptyBox text="Automated CI/CD workflows" />

          </motion.div>
        </div>
      </div>

      {/* Kinetic Marquee */}
      <Marquee />

    </section>
  );
};

export default TechStackSection;

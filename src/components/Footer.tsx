const Footer = () => {
  return (
    <footer className="py-12 bg-[#FDFBF7] border-t border-os-tealdark/10 w-full relative overflow-hidden">
      {/* Subtle grid to match hero */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1A2626 1px, transparent 1px), linear-gradient(90deg, #1A2626 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side */}
        <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-os-tealdark/60 uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} Sreeja Sadhu
            </span>
            <div className="hidden md:block w-px h-4 bg-os-tealdark/20"></div>
            <span className="hidden md:flex items-center gap-2 font-mono text-[10px] text-os-tealdark/50 tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A8B8C] animate-pulse"></span>
                SYS.ONLINE
            </span>
        </div>

        {/* Right Side */}
        <a 
          href="#" 
          className="group flex items-center gap-2 font-mono text-xs text-os-tealdark uppercase tracking-widest hover:text-[#E2725B] transition-colors"
        >
          <span>Return to Top</span>
          <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;

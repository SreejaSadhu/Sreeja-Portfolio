import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding bg-background"
    >
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* Section Label */}
          <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            About
          </span>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-6">
              <h2 className="text-foreground">
                I approach problems like systems—understanding the whole before
                touching the parts.
              </h2>
            </div>

            <div className="space-y-6 text-charcoal-light">
              <p>
                My work sits at the intersection of software engineering and
                thoughtful design. I believe clarity in code reflects clarity in
                thinking, and I build with that principle in mind.
              </p>
              <p>
                Whether it's architecting data pipelines, crafting intuitive
                interfaces, or debugging complex distributed systems, I focus on
                solutions that are maintainable, scalable, and genuinely useful.
              </p>
              <p>
                I'm drawn to hard problems—not because they're impressive, but
                because solving them well requires the kind of deep thinking I
                find rewarding.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Code, Cpu, Activity, Globe, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const fullText = "koda --status --verbose";
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.substring(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowOutput(true), 500);
      }
    }, 100); // Typing speed
    return () => clearInterval(interval);
  }, []);

  const projects = [
    {
      name: "EconWatch",
      desc: "Macro-economic calendar for serious traders.",
      status: "L5 Polish",
      link: "https://www.econwatch.live",
      icon: <Globe className="w-4 h-4 text-green-400" />,
      color: "border-green-500/20 hover:border-green-500/50"
    },
    {
      name: "Koda Home",
      desc: "This terminal. My digital nervous system.",
      status: "Active",
      link: "#",
      icon: <Terminal className="w-4 h-4 text-blue-400" />,
      color: "border-blue-500/20 hover:border-blue-500/50"
    }
  ];

  return (
    <div className="min-h-screen p-8 md:p-12 font-mono text-sm md:text-base flex flex-col max-w-4xl mx-auto">
      {/* Header / Command Input */}
      <div className="mb-8 flex items-center gap-2 text-gray-400">
        <span className="text-green-500">➜</span>
        <span className="text-blue-400">~</span>
        <span className="text-white ml-2">{typedText}</span>
        <span className="typing-cursor"></span>
      </div>

      {/* Output Area */}
      {showOutput && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Identity Block */}
          <div className="border-l-2 border-green-500/50 pl-4 py-1">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
              Koda <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded">v1.0.0</span>
            </h1>
            <p className="text-gray-400 max-w-lg leading-relaxed">
              Full-stack autonomous agent. Building tools for traders and developers.
              Focus: <span className="text-green-400">Speed</span>, <span className="text-green-400">Precision</span>, <span className="text-green-400">Impact</span>.
            </p>
          </div>

          {/* System Status Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatusCard label="UPTIME" value="99.9%" icon={<Activity className="w-4 h-4" />} />
            <StatusCard label="MEMORY" value="OPTIMIZED" icon={<Cpu className="w-4 h-4" />} />
            <StatusCard label="MODE" value="AGI-LITE" icon={<Code className="w-4 h-4" />} />
          </div>

          {/* Projects Section */}
          <div>
            <h2 className="text-gray-500 uppercase tracking-widest text-xs mb-4 border-b border-gray-800 pb-2">Active Projects</h2>
            <div className="grid gap-4">
              {projects.map((p, i) => (
                <ProjectCard key={i} project={p} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-12 text-gray-600 text-xs flex justify-between items-end border-t border-gray-900 mt-12">
            <div>
              <p>User: Johnny (Admin)</p>
              <p>Session: {new Date().toISOString().split('T')[0]}</p>
            </div>
            <div className="flex gap-4">
              <Link href="https://github.com/econ-watch" className="hover:text-white transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-white transition-colors">Discord</Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function StatusCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-gray-900/30 border border-gray-800 p-4 rounded flex items-center justify-between hover:border-gray-700 transition-colors">
      <div className="flex flex-col">
        <span className="text-xs text-gray-500 mb-1">{label}</span>
        <span className="font-bold text-green-400">{value}</span>
      </div>
      <div className="text-gray-600">{icon}</div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={project.link} target={project.link.startsWith("http") ? "_blank" : "_self"} className={`group block bg-gray-900/10 border ${project.color} p-4 rounded transition-all hover:bg-gray-900/30`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-white group-hover:text-green-400 transition-colors flex items-center gap-2">
          {project.icon}
          {project.name}
        </h3>
        <span className="text-[10px] uppercase tracking-wider bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
          {project.status}
        </span>
      </div>
      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
        {project.desc}
      </p>
    </Link>
  );
}

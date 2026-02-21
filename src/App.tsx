/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cog, Zap, Target, Trophy, Users, ArrowRight, Hammer, Microscope, Rocket, Menu, X, Clock, FileText, DollarSign, Heart } from 'lucide-react';
import ModelViewer from './components/ModelViewer';

// --- Components ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const location = useLocation();
  const email = "frc4013.clockworkmania@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems = [
    { name: 'The Atelier', path: '/', icon: Clock },
    { name: 'Our Team', path: '/team', icon: Users },
    { name: 'Outreach', path: '/outreach', icon: Rocket },
    { name: 'Impact', path: '/impact', icon: FileText },
    { name: 'Sponsorship', path: '/sponsorship', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-burgundy selection:bg-silver selection:text-burgundy overflow-x-hidden">
      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'radial-gradient(var(--color-silver) 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }} />
      
      {/* Navigation Rail */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-burgundy/80 backdrop-blur-md border-b border-silver/10 px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
            <Cog className="w-8 h-8 text-silver/40 group-hover:text-silver transition-colors" />
          </motion.div>
          <span className="font-serif text-xl tracking-widest uppercase text-silver/80"><span className="text-silver font-bold">4013</span> Clockwork Mania</span>
        </Link>

        <div className="hidden lg:flex gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all hover:text-silver ${location.pathname === item.path ? 'text-silver' : 'text-silver/40'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-silver">
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 z-40 bg-burgundy pt-24 px-6 flex flex-col gap-6"
          >
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 text-2xl font-serif text-silver/60 hover:text-silver"
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 min-h-screen relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-24 py-12 bg-black/20 border-t border-silver/5 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-script text-3xl text-silver/60">4013 Clockwork Mania</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-silver/20 mt-2">Orlando Science High School • Est. 2012</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-silver/20">
            <button 
              onClick={handleCopy}
              className="hover:text-silver transition-colors relative group"
            >
              <span className={copied ? 'opacity-0' : 'opacity-100'}>{email}</span>
              <span className={`absolute inset-0 flex items-center justify-center transition-opacity text-silver font-bold ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                COPIED!
              </span>
            </button>
            <a href="https://www.instagram.com/frc4013/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-silver transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const Label = ({ children, color = "text-silver/40" }: { children: React.ReactNode, color?: string }) => (
  <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${color} mb-4 block`}>
    {children}
  </span>
);

// --- Pages ---

const Home = () => (
  <PageTransition>
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {/* Decorative Gears from Packet Cover */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
          <Cog className="w-full h-full text-silver" />
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <Cog className="w-full h-full text-silver" />
        </motion.div>
      </div>

      <div className="max-w-4xl border-2 border-silver/10 p-12 md:p-24 relative">
        {/* Ornate Corner Accents */}
        <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-silver/40" />
        <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-silver/40" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-silver/40" />
        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-silver/40" />
        
        {/* Inner Ornate Lines */}
        <div className="absolute inset-2 border border-silver/5 pointer-events-none" />
        
        <h1 className="font-serif text-4xl md:text-6xl tracking-[0.4em] uppercase mb-4 text-silver/80">
          4013
        </h1>
        <h2 className="font-script text-6xl md:text-9xl mb-12 text-silver engraved-text">
          Clockwork Mania
        </h2>
        
        <div className="flex flex-col items-center gap-8">
          {/* 3D Model Viewer */}
          <div className="w-full max-w-2xl mb-8">
            <ModelViewer url="https://dl.dropboxusercontent.com/scl/fi/50ma1g0q3ma86mkuf8ohv/Robot-Assembly-2026.gltf?rlkey=c0d5lm1gknvxui8ayly266m3e&st=az7kfhoz&raw=1" />
          </div>

          {/* Central Emblem - Plague Doctor Logo */}
          <div className="w-64 h-64 rounded-full border-4 border-double border-silver/20 flex items-center justify-center relative overflow-hidden bg-black/20">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 border-t-4 border-silver/40 rounded-full z-10 pointer-events-none" 
            />
            <img 
              src="https://lh3.googleusercontent.com/d/1ba4xvGC0RrP3IsK3GRIVi-UWQxO0_R6Z" 
              alt="Clockwork Mania Logo" 
              className="w-48 h-48 object-contain opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="mt-8 space-y-4">
            <p className="font-serif italic text-xl text-silver/60">"Even the smallest gear makes the Clock Work"</p>
            <Link to="/team">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-12 py-4 border border-silver/20 text-silver uppercase font-mono text-xs tracking-[0.3em] hover:bg-silver hover:text-burgundy transition-all"
              >
                Open the Ledger
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
);

const Team = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-24">
        <div>
          <h2 className="text-5xl md:text-7xl font-serif mb-12">OUR <span className="italic text-silver/60">TEAM</span></h2>
          <div className="space-y-8 text-lg text-silver/70 leading-relaxed font-light">
            <p>
              Clockwork Mania, a 501(c)(3) FIRST Robotics Competition team from Orlando Science High School, has been advancing STEM opportunities since 2012.
            </p>
            <p>
              With a strong record of excellence, the team has qualified for the FRC World Championship in 10 of its 12 seasons.
            </p>
          </div>
        </div>
        
        <div className="space-y-12">
          <div className="p-12 border border-silver/10 bg-black/5 relative">
            <p className="text-2xl font-serif italic text-silver/80 leading-relaxed">
              "Competition for the sake not of destroying one another, but for the sake of bettering and improving both competitors as a result of the competition."
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-silver/40">— Woodie Flowers</p>
          </div>
        </div>
      </div>

      <div className="pt-24 border-t border-silver/10 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">FOR OUR <span className="italic text-silver/60">STUDENTS</span></h2>
          <p className="text-silver/40 font-mono text-[10px] uppercase tracking-widest italic">Nurturing well-rounded individuals by emphasizing collaboration, leadership, and adaptability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <div className="p-8 border border-silver/10 bg-black/5">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-4">
                <Microscope className="w-6 h-6 text-silver/40" />
                Technical Skills
              </h3>
              <ul className="space-y-4 font-mono text-sm text-silver/60">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> CAD (Onshape/Fusion 360)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Machining/CAM (Mill, Lathe, CNC)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Programming (Javascript)</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Imagery & Industrial Design</li>
              </ul>
            </div>
            
            <div className="p-8 border border-silver/10 bg-black/5">
              <h3 className="text-2xl font-serif mb-6 flex items-center gap-4">
                <Users className="w-6 h-6 text-silver/40" />
                Life Skills
              </h3>
              <ul className="space-y-4 font-mono text-sm text-silver/60">
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Teamwork & Collaboration</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Leadership Capabilities</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Problem-Solving & Adaptability</li>
                <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-silver/20 rotate-45" /> Time Management</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-12">
            <div className="p-12 border-2 border-silver/5 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy className="w-24 h-24" /></div>
              <h3 className="text-4xl font-serif mb-6 text-silver">100%</h3>
              <p className="text-lg text-silver/60 leading-relaxed">
                College acceptance rate for over a decade. Our students have been admitted to top institutions including <span className="text-silver">MIT, Georgia Tech, and Stanford</span>.
              </p>
            </div>
            
            <div className="p-12 border-2 border-silver/5">
              <h3 className="text-2xl font-serif mb-4 text-silver">Regional Impact</h3>
              <p className="text-silver/60 leading-relaxed">
                Played a key role in establishing six STEM-based campuses across Central Florida, strengthening the region's scientific ecosystem.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 border-t border-silver/10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif mb-4">SUB- <span className="italic text-silver/60">TEAMS</span></h2>
          <p className="text-silver/40 font-mono text-[10px] uppercase tracking-widest">The specialized divisions of our atelier</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Mechanical", captain: "Armando Collazo De Jesus", desc: "Oversees manufacturing and assembly. Prototyping manipulators and mechanisms." },
            { title: "Design", captain: "Phillip Silva", desc: "Responsible for CAD designing, building, and programming. Creating computer design plans." },
            { title: "Programming", captain: "Advay Bhangale", desc: "Creating the logic between operator controls and sensors. Developing autonomous programs." },
            { title: "Electrical", captain: "Anum Ali", desc: "The connection between mechanical and programming. Managing the electric board and wiring." },
            { title: "Business", captain: "Sanjana Nagarur", desc: "Managing website, newsletters, social media, and award submissions." },
            { title: "Marketing", captain: "Aarika Rao", desc: "Photography, videography, branding, and creating the Impact video." },
            { title: "Outreach", captain: "Cecily May", desc: "Expanding the team's network and community impact through events and service." },
            { title: "Strategy", captain: "Josef Junga", desc: "Gathering and analyzing data from matches to determine alliance partners." }
          ].map((team, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-8 border border-silver/10 bg-black/5 hover:bg-silver/5 transition-all group"
            >
              <h3 className="text-2xl font-serif text-silver mb-1 group-hover:text-white transition-colors">{team.title}</h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-silver/30 mb-6 italic">Captain: {team.captain}</p>
              <p className="text-sm text-silver/50 leading-relaxed">{team.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </PageTransition>
);

const Outreach = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-24 items-start mb-24">
        <div className="lg:w-1/2">
          <h2 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">BREAKDOWN <br /> <span className="italic text-silver/60">OF OUTREACH</span></h2>
          <div className="p-8 border-2 border-silver/10 bg-black/10">
            <p className="text-xl text-silver/70 leading-relaxed">
              Clockwork Mania has hosted <span className="text-silver">312 local and international teams</span> across 39 FIRST events, initiated 40 teams, and mentored 47 teams.
            </p>
          </div>
          <div className="mt-12 space-y-6">
            <div className="p-6 border border-silver/5 bg-black/5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-silver/40 mb-2">The Impact of Summer</h4>
              <p className="text-silver/60 italic">"Successfully raising over $11,000 for our FTC and FRC Team through FLL Summer Camps (125 hours in total)."</p>
            </div>
            <div className="p-6 border border-silver/5 bg-black/5">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-silver/40 mb-2">Technical Certification</h4>
              <p className="text-silver/60 italic">"Created and maintained Autodesk Certification Testing Center; 121 certified in 2024 alone."</p>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-12">
          {[
            { 
              title: "Winding Up the World", 
              label: "International Outreach", 
              desc: "Focuses on global STEM education. Highlights include teaching robotics in Uzbekistan, introducing FLL/FTC in Puerto Rico, collaborating with high schools in Japan, and donating Lego MindStorm kits in India. Preparing to deliver 30+ FLL kits in 2025 with Missão AQTS." 
            },
            { 
              title: "Making the Community Tick", 
              label: "Community Engagement", 
              desc: "Strengthening STEM locally through hosting and mentoring FIRST teams, organizing FRC and FLL events, and establishing educational programs like CAD certification. Summer camps provide immersive training in mechanics, coding, and robotics." 
            },
            { 
              title: "Meshing with Public Figures", 
              label: "Collaborations", 
              desc: "Building partnerships with local government, school boards, and organizations. Notable efforts include creating tools for ADD/ADHD students through 'COGnitive Solutions' and collaborating with institutions like Advent Health and Siemens." 
            },
            {
              title: "Inspire. Advocate. Reach.",
              label: "Leadership Advocacy",
              desc: "Showcased FIRST at Florida Chamber of Commerce (1,000+ attendees). Met with Mayor Jerry Demings, OCPS Board, and Seminole County officials to advocate for robotics in public school engineering pathways."
            }
          ].map((item, i) => (
            <div key={i} className="group">
              <Label color="text-silver/20">{item.label}</Label>
              <h3 className="text-3xl font-serif text-silver mb-4 group-hover:translate-x-2 transition-transform">{item.title}</h3>
              <p className="text-silver/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageTransition>
);

const Impact = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <h2 className="text-6xl md:text-8xl font-serif mb-8">IMPACT <span className="italic text-silver/60">DOCUMENTATION</span></h2>
        <p className="text-xl text-silver/50 italic">A comprehensive ledger of our efforts and achievements.</p>
      </div>

      <div className="space-y-24">
        {[
          {
            category: "Workshops & Outreach",
            items: [
              { id: "ID-001", text: "Workshop Access & Materials for FTC Teams (2021-Present)" },
              { id: "ID-002", text: "Science Olympiad Mentoring (Fall 2021-Spring 2022)" },
              { id: "ID-004", text: "COGnitive Solutions - Fidget Device for ASD/ADHD (Fall 2022)" }
            ]
          },
          {
            category: "STEM Demonstrations",
            items: [
              { id: "ID-005", text: "Otronicon Science Festival - 2,500+ Visitors (2/21/2022)" },
              { id: "ID-006", text: "STEAM Day @ Orlando Science High School (3/25/2022)" },
              { id: "ID-008", text: "Orlando Downtown Library Demonstration (11/20/2022)" }
            ]
          },
          {
            category: "International Missions",
            items: [
              { id: "ID-027", text: "Project Uzbekistan - Summer Camps (July 2023, June 2024)" },
              { id: "ID-035", text: "FLL Summer Camp Program in Puerto Rico (2024)" },
              { id: "ID-077", text: "Planning FLL Summer Camps in Soweto, South Africa (2025)" }
            ]
          },
          {
            category: "Innovation & Technology",
            items: [
              { id: "ID-036", text: "Synaptic Solutions Collaboration with Virtual Reality at UCF" },
              { id: "ID-054", text: "Accenture Partnership: Building CubeSAT for MIT's Satellite Challenge" },
              { id: "ID-080", text: "Synaptic Solutions: VR Workshop at UCF for Prosthetics (3/1/2025)" }
            ]
          },
          {
            category: "Advocacy & Media",
            items: [
              { id: "ID-034", text: "Florida Chamber of Commerce (FCC) - Orlando, FL" },
              { id: "ID-048", text: "Showcase on Fox 35 News Channel (10/11/2024)" },
              { id: "ID-079", text: "Demonstrated in PLTW Showcase covered by FOX 35 (2/27/2025)" }
            ]
          }
        ].map((section, i) => (
          <div key={i}>
            <h3 className="text-2xl font-mono uppercase tracking-[0.4em] text-silver/20 mb-12 border-b border-silver/10 pb-4">{section.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {section.items.map((item, j) => (
                <motion.div 
                  key={j}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1 }}
                  className="p-8 border border-silver/10 bg-black/5 hover:bg-silver/5 transition-all group"
                >
                  <span className="font-mono text-[10px] text-silver/20 group-hover:text-silver/60 transition-colors block mb-4">{item.id}</span>
                  <p className="text-silver/70 font-serif text-lg leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-12 border-2 border-silver/10 bg-black/20 text-center">
        <h3 className="text-3xl font-serif mb-6 italic text-silver">The Full Ledger</h3>
        <p className="text-silver/50 mb-8 max-w-2xl mx-auto">
          Our impact documentation spans over 92 unique outreach initiatives, workshops, and demonstrations conducted between 2021 and 2025.
        </p>
        <div className="flex justify-center gap-12 font-mono text-[10px] uppercase tracking-widest text-silver/30">
          <div className="flex flex-col gap-2">
            <span className="text-silver text-2xl font-serif">312</span>
            Teams Hosted
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-silver text-2xl font-serif">39</span>
            FIRST Events
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-silver text-2xl font-serif">40</span>
            Teams Initiated
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
);

const Budget = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <h2 className="text-6xl md:text-8xl font-serif mb-8">BUDGET <span className="italic text-silver/60">PLAN</span></h2>
        <p className="text-xl text-silver/50 max-w-3xl mx-auto italic">Securing a minimum of $50,000 out of $79,250 to fuel our current and future endeavors.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-silver/20">
              <th className="text-left py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-silver/40">Category</th>
              <th className="text-left py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-silver/40">Specifics</th>
              <th className="text-right py-6 px-4 font-mono text-[10px] uppercase tracking-widest text-silver/40">Estimated Cost</th>
            </tr>
          </thead>
          <tbody className="font-serif text-lg">
            {[
              { cat: "FRC Registration", spec: "Regional Events & World Championship", cost: "$13,750" },
              { cat: "Robot Expenses", spec: "Electronics, Raw Materials, COTS Parts, Tools", cost: "$12,500" },
              { cat: "Travel", spec: "Transportation, Lodging, Food", cost: "$45,000" },
              { cat: "Competition Prep", spec: "Spirit, Pit Tools, Robot Cart", cost: "$6,000" },
              { cat: "Outreach & Media", spec: "Community Funding, Misc Expenses", cost: "$4,000" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-silver/5 hover:bg-silver/5 transition-colors">
                <td className="py-6 px-4 text-silver/80">{row.cat}</td>
                <td className="py-6 px-4 text-silver/40 italic text-sm">{row.spec}</td>
                <td className="py-6 px-4 text-right text-silver font-mono">{row.cost}</td>
              </tr>
            ))}
            <tr className="bg-silver/10">
              <td colSpan={2} className="py-8 px-4 text-right font-mono text-xs uppercase tracking-[0.3em] text-silver">Total Estimated Cost</td>
              <td className="py-8 px-4 text-right text-3xl text-silver font-bold">$79,250</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </PageTransition>
);

const Sponsorship = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-serif mb-8">SPONSORSHIP <span className="italic text-silver/60">LEVELS</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { level: "Diamond", cost: "$10,000+", icon: Trophy, benefits: ["Name becomes part of official team name", "Personalized Clockwork shirt", "All Platinum benefits"] },
            { level: "Platinum", cost: "$5,000 - $9,999", icon: Target, benefits: ["Logo displayed on competition robot", "All Gold benefits"] },
            { level: "Gold", cost: "$2,000 - $4,999", icon: Zap, benefits: ["Logo displayed on team T-shirts", "All Silver benefits"] },
            { level: "Silver", cost: "$500 - $1,999", icon: Heart, benefits: ["Logo displayed on our pit banner", "Friends of Clockwork benefits"] },
            { level: "Friends of Clockwork", cost: "<$500", icon: Users, benefits: ["Name/Logo on printed media", "Social media promotion", "Personal thank-you letter"] }
          ].map((tier, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 border border-silver/10 bg-black/5 relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <tier.icon className="w-32 h-32" />
              </div>
              <h3 className="text-4xl font-serif text-silver mb-2">{tier.level}</h3>
              <div className="font-mono text-silver/40 text-sm mb-8 tracking-widest">{tier.cost}</div>
              <ul className="space-y-4">
                {tier.benefits.map((b, j) => (
                  <li key={j} className="text-sm text-silver/60 flex gap-3 italic">
                    <span className="text-silver/20">•</span> {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

// --- Main App ---

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/outreach" element={<Outreach />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

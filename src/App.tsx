/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Cog, Zap, Target, Trophy, Users, ArrowRight, Hammer, Microscope, Rocket, Menu, X, Clock, FileText, DollarSign, Heart } from 'lucide-react';

// --- Components ---

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'The Atelier', path: '/', icon: Clock },
    { name: 'Our Team', path: '/team', icon: Users },
    { name: 'For Students', path: '/students', icon: Zap },
    { name: 'Sub-Teams', path: '/sub-teams', icon: Hammer },
    { name: 'Outreach', path: '/outreach', icon: Rocket },
    { name: 'Impact', path: '/impact', icon: FileText },
    { name: 'Budget', path: '/budget', icon: DollarSign },
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
          <span className="font-serif text-xl tracking-widest uppercase text-silver/80">Clockwork Mania <span className="text-silver font-bold">4013</span></span>
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
            <h2 className="font-script text-3xl text-silver/60">Clockwork Mania 4013</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-silver/20 mt-2">Orlando Science High School • Est. 2012</p>
          </div>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-silver/20">
            <a href="mailto:frc4013.clockworkmania@gmail.com" className="hover:text-silver transition-colors">Contact the Atelier</a>
            <a href="#" className="hover:text-silver transition-colors">Privacy Ledger</a>
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
        
        <Label>Registry No. 4013 • 24' - 25'</Label>
        <h1 className="font-script text-6xl md:text-9xl mb-4 text-silver engraved-text">
          Clockwork Mania
        </h1>
        <h2 className="font-serif text-4xl md:text-6xl tracking-[0.4em] uppercase mb-12 text-silver/80">
          4013
        </h2>
        
        <div className="flex flex-col items-center gap-8">
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
            <p className="font-serif italic text-xl text-silver/60">"Transforming sparks of curiosity into powerful motion."</p>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div>
          <Label>The Introduction</Label>
          <h2 className="text-5xl md:text-7xl font-serif mb-12">OUR <span className="italic text-silver/60">TEAM</span></h2>
          <div className="space-y-8 text-lg text-silver/70 leading-relaxed font-light">
            <p>
              Clockwork Mania, a 501(c)(3) FIRST Robotics Competition team from Orlando Science High School, has been advancing STEM opportunities since 2012.
            </p>
            <p>
              With a strong record of excellence, the team has qualified for the FRC World Championship in 10 of its 12 seasons.
            </p>
            <div className="p-8 border-l-2 border-silver/10 bg-black/10 italic">
              "The team operates through two main divisions: Robot, focusing on robot design and functionality, and Logistics, managing all non-robotic aspects."
            </div>
          </div>
        </div>
        
        <div className="space-y-12">
          <div className="p-12 border border-silver/10 bg-black/5 relative">
            <Label>The Visionary Quote</Label>
            <p className="text-2xl font-serif italic text-silver/80 leading-relaxed">
              "Everybody has to be able to participate in a future that they want to live for. That's what technology can do."
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-silver/40">— Dean Kamen, Founder of FIRST</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="p-6 border border-silver/5">
              <h3 className="text-4xl font-serif text-silver mb-2">10/12</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-silver/40">World Championship Qualifications</p>
            </div>
            <div className="p-6 border border-silver/5">
              <h3 className="text-4xl font-serif text-silver mb-2">501(c)3</h3>
              <p className="text-[10px] font-mono uppercase tracking-widest text-silver/40">Non-Profit Status</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageTransition>
);

const Students = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <Label>The Human Component</Label>
        <h2 className="text-6xl md:text-8xl font-serif mb-8">FOR OUR <span className="italic text-silver/60">STUDENTS</span></h2>
        <p className="text-xl text-silver/50 max-w-3xl mx-auto italic">Nurturing well-rounded individuals by emphasizing collaboration, leadership, and adaptability.</p>
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
  </PageTransition>
);

const SubTeams = () => (
  <PageTransition>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <Label>The Divisions of the Atelier</Label>
        <h2 className="text-6xl md:text-8xl font-serif mb-8">SUB- <span className="italic text-silver/60">TEAMS</span></h2>
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
  </PageTransition>
);

const Outreach = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col lg:flex-row gap-24 items-start mb-24">
        <div className="lg:w-1/2">
          <Label>The Reach of the Machine</Label>
          <h2 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">BREAKDOWN <br /> <span className="italic text-silver/60">OF OUTREACH</span></h2>
          <div className="p-8 border-2 border-silver/10 bg-black/10">
            <p className="text-xl text-silver/70 leading-relaxed">
              Clockwork Mania has hosted <span className="text-silver">312 local and international teams</span> across 39 FIRST events, initiated 40 teams, and mentored 47 teams.
            </p>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-12">
          {[
            { title: "Winding Up the World", label: "International Outreach", desc: "Focuses on global STEM education. Highlights include Uzbekistan, Puerto Rico, Japan, India, and Brazil." },
            { title: "Making the Community Tick", label: "Community Engagement", desc: "Strengthening STEM locally through hosting events, mentoring teams, and establishing certification programs." },
            { title: "Meshing with Public Figures", label: "Collaborations", desc: "Building partnerships with local government and institutions like Advent Health and Siemens." }
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
        <Label>The Ledger of Deeds</Label>
        <h2 className="text-6xl md:text-8xl font-serif mb-8">IMPACT <span className="italic text-silver/60">DOCUMENTATION</span></h2>
        <p className="text-xl text-silver/50 italic">A summary of our efforts from 2022 to 2025.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          "Workshop Access & Materials for FTC Teams (2021-Present)",
          "Science Olympiad Mentoring (Fall 2021-Spring 2022)",
          "Central Florida Math Competition (Fall 2022)",
          "COGnitive Solutions - Fidget Device for ASD/ADHD (Fall 2022)",
          "Otronicon Science Festival - 2,500+ Visitors (2/21/2022)",
          "STEAM Day @ Orlando Science High School (3/25/2022)",
          "Charter School Expo - Ambassadors for FIRST (3/26/2022)",
          "Orlando Downtown Library Demonstration (11/20/2022)",
          "Project Uzbekistan - Summer Camps (July 2023, June 2024)",
          "FLL Summer Camp Program in Puerto Rico (2024)",
          "Planning FLL Summer Camps in Soweto, South Africa (2025)",
          "Synaptic Solutions - VR Workshop at UCF (3/1/2025)",
          "NASA 2024 Fall Festival at Kennedy Space Center (11/26/2024)",
          "SpaceCom 51st Conference (1/29/2025)"
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 border-b border-silver/10 flex gap-6 items-center group hover:bg-silver/5 transition-colors"
          >
            <span className="font-mono text-xs text-silver/20 group-hover:text-silver/60 transition-colors">ID-{String(i + 1).padStart(3, '0')}</span>
            <p className="text-silver/70 font-serif text-lg">{item}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </PageTransition>
);

const Budget = () => (
  <PageTransition>
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <Label>The Financial Blueprint</Label>
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

const Sponsorship = () => (
  <PageTransition>
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-24">
        <Label>Fueling the Invention</Label>
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

      <div className="mt-24 p-12 border-2 border-silver/10 text-center max-w-4xl mx-auto">
        <h3 className="text-3xl font-serif mb-6 italic text-silver">Ready to Meshing with Us?</h3>
        <p className="text-silver/60 mb-12 leading-relaxed">
          Your support directly impacts the lives of dozens of students and thousands in our community. Join the machine and help us build the future.
        </p>
        <button className="px-16 py-6 bg-silver text-burgundy font-bold uppercase tracking-[0.4em] text-sm hover:bg-white transition-colors">
          Download Prospectus
        </button>
      </div>
    </div>
  </PageTransition>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/students" element={<Students />} />
            <Route path="/sub-teams" element={<SubTeams />} />
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

import { Github, Image, Linkedin } from 'lucide-react'
import './App.css'

function App() {

  return (
    <>
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* LOGO */}
          <a href="#" className="logo-container flex items-center gap-3 group">
            <svg className="logo-mark w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* The Structural Pillar (I) */}
              <rect x="6" y="6" width="4" height="20" fill="black" />
              {/* The System Component (S/Dot) */}
              <rect x="14" y="18" width="8" height="8" fill="black" />
              {/* The System Indicator (Animated) */}
              <rect className="logo-indicator" x="14" y="6" width="8" height="4" fill="#71717a" />
            </svg>
            <div className="logo-text text-2xl uppercase">Ishanvi::Systems</div>
          </a>

          <div className="hidden md:flex space-x-12 text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-400">
            <a href="#work" className="hover:text-black transition-colors">Work</a>
            <a href="#philosophy" className="hover:text-black transition-colors">Philosophy</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest border-b-2 border-black pb-1">Inquire</button>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <header className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 grid-motif opacity-30 -z-10"></div>
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-[110px] font-semibold leading-[0.95] mb-10 tracking-tighter text-zinc-950">
              Thoughtfully <br />
              Engineered <br />
              <span className="text-zinc-300 italic font-light">Digital Systems</span>
            </h1>
            <p className="text-xl md:text-2xl muted-text font-normal leading-relaxed mb-16 max-w-2xl">
              We design and build reliable, scalable digital solutions rooted in engineering discipline, cultural context, and customer-first thinking.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10">
              <a href="#contact" className="px-10 py-5 bg-black text-white text-sm font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform">
                Start a Conversation
              </a>
              <a href="#work" className="text-sm font-bold uppercase tracking-widest text-zinc-900 flex items-center group">
                View Our Work
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Philosophy Section */}
      <section id="philosophy" className="section-padding bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 items-start">
            <div className="sticky top-40">
              <span className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold mb-6 block">Our Philosophy</span>
              <h2 className="text-5xl font-semibold tracking-tighter leading-tight">How We Think</h2>
            </div>
            <div className="space-y-12">
              <p className="text-3xl font-medium leading-tight tracking-tight">
                Good systems are built, not rushed.
              </p>
              <div className="w-12 h-0.5 bg-black"></div>
              <p className="text-xl muted-text leading-relaxed">
                At Ishanvi Systems, we believe clarity, ethics, and context are as important as code. We don't build features; we architect stability.
              </p>
              <div className="w-1.5 h-1.5 bg-zinc-300 rounded-full"></div>
              <p className="text-xl muted-text leading-relaxed">
                Every project begins with understanding — of the problem, the people, and the long-term impact. We design for the next decade, not the next quarter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What We Do */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <h2 className="text-4xl font-semibold tracking-tighter mb-6">What We Do</h2>
            <p className="text-xl muted-text max-w-xl">We take on work where quality, structure, and responsibility matter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-100 border border-zinc-100">
            <div className="bg-white p-16 hover:bg-zinc-50 transition-all group">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Website Design & Engineering</h3>
              <p className="muted-text leading-relaxed">Creating digital presences that are as robust as they are aesthetically minimal.</p>
            </div>
            <div className="bg-white p-16 hover:bg-zinc-50 transition-all group">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Frontend & System Architecture</h3>
              <p className="muted-text leading-relaxed">Structuring complex logic into clean, maintainable, and scalable codebases.</p>
            </div>
            <div className="bg-white p-16 hover:bg-zinc-50 transition-all group">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Performance Optimization</h3>
              <p className="muted-text leading-relaxed">Stripping away the bloat to ensure every microsecond of the user experience is justified.</p>
            </div>
            <div className="bg-white p-16 hover:bg-zinc-50 transition-all group">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">Long-Term Maintenance</h3>
              <p className="muted-text leading-relaxed">A partnership approach to ensuring your digital systems remain healthy over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-32 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold tracking-tighter mb-24">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
            <div className="space-y-6">
              <span className="font-mono text-zinc-600 text-sm">01/</span>
              <h3 className="text-lg font-bold uppercase tracking-widest">Understand</h3>
              <p className="text-sm text-zinc-400 font-light">Context, goals, and systemic constraints.</p>
            </div>
            <div className="space-y-6">
              <span className="font-mono text-zinc-600 text-sm">02/</span>
              <h3 className="text-lg font-bold uppercase tracking-widest">Design</h3>
              <p className="text-sm text-zinc-400 font-light">Architecting the structure before the surface.</p>
            </div>
            <div className="space-y-6">
              <span className="font-mono text-zinc-600 text-sm">03/</span>
              <h3 className="text-lg font-bold uppercase tracking-widest">Engineer</h3>
              <p className="text-sm text-zinc-400 font-light">Building with clean, maintainable logic.</p>
            </div>
            <div className="space-y-6">
              <span className="font-mono text-zinc-600 text-sm">04/</span>
              <h3 className="text-lg font-bold uppercase tracking-widest">Validate</h3>
              <p className="text-sm text-zinc-400 font-light">Rigorous testing and refinement.</p>
            </div>
            <div className="space-y-6">
              <span className="font-mono text-zinc-600 text-sm">05/</span>
              <h3 className="text-lg font-bold uppercase tracking-widest">Support</h3>
              <p className="text-sm text-zinc-400 font-light">Ongoing care and reliability.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Values Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-5xl font-semibold tracking-tighter mb-8 leading-tight">What Guides Our Work</h2>
              <p className="text-xl muted-text font-light">We don't follow trends. We follow principles that have stood the test of time in software engineering and design.</p>
            </div>
            <div className="space-y-12">
              <div className="border-l-4 border-black pl-8">
                <h4 className="font-bold text-xl mb-3 tracking-tight">Integrity over Shortcuts</h4>
                <p className="muted-text">We never sacrifice long-term stability for short-term visual flair.</p>
              </div>
              <div className="border-l-4 border-zinc-100 pl-8">
                <h4 className="font-bold text-xl mb-3 tracking-tight">Content over Filler</h4>
                <p className="muted-text">Design is nothing without clear, meaningful communication.</p>
              </div>
              <div className="border-l-4 border-zinc-100 pl-8">
                <h4 className="font-bold text-xl mb-3 tracking-tight">Outcome over Vanity</h4>
                <p className="muted-text">If it doesn't solve the core problem, it doesn't belong in the system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Featured Work */}
      <section id="work" className="section-padding bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-semibold tracking-tighter mb-20">Selected Work</h2>
          <div className="group relative overflow-hidden bg-white border border-zinc-200 p-12 md:p-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
              <div className="max-w-xl">
                <h3 className="text-4xl font-semibold mb-6 tracking-tighter">MJY Agri</h3>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 mb-8">Agriculture</p>
                <p className="text-lg muted-text mb-12 leading-relaxed">
                  TBA
                </p>
                <a href="https://mjyagri.com" className="inline-block text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:pb-2 transition-all">
                  Explore Project
                </a>
              </div>
              <div className="hidden md:block w-72 h-72 bg-zinc-100 border border-zinc-200 flex-shrink-0 relative">
                <div className="absolute inset-0 grid-motif opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                    <Image className="w-16 h-16 mb-4" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Contact */}
      <section id="contact" className="section-padding bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-6xl font-semibold tracking-tighter mb-10">Let’s Talk</h2>
              <p className="muted-text text-xl leading-relaxed mb-12">
                If you value well-built systems and clear communication, we’d be glad to explore your requirements.
              </p>
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-widest">General Enquiries</p>
                <a href="mailto:hello@ishanvisystems.com" className="text-2xl font-medium border-b border-zinc-200 hover:border-black transition-colors">hello@ishanvisystems.com</a>
              </div>
            </div>
            <div className="bg-black p-12 md:p-20 text-white">
              <form className="space-y-10" onSubmit={(event) => event.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-white transition-colors text-lg placeholder:text-zinc-600" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-white transition-colors text-lg placeholder:text-zinc-600" />
                </div>
                <div>
                  <textarea rows={4} placeholder="Tell us about the project" className="w-full bg-transparent border-b border-zinc-700 py-4 focus:outline-none focus:border-white transition-colors text-lg placeholder:text-zinc-600 resize-none"></textarea>
                </div>
                <button className="w-full py-6 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-10 h-10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="6" width="4" height="20" fill="black" />
                  <rect x="14" y="18" width="8" height="8" fill="black" />
                  <rect className="logo-indicator" x="14" y="6" width="8" height="4" fill="#71717a" />
                </svg>
                <div className="logo-text text-3xl">Ishanvi Systems</div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed font-light">Independent digital studio focusing on premium engineering and thoughtful design.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-32">
              <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Connect</p>
                <ul className="space-y-4 text-sm font-medium">
                  <li><i className="w-4 h-4 mr-2 inline-block"><Linkedin/></i><a href="https://www.linkedin.com/in/ishanvi-systems" className="hover:text-zinc-500">LinkedIn</a></li>
                  <li><i className="w-4 h-4 mr-2 inline-block"><Github/></i><a href="" className="hover:text-zinc-500">GitHub</a></li>
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Studio</p>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#work" className="hover:text-zinc-500">Selected Work</a></li>
                  <li><a href="#philosophy" className="hover:text-zinc-500">Philosophy</a></li>
                  <li><a href="#contact" className="hover:text-zinc-500">Inquire</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-zinc-50 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-300">
            <p>© <span id="year"></span> Ishanvi Systems. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Built for the long term.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

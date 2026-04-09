import { useState, useEffect, useRef, useCallback } from 'react'

const PROJECTS = [
  {
    num: '01',
    name: 'Elio',
    underDev: true,
    tagline: 'Unified AI Command-Line Interface',
    description: 'A developer-focused CLI application that unifies multiple AI providers — Anthropic Claude, Google Gemini, and OpenAI ChatGPT — into a single terminal interface.',
    fullDescription: [
      'Elio eliminates context-switching by unifying Claude, Gemini, and ChatGPT into a single, authenticated terminal hub.',
      'The application features a Textual-based TUI with real-time streaming, persistent local session history via SQLite, and seamless file upload support for images and documents.',
      'Built securely with Python, Elio manages credentials via OS-level keyrings and translates interactions through dynamic provider adapters.'
    ],
    features: [
      'Unified conversation interface for Claude, Gemini, and GPT',
      'Rich Terminal UI with Markdown rendering and syntax highlighting',
      'Interactive model selector and inline slash commands',
      'Local SQLite session history and Markdown export',
      'Secure OS keyring credential storage',
      'Multi-modal support with file and image attachments'
    ],
    tags: ['Python', 'Textual', 'SQLite', 'CLI'],
    github:'https://github.com/Elio-labs',
    live: 'https://elioai.pages.dev',
    color: '#60a5fa',
  },
  {
    num: '02',
    name: 'Helium',
    underDev: true,
    tagline: 'AI-Powered Security Operating Environment',
    description:'An intelligent security layer built on top of Kali Linux. Helium OS uses machine learning — Autoencoders, LSTMs, and Transformers — to detect threats your system has never seen before, without a signature database. Traditional tools catch what they know. Helium catches what it learns.',
    fullDescription: [
      'Helium OS is a research-grade, developer-first AI security environment — not a consumer antivirus. It sits as a three-layer stack on top of Kali Linux: a Java Core Engine for orchestration and telemetry collection, Python AI Modules running the ML detection pipeline, and a CLI + React dashboard as the interface layer.',
    ],
    features: [
      'AI Threat Detection',
      'Real-Time Monitoring',
      'Side-Channel Detection',
      'Privilege Escalation Alerts',
      'Adaptive Mitigation',
      'Low Overhead',
    ],
    tags: ['Python','Java','Linux','PyTorch','TensorFlow'],
    // github: 'https://github.com/yourusername/datavault',
    live: '#',
    color: '#0ea5e9',
  },
  {
    num: '03',
    name: 'Vesper-Agent',
    underDev: true,
    tagline: 'Production Infrastructure for AI Agent Fleets',
    description:
    'Vesper handles everything around your agent logic — persistent memory, cost tracking, security guardrails, quality evaluation, and multi-agent coordination — all from a single YAML file. It wraps around your existing code the way Kubernetes wraps around containers.',
    fullDescription: [
      "Vesper is an open-source framework that gives every AI agent fleet production-grade infrastructure it would otherwise take months to build from scratch. Every agent request passes through 7 independent layers, each with a single responsibility and a clean interface. The developer's agent logic stays completely untouched.",
    ],
    designPhilosophy: "Vesper does not replace LangGraph, CrewAI, or the Anthropic SDK — it wraps around them. One YAML file configures memory scope, budget caps, tool whitelists, eval datasets, and guardrail policies. The VesperClient SDK intercepts API calls transparently so the developer's agent code is unchanged.",
    features: [
      'Centralized Agent Registry',
      'Resilient Lifecycle Management',
      'Advanced Persistent Memory',
      'Multi-Agent Communication Bus',
      'Granular FinOps & Cost Control',
      'Built-in Security & Audit Logging',
    ],
    tags: ['Python', 'SQLite', 'Pydantic','Qdrant','LLMs'],
    // github: 'https://github.com/yourusername/sketchml',
    live: '#',
    color: '#0656beff',
  },
  {
    num: '04',
    name: 'SUP',
    underDev: false,
    tagline: 'Open-Source Cross-Platform CLI Intrusion Detection System',
    description:
      'A lightweight, real-time Intrusion Detection System built in Python that monitors system logs, identifies brute-force attacks, and forwards structured alerts to a Splunk SIEM.',
    fullDescription: [
      'SUP (Systemic Undercover Predator) is a cross-platform command-line tool that runs natively on Windows and Linux to continuously monitor authentication and system logs.',
      'It utilizes a thread-safe sliding-window algorithm to track and identify brute-force attack patterns, such as SSH credential stuffing and privilege escalation attempts, in real-time.',
      'When an intrusion threshold is met, the system automatically builds and forwards richly structured, CIM-compatible JSON alerts to a Splunk SIEM via the HTTP Event Collector (HEC) API.',
      '*NOTE: sup-ids is not yet available on PyPI. It will be published as a pip package soon, once a few remaining bugs and optimizations are addressed.',
    ],
    features: [
      'Real-time detection of brute-force and privilege escalation',
      'Cross-platform compatibility for Windows and Linux',
      'Sliding-window algorithm for tracking threat attempts',
      'Splunk HEC integration for structured JSON alerts',
      'Zero dependencies beyond the Python standard library and requests'
    ],
    tags: ['Python', 'Splunk', 'CLI', 'Cybersecurity'],
    github: 'https://github.com/Mitxh13/SUP',
    color: '#ed6651',
  },
]

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

/* ─── Project Detail Overlay ─── */
function ProjectDetail({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return (
    <div className="project-detail-overlay" onClick={onClose}>
      <div className="project-detail" onClick={(e) => e.stopPropagation()}>
        <button className="project-detail-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="project-detail-header">
          <span className="project-detail-num mono" style={{ color: project.color }}>
            {project.num}
          </span>
          <h2 className="project-detail-name">
            {project.name}
            {project.underDev && (
              <span className="dev-badge" style={{ marginLeft: '12px', fontSize: '0.45em', verticalAlign: 'middle', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#facc15', border: '1px solid #facc15', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Dev</span>
            )}
          </h2>
          <p className="project-detail-tagline">{project.tagline}</p>

          <div className="project-detail-actions">
            {project.github && project.github !== '#' && (
              <a href={project.github} className="project-detail-btn" target="_blank" rel="noopener noreferrer">
                <GithubIcon /> Source Code
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} className="project-detail-btn primary" target="_blank" rel="noopener noreferrer" style={{ borderColor: project.color, color: project.color }}>
                <ExternalIcon /> Live Demo
              </a>
            )}
          </div>
        </div>

        <div className="project-detail-body">
          <div className="project-detail-section">
            <h3>Overview</h3>
            {project.fullDescription.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {project.designPhilosophy && (
            <div className="project-detail-section">
              <h3>Key design philosophy</h3>
              <p>{project.designPhilosophy}</p>
            </div>
          )}

          <div className="project-detail-section">
            <h3>Key Features</h3>
            <ul className="project-detail-features">
              {project.features.map((feature, idx) => (
                <li key={idx}>
                  <span className="feature-check" style={{ color: project.color }}>
                    <CheckIcon />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="project-detail-section">
            <h3>Tech Stack</h3>
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span className="project-tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Projects Section ─── */
function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [detailProject, setDetailProject] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { top, height } = containerRef.current.getBoundingClientRect()
      const stickyHeight = window.innerHeight
      const scrollableDistance = height - stickyHeight
      
      if (scrollableDistance <= 0) return

      let rawProgress = -top / scrollableDistance
      
      // Clamp progress between 0 and 1
      rawProgress = Math.max(0, Math.min(1, rawProgress))

      // Determine active index based on scroll progress
      let newIndex = Math.floor(rawProgress * PROJECTS.length)
      if (newIndex >= PROJECTS.length) newIndex = PROJECTS.length - 1
      if (newIndex < 0) newIndex = 0

      if (activeIndex !== newIndex) {
        setActiveIndex(newIndex)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeIndex])

  const goToProject = (index) => {
    if (!containerRef.current) return
    const stickyHeight = window.innerHeight
    const scrollableDistance = containerRef.current.getBoundingClientRect().height - stickyHeight
    
    // The exact boundary to become project `index` is `index / PROJECTS.length`
    const targetProgress = (index / PROJECTS.length) + 0.005
    const projectScrollOffset = targetProgress * scrollableDistance
    
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY
    
    window.scrollTo({
      top: containerTop + projectScrollOffset,
      behavior: 'smooth'
    })
  }

  const activeProject = PROJECTS[activeIndex]

  return (
    <>
      <section 
        id="projects" 
        ref={containerRef}
        style={{ 
          height: `${PROJECTS.length * 100}vh`, 
          position: 'relative' 
        }}
      >
        <div 
          className="pj" 
          style={{ 
            position: 'sticky', 
            top: 0, 
            height: '100vh', 
            overflow: 'hidden' 
          }}
        >
        {/* Giant background number */}
        <div className="pj-bg-num" style={{ color: activeProject.color }} aria-hidden="true">
          {activeProject.num}
        </div>

        {/* Left sidebar — dots & counter */}
        <div className="pj-sidebar">
          <div className="pj-counter">
            <span className="pj-counter-now mono" style={{ color: activeProject.color }}>
              {activeProject.num}
            </span>
            <span className="pj-counter-line" />
            <span className="pj-counter-total mono">
              {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="pj-dots">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                className={`pj-dot ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => goToProject(idx)}
                aria-label={`Project ${idx + 1}`}
                style={idx === activeIndex ? { background: activeProject.color, boxShadow: `0 0 8px ${activeProject.color}66` } : {}}
              />
            ))}
          </div>

          <p className="pj-hint mono">scroll</p>
        </div>

        {/* Center — project content */}
        <div className="pj-center">
          <p className="section-label">
            <span className="num">04.</span> Projects
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>A curated selection of my top work.</p>

          <div className="pj-slide" key={activeIndex}>
            <h2 className="pj-name">
              {activeProject.name}
              {activeProject.underDev && (
                <span className="dev-badge" style={{ marginLeft: '16px', fontSize: '0.35em', verticalAlign: 'middle', padding: '4px 8px', borderRadius: '4px', backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#facc15', border: '1px solid #facc15', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>In Dev</span>
              )}
            </h2>
            <p className="pj-tagline" style={{ color: activeProject.color }}>{activeProject.tagline}</p>

            <p className="pj-desc">{activeProject.description}</p>

            <div className="pj-tags">
              {activeProject.tags.map((tag, idx) => (
                <span className="project-tag" key={idx}>{tag}</span>
              ))}
            </div>

            <div className="pj-actions">
              <button
                className="pj-more-btn"
                onClick={() => setDetailProject(activeProject)}
                style={{ '--btn-color': activeProject.color }}
              >
                <span>More Info</span>
                <ArrowIcon />
              </button>

              <div className="pj-links">
                {activeProject.github && activeProject.github !== '#' && (
                  <a href={activeProject.github} className="project-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GithubIcon />
                  </a>
                )}
                {activeProject.live && activeProject.live !== '#' && (
                  <a href={activeProject.live} className="project-link" target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pj-progress">
            <div
              className="pj-progress-fill"
              style={{
                width: `${((activeIndex + 1) / PROJECTS.length) * 100}%`,
                background: activeProject.color,
              }}
            />
          </div>

          {/* Scroll indicator */}
          <div className="pj-scroll-down">
            <span className="pj-scroll-arrow">↓</span>
            <span className="mono">
              {activeIndex < PROJECTS.length - 1 ? 'scroll for next' : 'scroll to continue'}
            </span>
          </div>
        </div>
      </div>
    </section>

    {/* Detail overlay */}
      {detailProject && (
        <ProjectDetail
          project={detailProject}
          onClose={() => setDetailProject(null)}
        />
      )}
    </>
  )
}

export default Projects

import { useEffect, useRef } from 'react'

const EXPERIENCE = [
  {
    period: '2024 — Present',
    role: 'Student',
    org: 'PES University',
    description:
      'Building full-stack AI applications, developing robust AI/OS projects, and crafting high-utility tools designed to solve real-world problems through efficient, practical engineering.',
    skills: [],
  },
  {
    period: '2024',
    role: 'Rank 80',
    org: 'PESU-GCC Hackathon',
    description:
      'Contributed to several open-source projects including documentation improvements, bug fixes, and feature implementations across web and data science ecosystems.',
    skills: ['Python'],
  },
  {
    period: '2025 - Present',
    role: 'Backend dev',
    org: 'nano-pesu team',
    description: (
      <>
        An AI-powered campus assistant for university students — built with a custom RAG pipeline, fine-tuned language model, and a React frontend. <br />
        <a href="https://nanopesu.pages.dev" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '0.25rem', display: 'inline-block', fontWeight: 500 }}>Website: Click here</a>
      </>
    ),
    skills: ['Python','LLMs','RAG','APIs','Transformers'],
  },
  {
    period: '03-2026',
    role: 'Runner-ups',
    org: 'DeltaTime 3.0 Hackathon',
    description:
      '"Death Is Not The End" serves as the core mechanic of this 16-hour Unity puzzle-platformer. In Our game, every failure spawns a ghost that replays your exact movements in a loop — turning past deaths into a team that presses switches and blocks lasers to clear the path forward.',
    skills: ['C#', 'Unity'],
  },
  {
    period: '2026 — Present',
    role: 'Founder',
    org: 'Elio-labs',
    description: (
      <>
        Building a developer-focused CLI that unifies Claude, Gemini, and ChatGPT into a single terminal interface with seamless model switching, file uploads, and local session history. <br />
        <a href="https://elioai.pages.dev" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '0.25rem', display: 'inline-block', fontWeight: 500 }}>Website: Click here</a><br></br>
        <a href="https://github.com/Elio-labs" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', textUnderlineOffset: '4px', marginTop: '0.25rem', display: 'inline-block', fontWeight: 500 }}>GitHub: Click here</a>

      </>
    ),
    skills: ['Python', 'Textual', 'SQLite', 'CLI'],
  },
]

function Experience() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="experience" ref={sectionRef}>
      <div className="container">
        <hr className="section-divider" />
        <div style={{ paddingTop: 'var(--space-4xl)' }}>
          <div className="reveal">
            <p className="section-label">
              <span className="num">02.</span> Chapters
            </p>
            <h2 className="section-title">What I&apos;ve Been Up To</h2>
          </div>

          <div className="experience-timeline">
            {EXPERIENCE.map((exp, idx) => (
              <div className="experience-item reveal" key={idx}>
                <div className="experience-period">
                  <span className="mono">{exp.period}</span>
                </div>
                <div className="experience-content">
                  <div className="experience-dot" aria-hidden="true"></div>
                  <h3 className="experience-role">
                    {exp.role} <span className="experience-org">@ {exp.org}</span>
                  </h3>
                  <p className="experience-description">{exp.description}</p>
                  <div className="experience-skills">
                    {exp.skills.map((skill, sIdx) => (
                      <span className="project-tag" key={sIdx}>{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience

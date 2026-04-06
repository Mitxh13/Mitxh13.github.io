import { useState, useEffect, useRef } from 'react'

/*
  ── HOW TO ADD CERTIFICATES ──
  1. Put your certificate images in: /public/certificates/
  2. Update the CERTS array below with the filename, title, issuer, and date.
  3. Supported formats: .jpg, .png, .webp
*/

const CERTS = [
  {
    title: 'Python',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    image: '/certificates/Python_cisco.png',
  },
  {
    title: 'Operating Systems',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    image: '/certificates/OS_cisco.png',
  },
  {
    title: 'JavaScript',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    image: '/certificates/JavaScript_cisco.png',
  },
  {
    title: 'Problem Solving',
    issuer: 'HackerRank',
    date: '2024',
    image: '/certificates/HR_problem_solving.png',
  },
]

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function CertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M12 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M12 14v4" />
      <path d="M9 18h6" />
    </svg>
  )
}

/* ─── Lightbox / Popup ─── */
function CertLightbox({ cert, onClose }) {
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
    <div className="cert-lightbox-overlay" onClick={onClose}>
      <div className="cert-lightbox" onClick={(e) => e.stopPropagation()}>
        <button className="cert-lightbox-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="cert-lightbox-img-wrap">
          <img
            src={cert.image}
            alt={cert.title}
            className="cert-lightbox-img"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `
                <div class="cert-lightbox-placeholder">
                  <p>Certificate image not found</p>
                  <p class="mono" style="font-size:0.75rem;color:var(--text-tertiary);margin-top:0.5rem;">
                    Add image to: public${cert.image}
                  </p>
                </div>
              `
            }}
          />
        </div>

        <div className="cert-lightbox-info">
          <h3>{cert.title}</h3>
          <p>{cert.issuer} · {cert.date}</p>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Certifications Section ─── */
function Certifications() {
  const [activeCert, setActiveCert] = useState(null)
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
    <>
      <section className="section" id="certifications" ref={sectionRef}>
        <div className="container">
          <hr className="section-divider" />
          <div style={{ paddingTop: 'var(--space-4xl)' }}>
            <div className="reveal">
              <p className="section-label">
                <span className="num">03.</span> Certifications
              </p>
              <h2 className="section-title">Certificates</h2>
            </div>

            <div className="cert-grid">
              {CERTS.map((cert, idx) => (
                <button
                  className="cert-card reveal"
                  key={idx}
                  onClick={() => setActiveCert(cert)}
                  id={`cert-${idx}`}
                >
                  <div className="cert-card-icon">
                    <CertIcon />
                  </div>
                  <div className="cert-card-info">
                    <h3 className="cert-card-title">{cert.title}</h3>
                    <p className="cert-card-issuer">{cert.issuer}</p>
                    <span className="cert-card-date mono">{cert.date}</span>
                  </div>
                  <span className="cert-card-view">
                    View →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {activeCert && (
        <CertLightbox cert={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </>
  )
}

export default Certifications

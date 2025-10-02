import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faUsers,
  faClipboardList,
  faBolt,
  faChartLine,
  faUserCheck,
  faArrowRightLong,
  faCalendarCheck
} from '@fortawesome/free-solid-svg-icons';
import StaggeredMenu from '../ui/StaggeredMenu';
import './LandingPage.css';

const featureHighlights = [
  {
    icon: faBriefcase,
    title: 'Job Campaigns',
    description: 'Launch openings with rich descriptions, salary ranges, and smart auto-archive windows.'
  },
  {
    icon: faUsers,
    title: 'Talent CRM',
    description: 'Nurture candidates with structured stages, tags, and instant stage updates.'
  },
  {
    icon: faClipboardList,
    title: 'Skill Assessments',
    description: 'Deploy tailored assessments with live scoring to surface the right fit faster.'
  }
];

const capabilityTiles = [
  {
    icon: faBolt,
    title: 'Automation Library',
    text: 'Automate reminders, follow-ups, and archive flows with ready-made recipes.'
  },
  {
    icon: faChartLine,
    title: 'Pipeline Analytics',
    text: 'Monitor conversion, time-to-hire, and offer acceptance from a single dashboard.'
  },
  {
    icon: faUserCheck,
    title: 'Candidate Experience',
    text: 'Deliver branded candidate portals, status notifications, and responsive interviews.'
  }
];

const workflowSteps = [
  {
    number: '01',
    title: 'Create the perfect role',
    description: 'Start with vetted templates or build from scratch with department-specific presets.'
  },
  {
    number: '02',
    title: 'Source & qualify rapidly',
    description: 'Import leads, tag talent, and launch assessments without leaving TalentFlow.'
  },
  {
    number: '03',
    title: 'Collaborate effortlessly',
    description: 'Loop in hiring teams with shared notes, mentions, and automated summaries.'
  },
  {
    number: '04',
    title: 'Decide with confidence',
    description: 'Review scorecards, performance insights, and interview summaries in one place.'
  }
];

const testimonials = [
  {
    quote:
      '“TalentFlow has replaced three tools for us. Our time-to-fill is down 48% and candidate satisfaction is way up.”',
    author: 'Alexa Reyes · VP People @ Lumina'
  },
  {
    quote:
      '“The stage automation is unmatched. Interviewers walk in prepared and our hiring managers love the clarity.”',
    author: 'Martin Cho · Head of Talent @ Stratus Labs'
  }
];

const LandingPage = () => {
  return (
    <div className="landing-page">
      <StaggeredMenu
        position="right"
        colors={['#667eea', '#764ba2', '#f093fb']}
        items={[
          { label: 'Home', link: '/', ariaLabel: 'Navigate to home page' },
          { label: 'HR Dashboard', link: '/jobs', ariaLabel: 'Open the HR dashboard' },
          { label: 'Candidate Portal', link: '/candidate-portal', ariaLabel: 'Visit candidate portal' },
          { label: 'Features', link: '#features', ariaLabel: 'Scroll to features' },
          { label: 'Contact', link: '/contact', ariaLabel: 'Contact TalentFlow' }
        ]}
        socialItems={[
          { label: 'LinkedIn', link: 'https://linkedin.com/company/talentflow' },
          { label: 'Twitter', link: 'https://twitter.com/talentflow' },
          { label: 'GitHub', link: 'https://github.com/talentflow' }
        ]}
        displaySocials
        displayItemNumbering
        logoUrl="/logo.svg"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        accentColor="#667eea"
        changeMenuColorOnOpen
      />

      <main className="landing-content">
        <section className="hero-section" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="hero-eyebrow">Modern hiring OS</span>
              <h1 className="hero-title">
                Build winning teams with <span className="brand-name">TalentFlow</span>
              </h1>
              <p className="hero-subtitle">
                Coordinate hiring, assessments, and candidate experience from a single command center with automation at every stage.
              </p>
              <div className="hero-actions">
                <a className="cta-button primary" href="/jobs">
                  Launch HR dashboard
                  <FontAwesomeIcon icon={faArrowRightLong} aria-hidden="true" />
                </a>
                <a className="cta-button secondary" href="/candidate-portal">
                  Explore candidate portal
                </a>
                <a className="cta-button tertiary" href="#workflow">
                  Book a live walkthrough
                </a>
              </div>
              <div className="hero-trust-banner">
                <span>Trusted by teams scaling hiring velocity</span>
                <div className="hero-trust-pills">
                  <span className="trust-pill">Series B Startups</span>
                  <span className="trust-pill">Enterprise HR</span>
                  <span className="trust-pill">Remote-first teams</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-header">
                  <span className="hero-card-title">Pipeline snapshot</span>
                  <span className="hero-card-chip">Live</span>
                </div>
                <ul className="hero-card-list">
                  <li>
                    <span>Screening</span>
                    <span className="hero-card-value">12 candidates</span>
                  </li>
                  <li>
                    <span>Interviews scheduled</span>
                    <span className="hero-card-value">7 this week</span>
                  </li>
                  <li>
                    <span>Assessments completed</span>
                    <span className="hero-card-value">18/20</span>
                  </li>
                  <li>
                    <span>Offer acceptance rate</span>
                    <span className="hero-card-value">92%</span>
                  </li>
                </ul>
                <div className="hero-card-footer">
                  <FontAwesomeIcon icon={faCalendarCheck} aria-hidden="true" />
                  <span>Next interview block starts in 2 hours</span>
                </div>
              </div>
              <div className="hero-highlight">
                <span className="hero-highlight-metric">48%</span>
                <span className="hero-highlight-label">Faster time-to-fill</span>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-section features-section" id="features">
          <div className="section-heading">
            <h2 className="section-title">Everything you need to hire smarter</h2>
            <p className="section-subtitle">
              Orchestrate sourcing, screening, and selection with workflows that flex to your team.
            </p>
          </div>
          <div className="feature-grid">
            {featureHighlights.map((feature) => (
              <article key={feature.title} className="feature-card">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={feature.icon} aria-hidden="true" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-text">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section capability-section">
          <div className="capability-grid">
            {capabilityTiles.map((capability) => (
              <article key={capability.title} className="capability-card">
                <div className="capability-icon">
                  <FontAwesomeIcon icon={capability.icon} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="capability-title">{capability.title}</h3>
                  <p className="capability-text">{capability.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section workflow-section" id="workflow">
          <div className="section-heading">
            <h2 className="section-title">A clear path from kickoff to offer</h2>
            <p className="section-subtitle">Guide every stakeholder with collaborative workflows and real-time context.</p>
          </div>
          <div className="workflow-grid">
            {workflowSteps.map((step) => (
              <article key={step.number} className="workflow-card">
                <span className="workflow-number">{step.number}</span>
                <h3 className="workflow-title">{step.title}</h3>
                <p className="workflow-text">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section testimonials-section">
          <div className="section-heading">
            <h2 className="section-title">Loved by talent leaders</h2>
            <p className="section-subtitle">High-growth teams rely on TalentFlow to create confident hiring decisions.</p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.author} className="testimonial-card">
                <p className="testimonial-quote">{item.quote}</p>
                <footer className="testimonial-author">{item.author}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="landing-section cta-section">
          <div className="cta-panel">
            <div>
              <h2 className="cta-title">Ready to accelerate your hiring?</h2>
              <p className="cta-text">
                Spin up your HR dashboard in minutes and give candidates a polished experience from day one.
              </p>
            </div>
            <div className="cta-actions">
              <a className="cta-button primary" href="/jobs">
                Start as HR admin
                <FontAwesomeIcon icon={faArrowRightLong} aria-hidden="true" />
              </a>
              <a className="cta-button secondary" href="/candidate-portal">
                Continue as candidate
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} TalentFlow. All rights reserved.</p>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/contact">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

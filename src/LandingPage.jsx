import { useEffect, useState, useRef } from "react";
import {
  CalendarDays, BedDouble, Users, Receipt, Wine, SprayCan, UserCog, BarChart3,
  Globe2, Building2, Link2, ShieldCheck, Check, Menu, X, ArrowRight, Sparkles,
} from "lucide-react";
import "./landing.css";

// Real app URL — all login/sign-in/get-started buttons point here
const LOGIN_URL = import.meta.env.VITE_LOGIN_URL || "https://nexstay.daisy-etm.com";

const NAV = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#modules", label: "Modules" },
  { href: "#faq", label: "FAQ" },
];

const FEATURES = [
  { icon: CalendarDays, title: "Reservation Calendar", text: "See every room and booking on one drag-friendly calendar. Check guests in and out in a click.", tone: "" },
  { icon: BedDouble,   title: "Rooms & Setup",         text: "Organise floors, categories, types and beds once, then manage every room's status in real time.", tone: "blue" },
  { icon: Users,       title: "Guest Management",      text: "Keep guest profiles and stay history together so returning guests are served faster.", tone: "" },
  { icon: Receipt,     title: "Invoices & Billing",    text: "Generate invoices with your taxes, banks and payment methods, then print or export to PDF.", tone: "blue" },
  { icon: Wine,        title: "Minibar & Inventory",   text: "Track products, equipment and room stock, with logs for every movement.", tone: "" },
  { icon: SprayCan,    title: "Housekeeping",          text: "Give housekeepers a simple view of what needs cleaning and update room status as work gets done.", tone: "blue" },
  { icon: UserCog,     title: "Staff & Permissions",   text: "Create roles and control exactly what each team member can see and do.", tone: "" },
  { icon: BarChart3,   title: "Reports & Revenue",     text: "Dashboards and reports for occupancy and revenue, so decisions are based on real numbers.", tone: "blue" },
  { icon: Link2,       title: "Channel Manager",       text: "Connect with Channex to keep availability in sync with online booking channels.", tone: "" },
];

const STEPS = [
  { title: "Set up your hotel", text: "Add floors, room types, beds, taxes and currency." },
  { title: "Add your team",     text: "Invite staff and assign roles and permissions." },
  { title: "Take bookings",     text: "Create reservations from the calendar or from booking sources." },
  { title: "Bill & report",     text: "Issue invoices and follow revenue from the dashboard." },
];

const MODULES = [
  [CalendarDays, "Calendar"], [BedDouble, "Rooms"],   [Users, "Guests"],    [Receipt, "Invoices"],
  [Wine, "Minibar"],          [SprayCan, "Housekeeping"], [UserCog, "Staff"], [BarChart3, "Reports"],
  [Building2, "Multi-hotel"], [Globe2, "English & Albanian"], [ShieldCheck, "Roles & Permissions"], [Link2, "Channex"],
];

const FAQ = [
  { q: "Can I manage more than one hotel?",    a: "Yes. NexStay supports multiple hotels, each with its own rooms, staff and settings, managed by admins." },
  { q: "Which languages are supported?",       a: "The app is available in English and Albanian, and you can switch language from inside the app." },
  { q: "Can different staff see different things?", a: "Yes. Roles and permissions control which sections and actions each staff member can access, for example reception versus housekeeping." },
  { q: "Does it work on phones and tablets?",  a: "Yes. The interface is responsive, so reception and housekeeping can use it on any device." },
  { q: "How do I get started?",                a: "Log in to your NexStay account. If you don't have one yet, contact your administrator or the NexStay team to get access." },
];

/* ─── Mock calendar (purely decorative) ─── */
const MockCalendar = () => (
  <div className="nx-mock nx-hero-mock" aria-hidden="true">
    <div className="nx-mock__bar">
      <i /><i /><i /><b>Reservation Calendar</b>
    </div>
    <div className="nx-mock__stats">
      <div className="nx-mock__stat"><small>Occupancy</small><strong>86%</strong></div>
      <div className="nx-mock__stat"><small>Arrivals</small><strong>12</strong></div>
      <div className="nx-mock__stat"><small>Departures</small><strong>9</strong></div>
    </div>
    <div className="nx-mock__cal">
      {[
        ["101", [{ l: 0,  w: 38, c: "blue",   t: "Guest A" }, { l: 45, w: 50, c: "orange", t: "Guest B" }]],
        ["102", [{ l: 10, w: 55, c: "green",  t: "Guest C" }]],
        ["103", [{ l: 0,  w: 22, c: "orange", t: "Guest D" }, { l: 30, w: 62, c: "blue",   t: "Guest E" }]],
        ["201", [{ l: 20, w: 40, c: "blue",   t: "Guest F" }, { l: 66, w: 30, c: "green",  t: "Guest G" }]],
        ["202", [{ l: 0,  w: 60, c: "green",  t: "Guest H" }]],
      ].map(([room, items]) => (
        <div className="nx-mock__row" key={room}>
          <span className="nx-mock__room">{room}</span>
          <div className="nx-mock__track">
            {items.map((r) => (
              <span key={r.t} className={`nx-mock__res nx-res--${r.c}`}
                style={{ left: `${r.l}%`, width: `${r.w}%` }}>
                {r.t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
    <div className="nx-mock__float nx-pulse">
      <span className="ic"><Receipt size={20} /></span>
      <div><small>Invoice ready</small><strong>Check-out complete</strong></div>
    </div>
  </div>
);

/* ─── Scroll-reveal hook (sections below the fold) ─── */
function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("nx-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.10 }
    );
    document.querySelectorAll(".nx-reveal, .nx-stagger").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Main component ─── */
const LandingPage = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = "NexStay – Smart Hotel Management";
    return () => { document.title = prev; };
  }, []);

  useScrollReveal();

  const close = () => setOpen(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <div className="nx-landing">

      {/* ── Navbar ── */}
      <header className="nx-nav">
        <div className="nx-container nx-nav__inner">
          <a href="/" className="nx-nav__logo" aria-label="NexStay home" onClick={handleLogoClick}>
            <img src="/LogoH.png" alt="NexStay – Smart Hotel Management" />
          </a>
          <nav className="nx-nav__links" aria-label="Main">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          </nav>
          <div className="nx-nav__cta">
            <a href={LOGIN_URL} className="nx-btn nx-btn--primary">Log in</a>
            <button
              type="button"
              className="nx-nav__toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className={`nx-nav__mobile ${open ? "is-open" : ""}`}>
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={close}>{n.label}</a>)}
        </div>
      </header>

      <main>

        {/* ── Hero ── */}
        <section className="nx-hero">
          <span className="nx-blob nx-blob--1" aria-hidden="true" />
          <span className="nx-blob nx-blob--2" aria-hidden="true" />
          <div className="nx-container nx-hero__grid">

            {/* Left copy — each child animates via CSS, nth-child delay */}
            <div className="nx-hero__copy nx-hero-copy-anim">
              <span className="nx-badge">
                <Sparkles size={14} /> Smart hotel management
              </span>
              <h1>Run your hotel <span>smarter</span>, from one place.</h1>
              <p className="nx-lead">
                NexStay brings reservations, rooms, guests, billing, housekeeping and reports
                together, so your team spends less time on admin and more time on guests.
              </p>
              <div className="nx-hero__actions">
                <a href={LOGIN_URL} className="nx-btn nx-btn--primary nx-btn--lg">
                  Get started <ArrowRight size={18} />
                </a>
                <a href="#features" className="nx-btn nx-btn--ghost nx-btn--lg">Explore features</a>
              </div>
              <div className="nx-hero__trust">
                <span><Check size={16} /> Works on any device</span>
                <span><Check size={16} /> Role-based access</span>
                <span><Check size={16} /> Multi-hotel ready</span>
              </div>
            </div>

            <MockCalendar />
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="nx-section nx-section--soft">
          <div className="nx-container">
            <div className="nx-head nx-reveal">
              <span className="nx-eyebrow">Features</span>
              <h2>Everything your property needs</h2>
              <p>From the front desk to housekeeping to the back office, NexStay covers the daily work of running a hotel.</p>
            </div>
            <div className="nx-features">
              {FEATURES.map(({ icon: Icon, title, text, tone }, i) => (
                <article
                  key={title}
                  className={`nx-card nx-stagger${tone ? " nx-card--" + tone : ""}`}
                  style={{ "--nx-delay": `${i * 70}ms` }}
                >
                  <div className="nx-card__icon"><Icon size={24} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Highlight ── */}
        <section className="nx-section">
          <div className="nx-container nx-split">
            <div className="nx-reveal">
              <span className="nx-eyebrow">Front desk</span>
              <h2>Check-in to check-out, without the paperwork</h2>
              <p>Handle arrivals, departures and payments in a single flow, and keep guest and room information up to date automatically.</p>
              <ul className="nx-list">
                <li><Check size={18} /> Create and edit bookings straight from the calendar</li>
                <li><Check size={18} /> Invoices with taxes, banks and payment methods</li>
                <li><Check size={18} /> Booking sources and agencies tracked per reservation</li>
              </ul>
              <a href={LOGIN_URL} className="nx-btn nx-btn--primary">Open NexStay <ArrowRight size={18} /></a>
            </div>
            <div className="nx-panel nx-reveal" aria-hidden="true">
              <h4>Today at the front desk</h4>
              <div className="nx-panel__row"><span><Users size={18} /> Arrivals</span><span className="nx-pill">12</span></div>
              <div className="nx-panel__row"><span><BedDouble size={18} /> Rooms ready</span><span className="nx-pill nx-pill--ok">Ready</span></div>
              <div className="nx-panel__row"><span><SprayCan size={18} /> Housekeeping</span><span className="nx-pill">In progress</span></div>
              <div className="nx-panel__row"><span><Receipt size={18} /> Invoices to issue</span><span className="nx-pill">4</span></div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how" className="nx-section nx-section--soft">
          <div className="nx-container">
            <div className="nx-head nx-reveal">
              <span className="nx-eyebrow">How it works</span>
              <h2>Up and running in four steps</h2>
              <p>A clear path from an empty system to a fully managed property.</p>
            </div>
            <div className="nx-steps">
              {STEPS.map((s, i) => (
                <div key={s.title} className="nx-step nx-stagger" style={{ "--nx-delay": `${i * 100}ms` }}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Modules ── */}
        <section id="modules" className="nx-section">
          <div className="nx-container">
            <div className="nx-head nx-reveal">
              <span className="nx-eyebrow">Modules</span>
              <h2>One platform, every module</h2>
              <p>Use what you need today and grow into the rest.</p>
            </div>
            <div className="nx-chips">
              {MODULES.map(([Icon, label], i) => (
                <span key={label} className="nx-chip nx-stagger" style={{ "--nx-delay": `${i * 50}ms` }}>
                  <Icon size={16} /> {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="nx-section nx-section--soft">
          <div className="nx-container">
            <div className="nx-head nx-reveal">
              <span className="nx-eyebrow">FAQ</span>
              <h2>Common questions</h2>
            </div>
            <div className="nx-faq">
              {FAQ.map((f, i) => (
                <details key={f.q} className="nx-stagger" style={{ "--nx-delay": `${i * 70}ms` }}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="nx-section" style={{ paddingBottom: 0 }}>
          <div className="nx-container">
            <div className="nx-cta nx-reveal">
              <h2>Ready to simplify your hotel operations?</h2>
              <p>Log in to NexStay and manage reservations, rooms, billing and reports in one place.</p>
              <div className="nx-hero__actions">
                <a href={LOGIN_URL} className="nx-btn nx-btn--primary nx-btn--lg">Log in <ArrowRight size={18} /></a>
                <a href="#features" className="nx-btn nx-btn--ghost nx-btn--lg">See features</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="nx-footer">
        <div className="nx-container">
          <div className="nx-footer__grid">
            <div>
              <a href="/" onClick={handleLogoClick} aria-label="NexStay home">
                <img src="/LogoH.png" alt="NexStay" />
              </a>
              <p>Smart hotel management for modern properties.</p>
            </div>
            <div>
              <h5>Product</h5>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#how">How it works</a></li>
                <li><a href="#modules">Modules</a></li>
              </ul>
            </div>
            <div>
              <h5>Support</h5>
              <ul>
                <li><a href="#faq">FAQ</a></li>
                <li><a href={LOGIN_URL}>Log in</a></li>
                <li><a href={LOGIN_URL}>Forgot password</a></li>
              </ul>
            </div>
            <div>
              <h5>Account</h5>
              <ul>
                <li><a href={LOGIN_URL}>Sign in</a></li>
              </ul>
            </div>
          </div>
          <div className="nx-footer__bottom">
            <span>© {new Date().getFullYear()} NexStay. All rights reserved.</span>
            <span>Smart Hotel Management</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;

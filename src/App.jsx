import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Products", page: "products" },
  { label: "Services", page: "services" },
  { label: "Brands", page: "brands" },
  { label: "Locations", page: "locations" },
  { label: "Contact", page: "contact" },
  { label: "Get Quote", page: "quote" },
];

const BRANDS = [
  { name: "Bosch", desc: "Power tools & industrial equipment" },
  { name: "Groz", desc: "Precision tools & equipment" },
  { name: "Toku", desc: "Pneumatic tool systems" },
  { name: "Ozar", desc: "Hand tools & cutting solutions" },
  { name: "Stanley", desc: "Professional hand tools" },
  { name: "DeWalt", desc: "Heavy-duty power tools" },
  { name: "Pidilite", desc: "Adhesives & sealants" },
  { name: "KITO", desc: "Lifting & material handling" },
];

const PRODUCTS = [
  { id: 1, name: "Angle Grinder", cat: "Power Tools", brand: "Bosch", desc: "Heavy-duty angle grinder for metal cutting and grinding applications.", img: "⚙️" },
  { id: 2, name: "Pneumatic Drill", cat: "Pneumatic Tools", brand: "Toku", desc: "High-torque air-powered drill for industrial fastening tasks.", img: "🔧" },
  { id: 3, name: "Safety Helmet", cat: "Safety Equipment", brand: "Groz", desc: "ANSI-certified hard hat with ventilation for industrial sites.", img: "⛑️" },
  { id: 4, name: "Wire Stripper Set", cat: "Electrical Items", brand: "Stanley", desc: "Professional-grade wire stripper for electrical wiring tasks.", img: "🔌" },
  { id: 5, name: "Impact Wrench", cat: "Power Tools", brand: "DeWalt", desc: "Cordless impact wrench with high torque for heavy-duty bolting.", img: "🔩" },
  { id: 6, name: "Air Compressor", cat: "Pneumatic Tools", brand: "Toku", desc: "Industrial oil-lubricated air compressor with 50L tank.", img: "💨" },
  { id: 7, name: "Safety Harness", cat: "Safety Equipment", brand: "Groz", desc: "Full-body safety harness compliant with EN 361 standard.", img: "🦺" },
  { id: 8, name: "Circuit Breaker", cat: "Electrical Items", brand: "Bosch", desc: "MCB circuit breaker for residential and commercial panels.", img: "⚡" },
  { id: 9, name: "Torque Wrench", cat: "Tools & Equipment", brand: "Ozar", desc: "Precision torque wrench with click mechanism, 20-110 Nm range.", img: "🔧" },
  { id: 10, name: "Chain Hoist", cat: "Tools & Equipment", brand: "KITO", desc: "Manual chain block hoist with 1-ton lifting capacity.", img: "⛓️" },
  { id: 11, name: "Bench Grinder", cat: "Power Tools", brand: "Bosch", desc: "Double-end bench grinder for sharpening and deburring metal.", img: "⚙️" },
  { id: 12, name: "PU Sealant", cat: "Tools & Equipment", brand: "Pidilite", desc: "Polyurethane sealant for industrial joints and gaps.", img: "🧴" },
];

const CATEGORIES = ["All", "Power Tools", "Pneumatic Tools", "Safety Equipment", "Electrical Items", "Tools & Equipment"];

const SERVICES = [
  {
    icon: "⚡",
    title: "LT Panel Manufacturing",
    desc: "Custom Low Tension (LT) electrical panels designed and manufactured at our Bhiwadi facility. Includes MCC panels, PCC panels, and distribution boards compliant with IS standards.",
    points: ["IS 8623 Certified Panels", "Custom configurations", "Factory acceptance testing", "On-site commissioning"],
  },
  {
    icon: "🏗️",
    title: "Electrical Contracting",
    desc: "Government-licensed electrical contracting for industrial, commercial, and infrastructure projects. Our certified team handles large-scale installations end-to-end.",
    points: ["Govt. licensed contractor", "Industrial wiring", "Substation erection", "HT/LT line work"],
  },
  {
    icon: "📦",
    title: "Industrial Supply Solutions",
    desc: "Complete industrial supply solutions with authorized dealership of top global brands. We source, stock, and supply tools, safety equipment, and electrical items.",
    points: ["Authorized multi-brand dealer", "Bulk procurement support", "Warehousing at Bhiwadi", "Doorstep delivery"],
  },
  {
    icon: "🔧",
    title: "Installation & Maintenance",
    desc: "End-to-end installation and annual maintenance contracts (AMC) for electrical systems, machinery, and industrial equipment across Rajasthan and Haryana.",
    points: ["Preventive maintenance", "Annual contracts (AMC)", "Emergency breakdown service", "Trained service engineers"],
  },
];

const LOCATIONS = [
  {
    name: "Bhiwadi (HQ & Manufacturing)",
    address: "Industrial Area, Bhiwadi, Rajasthan – 301019",
    type: "Headquarters",
    phone: "+91 98765 43210",
    lat: 28.2090,
    lng: 76.8630,
  },
  {
    name: "Rewari Office",
    address: "Old Industrial Estate, Rewari, Haryana – 123401",
    type: "Branch Office",
    phone: "+91 98765 43211",
    lat: 28.1991,
    lng: 76.6199,
  },
  {
    name: "Neemrana Office",
    address: "Neemrana Industrial Zone, Alwar, Rajasthan – 301705",
    type: "Branch Office",
    phone: "+91 98765 43212",
    lat: 27.9809,
    lng: 76.3903,
  },
];

// --- COMPONENTS ---

function Logo({ onClick }) {
  return (
    <button onClick={() => onClick("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: 0 }}>
      <div style={{ width: 38, height: 38, background: "linear-gradient(135deg, #1a3a6b 60%, #e87c1e 100%)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif" }}>K</span>
      </div>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontFamily: "'Georgia', serif", fontWeight: 700, fontSize: 16, color: "#1a3a6b", lineHeight: 1.1 }}>Kumar Electricals</div>
        <div style={{ fontSize: 9, color: "#e87c1e", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>Industrial Solutions</div>
      </div>
    </button>
  );
}

function Navbar({ currentPage, navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const go = (page) => { navigate(page); setMenuOpen(false); };

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(255,255,255,0.97)" : "#fff",
      borderBottom: "1px solid #e2e8f0",
      boxShadow: scrolled ? "0 2px 16px rgba(26,58,107,0.08)" : "none",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <Logo onClick={navigate} />
        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(l => (
            l.label === "Get Quote"
              ? <button key={l.page} onClick={() => go(l.page)} style={{ marginLeft: 8, padding: "8px 18px", background: "#e87c1e", color: "#fff", border: "none", borderRadius: 5, fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.03em", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "#c96a10"}
                onMouseLeave={e => e.target.style.background = "#e87c1e"}>Get Quote</button>
              : <button key={l.page} onClick={() => go(l.page)} style={{
                  background: "none", border: "none", padding: "8px 12px", cursor: "pointer",
                  fontSize: 13, fontWeight: currentPage === l.page ? 700 : 500,
                  color: currentPage === l.page ? "#1a3a6b" : "#444",
                  borderBottom: currentPage === l.page ? "2px solid #1a3a6b" : "2px solid transparent",
                  transition: "color 0.2s", letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { if (currentPage !== l.page) e.target.style.color = "#1a3a6b"; }}
                onMouseLeave={e => { if (currentPage !== l.page) e.target.style.color = "#444"; }}
              >{l.label}</button>
          ))}
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ display: "none", background: "none", border: "1px solid #ddd", borderRadius: 6, padding: "6px 10px", cursor: "pointer", flexDirection: "column", gap: 4 }}>
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 2, background: "#1a3a6b", borderRadius: 2 }} />)}
        </button>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#fff", borderTop: "1px solid #e2e8f0", padding: "12px 24px 20px" }}>
          {NAV_LINKS.map(l => (
            <button key={l.page} onClick={() => go(l.page)} style={{
              display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
              padding: "10px 0", fontSize: 15, fontWeight: currentPage === l.page ? 700 : 500,
              color: l.label === "Get Quote" ? "#e87c1e" : currentPage === l.page ? "#1a3a6b" : "#444",
              borderBottom: "1px solid #f0f0f0", cursor: "pointer",
            }}>{l.label}</button>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

function Footer({ navigate }) {
  return (
    <footer style={{ background: "#0f2349", color: "#c8d8f0", marginTop: 0 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "#e87c1e", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, fontFamily: "Georgia, serif" }}>K</span>
              </div>
              <div>
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>Kumar Electricals</div>
                <div style={{ fontSize: 9, color: "#e87c1e", letterSpacing: "0.1em", textTransform: "uppercase" }}>Industrial Solutions</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: "#8aa4cc", marginBottom: 16 }}>
              17+ years of excellence in industrial tools, electrical contracting, and supply solutions across Rajasthan & Haryana.
            </p>
            <div style={{ fontSize: 13, color: "#8aa4cc" }}>
              <div>📞 +91 98765 43210</div>
              <div style={{ marginTop: 4 }}>✉️ info@kumarelectricals.in</div>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</h4>
            {NAV_LINKS.map(l => (
              <button key={l.page} onClick={() => navigate(l.page)} style={{ display: "block", background: "none", border: "none", color: "#8aa4cc", fontSize: 13, padding: "5px 0", cursor: "pointer", textAlign: "left" }}
                onMouseEnter={e => e.target.style.color = "#e87c1e"}
                onMouseLeave={e => e.target.style.color = "#8aa4cc"}>{l.label}</button>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Services</h4>
            {["LT Panel Manufacturing", "Electrical Contracting", "Industrial Supply", "Installation & AMC"].map(s => (
              <div key={s} style={{ fontSize: 13, color: "#8aa4cc", padding: "5px 0" }}>{s}</div>
            ))}
          </div>
          <div>
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Locations</h4>
            {["Bhiwadi (HQ)", "Rewari Branch", "Neemrana Branch"].map(l => (
              <div key={l} style={{ fontSize: 13, color: "#8aa4cc", padding: "5px 0" }}>{l}</div>
            ))}
            <div style={{ marginTop: 20 }}>
              <a href="https://wa.me/919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: 40, padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "#5a7499" }}>© 2024 Kumar Electricals. All rights reserved.</div>
          <div style={{ fontSize: 12, color: "#5a7499" }}>Govt. Licensed Electrical Contractor · ISO Certified</div>
        </div>
      </div>
    </footer>
  );
}

function Badge({ children, color = "#1a3a6b" }) {
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: color + "18", color, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>{children}</span>;
}

function SectionTitle({ label, title, sub, center }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 40 }}>
      {label && <Badge color="#e87c1e">{label}</Badge>}
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(24px, 3vw, 36px)", color: "#1a3a6b", fontWeight: 700, margin: "12px 0 10px" }}>{title}</h2>
      {sub && <p style={{ color: "#6b7280", fontSize: 16, maxWidth: 600, margin: center ? "0 auto" : 0 }}>{sub}</p>}
    </div>
  );
}

// --- PAGES ---

function HomePage({ navigate }) {
  const stats = [
    { val: "17+", label: "Years Experience" },
    { val: "8+", label: "Authorized Brands" },
    { val: "3", label: "Locations" },
    { val: "500+", label: "Products" },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #0f2349 0%, #1a3a6b 55%, #1e4d8c 100%)",
        position: "relative", overflow: "hidden", padding: "80px 24px 80px",
        minHeight: "85vh", display: "flex", alignItems: "center",
      }}>
        {/* Circuit pattern overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(232,124,30,0.08) 100%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 680 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,124,30,0.15)", border: "1px solid rgba(232,124,30,0.3)", borderRadius: 30, padding: "6px 16px", marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e87c1e", display: "inline-block" }} />
              <span style={{ color: "#e87c1e", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Established 2007 · Bhiwadi, Rajasthan</span>
            </div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 58px)", color: "#fff", fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px" }}>
              Complete Industrial<br />
              <span style={{ color: "#e87c1e" }}>Solutions</span> Under<br />One Roof
            </h1>
            <p style={{ color: "#a8c0e0", fontSize: "clamp(15px, 2vw, 18px)", lineHeight: 1.7, margin: "0 0 36px", maxWidth: 520 }}>
              Authorized dealers of world-class industrial tools, safety equipment, and electrical systems. Government-licensed electrical contractor serving Rajasthan & Haryana.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => navigate("products")} style={{ padding: "14px 28px", background: "#e87c1e", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer", transition: "transform 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "#c96a10"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "#e87c1e"; e.target.style.transform = "translateY(0)"; }}>
                View Products →
              </button>
              <button onClick={() => navigate("quote")} style={{ padding: "14px 28px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "border-color 0.2s, background 0.2s" }}
                onMouseEnter={e => { e.target.style.borderColor = "#fff"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.background = "transparent"; }}>
                Get a Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#f8f9fb", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 0 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "28px 16px", borderRight: i < stats.length - 1 ? "1px solid #e2e8f0" : "none" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 38, fontWeight: 700, color: "#1a3a6b" }}>{s.val}</div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60, alignItems: "center" }}>
          <div>
            <SectionTitle label="Who We Are" title="Rajasthan's Trusted Industrial Partner" sub="From our Bhiwadi manufacturing plant to branch offices in Rewari and Neemrana, we serve industrial clients with best-in-class products and services." />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
              {["Authorized multi-brand dealership across 8+ global brands", "Government-licensed electrical contractor", "In-house LT panel manufacturing at Bhiwadi", "Serving 500+ industrial clients across NCR region"].map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 20, height: 20, minWidth: 20, borderRadius: "50%", background: "#e87c1e", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2 }}>
                    <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                  </span>
                  <span style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.6 }}>{pt}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("about")} style={{ marginTop: 28, padding: "11px 24px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 5, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Learn More About Us →
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🏭", title: "Manufacturing", desc: "LT panels built in-house at Bhiwadi facility" },
              { icon: "📋", title: "Trading", desc: "Authorized dealer of 8+ global industrial brands" },
              { icon: "⚡", title: "Contracting", desc: "Govt. licensed electrical contractor" },
              { icon: "🔧", title: "Maintenance", desc: "AMC and breakdown support services" },
            ].map((c, i) => (
              <div key={i} style={{ background: i % 2 === 1 ? "#f0f5ff" : "#fff", border: "1px solid #e2e8f0", borderRadius: 10, padding: "24px 20px" }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 14, marginBottom: 6 }}>{c.title}</div>
                <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ background: "#f8f9fb", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle label="Products" title="Featured Products" sub="A selection from our extensive catalog of industrial tools, equipment, and electrical supplies." center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20, marginBottom: 36 }}>
            {PRODUCTS.slice(0, 8).map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} />
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => navigate("products")} style={{ padding: "12px 32px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              View All Products →
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <SectionTitle label="Services" title="What We Do" sub="End-to-end industrial solutions — from supply to contracting to maintenance." center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 10, padding: "28px 24px", background: "#fff", borderTop: `3px solid #1a3a6b`, transition: "box-shadow 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,58,107,0.1)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 16, marginBottom: 8 }}>{s.title}</div>
              <div style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6 }}>{s.desc.slice(0, 100)}...</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button onClick={() => navigate("services")} style={{ padding: "11px 28px", border: "1.5px solid #1a3a6b", background: "transparent", color: "#1a3a6b", borderRadius: 5, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
            Explore Services →
          </button>
        </div>
      </section>

      {/* BRANDS */}
      <section style={{ background: "#f8f9fb", padding: "60px 24px", borderTop: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionTitle label="Authorized Dealers" title="Brands We Carry" center />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 16 }}>
            {BRANDS.map((b, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8, padding: "20px 12px", textAlign: "center", transition: "border-color 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1a3a6b"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,58,107,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontWeight: 800, color: "#1a3a6b", fontSize: 15, letterSpacing: "0.03em" }}>{b.name}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>{b.desc.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK CONTACT */}
      <section style={{ background: "linear-gradient(135deg, #1a3a6b, #0f2349)", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, margin: "0 0 8px" }}>Ready to discuss your requirement?</h2>
            <p style={{ color: "#8aa4cc", fontSize: 15, margin: 0 }}>Get in touch with our team for quotes, product info, or contracting needs.</p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", background: "#fff", color: "#1a3a6b", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              📞 Call Now
            </a>
            <button onClick={() => navigate("contact")} style={{ padding: "12px 22px", background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Send Enquiry →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product: p, navigate }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,58,107,0.12)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
      <div style={{ background: "linear-gradient(135deg, #f0f5ff, #e8edf8)", height: 120, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44 }}>
        {p.img}
      </div>
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: "#e87c1e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.cat}</span>
          <span style={{ fontSize: 10, color: "#9ca3af", fontWeight: 600 }}>{p.brand}</span>
        </div>
        <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 14, marginBottom: 6 }}>{p.name}</div>
        <div style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5, flex: 1, marginBottom: 14 }}>{p.desc}</div>
        <button onClick={() => navigate("contact")} style={{ padding: "8px 16px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 5, fontWeight: 600, fontSize: 12, cursor: "pointer", width: "100%" }}>
          Enquire Now
        </button>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349 0%, #1a3a6b 100%)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">About Kumar Electricals</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>17+ Years of Industrial Excellence</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>Rooted in Bhiwadi, serving across Rajasthan and Haryana with integrity, expertise, and the best brands in the industry.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          <div>
            <SectionTitle label="Our Story" title="Built on Trust & Technical Expertise" />
            <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>
              Founded in 2007, Kumar Electricals started as a small tools supplier in Bhiwadi's burgeoning industrial area. Over 17 years, we have grown into a comprehensive industrial solutions company trusted by hundreds of manufacturing units, construction firms, and government bodies.
            </p>
            <p style={{ color: "#4b5563", lineHeight: 1.8, marginBottom: 16 }}>
              Today, we operate as a multi-dimensional company — a trader, manufacturer, and licensed electrical contractor — all under one roof. Our Bhiwadi facility houses our LT panel manufacturing unit, warehousing, and our main office. Branch offices in Rewari and Neemrana allow us to serve clients across the NCR industrial belt.
            </p>
            <p style={{ color: "#4b5563", lineHeight: 1.8 }}>
              We are proud to be authorized dealers for Bosch, Groz, DeWalt, Toku Pneumatics, Stanley, KITO, Ozar, and Pidilite — ensuring our customers always get genuine products backed by warranty.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { icon: "🏭", title: "Manufacturing", body: "Our Bhiwadi plant manufactures LT electrical panels — MCC, PCC, and distribution boards — to client specifications." },
              { icon: "📦", title: "Trading", body: "Authorized multi-brand dealership with a comprehensive inventory of tools, safety equipment, and electrical items." },
              { icon: "⚡", title: "Contracting", body: "Government-licensed electrical contractor for industrial wiring, substation erection, and HT/LT installations." },
              { icon: "📜", title: "Licensed & Certified", body: "Holds valid electrical contractor license from the State of Rajasthan. Products and panels are IS-compliant." },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "20px", background: "#f8f9fb", borderRadius: 10, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 26, minWidth: 36, textAlign: "center" }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "#1a3a6b", marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{c.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginTop: 60 }}>
          {[
            { title: "Our Mission", body: "To provide reliable, high-quality industrial tools and electrical solutions that empower manufacturers and contractors to build better, safer, and faster — at the right price.", color: "#1a3a6b" },
            { title: "Our Vision", body: "To be the leading industrial solutions provider in the NCR-Rajasthan industrial corridor, known for product quality, technical expertise, and unmatched service standards.", color: "#e87c1e" },
            { title: "Our Values", body: "Integrity in every transaction. Commitment to safety. Technical excellence. Long-term partnerships. We treat every client's project as our own.", color: "#0f2349" },
          ].map((v, i) => (
            <div key={i} style={{ background: v.color, color: "#fff", borderRadius: 12, padding: "32px 28px" }}>
              <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 22, marginBottom: 14 }}>{v.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.8, opacity: 0.85 }}>{v.body}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60, background: "#f0f5ff", borderRadius: 12, padding: "40px", border: "1px solid #c8d8f0" }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Infrastructure — Bhiwadi Manufacturing Plant</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {[
              { label: "Plant Area", val: "5,000 sq. ft." },
              { label: "Panel Manufacturing", val: "In-house CNC" },
              { label: "Warehouse Capacity", val: "2,000 sq. ft." },
              { label: "Service Engineers", val: "12+ Trained" },
              { label: "Annual Turnover", val: "₹5 Cr+" },
              { label: "Clients Served", val: "500+" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 8, padding: "20px 16px", textAlign: "center", border: "1px solid #c8d8f0" }}>
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: "#1a3a6b", fontSize: 22 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ navigate }) {
  const [activecat, setActiveCat] = useState("All");
  const filtered = activecat === "All" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activecat);

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">Product Catalog</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Our Products</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>Genuine products from 8+ authorized global brands. Browse by category or enquire directly.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {/* Category Filter */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding: "8px 18px", borderRadius: 30, border: "1.5px solid", fontWeight: 600, fontSize: 13, cursor: "pointer",
              background: activecat === c ? "#1a3a6b" : "#fff",
              color: activecat === c ? "#fff" : "#4b5563",
              borderColor: activecat === c ? "#1a3a6b" : "#d1d5db",
              transition: "all 0.15s",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {filtered.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
        </div>
        <div style={{ marginTop: 56, background: "#f0f5ff", borderRadius: 12, padding: "36px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20, border: "1px solid #c8d8f0" }}>
          <div>
            <h3 style={{ color: "#1a3a6b", fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Don't see what you need?</h3>
            <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>We supply a wide range beyond what's listed. Contact us with your requirement.</p>
          </div>
          <button onClick={() => navigate("contact")} style={{ padding: "12px 24px", background: "#e87c1e", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Send Requirement →
          </button>
        </div>
      </div>
    </div>
  );
}

function ServicesPage({ navigate }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">What We Offer</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Our Services</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>From manufacturing to contracting to maintenance — complete industrial solutions from a single trusted partner.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        {SERVICES.map((s, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 48, alignItems: "center", marginBottom: 72,
            paddingBottom: 72, borderBottom: i < SERVICES.length - 1 ? "1px solid #e2e8f0" : "none",
          }}>
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{ width: 64, height: 64, background: "#f0f5ff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, marginBottom: 20 }}>{s.icon}</div>
              <h2 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 28, fontWeight: 700, marginBottom: 14 }}>{s.title}</h2>
              <p style={{ color: "#4b5563", lineHeight: 1.8, fontSize: 15, marginBottom: 20 }}>{s.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {s.points.map((pt, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f0f0f0", color: "#374151", fontSize: 14 }}>
                    <span style={{ color: "#e87c1e", fontWeight: 700 }}>◆</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: i % 2 === 0 ? "#f0f5ff" : "#fff7f0", border: `1px solid ${i % 2 === 0 ? "#c8d8f0" : "#fdd9b5"}`, borderRadius: 12, padding: "36px", order: i % 2 === 0 ? 1 : 0 }}>
              <div style={{ fontSize: 64, textAlign: "center", marginBottom: 20 }}>{s.icon}</div>
              <div style={{ textAlign: "center", color: "#1a3a6b", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{s.title}</div>
              <div style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginBottom: 20 }}>Available at all 3 locations</div>
              <button onClick={() => navigate("contact")} style={{ display: "block", width: "100%", padding: "12px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                Enquire About This Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsPage({ navigate }) {
  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">Authorized Dealerships</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Brands We Represent</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>We are proud authorized dealers of globally recognized industrial brands — ensuring genuine products, warranty support, and technical assistance.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {BRANDS.map((b, i) => (
            <div key={i} style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: "32px 28px", background: "#fff", borderTop: "3px solid #1a3a6b", transition: "box-shadow 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,58,107,0.1)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "Georgia, serif", fontWeight: 800, color: "#1a3a6b", fontSize: 26 }}>{b.name}</div>
                <span style={{ fontSize: 10, background: "#e87c1e", color: "#fff", padding: "3px 8px", borderRadius: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Authorized</span>
              </div>
              <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{b.desc}</div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Genuine Products", "Warranty Support", "Tech Assistance"].map(t => (
                  <span key={t} style={{ fontSize: 10, background: "#f0f5ff", color: "#1a3a6b", padding: "3px 8px", borderRadius: 10, fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 60, background: "#f0f5ff", borderRadius: 12, padding: "40px", textAlign: "center", border: "1px solid #c8d8f0" }}>
          <h3 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Looking for a specific brand or product?</h3>
          <p style={{ color: "#6b7280", marginBottom: 24 }}>We may be able to source it. Contact our team and we'll check availability.</p>
          <button onClick={() => navigate("contact")} style={{ padding: "12px 28px", background: "#e87c1e", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );
}

function LocationsPage() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">Where to Find Us</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Our Locations</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17 }}>Headquartered in Bhiwadi with branches in Rewari and Neemrana.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              border: `2px solid ${active === i ? "#1a3a6b" : "#e2e8f0"}`,
              borderRadius: 10, padding: "24px", cursor: "pointer",
              background: active === i ? "#f0f5ff" : "#fff",
              transition: "all 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 15 }}>{loc.name}</div>
                {i === 0 && <span style={{ fontSize: 10, background: "#e87c1e", color: "#fff", padding: "3px 8px", borderRadius: 10, fontWeight: 700, whiteSpace: "nowrap" }}>HQ</span>}
              </div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8, lineHeight: 1.5 }}>📍 {loc.address}</div>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>📞 {loc.phone}</div>
              <a href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#1a3a6b", fontWeight: 600, textDecoration: "none" }}
                onClick={e => e.stopPropagation()}>
                Get Directions →
              </a>
            </div>
          ))}
        </div>
        {/* Map embed */}
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0" }}>
          <div style={{ background: "#f0f5ff", padding: "14px 20px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#1a3a6b" }}>📍 {LOCATIONS[active].name}</span>
            <span style={{ fontSize: 12, color: "#6b7280" }}>— {LOCATIONS[active].address}</span>
          </div>
          <iframe
            title="Location Map"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${LOCATIONS[active].lat},${LOCATIONS[active].lng}&z=14&output=embed`}
          />
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", req: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">Get In Touch</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Contact Us</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>Reach out for product enquiries, service requests, or any business needs. We respond within 4 business hours.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "72px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>
          {/* Form */}
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Send an Enquiry</h2>
            {sent ? (
              <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: "32px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <div style={{ fontWeight: 700, color: "#166534", fontSize: 17 }}>Enquiry Received!</div>
                <div style={{ color: "#4b5563", fontSize: 14, marginTop: 8 }}>We'll get back to you within 4 business hours.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Full Name *", key: "name", type: "text", ph: "Your name" },
                  { label: "Phone Number *", key: "phone", type: "tel", ph: "+91 XXXXX XXXXX" },
                  { label: "Email Address", key: "email", type: "email", ph: "your@email.com" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.ph} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      required={f.key !== "email"} />
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Requirement *</label>
                  <textarea rows={4} placeholder="Describe your product or service requirement..." value={form.req} onChange={e => setForm({ ...form, req: e.target.value })} required
                    style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <button type="submit" style={{ padding: "13px 24px", background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                  Send Enquiry →
                </button>
              </form>
            )}
          </div>
          {/* Contact info */}
          <div>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Reach Us Directly</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
              {[
                { icon: "📞", label: "Phone (HQ)", val: "+91 98765 43210" },
                { icon: "✉️", label: "Email", val: "info@kumarelectricals.in" },
                { icon: "📍", label: "Head Office", val: "Industrial Area, Bhiwadi, Rajasthan – 301019" },
                { icon: "⏰", label: "Working Hours", val: "Mon–Sat: 9:00 AM – 6:30 PM" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "16px", background: "#f8f9fb", borderRadius: 8, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2 }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: "#1a3a6b", fontWeight: 600 }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://wa.me/919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#25d366", color: "#fff", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                💬 WhatsApp
              </a>
              <a href="tel:+919876543210" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "#1a3a6b", color: "#fff", borderRadius: 6, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                📞 Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuotePage() {
  const [form, setForm] = useState({ product: "", qty: "1", msg: "", name: "", phone: "" });
  const [sent, setSent] = useState(false);

  return (
    <div>
      <div style={{ background: "linear-gradient(135deg, #0f2349, #1a3a6b)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Badge color="#e87c1e">Request a Quote</Badge>
          <h1 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, margin: "16px 0 12px" }}>Get a Custom Quote</h1>
          <p style={{ color: "#8aa4cc", fontSize: 17, maxWidth: 600 }}>Fill in your requirement and we'll prepare a competitive quote for you within one business day.</p>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "72px 24px" }}>
        {sent ? (
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: "48px", textAlign: "center" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
            <div style={{ fontFamily: "Georgia, serif", fontWeight: 700, color: "#166534", fontSize: 24 }}>Quote Request Submitted!</div>
            <div style={{ color: "#4b5563", fontSize: 15, marginTop: 12 }}>Our sales team will prepare your quote and send it within 1 business day.</div>
          </div>
        ) : (
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "40px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", color: "#1a3a6b", fontSize: 22, fontWeight: 700, marginBottom: 28 }}>Quote Request Form</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Your Name *</label>
                <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Phone Number *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Product / Category *</label>
                <select value={form.product} onChange={e => setForm({ ...form, product: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box", background: "#fff" }}>
                  <option value="">Select a category...</option>
                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                  {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name} ({p.brand})</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Quantity / Requirement</label>
                <input type="text" placeholder="e.g., 10 units / bulk" value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Additional Details / Message</label>
              <textarea rows={5} placeholder="Describe your specific requirements, delivery location, or any other details..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })}
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid #d1d5db", borderRadius: 6, fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <div style={{ background: "#f8f9fb", borderRadius: 8, padding: "16px 20px", marginBottom: 24, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: "#6b7280" }}>Prefer to call?</span>
              <a href="tel:+919876543210" style={{ fontSize: 13, color: "#1a3a6b", fontWeight: 700, textDecoration: "none" }}>📞 +91 98765 43210</a>
              <a href="https://wa.me/919876543210" style={{ fontSize: 13, color: "#25d366", fontWeight: 700, textDecoration: "none" }}>💬 WhatsApp Us</a>
            </div>
            <button onClick={() => setSent(true)} disabled={!form.name || !form.phone || !form.product}
              style={{ padding: "14px 32px", background: form.name && form.phone && form.product ? "#e87c1e" : "#d1d5db", color: "#fff", border: "none", borderRadius: 6, fontWeight: 700, fontSize: 15, cursor: form.name && form.phone && form.product ? "pointer" : "not-allowed", width: "100%" }}>
              Submit Quote Request →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- APP ---
export default function App() {
  const [page, setPage] = useState("home");

  const navigate = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage navigate={navigate} />,
    about: <AboutPage />,
    products: <ProductsPage navigate={navigate} />,
    services: <ServicesPage navigate={navigate} />,
    brands: <BrandsPage navigate={navigate} />,
    locations: <LocationsPage />,
    contact: <ContactPage />,
    quote: <QuotePage />,
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "#1a1a2e", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar currentPage={page} navigate={navigate} />
      <main style={{ flex: 1 }}>{pages[page]}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

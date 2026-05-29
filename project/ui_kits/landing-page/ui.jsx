/* =====================================================================
   Atualize UI kit — shared atoms
   Exposes: Icon, Btn, Eyebrow, IconTile, Stars, Photo, Reveal, useReveal
   ===================================================================== */

// ---- Lucide icon (manages its own innerHTML so React's tree stays stable)
function Icon({ name, size = 22, strokeWidth = 2, className = "", style = {} }) {
  const ref = React.useRef(null);
  const CUSTOM = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>',
  };
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (CUSTOM[name]) {
      node.innerHTML = CUSTOM[name];
    } else if (window.lucide) {
      node.innerHTML = '<i data-lucide="' + name + '"></i>';
      window.lucide.createIcons();
    }
    const svg = node.querySelector("svg");
    if (svg) {
      svg.setAttribute("width", size);
      svg.setAttribute("height", size);
      svg.setAttribute("stroke-width", strokeWidth);
    }
  }, [name, size, strokeWidth]);
  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", lineHeight: 0, ...style }}
      aria-hidden="true"
    />
  );
}

// ---- Button
function Btn({ variant = "primary", size = "", icon, iconRight, children, href, onClick, className = "" }) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${className}`.trim();
  const inner = (
    <>
      {icon ? <Icon name={icon} size={18} /> : null}
      <span>{children}</span>
      {iconRight ? <Icon name={iconRight} size={18} /> : null}
    </>
  );
  if (href) return <a className={cls} href={href} onClick={onClick}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
}

// ---- Eyebrow
function Eyebrow({ children, rule = true }) {
  return (
    <p className="eyebrow">
      {rule ? <span className="rule" /> : null}
      {children}
    </p>
  );
}

// ---- Icon tile
function IconTile({ name, tone = "cyan", dark = false }) {
  return (
    <span className={`itile ${tone === "lime" ? "lime" : ""} ${dark ? "on-dark" : ""}`}>
      <Icon name={name} size={26} />
    </span>
  );
}

// ---- Stars
function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={n + " de 5"}>
      {Array.from({ length: n }).map((_, i) => <Icon key={i} name="star" size={17} />)}
    </span>
  );
}

// ---- Photo (real image when `src` given; otherwise a labelled placeholder)
function Photo({ caption, src, alt = "", light = false, icon = "image", style = {}, className = "" }) {
  if (src) {
    return (
      <div className={`photo photo-real ${className}`} style={style}>
        <img src={src} alt={alt || caption || ""} className="photo-img" />
        {caption ? <div className="ph-cap">{caption}</div> : null}
      </div>
    );
  }
  return (
    <div className={`photo ${light ? "light" : ""} ${className}`} style={style}>
      <span className="ph-icon"><Icon name={icon} size={19} /></span>
      {caption ? <div className="ph-cap">{caption}</div> : null}
    </div>
  );
}

// ---- Scroll reveal
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}
function Reveal({ children, delay = 0, className = "", style = {} }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: delay + "ms", ...style }}>{children}</div>;
}

Object.assign(window, { Icon, Btn, Eyebrow, IconTile, Stars, Photo, useReveal, Reveal });

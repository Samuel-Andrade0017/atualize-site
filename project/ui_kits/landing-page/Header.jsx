/* Atualize UI kit — sticky Header / nav */

const NAV = [
  { label: "Atendimento", href: "#atendimento" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

function Header({ onWhats, onSolicitar }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = !scrolled; // light text when over the petrol hero

  return (
    <header className={`hd ${scrolled ? "hd-solid" : ""}`}>
      <div className="wrap hd-inner">
        <a className="hd-logo" href="#top" onClick={() => setOpen(false)}>
          <img src="../../assets/logo-mark.png" alt="" className="hd-mark" />
          <span className="hd-wm" style={{ color: dark ? "#fff" : "var(--navy-800)" }}>ATUALIZE</span>
        </a>

        <nav className="hd-nav hide-sm">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hd-link" style={{ color: dark ? "rgba(255,255,255,0.86)" : "var(--fg-2)" }}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hd-actions hide-sm">
          <button className="hd-link hd-btn-ghost" onClick={onSolicitar}
            style={{ color: dark ? "#fff" : "var(--navy-800)", borderColor: dark ? "rgba(255,255,255,0.28)" : "var(--line-2)" }}>
            Solicitar atendimento
          </button>
          <Btn variant="whatsapp" icon="message-circle" onClick={onWhats}>WhatsApp</Btn>
        </div>

        <button className="hd-burger show-sm" onClick={() => setOpen((v) => !v)} aria-label="Menu"
          style={{ color: dark && !open ? "#fff" : "var(--navy-800)" }}>
          <Icon name={open ? "x" : "menu"} size={26} />
        </button>
      </div>

      {open ? (
        <div className="hd-mobile">
          <div className="wrap">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="hd-mlink" onClick={() => setOpen(false)}>{n.label}</a>
            ))}
            <div className="hd-mactions">
              <Btn variant="outline" onClick={() => { setOpen(false); onSolicitar(); }}>Solicitar atendimento</Btn>
              <Btn variant="whatsapp" icon="message-circle" onClick={() => { setOpen(false); onWhats(); }}>Chamar no WhatsApp</Btn>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

window.Header = Header;

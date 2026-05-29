/* Atualize UI kit — Footer */

const FOOT_LINKS = [
  { label: "Atendimento", href: "#atendimento" },
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Avaliações", href: "#avaliacoes" },
];

function Footer({ onWhats }) {
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div className="ft-brand">
          <a className="hd-logo" href="#top">
            <img src="../../assets/logo-mark.png" alt="" style={{ height: 40 }} />
            <span className="hd-wm" style={{ color: "#fff" }}>ATUALIZE</span>
          </a>
          <p className="ft-slogan">Assistência especializada em computadores e suporte personalizado em hardware.</p>
          <div className="ft-social">
            <a className="ft-soc" href="https://wa.me/5562995118380" aria-label="WhatsApp" onClick={onWhats}><Icon name="message-circle" size={19} /></a>
            <a className="ft-soc" href="https://instagram.com/atualize.solucoestecnologicas" aria-label="Instagram"><Icon name="instagram" size={19} /></a>
          </div>
        </div>

        <div className="ft-col">
          <div className="ft-h">Navegação</div>
          {FOOT_LINKS.map((l) => <a key={l.href} className="ft-link" href={l.href}>{l.label}</a>)}
        </div>

        <div className="ft-col">
          <div className="ft-h">Contato</div>
          <div className="ft-row"><Icon name="phone" size={16} /> (62) 99511-8380</div>
          <div className="ft-row"><Icon name="instagram" size={16} /> @atualize.solucoestecnologicas</div>
          <div className="ft-row"><Icon name="calendar-clock" size={16} /> Atendimento com horário agendado</div>
          <div className="ft-row"><Icon name="map-pin" size={16} /> Goiânia e região</div>
        </div>
      </div>
      <div className="wrap ft-bottom">
        <span>© {new Date().getFullYear()} Atualize Soluções Tecnológicas.</span>
        <span>Suporte técnico • Domicílio • Empresas • Assistência</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;

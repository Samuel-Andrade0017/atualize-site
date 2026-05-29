/* Atualize UI kit — Hero */

const HERO_HIGHLIGHTS = [
  { icon: "house", label: "Atendimento em domicílio" },
  { icon: "building-2", label: "Atendimento empresarial" },
  { icon: "calendar-check", label: "Atendimento agendado" },
  { icon: "wrench", label: "Assistência especializada" },
];

function Hero({ onWhats, onSolicitar }) {
  return (
    <section className="hero section petrol" id="top">
      <span className="hero-glow" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal><Eyebrow>Suporte técnico especializado</Eyebrow></Reveal>
          <Reveal delay={60}>
            <h1 className="h-display">Suporte técnico com atendimento <span className="grad-text">em domicílio e empresas</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead">Atendimento personalizado para computadores, notebooks e empresas — com suporte técnico especializado e assistência organizada.</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="hero-cta">
              <Btn variant="whatsapp" size="lg" icon="message-circle" onClick={onWhats}>Chamar no WhatsApp</Btn>
              <Btn variant="ghost-light" size="lg" icon="calendar-check" onClick={onSolicitar}>Solicitar atendimento</Btn>
            </div>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-chips">
              {HERO_HIGHLIGHTS.map((h) => (
                <span className="chip" key={h.label}>
                  <span className="dot"><Icon name="check" size={14} /></span>
                  {h.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="hero-media">
          <Photo style={{ minHeight: 460 }} src="../../assets/photos/bench-gamer.png"
            alt="PC gamer montado na bancada da Atualize"
            caption="Montagem gamer concluída na nossa bancada técnica." />
          <div className="hero-badge">
            <Stars n={5} />
            <span><strong>5,0</strong> · atendimento avaliado pelos clientes</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Hero = Hero;

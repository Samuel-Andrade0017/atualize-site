/* Atualize — deploy bundle (all components in one Babel scope) */

/* --- ui.js --- */
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

function Eyebrow({ children, rule = true }) {
  return (
    <p className="eyebrow">
      {rule ? <span className="rule" /> : null}
      {children}
    </p>
  );
}

function IconTile({ name, tone = "cyan", dark = false }) {
  return (
    <span className={`itile ${tone === "lime" ? "lime" : ""} ${dark ? "on-dark" : ""}`}>
      <Icon name={name} size={26} />
    </span>
  );
}

function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={n + " de 5"}>
      {Array.from({ length: n }).map((_, i) => <Icon key={i} name="star" size={17} />)}
    </span>
  );
}

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

function useReveal() {
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => els.forEach((el) => el.classList.add("in")), 1500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  });
}
function Reveal({ children, delay = 0, className = "", style = {} }) {
  return <div className={`reveal ${className}`} style={{ transitionDelay: delay + "ms", ...style }}>{children}</div>;
}

Object.assign(window, { Icon, Btn, Eyebrow, IconTile, Stars, Photo, useReveal, Reveal });

/* --- Header.js --- */
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

  const dark = !scrolled;

  return (
    <header className={`hd ${scrolled ? "hd-solid" : ""}`}>
      <div className="wrap hd-inner">
        <a className="hd-logo" href="#top" onClick={() => setOpen(false)}>
          <img src="assets/logo-mark.png" alt="" className="hd-mark" />
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

/* --- Hero.js --- */
function Hero({ onWhats, onSolicitar }) {
  return (
    <section className="hero section petrol" id="top">
      <span className="hero-glow" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <Reveal><Eyebrow>Manutenção de computadores e impressoras</Eyebrow></Reveal>
          <Reveal delay={60}>
            <h1 className="h-display">Atendimento técnico agendado para <span className="grad-text">empresas e residências</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead">Diagnóstico, manutenção e melhorias para computadores, notebooks e impressoras com atendimento personalizado.</p>
          </Reveal>
          <Reveal delay={180}>
            <div className="hero-cta">
              <Btn variant="whatsapp" size="lg" icon="message-circle" onClick={onWhats}>Chamar no WhatsApp</Btn>
              <Btn variant="ghost-light" size="lg" icon="calendar-check" onClick={onSolicitar}>Solicitar atendimento</Btn>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="hero-media">
          <Photo style={{ minHeight: 460 }} icon="building-2"
            caption="Escritório da Atualize — foto do ambiente com logo na parede em breve." />
        </Reveal>
      </div>
    </section>
  );
}

/* --- ServiceModel.js --- */
const MODEL = [
  { icon: "house", title: "Atendimento em domicílio", text: "Manutenção de computadores e notebooks em domicílio, com horário agendado." },
  { icon: "building-2", title: "Atendimento empresarial", text: "Manutenção e acompanhamento de equipamentos para empresas." },
  { icon: "wrench", title: "Serviço de bancada", text: "Diagnósticos e serviços avançados realizados no nosso laboratório técnico." },
  { icon: "calendar-check", title: "Atendimento agendado", text: "Você escolhe o melhor horário e acompanha tudo pelo WhatsApp." },
];

function ServiceModel() {
  return (
    <section className="section" id="atendimento">
      <div className="wrap model-grid">
        <div className="model-copy">
          <Reveal><Eyebrow>Como funciona</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Um modelo de atendimento mais próximo e organizado</h2></Reveal>
          <Reveal delay={120}>
            <p className="body" style={{ marginTop: 18 }}>
              Trabalhamos com atendimento em domicílio, empresas e serviço de bancada especializado, com horário agendado.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="body" style={{ marginTop: 14 }}>
              Nosso foco é trazer mais praticidade e atenção em cada atendimento, realizando diagnósticos e manutenções diretamente no local sempre que possível. Serviços que exigem testes avançados ou reparos específicos são realizados em nosso laboratório técnico.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <Photo style={{ minHeight: 230, marginTop: 28 }} src="assets/photos/desk-tower.png"
              alt="Computador atendido pela Atualize"
              caption="Equipamentos atendidos no local e na bancada técnica." />
          </Reveal>
        </div>

        <div className="model-cards">
          {MODEL.map((m, i) => (
            <Reveal key={m.title} delay={i * 70}>
              <div className="card">
                <IconTile name={m.icon} tone={i % 2 ? "lime" : "cyan"} />
                <h3 className="h3">{m.title}</h3>
                <p className="body">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Services.js --- */
const SERVICES = [
  { icon: "cpu", title: "Manutenção e upgrade", text: "Troca de peças, SSD e memória para devolver desempenho ao seu equipamento." },
  { icon: "gauge", title: "Formatação e otimização", text: "Sistema limpo, rápido e organizado, com backup dos seus arquivos." },
  { icon: "fan", title: "Limpeza e pasta térmica", text: "Limpeza interna e troca de pasta térmica para melhoria de desempenho, redução de consumo, temperatura e ruídos." },
  { icon: "building-2", title: "Suporte empresarial", text: "Manutenção preventiva e suporte contínuo para a estrutura da empresa." },
  { icon: "network", title: "Redes e configuração", text: "Configuração de redes, Wi-Fi e equipamentos com estabilidade." },
  { icon: "printer", title: "Impressoras", text: "Instalação, configuração e manutenção de impressoras e multifuncionais." },
  { icon: "wrench", title: "Serviço avançado de bancada", text: "Diagnóstico e resolução de problemas complexos no nosso laboratório técnico." },
  { icon: "gamepad-2", title: "Montagem gamer", text: "Montagem e configuração de PCs gamer sob medida para o seu uso." },
];

function Services() {
  return (
    <section className="section petrol" id="servicos">
      <span className="svc-glow" />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="head center" style={{ marginBottom: 52 }}>
          <Reveal><Eyebrow>Serviços</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Serviços de manutenção</h2></Reveal>
          <Reveal delay={120}><p className="lead">Soluções completas para computadores de mesa (desktops), notebooks e impressoras – com organização e atenção aos detalhes em cada atendimento.</p></Reveal>
        </div>
        <div className="grid g-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 70}>
              <div className="card-dark">
                <IconTile name={s.icon} tone={i % 2 ? "lime" : "cyan"} dark />
                <h3 className="h3">{s.title}</h3>
                <p className="body">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Differentials.js --- */
const DIFFS = [
  { icon: "heart-handshake", title: "Atendimento personalizado", text: "Cada cliente recebe atenção individual e suporte alinhado à sua necessidade." },
  { icon: "map-pin", title: "Atendimento no local", text: "Buscamos resolver o máximo possível diretamente em domicílio e empresas." },
  { icon: "eye", title: "Transparência", text: "Tudo é explicado antes da execução do serviço, sem surpresas." },
  { icon: "list-checks", title: "Organização", text: "Atendimento com horário agendado e acompanhamento pelo WhatsApp." },
  { icon: "zap", title: "Agilidade", text: "Atendimentos rápidos e suporte eficiente para reduzir o seu tempo parado." },
  { icon: "shield-check", title: "Laboratório técnico", text: "Estrutura preparada para diagnósticos e serviços avançados de bancada." },
];

function Differentials() {
  return (
    <section className="section paper" id="diferenciais">
      <div className="wrap diff-grid">
        <div className="diff-head">
          <Reveal><Eyebrow>Diferenciais</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Por que escolher a Atualize?</h2></Reveal>
          <Reveal delay={120}>
            <p className="lead">Mais do que resolver problemas, entregamos uma experiência de suporte confiável, próxima e organizada.</p>
          </Reveal>
          <Reveal delay={160}>
            <div className="diff-cta">
              <span className="rule-grad" />
              <span className="diff-cta-txt">Atendimento humano, do primeiro contato à entrega.</span>
            </div>
          </Reveal>
        </div>

        <div className="diff-list">
          {DIFFS.map((d, i) => (
            <Reveal key={d.title} delay={(i % 2) * 80}>
              <div className="diff-item">
                <IconTile name={d.icon} tone={i % 2 ? "lime" : "cyan"} />
                <div>
                  <h3 className="h3">{d.title}</h3>
                  <p className="body" style={{ marginTop: 6, fontSize: 15 }}>{d.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- FAQ.js --- */
const FAQS = [
  {
    q: "Vocês atendem em domicílio?",
    a: "Sim! Nosso principal modelo de atendimento é ir até você — seja em casa ou na empresa. Agendamos o horário que for melhor para você e levamos o suporte até lá.",
  },
  {
    q: "Preciso levar meu computador até vocês?",
    a: "Não necessariamente. Buscamos resolver o máximo possível no local. Apenas quando o serviço exige recursos avançados de laboratório o equipamento é encaminhado ao nosso espaço técnico.",
  },
  {
    q: "Como funciona o agendamento?",
    a: "É simples: entre em contato pelo WhatsApp, nos conte o que está acontecendo e combinamos o melhor horário. Você acompanha tudo pelo próprio WhatsApp.",
  },
  {
    q: "Vocês atendem empresas?",
    a: "Sim. Oferecemos manutenção preventiva, suporte contínuo e configuração de redes para empresas de todos os tamanhos, com atendimento alinhado à sua rotina.",
  },
  {
    q: "Como recebo o orçamento?",
    a: "Tudo é explicado e acordado antes de qualquer execução. Você recebe o orçamento detalhado pelo WhatsApp e só prosseguimos após sua aprovação — sem surpresas.",
  },
  {
    q: "Qual o prazo para o serviço?",
    a: "Serviços realizados no local costumam ser concluídos no mesmo atendimento. Reparos na bancada têm prazo combinado no momento do diagnóstico.",
  },
];

function FAQ() {
  const [open, setOpen] = React.useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="section" id="faq">
      <div className="wrap faq-wrap">
        <div className="head center" style={{ marginBottom: 48 }}>
          <Reveal><Eyebrow>Dúvidas</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Perguntas frequentes</h2></Reveal>
          <Reveal delay={120}><p className="lead">Respondemos as dúvidas mais comuns. Não encontrou o que procura? Fale com a gente pelo WhatsApp.</p></Reveal>
        </div>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 60}>
              <div className={`faq-item ${open === i ? "open" : ""}`}>
                <button className="faq-q" onClick={() => toggle(i)} aria-expanded={open === i}>
                  <span>{item.q}</span>
                  <span className="faq-icon"><Icon name={open === i ? "minus" : "plus"} size={20} /></span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Reviews.js --- */
const REVIEWS = [
  { name: "NEXVGEN", initials: "NX", tone: "c", when: "Local Guide · há 1 ano",
    text: "Mandei meu PC gamer na loja deles, atendimento exemplar ao contrário de muitas supostas boas lojas aqui em Goiânia. Preço JUSTO, serviço profissional! Limpeza, dual boot, troca de termalpads e pasta térmica — o PC voltou brilhando! Ganhou mais um cliente fixo." },
  { name: "Jorge M. Br", initials: "JM", tone: "l", when: "Local Guide · há 8 meses",
    text: "Pessoal muito responsável e atento. Resolveu o problema do meu PC. Recomendo muito. Gente boa é profissional." },
  { name: "Guilherme Silva", initials: "GS", tone: "c", when: "há 6 meses",
    text: "Os caras são os melhores, levei meu PC pra aumentar a memória e formatar. Fui super bem atendido, valores acessíveis. Qualquer coisa que eu precisar só vou lá. Super indico, estão de parabéns!" },
  { name: "KlaywGAMER MEGS", initials: "KG", tone: "l", when: "há 1 ano",
    text: "Eu estava muito na dúvida porque sou novo pra entender de PC gamer, mas achei a loja que me ajudou bastante. O atendimento foi super 100%, adorei e estou gostando muito do PC. Loja muito boa e de máxima confiança!" },
];

function Reviews() {
  return (
    <section className="section" id="avaliacoes">
      <div className="wrap">
        <div className="rev-top">
          <div className="rev-head">
            <Reveal><Eyebrow>Avaliações</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="h2">O que dizem nossos clientes</h2></Reveal>
            <Reveal delay={120}><p className="lead">Confiança construída atendimento após atendimento — avaliações reais no Google.</p></Reveal>
          </div>
          <Reveal delay={120}>
            <div className="rev-score">
              <div className="rev-score-num">5,0</div>
              <div>
                <Stars n={5} />
                <div className="rev-score-sub">Avaliações · Google</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid g-2 rev-grid" style={{ marginTop: 44 }}>
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 80}>
              <div className="card rev-card">
                <div className="rev-person">
                  <span className={`rev-avatar ${r.tone === "l" ? "lime" : ""}`}>{r.initials}</span>
                  <div>
                    <div className="rev-name">{r.name}</div>
                    <div className="rev-when">{r.when}</div>
                  </div>
                  <span className="rev-google" title="Avaliação do Google"><Icon name="star" size={12} /> Google</span>
                </div>
                <Stars n={5} />
                <p className="body" style={{ marginTop: 12, fontSize: 15 }}>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Gallery.js --- */
const WORKS = [
  { area: "big", src: "assets/photos/gamer-rgb.png",  cap: "Montagem gamer com iluminação RGB — pronta para entrega." },
  { area: "a",   src: "assets/photos/internals.png",  cap: "Upgrade de placa de vídeo e gerenciamento de cabos." },
  { area: "b",   src: "assets/photos/desk-setup.png", cap: "Setup completo configurado e testado." },
  { area: "c",   src: null, icon: "camera",                 cap: "Foto do trabalho em breve." },
  { area: "d",   src: null, icon: "camera",                 cap: "Foto do trabalho em breve." },
];

function Gallery() {
  return (
    <section className="section paper" id="ambiente">
      <div className="wrap">
        <div className="head center" style={{ marginBottom: 48 }}>
          <Reveal><Eyebrow>Nossos trabalhos</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Montagens, upgrades e manutenções</h2></Reveal>
          <Reveal delay={120}><p className="lead">Cada equipamento entregue com cuidado, organização e testes — do gamer ao computador do dia a dia.</p></Reveal>
        </div>
        <Reveal delay={120}>
          <div className="bento">
            {WORKS.map((w) => (
              w.src
                ? <Photo key={w.area} className={`b-${w.area}`} src={w.src} caption={w.cap} />
                : <Photo key={w.area} className={`b-${w.area}`} light icon={w.icon} caption={w.cap} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- FinalCTA.js --- */
function FinalCTA({ onWhats }) {
  return (
    <section className="section petrol cta-sec" id="contato">
      <div className="wrap-narrow">
        <Reveal>
          <div className="cta-panel">
            <span className="cta-glow" />
            <div className="cta-inner">
              <Eyebrow>Fale com a gente</Eyebrow>
              <h2 className="h2" style={{ fontSize: "clamp(30px,4vw,44px)" }}>Precisa de suporte técnico?</h2>
              <p className="lead" style={{ margin: "16px auto 0", maxWidth: 520 }}>
                Suporte especializado em informática — em domicílio, empresas e no nosso laboratório técnico, com horário agendado.
              </p>
              <div className="cta-btns">
                <Btn variant="whatsapp" size="lg" icon="message-circle" onClick={onWhats}>Chamar no WhatsApp</Btn>
                <Btn variant="grad" size="lg" icon="instagram" href="https://instagram.com/atualize.solucoestecnologicas">Instagram</Btn>
              </div>
              <div className="cta-info">
                <a className="cta-info-item" href="https://wa.me/5562995118380">
                  <Icon name="phone" size={18} /> (62) 99511-8380
                </a>
                <span className="cta-info-sep" />
                <a className="cta-info-item" href="https://instagram.com/atualize.solucoestecnologicas">
                  <Icon name="instagram" size={18} /> @atualize.solucoestecnologicas
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --- Footer.js --- */
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
            <img src="assets/logo-mark.png" alt="" style={{ height: 40 }} />
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
        <span>© {new Date().getFullYear()} Atualize Soluções Tecnológicas. CNPJ 59.763.505/0001-50</span>
        <span>Manutenção de computadores • Domicílio • Empresas • Goiânia</span>
      </div>
    </footer>
  );
}

/* --- App.js --- */
const WHATSAPP_URL = "https://wa.me/5562995118380?text=" +
  encodeURIComponent("Olá! Vim pelo site e gostaria de solicitar um atendimento técnico.");

function Toast({ show, text }) {
  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <Icon name="message-circle" size={18} /> {text}
    </div>
  );
}

function RequestModal({ open, onClose, onWhats }) {
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (open) setSent(false); }, [open]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Fechar"><Icon name="x" size={20} /></button>
        {!sent ? (
          <>
            <span className="itile"><Icon name="calendar-check" size={26} /></span>
            <h3 className="h3" style={{ marginTop: 16, fontSize: 24 }}>Solicitar atendimento</h3>
            <p className="body" style={{ fontSize: 15, marginTop: 6 }}>Conte rapidamente o que você precisa. Retornamos pelo WhatsApp para agendar.</p>
            <form className="form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="field"><label>Nome</label><input required placeholder="Seu nome" /></div>
              <div className="field"><label>WhatsApp</label><input required placeholder="(62) 90000-0000" /></div>
              <div className="field">
                <label>Tipo de atendimento</label>
                <select>
                  <option>Atendimento em domicílio</option>
                  <option>Atendimento empresarial</option>
                  <option>Assistência especializada</option>
                  <option>Montagem gamer</option>
                </select>
              </div>
              <div className="field"><label>Como podemos ajudar?</label><textarea rows="3" placeholder="Descreva o problema ou serviço"></textarea></div>
              <Btn variant="primary" size="lg" className="full">Enviar solicitação</Btn>
            </form>
          </>
        ) : (
          <div className="form-done">
            <span className="itile lime"><Icon name="check" size={28} /></span>
            <h3 className="h3" style={{ marginTop: 18, fontSize: 24 }}>Solicitação enviada!</h3>
            <p className="body" style={{ fontSize: 15, marginTop: 8 }}>Recebemos seu pedido. Para agilizar, fale com a gente agora pelo WhatsApp.</p>
            <Btn variant="whatsapp" size="lg" icon="message-circle" className="full" onClick={() => { onClose(); onWhats(); }}>Chamar no WhatsApp</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const [modal, setModal] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  useReveal();

  const whats = () => {
    setToast(true);
    window.clearTimeout(window.__t);
    window.__t = window.setTimeout(() => setToast(false), 2600);
    window.open(WHATSAPP_URL, "_blank", "noopener");
  };
  const solicitar = () => setModal(true);

  return (
    <>
      <Header onWhats={whats} onSolicitar={solicitar} />
      <main>
        <Hero onWhats={whats} onSolicitar={solicitar} />
        <ServiceModel />
        <Services />
        <Differentials />
        <FAQ />
        <Reviews />
        <Gallery />
        <FinalCTA onWhats={whats} />
      </main>
      <Footer onWhats={whats} />
      <RequestModal open={modal} onClose={() => setModal(false)} onWhats={whats} />
      <Toast show={toast} text="Abrindo o WhatsApp da Atualize…" />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

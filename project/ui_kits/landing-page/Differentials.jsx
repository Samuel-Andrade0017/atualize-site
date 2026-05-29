/* Atualize UI kit — Differentials ("Por que escolher a Atualize?") */

const DIFFS = [
  { icon: "heart-handshake", title: "Atendimento personalizado", text: "Cada cliente recebe atenção individual e suporte alinhado à sua necessidade." },
  { icon: "map-pin", title: "Atendimento no local", text: "Buscamos resolver o máximo possível diretamente em domicílio e empresas." },
  { icon: "eye", title: "Transparência", text: "Tudo é explicado antes da execução do serviço, sem surpresas." },
  { icon: "list-checks", title: "Organização", text: "Atendimento com horário agendado e acompanhamento pelo WhatsApp." },
  { icon: "zap", title: "Agilidade", text: "Atendimentos rápidos e suporte eficiente para reduzir o seu tempo parado." },
  { icon: "shield-check", title: "Assistência especializada", text: "Estrutura preparada para diagnósticos e reparos avançados." },
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

window.Differentials = Differentials;

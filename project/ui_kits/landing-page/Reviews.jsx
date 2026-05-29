/* Atualize UI kit — Reviews ("Avaliações") */

const REVIEWS = [
  { name: "Ana Carolina M.", initials: "AC", tone: "c", when: "há 2 semanas",
    text: "Resolveram o problema do meu notebook em casa no mesmo dia. Atendimento educado e explicaram tudo antes de executar. Recomendo!" },
  { name: "Rodrigo Lima", initials: "RL", tone: "l", when: "há 1 mês",
    text: "Cuidam da TI da nossa empresa há meses. Organizados, pontuais e sempre disponíveis no WhatsApp quando precisamos." },
  { name: "Felipe Andrade", initials: "FA", tone: "c", when: "há 3 semanas",
    text: "Montaram meu PC gamer e ficou perfeito. Transparência total no orçamento e entrega dentro do prazo combinado." },
];

function Reviews() {
  return (
    <section className="section" id="avaliacoes">
      <div className="wrap">
        <div className="rev-top">
          <div className="rev-head">
            <Reveal><Eyebrow>Avaliações</Eyebrow></Reveal>
            <Reveal delay={60}><h2 className="h2">O que dizem nossos clientes</h2></Reveal>
            <Reveal delay={120}><p className="lead">Confiança construída atendimento após atendimento.</p></Reveal>
          </div>
          <Reveal delay={120}>
            <div className="rev-score">
              <div className="rev-score-num">5,0</div>
              <div>
                <Stars n={5} />
                <div className="rev-score-sub">Avaliação média · clientes verificados</div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid g-3" style={{ marginTop: 44 }}>
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 80}>
              <div className="card rev-card">
                <div className="rev-person">
                  <span className={`rev-avatar ${r.tone === "l" ? "lime" : ""}`}>{r.initials}</span>
                  <div>
                    <div className="rev-name">{r.name}</div>
                    <div className="rev-when">{r.when}</div>
                  </div>
                  <span className="rev-verified" title="Avaliação verificada"><Icon name="badge-check" size={18} /></span>
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

window.Reviews = Reviews;

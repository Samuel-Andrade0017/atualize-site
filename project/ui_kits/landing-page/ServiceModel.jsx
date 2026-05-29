/* Atualize UI kit — Service model ("Como funciona") */

const MODEL = [
  { icon: "house", title: "Atendimento em domicílio", text: "Suporte técnico no conforto da sua casa, com horário agendado." },
  { icon: "building-2", title: "Atendimento empresarial", text: "Estrutura e suporte alinhados à rotina e às demandas da sua empresa." },
  { icon: "wrench", title: "Assistência especializada", text: "Diagnósticos e reparos avançados realizados na nossa bancada técnica." },
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
              Trabalhamos com atendimento técnico em domicílio, empresas e assistência especializada com horário agendado.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="body" style={{ marginTop: 14 }}>
              Nosso foco é trazer mais praticidade e atenção em cada atendimento, buscando resolver o máximo possível diretamente no local. Serviços que exigem testes avançados ou reparos específicos são realizados em nossa bancada técnica.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <Photo style={{ minHeight: 230, marginTop: 28 }} src="../../assets/photos/desk-tower.png"
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

window.ServiceModel = ServiceModel;

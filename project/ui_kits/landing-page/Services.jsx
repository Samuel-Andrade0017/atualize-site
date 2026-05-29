/* Atualize UI kit — Services ("Serviços especializados") */

const SERVICES = [
  { icon: "cpu", title: "Manutenção e upgrade", text: "Troca de peças, SSD e memória para devolver desempenho ao seu equipamento." },
  { icon: "gauge", title: "Formatação e otimização", text: "Sistema limpo, rápido e organizado, com backup dos seus arquivos." },
  { icon: "fan", title: "Limpeza e pasta térmica", text: "Limpeza interna e troca de pasta térmica para reduzir temperatura e ruído." },
  { icon: "building-2", title: "Suporte empresarial", text: "Manutenção preventiva e suporte contínuo para a estrutura da empresa." },
  { icon: "network", title: "Redes e configuração", text: "Configuração de redes, Wi-Fi e equipamentos com estabilidade." },
  { icon: "printer", title: "Impressoras", text: "Instalação, configuração e manutenção de impressoras e multifuncionais." },
  { icon: "wrench", title: "Reparo avançado", text: "Diagnóstico e reparo de problemas específicos em nossa bancada técnica." },
  { icon: "gamepad-2", title: "Montagem gamer", text: "Montagem e configuração de PCs gamer sob medida para o seu uso." },
];

function Services() {
  return (
    <section className="section petrol" id="servicos">
      <span className="svc-glow" />
      <div className="wrap" style={{ position: "relative" }}>
        <div className="head center" style={{ marginBottom: 52 }}>
          <Reveal><Eyebrow>Serviços</Eyebrow></Reveal>
          <Reveal delay={60}><h2 className="h2">Serviços especializados</h2></Reveal>
          <Reveal delay={120}><p className="lead">Soluções completas para computadores, notebooks e empresas — com a mesma atenção e organização em cada atendimento.</p></Reveal>
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

window.Services = Services;

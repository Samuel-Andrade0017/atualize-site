/* Atualize UI kit — Nossos trabalhos (real build/repair photos) */

const WORKS = [
  { area: "big", src: "../../assets/photos/gamer-rgb.png", cap: "Montagem gamer com iluminação RGB — pronta para entrega." },
  { area: "a", src: "../../assets/photos/internals.png", cap: "Upgrade de placa de vídeo e gerenciamento de cabos." },
  { area: "b", src: "../../assets/photos/desk-setup.png", cap: "Setup completo configurado e testado." },
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
          <div className="bento bento-3">
            {WORKS.map((w) => (
              <Photo key={w.area} className={`b-${w.area}`} src={w.src} caption={w.cap} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Gallery = Gallery;

/* Atualize UI kit — Final CTA ("Precisa de suporte técnico?") */

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
                Atendimento especializado em domicílio, empresas e assistência técnica com horário agendado.
              </p>
              <div className="cta-btns">
                <Btn variant="whatsapp" size="lg" icon="message-circle" onClick={onWhats}>Chamar no WhatsApp</Btn>
                <Btn variant="grad" size="lg" icon="instagram" href="https://instagram.com/atualize.solucoestecnologicas" >Instagram</Btn>
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

window.FinalCTA = FinalCTA;

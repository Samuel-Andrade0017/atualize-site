/* Atualize UI kit — App shell: composes sections, modal + toast */

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
              <Btn variant="primary" size="lg" className="full" >Enviar solicitação</Btn>
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

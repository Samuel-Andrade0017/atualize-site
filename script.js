/* Atualize Soluções Tecnológicas — Landing Page JS */

// ============================================================
// LUCIDE ICONS — inline SVG paths used on the page
// ============================================================
const ICONS = {
  'message-circle': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'calendar-check': '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/>',
  'house': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'building-2': '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  'wrench': '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  'check': '<polyline points="20 6 9 17 4 12"/>',
  'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  'gauge': '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  'fan': '<path d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"/><circle cx="12" cy="12" r="2.439"/>',
  'network': '<rect x="9" y="2" width="6" height="6"/><rect x="16" y="16" width="6" height="6"/><rect x="2" y="16" width="6" height="6"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><line x1="12" y1="8" x2="12" y2="12"/>',
  'printer': '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  'gamepad-2': '<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="17" y1="10" x2="17.01" y2="10"/><path d="M17 5H7a5 5 0 0 0-5 5v5a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5v-5a5 5 0 0 0-5-5Z"/>',
  'heart-handshake': '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"/><path d="m18 15-2-2"/><path d="m15 18-2-2"/>',
  'map-pin': '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  'list-checks': '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'badge-check': '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>',
  'instagram': '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>',
  'calendar-clock': '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h5"/><circle cx="17.5" cy="17.5" r="4.5"/><path d="M17.5 15v2.5l1.5 1.5"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'plus': '<path d="M5 12h14"/><path d="M12 5v14"/>',
  'minus': '<path d="M5 12h14"/>',
  'help-circle': '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
};

function icon(name, size = 22, sw = 2) {
  const d = ICONS[name] || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
}

function stars(n = 5) {
  return `<span class="stars" aria-label="${n} de 5">${Array.from({length: n}).map(() => icon('star', 17)).join('')}</span>`;
}

// ============================================================
// DATA
// ============================================================
const FAQS = [
  { q: 'Como faço para agendar um atendimento?', a: 'O agendamento é feito pelo WhatsApp. Basta nos chamar, descrever o que precisa e vamos combinar o melhor horário para você.' },
  { q: 'Vocês atendem em domicílio mesmo?', a: 'Sim! Realizamos atendimentos em residências e empresas de Goiânia e região, sempre com horário agendado para evitar esperas.' },
  { q: 'O que acontece se o problema não puder ser resolvido no local?', a: 'Quando o serviço exige diagnóstico avançado ou reparo em bancada, retiramos o equipamento, realizamos o serviço com cuidado e devolvemos após a conclusão.' },
  { q: 'Vocês oferecem garantia nos serviços?', a: 'Sim. Todos os nossos serviços possuem garantia. O prazo varia conforme o tipo de atendimento — informamos sempre antes de executar.' },
  { q: 'Qual o prazo para realizar um atendimento?', a: 'Buscamos atender no menor prazo possível. Para atendimentos em domicílio, geralmente agendamos para o mesmo dia ou o dia seguinte.' },
  { q: 'Atendem empresas de qualquer porte?', a: 'Sim. Atendemos desde computadores individuais até a estrutura de TI de pequenas e médias empresas, com suporte contínuo e preventivo.' },
];

const MODEL = [
  { icon: 'house', title: 'Atendimento em domicílio', text: 'Suporte técnico no conforto da sua casa, com horário agendado.', tone: 'cyan' },
  { icon: 'building-2', title: 'Atendimento empresarial', text: 'Estrutura e suporte alinhados à rotina e às demandas da sua empresa.', tone: 'lime' },
  { icon: 'wrench', title: 'Assistência especializada', text: 'Diagnósticos e reparos avançados realizados na nossa bancada técnica.', tone: 'cyan' },
  { icon: 'calendar-check', title: 'Atendimento agendado', text: 'Você escolhe o melhor horário e acompanha tudo pelo WhatsApp.', tone: 'lime' },
];

const SERVICES = [
  { icon: 'cpu', title: 'Manutenção e upgrade', text: 'Troca de peças, SSD e memória para devolver desempenho ao seu equipamento.', tone: 'cyan' },
  { icon: 'gauge', title: 'Formatação e otimização', text: 'Sistema limpo, rápido e organizado, com backup dos seus arquivos.', tone: 'lime' },
  { icon: 'fan', title: 'Limpeza e pasta térmica', text: 'Limpeza interna e troca de pasta térmica para melhoria de desempenho, redução de consumo, temperatura e ruídos.', tone: 'cyan' },
  { icon: 'building-2', title: 'Suporte empresarial', text: 'Manutenção preventiva e suporte contínuo para a estrutura da empresa.', tone: 'lime' },
  { icon: 'network', title: 'Redes e configuração', text: 'Configuração de redes, Wi-Fi e equipamentos com estabilidade.', tone: 'cyan' },
  { icon: 'printer', title: 'Impressoras', text: 'Instalação, configuração e manutenção de impressoras e multifuncionais.', tone: 'lime' },
  { icon: 'wrench', title: 'Reparo avançado', text: 'Diagnóstico e reparo de problemas complexos em nossa bancada técnica.', tone: 'cyan' },
  { icon: 'gamepad-2', title: 'Montagem gamer', text: 'Montagem e configuração de PCs gamer sob medida para o seu uso.', tone: 'lime' },
];

const DIFFS = [
  { icon: 'heart-handshake', title: 'Atendimento personalizado', text: 'Cada cliente recebe atenção individual e suporte alinhado à sua necessidade.', tone: 'cyan' },
  { icon: 'map-pin', title: 'Atendimento no local', text: 'Buscamos resolver o máximo possível diretamente em domicílio e empresas.', tone: 'lime' },
  { icon: 'eye', title: 'Transparência', text: 'Tudo é explicado antes da execução do serviço, sem surpresas.', tone: 'cyan' },
  { icon: 'list-checks', title: 'Organização', text: 'Atendimento com horário agendado e acompanhamento pelo WhatsApp.', tone: 'lime' },
  { icon: 'zap', title: 'Agilidade', text: 'Atendimentos rápidos e suporte eficiente para reduzir o seu tempo parado.', tone: 'cyan' },
  { icon: 'shield-check', title: 'Assistência especializada', text: 'Estrutura preparada para diagnósticos e reparos avançados.', tone: 'lime' },
];

const REVIEWS = [
  { name: 'Ana Carolina M.', initials: 'AC', tone: 'cyan', when: 'há 2 semanas',
    text: 'Resolveram o problema do meu notebook em casa no mesmo dia. Atendimento educado e explicaram tudo antes de executar. Recomendo!' },
  { name: 'Rodrigo Lima', initials: 'RL', tone: 'lime', when: 'há 1 mês',
    text: 'Cuidam da TI da nossa empresa há meses. Organizados, pontuais e sempre disponíveis no WhatsApp quando precisamos.' },
  { name: 'Felipe Andrade', initials: 'FA', tone: 'cyan', when: 'há 3 semanas',
    text: 'Montaram meu PC gamer e ficou perfeito. Transparência total no orçamento e entrega dentro do prazo combinado.' },
];

const GALLERY = [
  { cls: 'b-big', src: 'assets/photos/gamer-rgb.png', cap: 'Montagem gamer com iluminação RGB — pronta para entrega.' },
  { cls: 'b-a', src: 'assets/photos/internals.png', cap: 'Upgrade de placa de vídeo e gerenciamento de cabos.' },
  { cls: 'b-b', src: 'assets/photos/desk-setup.png', cap: 'Setup completo configurado e testado.' },
  { cls: 'b-c', src: 'assets/photos/bench-gamer.png', cap: 'PC gamer montado na bancada técnica.' },
  { cls: 'b-d', src: 'assets/photos/desk-tower.png', cap: 'Computador atendido com cuidado e organização.' },
  { cls: 'b-e', src: 'assets/photos/bench-gamer.png', cap: 'Bancada técnica preparada para diagnósticos avançados.' },
  { cls: 'b-f', src: 'assets/photos/internals.png', cap: 'Serviço executado com organização e atenção aos detalhes.' },
];

const FOOTER_LINKS = [
  { label: 'Atendimento', href: '#atendimento' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Perguntas frequentes', href: '#faq' },
  { label: 'Avaliações', href: '#avaliacoes' },
];

const WA_URL = 'https://wa.me/5562995118380';
const IG_URL = 'https://instagram.com/atualize.solucoestecnologicas';

// ============================================================
// HELPERS
// ============================================================
function eyebrow(text) {
  return `<p class="eyebrow"><span class="rule"></span>${text}</p>`;
}

function itile(name, tone = 'cyan', dark = false) {
  const cls = ['itile', tone === 'lime' ? 'lime' : '', dark ? 'on-dark' : ''].filter(Boolean).join(' ');
  return `<span class="${cls}">${icon(name, 26)}</span>`;
}

function photo(src, cap, extraCls = '') {
  return `<div class="photo ${extraCls}"><img src="${src}" alt="${cap}" loading="lazy"><div class="photo-cap">${cap}</div></div>`;
}

// ============================================================
// RENDER SECTIONS
// ============================================================
function renderHeader() {
  return `
  <header class="hd" id="hd">
    <div class="wrap hd-inner">
      <a class="hd-logo" href="#top">
        <img src="assets/logo-mark.png" alt="Atualize logo">
        <span class="hd-wm">ATUALIZE</span>
      </a>
      <nav class="hd-nav" aria-label="Navegação principal">
        <a href="#atendimento" class="hd-link">Atendimento</a>
        <a href="#servicos" class="hd-link">Serviços</a>
        <a href="#diferenciais" class="hd-link">Diferenciais</a>
        <a href="#faq" class="hd-link">FAQ</a>
        <a href="#avaliacoes" class="hd-link">Avaliações</a>
        <a href="#contato" class="hd-link">Contato</a>
      </nav>
      <div class="hd-actions">
        <button class="hd-ghost" id="hd-solicitar">Solicitar atendimento</button>
        <a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-whatsapp" id="hd-whats">
          ${icon('message-circle', 18)}<span>WhatsApp</span>
        </a>
      </div>
      <button class="hd-burger" id="hd-burger" aria-label="Menu" aria-expanded="false">
        ${icon('menu', 26)}
      </button>
    </div>
    <div class="hd-mobile" id="hd-mobile">
      <div class="wrap">
        <a href="#atendimento" class="hd-mlink">Atendimento</a>
        <a href="#servicos" class="hd-mlink">Serviços</a>
        <a href="#diferenciais" class="hd-mlink">Diferenciais</a>
        <a href="#faq" class="hd-mlink">FAQ</a>
        <a href="#avaliacoes" class="hd-mlink">Avaliações</a>
        <a href="#contato" class="hd-mlink">Contato</a>
        <div class="hd-mactions">
          <button class="btn btn-outline btn-full" id="hd-m-solicitar">Solicitar atendimento</button>
          <a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-full" id="hd-m-whats">
            ${icon('message-circle', 18)}<span>Chamar no WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </header>`;
}

function renderHero() {
  return `
  <section class="hero" id="top">
    <span class="hero-glow"></span>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <div class="reveal">${eyebrow('Suporte técnico especializado')}</div>
        <div class="reveal" style="transition-delay:60ms">
          <h1 class="h-display">Suporte técnico em informática com atendimento <span class="grad-text">em domicílios e empresas</span></h1>
        </div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="lead">Atendimento personalizado para assistência em computadores de mesa (desktops), notebooks e impressoras – com suporte especializado e atenção aos detalhes.</p>
        </div>
        <div class="reveal" style="transition-delay:180ms">
          <div class="hero-cta">
            <a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg hero-whats">
              ${icon('message-circle', 18)}<span>Chamar no WhatsApp</span>
            </a>
            <button class="btn btn-ghost-light btn-lg hero-solicitar">
              ${icon('calendar-check', 18)}<span>Solicitar atendimento</span>
            </button>
          </div>
        </div>
      </div>
      <div class="reveal hero-media" style="transition-delay:160ms">
        ${photo('assets/photos/bench-gamer.png', 'Montagem gamer concluída na nossa bancada técnica.', 'hero-photo')}
      </div>
    </div>
  </section>`;
}

function renderServiceModel() {
  return `
  <section class="section" id="atendimento">
    <div class="wrap model-grid">
      <div class="model-copy">
        <div class="reveal">${eyebrow('Como funciona')}</div>
        <div class="reveal" style="transition-delay:60ms">
          <h2 class="h2">Um modelo de atendimento mais próximo e organizado</h2>
        </div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="body-txt" style="margin-top:18px">Trabalhamos com atendimento técnico em domicílio, empresas e assistência especializada com horário agendado.</p>
        </div>
        <div class="reveal" style="transition-delay:160ms">
          <p class="body-txt" style="margin-top:14px">Nosso foco é trazer mais praticidade e atenção em cada atendimento, buscando resolver o máximo possível diretamente no local. Serviços que exigem testes avançados ou reparos específicos são realizados em nossa bancada técnica.</p>
        </div>
        <div class="reveal" style="transition-delay:210ms">
          ${photo('assets/photos/desk-tower.png', 'Equipamentos atendidos no local e na bancada técnica.', '')}
        </div>
      </div>
      <div class="model-cards">
        ${MODEL.map((m, i) => `
          <div class="reveal" style="transition-delay:${i*70}ms">
            <div class="card">
              ${itile(m.icon, m.tone)}
              <h3 class="h3" style="margin-top:16px;margin-bottom:8px">${m.title}</h3>
              <p class="body-txt">${m.text}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderServices() {
  return `
  <section class="section petrol" id="servicos" style="position:relative;overflow:hidden">
    <span class="svc-glow"></span>
    <div class="wrap" style="position:relative">
      <div class="head center" style="margin-bottom:52px">
        <div class="reveal">${eyebrow('Serviços')}</div>
        <div class="reveal" style="transition-delay:60ms"><h2 class="h2">Serviços especializados</h2></div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="lead">Soluções completas para computadores de mesa (desktops), notebooks e impressoras – com organização e atenção aos detalhes em cada atendimento.</p>
        </div>
      </div>
      <div class="grid g-4">
        ${SERVICES.map((s, i) => `
          <div class="reveal" style="transition-delay:${(i%4)*70}ms">
            <div class="card-dark">
              ${itile(s.icon, s.tone, true)}
              <h3 class="h3">${s.title}</h3>
              <p class="body-txt">${s.text}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderDifferentials() {
  return `
  <section class="section paper" id="diferenciais">
    <div class="wrap diff-grid">
      <div class="diff-head">
        <div class="reveal">${eyebrow('Diferenciais')}</div>
        <div class="reveal" style="transition-delay:60ms"><h2 class="h2">Por que escolher a Atualize?</h2></div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="lead">Mais do que resolver problemas, entregamos uma experiência de suporte confiável, próxima e organizada.</p>
        </div>
        <div class="reveal" style="transition-delay:160ms">
          <div class="diff-cta">
            <span class="rule-grad"></span>
            <span class="diff-cta-txt">Atendimento humano, do primeiro contato à entrega.</span>
          </div>
        </div>
      </div>
      <div class="diff-list">
        ${DIFFS.map((d, i) => `
          <div class="reveal" style="transition-delay:${(i%2)*80}ms">
            <div class="diff-item">
              ${itile(d.icon, d.tone)}
              <div>
                <h3 class="h3">${d.title}</h3>
                <p class="body-txt" style="margin-top:6px;font-size:15px">${d.text}</p>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderFAQ() {
  return `
  <section class="section" id="faq">
    <div class="wrap">
      <div class="head center" style="margin-bottom:52px">
        <div class="reveal">${eyebrow('Perguntas frequentes')}</div>
        <div class="reveal" style="transition-delay:60ms"><h2 class="h2">Dúvidas comuns</h2></div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="lead">Tudo o que você precisa saber antes de contratar um atendimento.</p>
        </div>
      </div>
      <div class="faq-list reveal" style="transition-delay:120ms">
        ${FAQS.map((f, i) => `
          <div class="faq-item" id="faq-${i}">
            <button class="faq-btn" aria-expanded="false" aria-controls="faq-body-${i}">
              <span class="faq-q">${f.q}</span>
              <span class="faq-ico">${icon('plus', 20)}</span>
            </button>
            <div class="faq-body" id="faq-body-${i}" hidden>
              <p class="faq-ans">${f.a}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderReviews() {
  return `
  <section class="section" id="avaliacoes">
    <div class="wrap">
      <div class="rev-top">
        <div class="rev-head">
          <div class="reveal">${eyebrow('Avaliações')}</div>
          <div class="reveal" style="transition-delay:60ms"><h2 class="h2">O que dizem nossos clientes</h2></div>
          <div class="reveal" style="transition-delay:120ms"><p class="lead">Confiança construída atendimento após atendimento.</p></div>
        </div>
        <div class="reveal" style="transition-delay:120ms">
          <div class="rev-score">
            <div class="rev-score-num">5,0</div>
            <div>
              ${stars(5)}
              <div class="rev-score-sub">Avaliação média · clientes verificados</div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid g-3" style="margin-top:44px">
        ${REVIEWS.map((r, i) => `
          <div class="reveal" style="transition-delay:${i*80}ms">
            <div class="card rev-card">
              <div class="rev-person">
                <span class="rev-avatar${r.tone==='lime'?' lime':''}">${r.initials}</span>
                <div>
                  <div class="rev-name">${r.name}</div>
                  <div class="rev-when">${r.when}</div>
                </div>
                <span class="rev-verified" title="Avaliação verificada">${icon('badge-check', 18)}</span>
              </div>
              ${stars(5)}
              <p class="body-txt" style="margin-top:12px;font-size:15px">${r.text}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function renderGallery() {
  return `
  <section class="section paper" id="ambiente">
    <div class="wrap">
      <div class="head center" style="margin-bottom:48px">
        <div class="reveal">${eyebrow('Nossos trabalhos')}</div>
        <div class="reveal" style="transition-delay:60ms"><h2 class="h2">Montagens, upgrades e manutenções</h2></div>
        <div class="reveal" style="transition-delay:120ms">
          <p class="lead">Cada equipamento entregue com cuidado, organização e testes — do gamer ao computador do dia a dia.</p>
        </div>
      </div>
      <div class="reveal" style="transition-delay:120ms">
        <div class="bento">
          ${GALLERY.map(w => `<div class="photo ${w.cls}"><img src="${w.src}" alt="${w.cap}" loading="lazy"><div class="photo-cap">${w.cap}</div></div>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function renderFinalCTA() {
  return `
  <section class="cta-sec" id="contato">
    <div class="wrap-narrow">
      <div class="reveal">
        <div class="cta-panel">
          <span class="cta-glow"></span>
          <div class="cta-inner">
            ${eyebrow('Fale com a gente')}
            <h2 class="h2" style="font-size:clamp(30px,4vw,44px)">Precisa de suporte técnico?</h2>
            <p class="lead" style="margin:16px auto 0;max-width:520px">
              Atendimento especializado em domicílio, empresas e assistência técnica com horário agendado.
            </p>
            <div class="cta-btns">
              <a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg cta-whats">
                ${icon('message-circle', 18)}<span>Chamar no WhatsApp</span>
              </a>
              <a href="${IG_URL}" target="_blank" rel="noopener" class="btn btn-grad btn-lg">
                ${icon('instagram', 18)}<span>Instagram</span>
              </a>
            </div>
            <div class="cta-info">
              <a class="cta-info-item" href="${WA_URL}" target="_blank" rel="noopener">
                ${icon('phone', 18)} (62) 99511-8380
              </a>
              <span class="cta-info-sep"></span>
              <a class="cta-info-item" href="${IG_URL}" target="_blank" rel="noopener">
                ${icon('instagram', 18)} @atualize.solucoestecnologicas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderFooter() {
  const year = new Date().getFullYear();
  return `
  <footer class="ft">
    <div class="wrap ft-grid">
      <div class="ft-brand">
        <a class="ft-logo" href="#top">
          <img src="assets/logo-mark.png" alt="Atualize logo">
          <span class="ft-wm">ATUALIZE</span>
        </a>
        <p class="ft-slogan">Assistência especializada em computadores e suporte personalizado em hardware.</p>
        <div class="ft-social">
          <a class="ft-soc" href="${WA_URL}" target="_blank" rel="noopener" aria-label="WhatsApp">
            ${icon('message-circle', 19)}
          </a>
          <a class="ft-soc" href="${IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">
            ${icon('instagram', 19)}
          </a>
        </div>
      </div>
      <div>
        <div class="ft-h">Navegação</div>
        ${FOOTER_LINKS.map(l => `<a class="ft-link" href="${l.href}">${l.label}</a>`).join('')}
      </div>
      <div>
        <div class="ft-h">Contato</div>
        <div class="ft-row">${icon('phone', 16)} (62) 99511-8380</div>
        <div class="ft-row">${icon('instagram', 16)} @atualize.solucoestecnologicas</div>
        <div class="ft-row">${icon('calendar-clock', 16)} Atendimento com horário agendado</div>
        <div class="ft-row">${icon('map-pin', 16)} Goiânia e região</div>
      </div>
    </div>
    <div class="wrap ft-bottom">
      <span>© ${year} Atualize Soluções Tecnológicas.</span>
      <span>Suporte técnico · Domicílio · Empresas · Assistência</span>
    </div>
  </footer>`;
}

function renderModal() {
  return `
  <div class="modal-overlay hidden" id="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
    <div class="modal" id="modal">
      <button class="modal-x" id="modal-close" aria-label="Fechar">${icon('x', 20)}</button>

      <div id="modal-form-view">
        <span class="modal-icon">${icon('calendar-check', 26)}</span>
        <h2 class="modal-title" id="modal-title">Solicitar atendimento</h2>
        <p class="modal-sub">Conte rapidamente o que você precisa. Retornamos pelo WhatsApp para agendar.</p>
        <form class="form" id="modal-form" novalidate>
          <div class="field">
            <label for="f-name">Nome</label>
            <input id="f-name" type="text" required placeholder="Seu nome">
          </div>
          <div class="field">
            <label for="f-phone">WhatsApp</label>
            <input id="f-phone" type="tel" required placeholder="(62) 90000-0000">
          </div>
          <div class="field">
            <label for="f-type">Tipo de atendimento</label>
            <select id="f-type">
              <option>Atendimento em domicílio</option>
              <option>Atendimento empresarial</option>
              <option>Assistência especializada</option>
              <option>Montagem gamer</option>
            </select>
          </div>
          <div class="field">
            <label for="f-msg">Como podemos ajudar?</label>
            <textarea id="f-msg" rows="3" placeholder="Descreva o problema ou serviço"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-lg btn-full">Enviar solicitação</button>
        </form>
      </div>

      <div id="modal-done-view" style="display:none" class="form-done">
        <span class="modal-icon">${icon('check', 28)}</span>
        <h2 class="modal-title">Solicitação enviada!</h2>
        <p class="modal-sub">Recebemos seu pedido. Para agilizar, fale com a gente agora pelo WhatsApp.</p>
        <a href="${WA_URL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-lg" onclick="closeModal()">
          ${icon('message-circle', 18)}<span>Chamar no WhatsApp</span>
        </a>
      </div>
    </div>
  </div>

  <div class="toast" id="toast">
    ${icon('message-circle', 18)} Abrindo o WhatsApp da Atualize…
  </div>`;
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  app.innerHTML =
    renderHeader() +
    '<main>' +
      renderHero() +
      renderServiceModel() +
      renderServices() +
      renderDifferentials() +
      renderFAQ() +
      renderReviews() +
      renderGallery() +
      renderFinalCTA() +
    '</main>' +
    renderFooter() +
    renderModal();

  // ── Header scroll ──────────────────────────────────────────
  const hd = document.getElementById('hd');
  const setScrolled = () => {
    hd.classList.toggle('scrolled', window.scrollY > 24);
  };
  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  // ── Mobile menu ────────────────────────────────────────────
  const burger = document.getElementById('hd-burger');
  const mobileMenu = document.getElementById('hd-mobile');
  let menuOpen = false;
  function toggleMenu(force) {
    menuOpen = force !== undefined ? force : !menuOpen;
    burger.setAttribute('aria-expanded', menuOpen);
    burger.innerHTML = icon(menuOpen ? 'x' : 'menu', 26);
    mobileMenu.classList.toggle('open', menuOpen);
  }
  burger.addEventListener('click', () => toggleMenu());
  mobileMenu.querySelectorAll('.hd-mlink').forEach(l => l.addEventListener('click', () => toggleMenu(false)));

  // ── WhatsApp toast ─────────────────────────────────────────
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  // ── Modal ──────────────────────────────────────────────────
  const overlay = document.getElementById('modal-overlay');
  const modalForm = document.getElementById('modal-form-view');
  const modalDone = document.getElementById('modal-done-view');

  function openModal() {
    modalForm.style.display = '';
    modalDone.style.display = 'none';
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('f-name').focus();
  }
  window.closeModal = function() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  };
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  document.getElementById('modal-form').addEventListener('submit', (e) => {
    e.preventDefault();
    modalForm.style.display = 'none';
    modalDone.style.display = '';
  });

  // ── Wire buttons ───────────────────────────────────────────
  document.getElementById('hd-solicitar').addEventListener('click', openModal);
  document.getElementById('hd-m-solicitar').addEventListener('click', () => { toggleMenu(false); openModal(); });

  document.querySelectorAll('.hero-whats, .cta-whats').forEach(el => {
    el.addEventListener('click', () => showToast());
  });
  document.querySelectorAll('#hd-whats, #hd-m-whats, .ft-soc[aria-label="WhatsApp"]').forEach(el => {
    el.addEventListener('click', () => showToast());
  });
  document.querySelectorAll('.hero-solicitar').forEach(el => {
    el.addEventListener('click', openModal);
  });

  // ── FAQ accordion ─────────────────────────────────────────
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // close all
      document.querySelectorAll('.faq-btn').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        b.querySelector('.faq-ico').innerHTML = icon('plus', 20);
        document.getElementById(b.getAttribute('aria-controls')).hidden = true;
      });
      if (!expanded) {
        btn.setAttribute('aria-expanded', 'true');
        btn.querySelector('.faq-ico').innerHTML = icon('minus', 20);
        document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  // ── Scroll reveal ──────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObserver.unobserve(e.target); } }),
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
});

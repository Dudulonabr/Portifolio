/* ============================================
   EDUARDO LONA PORTFOLIO — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursorGlow();
  initScrollProgress();
  initHeader();
  initMobileNav();
  initReveal();
  initTypedText();
  initCounters();
  initSkillBars();
  initSoftSkills();
  initContactForm();
  initHeroCanvas();
  initActiveNav();
});

/* ---- Preloader ---- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  });
}

/* ---- Cursor Glow ---- */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (window.matchMedia('(pointer: coarse)').matches) {
    glow.style.display = 'none';
    return;
  }
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
  });
  function animate() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top = cy + 'px';
    requestAnimationFrame(animate);
  }
  animate();
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ---- Header ---- */
function initHeader() {
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Nav ---- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Reveal on Scroll ---- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ---- Typed Text ---- */
function initTypedText() {
  const el = document.getElementById('typed-text');
  const roles = [
    'Desenvolvedor Full Stack em formação',
    'Técnico de Informática & Suporte',
    'Entusiasta de Segurança da Informação',
    'Estudante de ADS & Eng. de Software',
    'Resolvedor de problemas · EL'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const current = roles[roleIndex];
    if (!deleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 55);
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 30);
    }
  }
  type();
}

/* ---- Counters ---- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 40);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---- Skill Bars ---- */
function initSkillBars() {
  const items = document.querySelectorAll('.skill-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const level = entry.target.dataset.level;
      const fill = entry.target.querySelector('.skill-fill');
      if (fill) fill.style.width = level + '%';
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  items.forEach(item => observer.observe(item));
}

/* ---- Soft Skills ---- */
const softData = {
  foco: {
    title: 'Foco & Disciplina',
    text: 'Estudo duas faculdades em paralelo enquanto trabalho como técnico freelancer. Mantenho rotina de estudos diários, projetos práticos e cursos online — disciplina é o que transforma curiosidade em competência.'
  },
  analitico: {
    title: 'Raciocínio Analítico',
    text: 'Antes de trocar uma peça ou escrever uma linha de código, diagnostico a causa raiz. Essa abordagem me rendeu alto índice de resolução no suporte e evita retrabalho em projetos.'
  },
  comunicacao: {
    title: 'Comunicação Clara',
    text: 'No suporte, aprendi a traduzir "driver corrompido" para "programa que faz o mouse funcionar". Essa habilidade é essencial para trabalhar em equipe e apresentar soluções técnicas.'
  },
  organizacao: {
    title: 'Organização & Planejamento',
    text: 'Uso Excel avançado, planilhas e ferramentas de IA para organizar estudos, clientes e entregas. Planejo antes de executar — seja montando um PC ou estruturando um site.'
  },
  autodidata: {
    title: 'Autodidatismo',
    text: 'Cursos Danki Code, Udemy, Cisco, projetos no GitHub — a maior parte do meu conhecimento veio da iniciativa própria. Aprendo rápido e aplico na prática imediatamente.'
  },
  empatia: {
    title: 'Empatia & Escuta Ativa',
    text: 'Cada cliente chega frustrado com um problema. Escuto com calma, entendo a urgência e resolvo com paciência. Empatia gera confiança — e confiança gera resultados.'
  },
  proatividade: {
    title: 'Proatividade',
    text: 'Não espero problemas aparecerem — faço manutenção preventiva, sugiro upgrades e busco certificações por conta própria. Antecipo necessidades antes que virem crises.'
  },
  equipe: {
    title: 'Trabalho em Equipe',
    text: 'Projetos escolares no SENAC, atendimento a clientes diversos e objetivo de integrar equipes de dev — sei colaborar, dividir tarefas e comunicar progresso de forma transparente.'
  }
};

function initSoftSkills() {
  const chips = document.querySelectorAll('.soft-chip');
  const desc = document.getElementById('soft-desc');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const key = chip.dataset.soft;
      const data = softData[key];
      if (!data) return;

      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      desc.textContent = data.text;
    });
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfólio — Mensagem de ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    window.location.href = `mailto:dudulona07@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* ---- Active Nav ---- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ---- Hero Canvas Particles ---- */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let w, h;
  let animId;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.offsetWidth;
      this.y = Math.random() * canvas.offsetHeight;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.offsetWidth || this.y < 0 || this.y > canvas.offsetHeight) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = Array.from({ length: 60 }, () => new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    animId = requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    init();
    animate();
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(animId);
    canvas.style.display = 'none';
  }
}

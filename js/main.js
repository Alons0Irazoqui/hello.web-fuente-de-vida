/* ══════════════════════════════════════════════════════════════
   FUENTE DE VIDA NUEVA AC — main.js
   Preloader · Navbar · Reveal · Contadores · Typewriter · Partículas
   FAQ · Formulario WhatsApp · Marquee · Parallax
═══════════════════════════════════════════════════════════════ */
(function(){
  'use strict';

  var WHATSAPP_NUMBER = '525558387066'; // 55 5838 7066

  /* ---------- Utilidades ---------- */
  function ready(fn){
    if(document.readyState !== 'loading'){ fn(); }
    else{ document.addEventListener('DOMContentLoaded', fn); }
  }
  function prefersReducedMotion(){
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ══════════════════════════════════════════════════════════
     PRELOADER — transición de entrada impactante
  ══════════════════════════════════════════════════════════ */
  document.documentElement.classList.add('is-loading');
  document.body.classList.add('loading');

  var MIN_LOADER_MS = 2200;
  var loadStart = Date.now();

  window.addEventListener('load', function(){
    var elapsed = Date.now() - loadStart;
    var wait = Math.max(0, MIN_LOADER_MS - elapsed);
    setTimeout(function(){
      var loader = document.getElementById('loader');
      if(!loader) return;
      loader.classList.add('loader-hide');
      document.body.classList.remove('loading');
      setTimeout(function(){
        loader.setAttribute('aria-hidden','true');
        loader.style.display = 'none';
        document.body.classList.add('page-revealed');
        startHeroSequence();
      }, 1250);
    }, wait);
  });

  /* Fallback: si "load" tarda demasiado (imágenes externas), no dejar al usuario bloqueado */
  setTimeout(function(){
    var loader = document.getElementById('loader');
    if(loader && !loader.classList.contains('loader-hide')){
      loader.classList.add('loader-hide');
      document.body.classList.remove('loading');
      setTimeout(function(){ loader.style.display='none'; startHeroSequence(); }, 1250);
    }
  }, 6000);

  /* ══════════════════════════════════════════════════════════
     NAVBAR — scroll state, menú móvil, link activo
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var navbar = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var mobMenu = document.getElementById('mob-menu');
    var backdrop = document.getElementById('menu-backdrop');

    function onScroll(){
      if(window.scrollY > 40){ navbar.classList.add('scrolled'); }
      else{ navbar.classList.remove('scrolled'); }
      updateScrollProgress();
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    function openMenu(){
      mobMenu.classList.add('open');
      backdrop.classList.add('show');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded','true');
      document.body.classList.add('lock-scroll');
    }
    function closeMenu(){
      mobMenu.classList.remove('open');
      backdrop.classList.remove('show');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
      document.body.classList.remove('lock-scroll');
    }
    hamburger.addEventListener('click', function(){
      if(mobMenu.classList.contains('open')) closeMenu(); else openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    mobMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', closeMenu);
    });

    /* Link activo según sección visible */
    var navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    var sections = [];
    navLinks.forEach(function(link){
      var id = link.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if(sec) sections.push({id:id, el:sec, link:link});
    });
    if('IntersectionObserver' in window && sections.length){
      var navObs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          var item = sections.find(function(s){ return s.el === entry.target; });
          if(!item) return;
          if(entry.isIntersecting){
            navLinks.forEach(function(l){ l.classList.remove('active'); });
            item.link.classList.add('active');
          }
        });
      }, {rootMargin:'-45% 0px -50% 0px'});
      sections.forEach(function(s){ navObs.observe(s.el); });
    }
  });

  /* Barra de progreso de scroll */
  function updateScrollProgress(){
    var bar = document.getElementById('scroll-progress');
    if(!bar) return;
    var h = document.documentElement;
    var scrolled = (h.scrollTop || document.body.scrollTop);
    var height = h.scrollHeight - h.clientHeight;
    var pct = height > 0 ? (scrolled/height)*100 : 0;
    bar.style.width = pct + '%';
  }

  /* ══════════════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var revealEls = document.querySelectorAll('.reveal, .word-reveal');
    if(!('IntersectionObserver' in window) || prefersReducedMotion()){
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ obs.observe(el); });
  });

  /* Prepara títulos con efecto de palabras (word-reveal) */
  ready(function(){
    document.querySelectorAll('[data-word-reveal]').forEach(function(el){
      var text = el.textContent.trim();
      var words = text.split(/\s+/);
      el.innerHTML = words.map(function(w,i){
        return '<span style="transition-delay:'+(i*45)+'ms">'+w+'&nbsp;</span>';
      }).join('');
      el.classList.add('word-reveal');
    });
  });

  /* ══════════════════════════════════════════════════════════
     CONTADORES (stats)
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var counters = document.querySelectorAll('.stat-num[data-count]');
    if(!counters.length) return;

    function animateCounter(el){
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1900;
      var startTime = null;

      if(prefersReducedMotion()){
        el.textContent = target + suffix;
        return;
      }

      function step(ts){
        if(!startTime) startTime = ts;
        var progress = Math.min((ts - startTime)/duration, 1);
        var eased = 1 - Math.pow(1-progress, 3);
        var current = Math.floor(eased * target);
        el.innerHTML = current + (suffix ? '<span class="suf">'+suffix+'</span>' : '');
        if(progress < 1){ requestAnimationFrame(step); }
        else{ el.innerHTML = target + (suffix ? '<span class="suf">'+suffix+'</span>' : ''); }
      }
      requestAnimationFrame(step);
    }

    if('IntersectionObserver' in window){
      var cObs = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCounter(entry.target);
            cObs.unobserve(entry.target);
          }
        });
      }, {threshold:0.5});
      counters.forEach(function(c){ cObs.observe(c); });
    } else {
      counters.forEach(animateCounter);
    }
  });

  /* ══════════════════════════════════════════════════════════
     HERO — typewriter + parallax suave
  ══════════════════════════════════════════════════════════ */
  function startHeroSequence(){
    var badge = document.querySelector('[data-typewriter]');
    if(badge && !prefersReducedMotion()){
      var full = badge.getAttribute('data-typewriter');
      badge.textContent = '';
      var cursor = document.createElement('span');
      cursor.className = 'type-cursor';
      var i = 0;
      function typeChar(){
        if(i <= full.length){
          badge.textContent = full.slice(0,i);
          badge.appendChild(cursor);
          i++;
          setTimeout(typeChar, 34);
        } else {
          setTimeout(function(){ cursor.remove(); }, 1400);
        }
      }
      setTimeout(typeChar, 200);
    } else if(badge){
      badge.textContent = badge.getAttribute('data-typewriter');
    }
  }

  /* Parallax sutil de las rays / grid con el mouse */
  ready(function(){
    var hero = document.getElementById('hero');
    var grid = document.querySelector('.hero-grid');
    var rays = document.querySelector('.hero-rays');
    if(!hero || prefersReducedMotion()) return;
    hero.addEventListener('mousemove', function(e){
      var x = (e.clientX / window.innerWidth - .5) * 2;
      var y = (e.clientY / window.innerHeight - .5) * 2;
      if(grid) grid.style.transform = 'translate('+(x*10)+'px,'+(y*10)+'px)';
      if(rays) rays.style.transform = 'translate('+(x*-14)+'px,'+(y*-8)+'px)';
    });
  });

  /* ══════════════════════════════════════════════════════════
     MARQUEE — genera contenido duplicado para loop infinito
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var marquee = document.getElementById('marquee');
    if(!marquee) return;
    var words = ['Cuerpo','Mente','Espíritu','Disciplina','Propósito','Esperanza','Transformación','Comunidad','20 años de experiencia'];
    var html = words.map(function(w){ return '<span><i class="fa-solid fa-circle"></i>'+w+'</span>'; }).join('');
    marquee.innerHTML = html + html;
  });

  /* ══════════════════════════════════════════════════════════
     PARTÍCULAS — canvas en hero + capas flotantes en secciones
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var canvas = document.getElementById('hero-canvas');
    if(canvas && !prefersReducedMotion()){
      var ctx = canvas.getContext('2d');
      var particles = [];
      var W, H;

      function resize(){
        W = canvas.width = canvas.offsetWidth;
        H = canvas.height = canvas.offsetHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      var COUNT = window.innerWidth < 700 ? 28 : 60;
      for(var i=0;i<COUNT;i++){
        particles.push({
          x: Math.random()*W,
          y: Math.random()*H,
          r: Math.random()*1.8 + .6,
          vy: Math.random()*.35 + .08,
          vx: (Math.random()-.5)*.15,
          o: Math.random()*.5 + .15
        });
      }

      function draw(){
        ctx.clearRect(0,0,W,H);
        particles.forEach(function(p){
          p.y -= p.vy;
          p.x += p.vx;
          if(p.y < -10){ p.y = H+10; p.x = Math.random()*W; }
          ctx.beginPath();
          ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
          ctx.fillStyle = 'rgba(201,162,39,'+p.o+')';
          ctx.fill();
        });
        requestAnimationFrame(draw);
      }
      draw();
    }

    /* Capas de partículas DOM en secciones clave */
    function spawnParticles(container, count, color){
      if(prefersReducedMotion()) return;
      var layer = document.createElement('div');
      layer.className = 'particle-layer';
      for(var i=0;i<count;i++){
        var p = document.createElement('span');
        p.className = 'particle';
        var size = (Math.random()*5+3).toFixed(1)+'px';
        p.style.setProperty('--p-left', (Math.random()*100)+'%');
        p.style.setProperty('--p-size', size);
        p.style.setProperty('--p-dur', (Math.random()*10+10).toFixed(1)+'s');
        p.style.setProperty('--p-delay', (Math.random()*10).toFixed(1)+'s');
        p.style.setProperty('--p-drift', ((Math.random()-.5)*80).toFixed(0)+'px');
        p.style.setProperty('--p-op', (Math.random()*.35+.2).toFixed(2));
        if(color) p.style.setProperty('--p-color', color);
        layer.appendChild(p);
      }
      container.appendChild(layer);
    }

    var admision = document.getElementById('admision');
    if(admision){ admision.style.position = admision.style.position || 'relative'; spawnParticles(admision, 22, '#C9A227'); }
    var stats = document.getElementById('compromisos');
    if(stats){ var sg = stats.querySelector('.stats-grid'); if(sg) spawnParticles(sg, 16, '#5DA9E9'); }
    var contacto = document.getElementById('contacto');
    if(contacto){ spawnParticles(contacto, 18, '#E8935B'); }
  });

  /* ══════════════════════════════════════════════════════════
     FAQ ACORDEÓN
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var items = document.querySelectorAll('.faq-item');
    items.forEach(function(item){
      var btn = item.querySelector('.faq-q');
      var panel = item.querySelector('.faq-a');
      btn.addEventListener('click', function(){
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        items.forEach(function(other){
          other.querySelector('.faq-q').setAttribute('aria-expanded','false');
          other.querySelector('.faq-a').style.maxHeight = null;
        });
        if(!isOpen){
          btn.setAttribute('aria-expanded','true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  });

  /* ══════════════════════════════════════════════════════════
     FORMULARIO → WHATSAPP (nunca correo, nunca "cargando" infinito)
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var form = document.getElementById('wa-form');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var name = (document.getElementById('f-name')||{}).value || '';
      var relation = (document.getElementById('f-relation')||{}).value || '';
      var phone = (document.getElementById('f-phone')||{}).value || '';
      var msg = (document.getElementById('f-msg')||{}).value || '';

      var lines = [
        'Hola, mi nombre es ' + (name || 'sin especificar') + '.',
        relation ? 'Motivo: ' + relation + '.' : '',
        phone ? 'Mi teléfono de contacto es ' + phone + '.' : '',
        msg ? 'Mensaje: ' + msg : 'Quisiera información sobre el proceso de rehabilitación.'
      ].filter(Boolean).join(' ');

      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines);
      window.open(url, '_blank', 'noopener');
    });
  });

  /* ══════════════════════════════════════════════════════════
     AÑO EN FOOTER
  ══════════════════════════════════════════════════════════ */
  ready(function(){
    var y = document.getElementById('year');
    if(y) y.textContent = new Date().getFullYear();
  });

})();

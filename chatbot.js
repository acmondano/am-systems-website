/* AM Systems Hybrid Chatbot — self-contained widget
   Drop-in: <script src="chatbot.js" defer></script>
   Works on all pages. No external deps. */
(function(){
  if (window.__AMS_CHATBOT__) return; window.__AMS_CHATBOT__ = true;

  var WA = "https://wa.me/639706791242";
  var EMAIL = "amsystemsph@gmail.com";

  /* ---------- STYLES ---------- */
  var css = `
  .wa-float{display:none !important}
  .ams-bot-btn{position:fixed !important;bottom:calc(24px + env(safe-area-inset-bottom,0px)) !important;right:calc(24px + env(safe-area-inset-right,0px)) !important;z-index:2147483646 !important;width:60px !important;height:60px !important;border-radius:50% !important;background:#39FF14 !important;border:none !important;cursor:pointer !important;display:flex !important;align-items:center !important;justify-content:center !important;box-shadow:0 4px 20px rgba(57,255,20,.45) !important;transition:transform .2s,box-shadow .2s;font-family:Inter,system-ui,sans-serif;visibility:visible !important;opacity:1 !important;pointer-events:auto !important;margin:0 !important;padding:0 !important}
  .ams-bot-btn:hover{transform:scale(1.1);box-shadow:0 6px 28px rgba(57,255,20,.6)}
  .ams-bot-btn svg{width:28px;height:28px;fill:#0a0a0a}
  .ams-bot-dot{position:absolute;top:4px;right:4px;width:10px;height:10px;border-radius:50%;background:#ff3b3b;border:2px solid #0a0a0a}
  .ams-bot-panel{position:fixed !important;bottom:calc(96px + env(safe-area-inset-bottom,0px)) !important;right:calc(24px + env(safe-area-inset-right,0px)) !important;z-index:2147483647 !important;width:380px;max-width:calc(100vw - 32px);height:580px;max-height:calc(100vh - 140px);background:#0a0a0a;border:1px solid rgba(57,255,20,.25);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.6),0 0 0 1px rgba(57,255,20,.08);display:none;flex-direction:column;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#fff}
  .ams-bot-panel.open{display:flex;animation:ams-pop .25s ease-out}
  @keyframes ams-pop{from{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:none}}
  .ams-bot-head{padding:16px 18px;background:linear-gradient(135deg,#111 0%,#0a0a0a 100%);border-bottom:1px solid rgba(57,255,20,.15);display:flex;align-items:center;gap:12px}
  .ams-bot-avatar{width:38px;height:38px;border-radius:50%;background:#39FF14;display:flex;align-items:center;justify-content:center;color:#0a0a0a;font-weight:700;font-size:14px;flex-shrink:0}
  .ams-bot-title{font-weight:600;font-size:14px;color:#fff;line-height:1.2}
  .ams-bot-sub{font-size:11px;color:#39FF14;display:flex;align-items:center;gap:5px;margin-top:2px}
  .ams-bot-sub::before{content:"";width:6px;height:6px;border-radius:50%;background:#39FF14;box-shadow:0 0 6px #39FF14}
  .ams-bot-close{margin-left:auto;background:none;border:none;color:#888;cursor:pointer;font-size:22px;line-height:1;padding:4px 8px;border-radius:6px;transition:background .15s}
  .ams-bot-close:hover{background:rgba(255,255,255,.06);color:#fff}
  .ams-bot-body{flex:1;overflow-y:auto;padding:18px;scroll-behavior:smooth}
  .ams-bot-body::-webkit-scrollbar{width:6px}
  .ams-bot-body::-webkit-scrollbar-thumb{background:rgba(57,255,20,.25);border-radius:3px}
  .ams-msg{max-width:86%;padding:10px 14px;border-radius:14px;font-size:13.5px;line-height:1.5;margin-bottom:10px;word-wrap:break-word;animation:ams-in .3s ease-out}
  @keyframes ams-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .ams-msg.bot{background:#161616;border:1px solid rgba(255,255,255,.06);color:#e8e8e8;border-top-left-radius:4px}
  .ams-msg.user{background:#39FF14;color:#0a0a0a;margin-left:auto;border-top-right-radius:4px;font-weight:500}
  .ams-msg strong{color:#39FF14}
  .ams-msg.bot a{color:#39FF14;text-decoration:none;border-bottom:1px dashed #39FF14}
  .ams-opts{display:flex;flex-direction:column;gap:8px;margin:6px 0 14px}
  .ams-opt{background:#0a0a0a;border:1px solid rgba(57,255,20,.3);color:#fff;padding:10px 14px;border-radius:10px;font-size:13px;cursor:pointer;text-align:left;font-family:inherit;transition:all .2s;font-weight:500}
  .ams-opt:hover{background:rgba(57,255,20,.08);border-color:#39FF14;transform:translateX(3px)}
  .ams-typing{display:flex;gap:4px;padding:12px 14px;background:#161616;border-radius:14px;border-top-left-radius:4px;width:fit-content;margin-bottom:10px;border:1px solid rgba(255,255,255,.06)}
  .ams-typing span{width:6px;height:6px;background:#39FF14;border-radius:50%;animation:ams-blink 1.2s infinite}
  .ams-typing span:nth-child(2){animation-delay:.2s}
  .ams-typing span:nth-child(3){animation-delay:.4s}
  @keyframes ams-blink{0%,60%,100%{opacity:.3}30%{opacity:1}}
  .ams-bot-foot{padding:10px 12px;border-top:1px solid rgba(255,255,255,.06);background:#0a0a0a;display:flex;gap:6px;flex-wrap:wrap}
  .ams-quick{background:transparent;border:1px solid rgba(255,255,255,.12);color:#aaa;padding:6px 11px;border-radius:20px;font-size:11px;cursor:pointer;font-family:inherit;transition:all .15s}
  .ams-quick:hover{border-color:#39FF14;color:#39FF14}
  .ams-search{width:100%;background:#111;border:1px solid rgba(57,255,20,.2);color:#fff;padding:10px 12px;border-radius:10px;font-size:13px;font-family:inherit;margin-bottom:10px;outline:none}
  .ams-search:focus{border-color:#39FF14}
  .ams-reco{background:linear-gradient(135deg,rgba(57,255,20,.08),rgba(57,255,20,.02));border:1px solid rgba(57,255,20,.35);border-radius:12px;padding:14px;margin:4px 0 12px}
  .ams-reco h4{margin:0 0 6px;color:#39FF14;font-size:14px;font-weight:600}
  .ams-reco p{margin:0 0 10px;font-size:12.5px;color:#ccc;line-height:1.5}
  .ams-reco-price{font-size:16px;font-weight:700;color:#fff;margin-bottom:10px}
  .ams-reco-btn{display:inline-block;background:#39FF14;color:#0a0a0a;padding:8px 14px;border-radius:8px;font-size:12px;font-weight:600;text-decoration:none;margin-right:6px}
  .ams-reco-btn.alt{background:transparent;color:#39FF14;border:1px solid #39FF14}
  @media(max-width:768px){.ams-bot-btn{width:56px !important;height:56px !important;right:calc(18px + env(safe-area-inset-right,0px)) !important;bottom:calc(18px + env(safe-area-inset-bottom,0px)) !important}.ams-bot-btn svg{width:26px !important;height:26px !important}}
  @media(max-width:500px){.ams-bot-panel{right:12px !important;left:12px !important;width:auto;max-width:none;bottom:calc(84px + env(safe-area-inset-bottom,0px)) !important;height:calc(100vh - 160px);max-height:calc(100vh - 160px)}}
  @media(prefers-reduced-motion:reduce){.ams-bot-panel,.ams-msg,.ams-typing span{animation:none}}
  `;
  var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);

  /* ---------- DOM ---------- */
  document.querySelectorAll('.wa-float').forEach(function(el){ el.remove(); });

  var btn = document.createElement('button');
  btn.className = 'ams-bot-btn';
  btn.setAttribute('aria-label','Open chat');
  btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2zm4-6H7V6h10v2z"/></svg><span class="ams-bot-dot"></span>';
  btn.setAttribute('style',
    'position:fixed !important;' +
    'bottom:calc(20px + env(safe-area-inset-bottom,0px)) !important;' +
    'right:calc(20px + env(safe-area-inset-right,0px)) !important;' +
    'z-index:2147483646 !important;' +
    'width:58px !important;height:58px !important;' +
    'border-radius:50% !important;background:#39FF14 !important;' +
    'border:none !important;cursor:pointer !important;' +
    'display:flex !important;align-items:center !important;justify-content:center !important;' +
    'box-shadow:0 4px 20px rgba(57,255,20,.45) !important;' +
    'visibility:visible !important;opacity:1 !important;pointer-events:auto !important;' +
    'margin:0 !important;padding:0 !important;'
  );
  document.body.appendChild(btn);

  function reassert(){
    if (!document.body.contains(btn)) document.body.appendChild(btn);
    btn.style.setProperty('display','flex','important');
    btn.style.setProperty('visibility','visible','important');
    btn.style.setProperty('opacity','1','important');
    document.querySelectorAll('.wa-float').forEach(function(el){ el.remove(); });
  }
  window.addEventListener('load', reassert);
  window.addEventListener('resize', reassert);
  setTimeout(reassert, 500);
  setTimeout(reassert, 1500);

  var panel = document.createElement('div');
  panel.className = 'ams-bot-panel';
  panel.innerHTML = '<div class="ams-bot-head">' +
    '<div class="ams-bot-avatar">AM</div>' +
    '<div><div class="ams-bot-title">AM Systems Assistant</div>' +
    '<div class="ams-bot-sub">Online \u2022 Replies instantly</div></div>' +
    '<button class="ams-bot-close" aria-label="Close">&times;</button></div>' +
    '<div class="ams-bot-body" id="ams-bot-body"></div>' +
    '<div class="ams-bot-foot">' +
    '<button class="ams-quick" data-act="menu">Main menu</button>' +
    '<button class="ams-quick" data-act="faq">FAQ</button>' +
    '<button class="ams-quick" data-act="human">Talk to human</button></div>';
  document.body.appendChild(panel);

  var body = panel.querySelector('#ams-bot-body');
  var dot  = btn.querySelector('.ams-bot-dot');

  btn.addEventListener('click', function(){
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) { dot.style.display='none'; if(!body.children.length) start(); }
  });
  panel.querySelector('.ams-bot-close').addEventListener('click', function(){ panel.classList.remove('open'); });
  panel.querySelectorAll('.ams-quick').forEach(function(q){
    q.addEventListener('click', function(){
      var a = q.getAttribute('data-act');
      if (a==='menu') start();
      if (a==='faq')  showFAQ();
      if (a==='human') talkHuman();
    });
  });

  /* ---------- HELPERS ---------- */
  function scroll(){ body.scrollTop = body.scrollHeight; }
  function userMsg(t){ var d=document.createElement('div'); d.className='ams-msg user'; d.textContent=t; body.appendChild(d); scroll(); }
  function botMsg(html, cb){
    var typ=document.createElement('div'); typ.className='ams-typing'; typ.innerHTML='<span></span><span></span><span></span>';
    body.appendChild(typ); scroll();
    setTimeout(function(){
      typ.remove();
      var d=document.createElement('div'); d.className='ams-msg bot'; d.innerHTML=html; body.appendChild(d); scroll();
      if(cb) cb();
    }, 550);
  }
  function options(arr, handler){
    var wrap=document.createElement('div'); wrap.className='ams-opts';
    arr.forEach(function(o){
      var b=document.createElement('button'); b.className='ams-opt'; b.textContent=o.label;
      b.addEventListener('click', function(){
        wrap.remove();
        userMsg(o.label);
        handler(o.value);
      });
      wrap.appendChild(b);
    });
    body.appendChild(wrap); scroll();
  }
  function reco(title, desc, price, ctaLabel, ctaHref){
    var d=document.createElement('div'); d.className='ams-reco';
    d.innerHTML='<h4>'+title+'</h4><p>'+desc+'</p><div class="ams-reco-price">'+price+'</div>'+
      '<a class="ams-reco-btn" href="'+ctaHref+'" target="_blank" rel="noopener">'+ctaLabel+'</a>'+
      '<a class="ams-reco-btn alt" href="pricing.html">See pricing</a>';
    body.appendChild(d); scroll();
  }
  function clear(){ body.innerHTML=''; }

  /* ---------- FLOWS ---------- */
  function start(){
    clear();
    botMsg("Hey! I'm the AM Systems assistant. What are you looking for today?", function(){
      options([
        {label:'\ud83c\udf10 Build a website',      value:'web'},
        {label:'\u26a1 Automate my business',  value:'auto'},
        {label:'\ud83c\udfd7\ufe0f Get a full system',    value:'full'},
        {label:'\ud83d\udc40 Just exploring',       value:'explore'}
      ], routeMain);
    });
  }

  function routeMain(v){
    if (v==='web')    return flowWeb();
    if (v==='auto')   return flowAuto();
    if (v==='full')   return flowFull();
    if (v==='explore')return flowExplore();
  }

  function flowWeb(){
    botMsg("Got it \u2014 a website. What kind of site do you need?", function(){
      options([
        {label:'Simple landing page',     value:'landing'},
        {label:'Multi-page business site',value:'multi'},
        {label:'Custom / complex build',  value:'custom'}
      ], function(kind){
        botMsg("Perfect. Do you already have branding (logo, colors, copy)?", function(){
          options([
            {label:'Yes, all ready',   value:'ready'},
            {label:'Partially',        value:'part'},
            {label:'No, starting from scratch', value:'none'}
          ], function(brand){
            var tier, price, desc;
            if (kind==='landing'){ tier='Lead Engine Starter'; price='\u20b130,000 \u2022 1\u20132 weeks'; desc='A high-converting single-page site with lead capture, mobile-optimized and built for speed.'; }
            else if (kind==='multi'){ tier='Lead Engine Growth'; price='\u20b145,000 \u2022 2\u20133 weeks'; desc='Multi-page business site with lead forms, sections for services, portfolio, and contact \u2014 fully responsive.'; }
            else { tier='Lead Engine Full Build'; price='\u20b160,000 \u2022 3\u20134 weeks'; desc='Custom-designed site with animations, CMS, advanced lead capture, and conversion-optimized UX.'; }
            botMsg("Based on that, here's what fits you:", function(){
              reco(tier, desc, price, 'Chat on WhatsApp', WA);
              followUp();
            });
          });
        });
      });
    });
  }

  function flowAuto(){
    botMsg("Nice \u2014 automation saves serious hours. What's eating the most of your time right now?", function(){
      options([
        {label:'Lead capture & follow-up', value:'leads'},
        {label:'Client onboarding / ops',  value:'ops'},
        {label:'Reporting & data entry',   value:'data'}
      ], function(pain){
        botMsg("How big is your team?", function(){
          options([
            {label:'Just me / solo',    value:'solo'},
            {label:'2\u20135 people',        value:'small'},
            {label:'6+ people',         value:'big'}
          ], function(size){
            var tier, price, desc;
            if (size==='solo'){ tier='Sales Engine Starter'; price='\u20b180,000 \u2022 3\u20135 weeks'; desc='Automated lead intake, follow-up sequences, and CRM flow \u2014 built so you stop dropping leads.'; }
            else if (size==='small'){ tier='Sales Engine Growth'; price='\u20b1115,000 \u2022 5\u20137 weeks'; desc='Full sales pipeline automation, multi-channel follow-ups, team dashboards, and client handoff workflows.'; }
            else { tier='Sales Engine Full Build'; price='\u20b1150,000 \u2022 7\u201310 weeks'; desc='Enterprise-grade sales automation with assignments, reporting, and integrations across your stack.'; }
            botMsg("Here's the fit for you:", function(){
              reco(tier, desc, price, 'Chat on WhatsApp', WA);
              followUp();
            });
          });
        });
      });
    });
  }

  function flowFull(){
    botMsg("Let's build you a real system. Which areas of the business need to run on autopilot?", function(){
      options([
        {label:'Operations & workflows',  value:'ops'},
        {label:'CRM + sales + ops',       value:'crm'},
        {label:'Everything \u2014 full OS',    value:'all'}
      ], function(area){
        botMsg("How would you describe your business size?", function(){
          options([
            {label:'Small (under 10 staff)', value:'s'},
            {label:'Medium (10\u201350 staff)',   value:'m'},
            {label:'Large (50+ staff)',      value:'l'}
          ], function(size){
            var tier, price, desc;
            if (area==='ops' || size==='s'){ tier='Business OS Foundation'; price='\u20b1150,000 \u2022 6\u20139 weeks'; desc='Core workflows automated \u2014 task management, internal comms, client ops, and the foundations of a real operating system.'; }
            else if (area==='crm' || size==='m'){ tier='Business OS Full System'; price='\u20b1280,000 \u2022 10\u201314 weeks'; desc='Complete operating system: CRM, sales engine, ops, reporting dashboards, and team workflows \u2014 all connected.'; }
            else { tier='Business OS Enterprise'; price='\u20b1400,000+ \u2022 14\u201320 weeks'; desc='Custom enterprise build \u2014 multi-department workflows, deep integrations, role-based dashboards, and dedicated architecture.'; }
            botMsg("Here's your match:", function(){
              reco(tier, desc, price, 'Chat on WhatsApp', WA);
              followUp();
            });
          });
        });
      });
    });
  }

  function flowExplore(){
    botMsg("No problem \u2014 happy to help you look around. What would you like to do?", function(){
      options([
        {label:'\ud83d\udccb Read FAQ',           value:'faq'},
        {label:'\ud83d\udd0d Search help',        value:'search'},
        {label:'\ud83d\udcac Talk to a human',    value:'human'},
        {label:'\ud83c\udfe0 See main services',  value:'services'}
      ], function(v){
        if (v==='faq') showFAQ();
        if (v==='search') helpSearch();
        if (v==='human') talkHuman();
        if (v==='services'){
          botMsg("We offer three core services: <strong>Lead Engine</strong> (websites & lead capture), <strong>Sales Engine</strong> (sales automation), and <strong>Business OS</strong> (full operating systems). Check out <a href='services.html'>services.html</a> or <a href='pricing.html'>pricing.html</a> for details.", followUp);
        }
      });
    });
  }

  function followUp(){
    setTimeout(function(){
      options([
        {label:'Talk to a human now',  value:'human'},
        {label:'See FAQ',              value:'faq'},
        {label:'Start over',           value:'menu'}
      ], function(v){
        if (v==='human') talkHuman();
        if (v==='faq')   showFAQ();
        if (v==='menu')  start();
      });
    }, 700);
  }

  /* ---------- FAQ / SUPPORT LAYER ---------- */
  var FAQ = [
    {q:"How much does a project cost?", a:"It depends on scope. Lead Engine starts at \u20b130,000, Sales Engine at \u20b180,000, and Business OS at \u20b1150,000. Full pricing is on our <a href='pricing.html'>pricing page</a>."},
    {q:"How long does a project take?", a:"Lead Engine: 1\u20134 weeks. Sales Engine: 3\u201310 weeks. Business OS: 6\u201320 weeks depending on the tier."},
    {q:"Do you work with clients outside the Philippines?", a:"Yes \u2014 we serve clients globally but our pricing is built for the PH market, which means you get custom-grade work at a fraction of US/AU rates."},
    {q:"What's your process?", a:"Four steps: Strategy Call \u2192 System Design \u2192 Build & Automate \u2192 Launch & Optimize. See the full breakdown on our <a href='faq.html'>process page</a>."},
    {q:"Do you offer revisions?", a:"Yes. Every package includes rounds of revisions during the build phase. Scope is locked after the strategy call so expectations stay clear."},
    {q:"Do you offer ongoing support?", a:"Yes \u2014 we offer monthly maintenance plans from \u20b115,000\u2013\u20b150,000/month for updates, monitoring, and continuous optimization."},
    {q:"Can I see past work?", a:"Absolutely. Check our <a href='portfolio.html'>portfolio page</a> for case studies with real metrics and outcomes."},
    {q:"How do we get started?", a:"Easiest path is to book a free strategy call via <a href='"+WA+"' target='_blank'>WhatsApp</a> or email <strong>"+EMAIL+"</strong>. We'll scope the project and send a proposal within 48 hours."}
  ];

  function showFAQ(){
    botMsg("Here are the most common questions. Tap one:", function(){
      var opts = FAQ.map(function(f,i){ return {label:f.q, value:i}; });
      opts.push({label:'\ud83d\udd0d Search help', value:'search'});
      opts.push({label:'\ud83d\udcac Talk to human', value:'human'});
      opts.push({label:'\u2190 Main menu', value:'menu'});
      options(opts, function(v){
        if (v==='search') return helpSearch();
        if (v==='human')  return talkHuman();
        if (v==='menu')   return start();
        botMsg(FAQ[v].a, function(){
          setTimeout(showFAQ, 400);
        });
      });
    });
  }

  function helpSearch(){
    botMsg("Type a keyword (e.g. <em>price</em>, <em>timeline</em>, <em>support</em>) and hit Enter:", function(){
      var input = document.createElement('input');
      input.type='text'; input.className='ams-search'; input.placeholder='Search\u2026';
      body.appendChild(input); input.focus(); scroll();
      input.addEventListener('keydown', function(e){
        if (e.key==='Enter' && input.value.trim()){
          var q = input.value.trim().toLowerCase();
          input.disabled = true;
          userMsg(input.value.trim());
          var hits = FAQ.filter(function(f){ return (f.q+' '+f.a).toLowerCase().indexOf(q) !== -1; });
          if (!hits.length){
            botMsg("No match for that. Try a different keyword, or I can connect you with the team directly.", function(){
              options([
                {label:'Talk to human', value:'h'},
                {label:'Show all FAQ',  value:'f'},
                {label:'Main menu',     value:'m'}
              ], function(v){
                if (v==='h') talkHuman();
                if (v==='f') showFAQ();
                if (v==='m') start();
              });
            });
          } else {
            botMsg("Found "+hits.length+" match"+(hits.length>1?'es':'')+":", function(){
              hits.forEach(function(f){
                botMsg("<strong>"+f.q+"</strong><br>"+f.a);
              });
              setTimeout(followUp, hits.length*600);
            });
          }
        }
      });
    });
  }

  function talkHuman(){
    botMsg("Connecting you with the AM Systems team. You can reach us instantly on WhatsApp or email:", function(){
      var d=document.createElement('div'); d.className='ams-reco';
      d.innerHTML = '<h4>Talk to us directly</h4>'+
        '<p>We usually reply within a few hours during PH business time.</p>'+
        '<a class="ams-reco-btn" href="'+WA+'" target="_blank" rel="noopener">WhatsApp</a>'+
        '<a class="ams-reco-btn alt" href="mailto:'+EMAIL+'">Email</a>';
      body.appendChild(d); scroll();
      setTimeout(function(){
        options([
          {label:'\u2190 Back to menu', value:'m'},
          {label:'See FAQ',        value:'f'}
        ], function(v){ if(v==='m') start(); if(v==='f') showFAQ(); });
      }, 700);
    });
  }
})();

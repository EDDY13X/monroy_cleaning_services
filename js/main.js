
document.addEventListener('DOMContentLoaded', () => {
  // Toggle móvil
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle){
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      menuToggle.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if(menuToggle.classList.contains('active')){
        spans[0].style.transform='rotate(45deg) translate(5px,6px)';
        spans[1].style.opacity='0';
        spans[2].style.transform='rotate(-45deg) translate(6px,-6px)';
      }else{
        spans[0].style.transform='';
        spans[1].style.opacity='1';
        spans[2].style.transform='';
      }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', ()=>{
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform='';spans[1].style.opacity='1';spans[2].style.transform='';
      });
    });
  }

  // Header on scroll
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if(window.scrollY > 8){ navbar.classList.add('scrolled'); }
    else{ navbar.classList.remove('scrolled'); }
  };
  onScroll();
  window.addEventListener('scroll', onScroll);

  // Scroll to top
  const topBtn = document.querySelector('.scroll-to-top');
  if (topBtn){
    window.addEventListener('scroll', () => {
      if(window.scrollY > 320) topBtn.classList.add('show');
      else topBtn.classList.remove('show');
    });
    topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Filtros de galería
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterButtons.length && galleryItems.length){
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          const show = filter === 'all' || item.classList.contains(filter);
          item.style.display = show ? 'block':'none';
          item.style.opacity = show ? '1':'0';
        });
      });
    });
  }

  // Simulación de envío de formulario
  const form = document.querySelector('.contact-form');
  if (form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('name').value || 'Cliente';
      const box = document.createElement('div');
      box.innerHTML = `<h3 style="margin:0 0 6px 0;">¡Mensaje enviado!</h3>
        <p style="margin:0;color:#334155">Gracias por contactarnos, ${name}. Te responderemos a la brevedad.</p>`;
      Object.assign(box.style, {position:'fixed',inset:'auto 0 0 0',margin:'auto',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'#fff',padding:'24px',borderRadius:'16px',boxShadow:'0 20px 60px rgba(2,6,23,.2)',zIndex:'60',textAlign:'center',maxWidth:'420px',width:'92%'});
      const overlay = document.createElement('div');
      Object.assign(overlay.style,{position:'fixed',inset:'0',background:'rgba(2,6,23,.45)',zIndex:'59'});
      overlay.addEventListener('click', ()=>{overlay.remove();box.remove();});
      document.body.appendChild(overlay);document.body.appendChild(box);
      form.reset();
      setTimeout(()=>{overlay.remove();box.remove();}, 3800);
    });
  }
});

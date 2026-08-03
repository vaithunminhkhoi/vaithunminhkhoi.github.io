(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

  const sections = [...document.querySelectorAll('main section[id], header[id]')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const setActiveLink = () => {
    const current = sections.reduce((selected, section) => {
      return window.scrollY + 150 >= section.offsetTop ? section : selected;
    }, sections[0]);
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current?.id}`));
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  const modal = document.querySelector('#product-modal');
  const modalImage = document.querySelector('#modal-image');
  const modalTitle = document.querySelector('#modal-title');
  const modalDesc = document.querySelector('#modal-desc');
  const modalClose = document.querySelector('.modal-close');
  const modalContact = document.querySelector('#modal-contact');

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.dataset.name || 'Sản phẩm';
      modalImage.src = card.dataset.image || '';
      modalImage.alt = `Vải ${name}`;
      modalTitle.textContent = name;
      modalDesc.textContent = card.dataset.desc || '';
      modal.showModal();
    });
  });

  const closeModal = () => modal?.open && modal.close();
  modalClose?.addEventListener('click', closeModal);
  modalContact?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (event) => {
    const rect = modal.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) closeModal();
  });

  const quoteForm = document.querySelector('#quote-form');
  quoteForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const message = [
      'Xin chào Vải Thun Minh Khôi,',
      `Tôi tên: ${data.get('name') || ''}`,
      `Số điện thoại: ${data.get('phone') || ''}`,
      `Loại vải quan tâm: ${data.get('fabric') || ''}`,
      `Nhu cầu: ${data.get('message') || ''}`
    ].join('\n');
    navigator.clipboard?.writeText(message).catch(() => {});
    window.open('https://zalo.me/0901355155', '_blank', 'noopener');
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();

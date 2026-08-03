(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
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
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = [...document.querySelectorAll('header[id], main section[id]')];
  const setActive = () => {
    let current = sections[0];
    sections.forEach((section) => {
      if (window.scrollY + 180 >= section.offsetTop) current = section;
    });
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${current?.id}`));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  const productModal = document.querySelector('#product-modal');
  const modalImage = document.querySelector('#modal-image');
  const modalTitle = document.querySelector('#modal-title');
  const modalDescription = document.querySelector('#modal-description');
  const modalContact = document.querySelector('#modal-contact');

  document.querySelectorAll('.product-card').forEach((card) => {
    card.addEventListener('click', () => {
      modalImage.src = card.dataset.image || '';
      modalImage.alt = `Vải ${card.dataset.title || ''}`;
      modalTitle.textContent = card.dataset.title || 'Sản phẩm';
      modalDescription.textContent = card.dataset.description || '';
      productModal?.showModal();
    });
  });

  const closeDialog = (dialog) => {
    if (dialog?.open) dialog.close();
  };
  document.querySelector('.product-modal .modal-close')?.addEventListener('click', () => closeDialog(productModal));
  modalContact?.addEventListener('click', () => closeDialog(productModal));
  productModal?.addEventListener('click', (event) => {
    const rect = productModal.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) closeDialog(productModal);
  });

  const imageModal = document.querySelector('#image-modal');
  const zoomImage = document.querySelector('#zoom-image');
  document.querySelectorAll('[data-zoom]').forEach((button) => {
    button.addEventListener('click', () => {
      zoomImage.src = button.dataset.zoom || '';
      imageModal?.showModal();
    });
  });
  document.querySelector('.image-modal-close')?.addEventListener('click', () => closeDialog(imageModal));
  imageModal?.addEventListener('click', (event) => {
    const rect = imageModal.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) closeDialog(imageModal);
  });

  document.querySelector('#year').textContent = new Date().getFullYear();
})();

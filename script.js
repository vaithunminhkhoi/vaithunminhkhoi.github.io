const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
menuBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('show');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const modal=document.querySelector('.modal');
const modalTitle=document.querySelector('#modal-title');
const modalDesc=document.querySelector('.modal-desc');
const modalMain=document.querySelector('.modal-main-image');
const modalThumbs=document.querySelector('.modal-thumbs');
const modalClose=document.querySelector('.modal-close');
let lastTrigger=null;

function setModalImage(src,button){modalMain.src=src;modalThumbs.querySelectorAll('button').forEach(b=>b.classList.remove('active'));button?.classList.add('active');}
function openModal(card){lastTrigger=card.querySelector('.product-open');const images=card.dataset.gallery.split(',');modalTitle.textContent=card.dataset.title;modalDesc.textContent=card.dataset.desc;modalThumbs.innerHTML='';images.forEach((src,index)=>{const btn=document.createElement('button');btn.type='button';btn.innerHTML=`<img src="${src}" alt="Ảnh ${card.dataset.title} ${index+1}">`;btn.addEventListener('click',()=>setModalImage(src,btn));modalThumbs.appendChild(btn);if(index===0)setModalImage(src,btn);});modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');modalClose.focus();}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');lastTrigger?.focus();}
document.querySelectorAll('.product-card').forEach(card=>card.querySelector('.product-open').addEventListener('click',()=>openModal(card)));
modalClose?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
modal?.querySelector('a[href="#lien-he"]')?.addEventListener('click',closeModal);

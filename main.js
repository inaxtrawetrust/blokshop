// ===== PIXEL BLOCK RAIN =====
function initPixelRain() {
  const container = document.querySelector('.pixel-rain');
  if (!container) return;

  const blockTypes = ['netherite', 'iron', 'emerald', 'diamond', 'gold'];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const block = document.createElement('div');
    block.classList.add('pixel-block', blockTypes[Math.floor(Math.random() * blockTypes.length)]);

    const size = 16 + Math.floor(Math.random() * 16);
    const left = Math.random() * 100;
    const duration = 8 + Math.random() * 14;
    const delay = Math.random() * 12;

    block.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;

    container.appendChild(block);
  }
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });

  // Close when link is clicked
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
    });
  });
}

// ===== ACTIVE NAV LINK =====
function initActiveNav() {
  const bodyId = document.body.id;
  const pageMap = {
    'page-home': 'index.html',
    'page-products': 'urunler.html',
    'page-contact': 'iletisim.html'
  };

  const currentPage = pageMap[bodyId];
  if (!currentPage) return;

  const allLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (bodyId === 'page-home' && (href === 'index.html' || href === './' || href === '/'))) {
      link.classList.add('active');
    }
  });
}

// ===== CART COUNTER =====
let cartCount = 0;

function updateCartBadge() {
  const badge = document.querySelector('.cart-badge');
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  }
}

function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function initCart() {
  // Load from localStorage
  cartCount = parseInt(localStorage.getItem('blokshop_cart') || '0');
  updateCartBadge();

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add-cart')) {
      const card = e.target.closest('.product-card');
      const name = card?.querySelector('.product-name')?.textContent || 'Ürün';
      cartCount++;
      localStorage.setItem('blokshop_cart', cartCount);
      updateCartBadge();
      showToast(`"${name.slice(0, 20)}..." sepete eklendi!`);
      e.target.textContent = 'Eklendi!';
      e.target.style.background = 'var(--color-gold)';
      setTimeout(() => {
        e.target.textContent = 'Sepete Ekle';
        e.target.style.background = '';
      }, 1200);
    }
  });

  // Favorite toggle
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('product-favorite') || e.target.closest('.product-favorite')) {
      const btn = e.target.classList.contains('product-favorite') ? e.target : e.target.closest('.product-favorite');
      btn.classList.toggle('active');
    }
  });
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.innerHTML = '▲';
  btn.setAttribute('aria-label', 'Yukarı çık');
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== FILTER (Products Page) =====
function initFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.products-grid-4 .product-card');
  const sortSelect = document.querySelector('.sort-select');

  if (!filterBtns.length) return;

  let activeFilter = 'all';

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilter();
    });
  });

  function applyFilter() {
    productCards.forEach(card => {
      const cat = card.dataset.category;
      if (activeFilter === 'all' || cat === activeFilter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const grid = document.querySelector('.products-grid-4');
      if (!grid) return;
      const cards = [...grid.querySelectorAll('.product-card')].filter(c => c.style.display !== 'none');
      const val = sortSelect.value;

      cards.sort((a, b) => {
        const priceA = parseInt(a.querySelector('.product-price')?.textContent.replace(/\D/g, '') || 0);
        const priceB = parseInt(b.querySelector('.product-price')?.textContent.replace(/\D/g, '') || 0);
        if (val === 'asc') return priceA - priceB;
        if (val === 'desc') return priceB - priceA;
        return 0;
      });

      cards.forEach(c => grid.appendChild(c));
    });
  }
}

// ===== FAQ ACCORDION =====
function initFaq() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.querySelector('.contact-form');
  const formWrap = document.querySelector('.contact-form-inner');
  const success = document.querySelector('.form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formWrap) formWrap.style.display = 'none';
    if (success) success.classList.add('show');
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initPixelRain();
  initNavbar();
  initHamburger();
  initActiveNav();
  initCart();
  initScrollTop();
  initFilter();
  initFaq();
  initContactForm();
});

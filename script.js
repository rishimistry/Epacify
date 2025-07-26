// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchClose = document.getElementById('search-close');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartClose = document.getElementById('cart-close');
const backToTop = document.getElementById('back-to-top');
const productsGrid = document.getElementById('products-grid');
const loadMoreBtn = document.getElementById('load-more-btn');
const newsletterForm = document.getElementById('newsletter-form');

// Sample Products Data
const products = [
    {
        id: 1,
        title: "Premium Leather Bag",
        description: "Handcrafted luxury leather bag",
        price: 299,
        originalPrice: 399,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
        rating: 4.8,
        reviews: 124,
        category: "new",
        badge: "New"
    },
    {
        id: 2,
        title: "Smart Watch Elite",
        description: "Advanced fitness tracking smartwatch",
        price: 499,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
        rating: 4.9,
        reviews: 89,
        category: "trending",
        badge: "Trending"
    },
    {
        id: 3,
        title: "Minimalist Desk Setup",
        description: "Clean and modern workspace essentials",
        price: 199,
        originalPrice: 249,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop",
        rating: 4.7,
        reviews: 56,
        category: "sale",
        badge: "Sale"
    },
    {
        id: 4,
        title: "Wireless Headphones Pro",
        description: "Premium sound quality headphones",
        price: 349,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        rating: 4.6,
        reviews: 203,
        category: "trending",
        badge: null
    },
    {
        id: 5,
        title: "Sustainable Water Bottle",
        description: "Eco-friendly premium water bottle",
        price: 49,
        originalPrice: 69,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop",
        rating: 4.5,
        reviews: 78,
        category: "new",
        badge: "Eco"
    },
    {
        id: 6,
        title: "Designer Sunglasses",
        description: "Luxury eyewear with UV protection",
        price: 189,
        originalPrice: null,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
        rating: 4.8,
        reviews: 91,
        category: "trending",
        badge: null
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 2000);
    
    // Initialize components
    initializeHeader();
    initializeNavigation();
    initializeSearch();
    initializeCart();
    initializeProducts();
    initializeNewsletter();
    initializeScrollEffects();
    initializeAnimations();
});

// Header functionality
function initializeHeader() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }
    });
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu
                mainNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    });
    
    // Back to top
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Search functionality
function initializeSearch() {
    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            document.querySelector('.search-input').focus();
        }, 100);
    });
    
    searchClose.addEventListener('click', closeSearch);
    
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            closeSearch();
        }
    });
    
    // Trending tags functionality
    document.querySelectorAll('.trending-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelector('.search-input').value = tag.textContent;
        });
    });
    
    function closeSearch() {
        searchOverlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

// Cart functionality
function initializeCart() {
    cartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        document.body.classList.add('no-scroll');
    });
    
    cartClose.addEventListener('click', closeCart);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            !cartBtn.contains(e.target)) {
            closeCart();
        }
    });
    
    function closeCart() {
        cartSidebar.classList.remove('active');
        document.body.classList.remove('no-scroll');
        updateCartDisplay();
    }
}

// Products functionality
function initializeProducts() {
    renderProducts('all');
    
    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
    
    // Load more functionality
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more products
        loadMoreBtn.textContent = 'Loading...';
        setTimeout(() => {
            loadMoreBtn.textContent = 'Load More Products';
            // You would load more products here
        }, 1000);
    });
}

function renderProducts(filter) {
    let filteredProducts = products;
    
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to new product cards
    addProductEventListeners();
}

function createProductCard(product) {
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    const originalPriceHTML = product.originalPrice 
        ? `<span class="product-price-original">$${product.originalPrice}</span>` 
        : '';
    const badgeHTML = product.badge 
        ? `<span class="product-badge">${product.badge}</span>` 
        : '';
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-card-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                ${badgeHTML}
                <div class="product-actions">
                    <button class="product-action-btn wishlist-action" data-product-id="${product.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="product-action-btn quick-view" data-product-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-card-content">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price-container">
                    <div class="product-prices">
                        <span class="product-price">$${product.price}</span>
                        ${originalPriceHTML}
                    </div>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                </div>
                <button class="add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

function addProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
            
            // Button feedback
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            btn.style.background = 'var(--secondary-color)';
            btn.style.color = 'var(--white)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.color = '';
            }, 1000);
        });
    });
    
    // Wishlist buttons
    document.querySelectorAll('.wishlist-action').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            btn.classList.toggle('active');
            // Add wishlist functionality here
        });
    });
    
    // Quick view buttons
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.productId);
            openQuickView(productId);
        });
    });
}

// Cart management
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartDisplay();
        updateCartBadge();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--spacing-lg);">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => createCartItem(item)).join('');
    }
    
    updateCartTotal();
}

function createCartItem(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="cart-item-content">
                <h4>${item.title}</h4>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
            updateCartBadge();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartBadge();
}

function updateCartBadge() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.querySelector('.cart-btn .badge');
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelectorAll('.total-amount').forEach(el => {
        if (el.closest('.total-final')) {
            el.textContent = `$${total.toFixed(2)}`;
        } else if (el.closest('.total-line').textContent.includes('Subtotal')) {
            el.textContent = `$${total.toFixed(2)}`;
        }
    });
}

// Newsletter functionality
function initializeNewsletter() {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('.newsletter-input').value;
        
        // Simulate newsletter subscription
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Subscribing...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = 'Subscribed! ✓';
            submitBtn.style.background = 'var(--secondary-color)';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                e.target.reset();
            }, 2000);
        }, 1000);
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.product-card, .category-card, .feature').forEach(el => {
        observer.observe(el);
    });
}

function initializeAnimations() {
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .product-card, .category-card, .feature {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .product-card.animate, .category-card.animate, .feature.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .cart-item {
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            padding: var(--spacing-sm);
            border-bottom: 1px solid var(--gray-medium);
        }
        
        .cart-item-image {
            width: 60px;
            height: 60px;
            border-radius: var(--radius-sm);
            overflow: hidden;
        }
        
        .cart-item-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .cart-item-content {
            flex: 1;
        }
        
        .cart-item-content h4 {
            font-size: var(--font-size-sm);
            margin-bottom: var(--spacing-xs);
        }
        
        .cart-item-price {
            color: var(--secondary-color);
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
        }
        
        .cart-item-quantity {
            display: flex;
            align-items: center;
            gap: var(--spacing-xs);
        }
        
        .quantity-btn {
            width: 24px;
            height: 24px;
            border: 1px solid var(--gray-medium);
            background: var(--white);
            cursor: pointer;
            border-radius: var(--radius-sm);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font-size-sm);
        }
        
        .quantity-btn:hover {
            background: var(--gray-light);
        }
        
        .remove-item {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-light);
            padding: var(--spacing-xs);
        }
        
        .remove-item:hover {
            color: #ff4444;
        }
    `;
    document.head.appendChild(style);
}

// Quick view functionality
function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        // You would implement a modal/overlay for quick view here
        console.log('Quick view for:', product.title);
    }
}

// Category filter functionality
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        // Scroll to products section and filter
        document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            // Trigger appropriate filter
            const filterBtn = document.querySelector(`[data-filter="${category}"]`) || 
                            document.querySelector('[data-filter="all"]');
            if (filterBtn) {
                filterBtn.click();
            }
        }, 500);
    });
});

// Hero CTA functionality
document.querySelector('.hero-cta').addEventListener('click', () => {
    document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
});

// Enhanced mobile experience
function initializeMobileEnhancements() {
    // Touch gestures for mobile
    let startX = 0;
    let currentX = 0;
    
    cartSidebar.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    cartSidebar.addEventListener('touchmove', (e) => {
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (diff > 50) {
            // Swipe left to close cart
            cartSidebar.style.transform = `translateX(${Math.min(diff, 400)}px)`;
        }
    });
    
    cartSidebar.addEventListener('touchend', () => {
        const diff = startX - currentX;
        if (diff > 100) {
            cartSidebar.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
        cartSidebar.style.transform = '';
    });
}

// Initialize mobile enhancements
if ('ontouchstart' in window) {
    initializeMobileEnhancements();
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounced scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll events here
        }, 16); // ~60fps
    });
}

initializePerformanceOptimizations();

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation for custom elements
    document.querySelectorAll('.product-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const addToCartBtn = card.querySelector('.add-to-cart');
                if (addToCartBtn) {
                    addToCartBtn.click();
                }
            }
        });
    });
    
    // Focus management for modals
    const focusableElements = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    
    searchOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.getElementById('search-close').click();
        }
        
        // Tab trapping
        if (e.key === 'Tab') {
            const focusable = searchOverlay.querySelectorAll(focusableElements);
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
}

initializeAccessibility();

// Error handling and fallbacks
window.addEventListener('error', (e) => {
    console.warn('An error occurred:', e.error);
    // You could implement error reporting here
});

// Service worker for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // You could register a service worker here for offline functionality
    });
}

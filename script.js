// DOM Elements
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-btn'); // Fixed selector
    const overlay = document.querySelector('.overlay');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productGrid = document.getElementById('productGrid');
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const closeModalBtn = document.querySelector('#closeModal'); // Fixed selector
    const testimonialDots = document.querySelectorAll('.nav-dot');
    const addToCartBtns = document.querySelectorAll('.add-cart-btn');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total-value');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const wishlistBtns = document.querySelectorAll('.product-wishlist');

    // Sample Product Data
    const products = [
        {
            id: 1,
            name: "Premium Wireless Headphones",
            category: "Electronics",
            price: 149.99,
            oldPrice: 199.99,
            image: "https://source.unsplash.com/300x300/?headphones",
            rating: 4.5,
            reviews: 123,
            discount: 25,
            isNew: true,
            description: "Experience premium sound quality with these comfortable wireless headphones featuring active noise cancellation.",
            featured: true
        },
        {
            id: 2,
            name: "Smart Fitness Watch",
            category: "Wearables",
            price: 89.99,
            oldPrice: 119.99,
            image: "https://source.unsplash.com/300x300/?smartwatch",
            rating: 4.2,
            reviews: 98,
            discount: 25,
            isNew: false,
            description: "Track your fitness goals with this waterproof smart watch featuring heart rate monitoring and sleep tracking.",
            featured: true
        },
        {
            id: 3,
            name: "Ultra HD Smart TV",
            category: "Electronics",
            price: 799.99,
            oldPrice: 999.99,
            image: "https://source.unsplash.com/300x300/?tv",
            rating: 4.8,
            reviews: 85,
            discount: 20,
            isNew: true,
            description: "Enjoy crystal clear 4K resolution and smart features with this sleek, modern TV.",
            featured: true
        },
        {
            id: 4,
            name: "Professional DSLR Camera",
            category: "Photography",
            price: 1299.99,
            oldPrice: 1499.99,
            image: "https://source.unsplash.com/300x300/?camera",
            rating: 4.9,
            reviews: 42,
            discount: 13,
            isNew: false,
            description: "Capture stunning photos and videos with this professional-grade DSLR camera.",
            featured: false
        },
        {
            id: 5,
            name: "Gaming Laptop",
            category: "Computers",
            price: 1599.99,
            oldPrice: 1899.99,
            image: "https://source.unsplash.com/300x300/?laptop",
            rating: 4.7,
            reviews: 65,
            discount: 16,
            isNew: true,
            description: "Experience smooth gaming performance with this powerful gaming laptop featuring RGB lighting.",
            featured: true
        },
        {
            id: 6,
            name: "Wireless Earbuds",
            category: "Electronics",
            price: 79.99,
            oldPrice: 99.99,
            image: "https://source.unsplash.com/300x300/?earbuds",
            rating: 4.3,
            reviews: 112,
            discount: 20,
            isNew: false,
            description: "Enjoy your favorite music wirelessly with these comfortable and portable earbuds.",
            featured: false
        },
        {
            id: 7,
            name: "Smart Home Speaker",
            category: "Smart Home",
            price: 129.99,
            oldPrice: 159.99,
            image: "https://source.unsplash.com/300x300/?speaker",
            rating: 4.4,
            reviews: 78,
            discount: 19,
            isNew: true,
            description: "Control your smart home and enjoy premium audio quality with this voice-controlled speaker.",
            featured: true
        },
        {
            id: 8,
            name: "Electric Coffee Maker",
            category: "Appliances",
            price: 69.99,
            oldPrice: 89.99,
            image: "https://source.unsplash.com/300x300/?coffee",
            rating: 4.1,
            reviews: 56,
            discount: 22,
            isNew: false,
            description: "Brew delicious coffee with this programmable coffee maker featuring multiple brewing options.",
            featured: false
        }
    ];

    // Cart Array
    let cart = [];

    // Initialize website
    function init() {
        renderProducts(products);
        setupEventListeners();
        updateCartCount();
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Mobile Menu Toggle
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        // Cart Sidebar Toggle
        if (cartIcon) {
            cartIcon.addEventListener('click', toggleCart);
        }

        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', toggleCart);
        }

        // Overlay Click
        if (overlay) {
            overlay.addEventListener('click', () => {
                if (cartSidebar.classList.contains('active')) {
                    toggleCart();
                }
                if (quickViewModal && quickViewModal.classList.contains('active')) {
                    toggleQuickView();
                }
            });
        }

        // Product Filters
        if (filterBtns) {
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filter = btn.dataset.filter;
                    filterProducts(filter);

                    // Update active filter button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });
        }

        // Testimonial Navigation
        if (testimonialDots) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    changeTestimonial(index);
                });
            });
        }

        // Add click event listeners after products are rendered
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const productId = parseInt(this.dataset.id);
                addToCart(productId);
            });
        });

        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const productId = parseInt(this.dataset.id);
                openQuickView(productId);
            });
        });

        document.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', function () {
                this.classList.toggle('active');
                // You can add wishlist functionality here
            });
        });
    }

    // Render Products
    function renderProducts(productsToRender) {
        if (!productGrid) return;

        productGrid.innerHTML = '';

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            // Generate stars HTML
            let starsHtml = '';
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 >= 0.5;

            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
                } else if (i === fullStars && hasHalfStar) {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2L8.91 8.26 2 9.27l5 4.87-1.18 6.88L12 17.77V2z"></path></svg>';
                } else {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
                }
            }

            productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.isNew ? '<span class="product-badge">NEW</span>' : ''}
            <div class="product-wishlist" data-id="${product.id}">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </div>
          </div>
          <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
              <div class="stars">${starsHtml}</div>
              <span class="reviews">(${product.reviews})</span>
            </div>
            <div class="product-price">
              <span class="current-price">₹${product.price.toFixed(2)}</span>
              <span class="old-price">$${product.oldPrice.toFixed(2)}</span>
              <span class="discount">-${product.discount}%</span>
            </div>
            <div class="product-actions">
              <button class="add-cart-btn" data-id="${product.id}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                Add to Cart
              </button>
              <button class="quick-view-btn" data-id="${product.id}">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
          </div>
        `;

            productGrid.appendChild(productCard);
        });

        // Re-attach event listeners to newly created elements
        setupEventListeners();
    }

    // Filter Products
    function filterProducts(filter) {
        let filteredProducts;

        if (filter === 'all') {
            filteredProducts = products;
        } else if (filter === 'featured') {
            filteredProducts = products.filter(product => product.featured);
        } else if (filter === 'new') {
            filteredProducts = products.filter(product => product.isNew);
        } else {
            filteredProducts = products.filter(product => product.category.toLowerCase() === filter.toLowerCase());
        }

        renderProducts(filteredProducts);
    }

    // Add to Cart
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        updateCart();
        updateCartCount();

        // Show notification
        showNotification(`${product.name} added to cart!`);

        // Open cart sidebar
        if (!cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    }

    // Update Cart
    function updateCart() {
        if (!cartItems) return;

        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            if (cartTotal) cartTotal.textContent = '₹0.00';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">
              <span class="item-price">$${item.price.toFixed(2)}</span>
              <span>x</span>
              <div class="cart-item-quantity">
                <button class="qty-btn minus" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn plus" data-id="${item.id}">+</button>
              </div>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
          </div>
        `;

            cartItems.appendChild(cartItem);
        });

        if (cartTotal) cartTotal.textContent = `₹${total.toFixed(1)}`;

        // Add event listeners for quantity buttons and remove buttons
        document.querySelectorAll('.qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', function () {
                updateItemQuantity(parseInt(this.dataset.id), -1);
            });
        });

        document.querySelectorAll('.qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', function () {
                updateItemQuantity(parseInt(this.dataset.id), 1);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                removeFromCart(parseInt(this.dataset.id));
            });
        });
    }

    // Update Item Quantity
    function updateItemQuantity(productId, change) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex === -1) return;

        cart[itemIndex].quantity += change;

        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        updateCart();
        updateCartCount();
    }

    // Remove from Cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
        updateCartCount();
    }

    // Update Cart Count
    function updateCartCount() {
        if (!cartCount) return;

        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;

        if (count === 0) {
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
        }
    }

    // Toggle Cart Sidebar
    function toggleCart() {
        if (!cartSidebar || !overlay) return;

        cartSidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Update cart when opening
        if (cartSidebar.classList.contains('active')) {
            updateCart();
        }
    }

    // Open Quick View Modal
    function openQuickView(productId) {
        if (!quickViewModal || !overlay) return;

        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Populate modal with product data
        const modalContent = quickViewModal.querySelector('.modal-body');
        if (modalContent) {
            let starsHtml = '';
            const fullStars = Math.floor(product.rating);
            const hasHalfStar = product.rating % 1 >= 0.5;

            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
                } else if (i === fullStars && hasHalfStar) {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2L8.91 8.26 2 9.27l5 4.87-1.18 6.88L12 17.77V2z"></path></svg>';
                } else {
                    starsHtml += '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>';
                }
            }

            modalContent.innerHTML = `
          <div class="quick-view-grid">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-details">
              <span class="product-category">${product.category}</span>
              <h2>${product.name}</h2>
              <div class="product-rating">
                <div class="stars">${starsHtml}</div>
                <span class="reviews">(${product.reviews} reviews)</span>
              </div>
              <div class="product-price">
                <span class="current-price">₹${product.price.toFixed(2)}</span>
                <span class="old-price">₹${product.oldPrice.toFixed(2)}</span>
                <span class="discount">-${product.discount}%</span>
              </div>
              <p class="product-description">${product.description}</p>
              <div class="product-actions">
                <div class="quantity-selector">
                  <button class="qty-btn modal-minus">-</button>
                  <input type="number" value="1" min="1" class="modal-quantity">
                  <button class="qty-btn modal-plus">+</button>
                </div>
                <button class="btn btn-primary modal-add-btn" data-id="${product.id}">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                  Add to Cart
                </button>
                <button class="btn btn-outline modal-wishlist-btn" data-id="${product.id}">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        `;

            // Add event listeners
            const quantityInput = modalContent.querySelector('.modal-quantity');
            const minusBtn = modalContent.querySelector('.modal-minus');
            const plusBtn = modalContent.querySelector('.modal-plus');
            const addBtn = modalContent.querySelector('.modal-add-btn');
            const wishlistBtn = modalContent.querySelector('.modal-wishlist-btn');

            if (minusBtn) {
                minusBtn.addEventListener('click', () => {
                    if (quantityInput.value > 1) {
                        quantityInput.value = parseInt(quantityInput.value) - 1;
                    }
                });
            }

            if (plusBtn) {
                plusBtn.addEventListener('click', () => {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                });
            }

            if (addBtn) {
                addBtn.addEventListener('click', () => {
                    const quantity = parseInt(quantityInput.value);
                    addToCartWithQuantity(product.id, quantity);
                    toggleQuickView();
                });
            }

            if (wishlistBtn) {
                wishlistBtn.addEventListener('click', () => {
                    wishlistBtn.classList.toggle('active');
                    // Add wishlist functionality here
                });
            }
        }

        // Show modal
        quickViewModal.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('no-scroll');
    }

    // Toggle Quick View Modal
    function toggleQuickView() {
        if (!quickViewModal || !overlay) return;

        quickViewModal.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    // Add to Cart with Quantity
    function addToCartWithQuantity(productId, quantity) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        updateCart();
        updateCartCount();

        // Show notification
        showNotification(`${product.name} added to cart!`);
    }

    // Change Testimonial
    function changeTestimonial(index) {
        const testimonials = [
            {
                content: "I've been shopping with Scaprico for over a year now, and their quality and service never disappoints. The express delivery is a game changer!",
                author: "Sarah Johnson",
                role: "Regular Customer",
                avatar: "https://source.unsplash.com/100x100/?portrait,woman"
            },
            {
                content: "The product selection at Scaprico is unmatched. I found items here that I couldn't find anywhere else, and the prices are very competitive.",
                author: "Michael Chen",
                role: "Tech Enthusiast",
                avatar: "https://source.unsplash.com/100x100/?portrait,man"
            },
            {
                content: "Customer service is exceptional. When I had an issue with my order, they resolved it immediately and even offered a discount on my next purchase.",
                author: "Emily Rodriguez",
                role: "Fashion Blogger",
                avatar: "https://source.unsplash.com/100x100/?portrait,girl"
            }
        ];

        const testimonialContent = document.querySelector('.testimonial-content');
        const authorName = document.querySelector('.author-info h4');
        const authorRole = document.querySelector('.author-info p');
        const authorAvatar = document.querySelector('.author-avatar img');

        if (testimonialContent && authorName && authorRole && authorAvatar) {
            testimonialContent.textContent = testimonials[index].content;
            authorName.textContent = testimonials[index].author;
            authorRole.textContent = testimonials[index].role;
            authorAvatar.src = testimonials[index].avatar;

            // Update active dot
            testimonialDots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    // Show Notification
    function showNotification(message) {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Add active class after a small delay for animation
        setTimeout(() => {
            notification.classList.add('active');
        }, 10);

        // Remove notification after delay
        setTimeout(() => {
            notification.classList.remove('active');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Initialize Newsletter Form
    function initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form');
        if (!newsletterForm) return;

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }

    // Initialize Checkout
    function initCheckout() {
        if (!checkoutBtn) return;

        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty!');
                return;
            }

            // Here you would typically redirect to a checkout page
            showNotification('Proceeding to checkout...');

            // For demo purposes, just clear the cart
            setTimeout(() => {
                cart = [];
                updateCart();
                updateCartCount();
                toggleCart();
                showNotification('Thank you for your purchase!');
            }, 2000);
        });
    }

    // Create Featured Elements
    function createElements() {
        // Create cart sidebar if it doesn't exist
        if (!document.querySelector('.cart-sidebar')) {
            const cartSidebarElement = document.createElement('div');
            cartSidebarElement.className = 'cart-sidebar';
            cartSidebarElement.innerHTML = `
          <div class="cart-header">
            <h3>Your Cart (${cart.length})</h3>
            <button class="close-btn">×</button>
          </div>
          <div class="cart-body">
            <div class="cart-items"></div>
          </div>
          <div class="cart-footer">
            <div class="cart-total">
              <span>Total:</span>
              <span class="cart-total-value">₹0.00</span>
            </div>
            <button class="checkout-btn">Proceed to Checkout</button>
          </div>
        `;
            document.body.appendChild(cartSidebarElement);
        }

        // Create quick view modal if it doesn't exist
        if (!document.querySelector('.quick-view-modal')) {
            const quickViewModalElement = document.createElement('div');
            quickViewModalElement.className = 'modal quick-view-modal';
            quickViewModalElement.innerHTML = `
          <div class="modal-content">
            <div class="modal-header">
              <h3>Quick View</h3>
              <button class="close-modal">×</button>
            </div>
            <div class="modal-body">
              <!-- Content will be inserted dynamically -->
            </div>
          </div>
        `;
            document.body.appendChild(quickViewModalElement);
        }

        // Create overlay if it doesn't exist
        if (!document.querySelector('.overlay')) {
            const overlayElement = document.createElement('div');
            overlayElement.className = 'overlay';
            document.body.appendChild(overlayElement);
        }

        // Create notification styles if they don't exist
        if (!document.getElementById('notification-styles')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'notification-styles';
            styleElement.textContent = `
      .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--primary);
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 9999;
      }
      .notification.active {
        transform: translateY(0);
        opacity: 1;
      }
    `;
            document.head.appendChild(styleElement);
        }
    }

    // Initialize everything
    init();
    initNewsletter();
    initCheckout();
    createElements();

    // Set up close modal button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', toggleQuickView);
    }

    // Auto-rotate testimonials
    let currentTestimonial = 0;
    const testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialDots.length;
        changeTestimonial(currentTestimonial);
    }, 5000);

    // Handle responsive behavior
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove('active');
        }
    });
});

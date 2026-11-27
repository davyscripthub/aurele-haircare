import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, Plus, Minus, X, ShoppingBag, Menu, Search, Instagram } from "lucide-react";
import "./styles.css";

const products = [
  {
    id: 1, number: "01", name: "Nourishing Shampoo", subtitle: "A gentle beginning",
    description: "A luxurious cleanse that leaves hair feeling soft, refreshed and beautifully cared for.",
    detail: "Make the first step of your routine feel like a moment of care. This gentle everyday shampoo cleanses the hair and scalp, leaving your hair feeling fresh and ready for the rest of your ritual.",
    benefits: ["Cleanses hair and scalp", "Leaves hair feeling fresh and soft", "An easy fit for your regular wash routine"],
    idealFor: "Anyone looking for a simple, feel-good shampoo for their regular hair-wash routine.",
    howToUse: "Apply to wet hair, gently massage into the scalp and lengths, then rinse thoroughly. Repeat if desired.",
    price: 320, size: "500 ml", image: "/images/shampoo.jpg", tag: "DAILY RITUAL"
  },
  {
    id: 2, number: "02", name: "Hair Serum", subtitle: "The finishing touch",
    description: "A lightweight finishing ritual designed to smooth the look of strands and enhance natural shine.",
    detail: "The finishing touch your routine has been waiting for. This lightweight serum helps smooth the appearance of strands and gives your hair a polished-looking finish without making your routine complicated.",
    benefits: ["Helps smooth the look of strands", "Enhances the appearance of natural shine", "A lightweight finishing step"],
    idealFor: "Those who want a neat, polished finish and an extra touch of shine in their hair routine.",
    howToUse: "Warm a small amount between your palms and work through the lengths and ends. Start with a little and add more only if needed.",
    price: 380, size: "30 ml", image: "/images/hair serum.jpg", tag: "BESTSELLER"
  },
  {
    id: 3, number: "03", name: "Conditioner", subtitle: "Softness, renewed",
    description: "A rich yet effortless conditioner that helps detangle and leave lengths feeling silky.",
    detail: "Give your lengths the care they deserve after cleansing. This conditioner helps make detangling easier and leaves hair feeling soft, smooth and silky to the touch.",
    benefits: ["Helps detangle after washing", "Leaves lengths feeling soft and silky", "Complements your shampoo routine"],
    idealFor: "Anyone who wants softer-feeling lengths and a smoother, easier detangling routine.",
    howToUse: "After shampooing, apply through the mid-lengths and ends. Leave for a few minutes, then rinse thoroughly.",
    price: 340, size: "500 ml", image: "/images/conditioner.jpg", tag: "EVERYDAY LUXURY"
  },
  {
    id: 4, number: "04", name: "Hair Mask", subtitle: "A moment of restoration",
    description: "A deeply indulgent weekly treatment for hair that deserves a little more attention.",
    detail: "Turn your weekly wash into a little at-home hair ritual. This rich treatment gives your lengths an extra moment of attention, leaving them feeling cared for, soft and smooth.",
    benefits: ["An extra-care step for your weekly routine", "Leaves lengths feeling soft and smooth", "A more indulgent alternative to your everyday routine"],
    idealFor: "Anyone who enjoys giving their hair a little extra care as part of a weekly ritual.",
    howToUse: "After shampooing, apply through the lengths and ends. Leave on for a few minutes, then rinse thoroughly. Follow the product label for exact directions.",
    price: 420, size: "300 ml", image: "/images/hair mask.jpg", tag: "WEEKLY RITUAL"
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [added, setAdded] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = products.filter(product => `${product.name} ${product.subtitle} ${product.description} ${product.idealFor}`.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const addToCart = (product) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found
        ? current.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    setAdded(product.id);
    window.setTimeout(() => setAdded(null), 1300);
  };
  const changeQty = (id, amount) => setCart(current => current.map(item => item.id === id ? { ...item, qty: item.qty + amount } : item).filter(item => item.qty > 0));
  const removeItem = id => setCart(current => current.filter(item => item.id !== id));

  const checkoutViaWhatsApp = () => {
    const orderLines = cart.map(item =>
      `• ${item.name} × ${item.qty} — ${(item.price * item.qty).toFixed(0)} MAD`
    );
    const message = [
      "Hello, I'd like to place an order:",
      "",
      ...orderLines,
      "",
      `Total: ${total.toFixed(0)} MAD`
    ].join("\n");
    const whatsappUrl = `https://wa.me/212617543162?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="site-shell">
      <div className="announcement">A NEW STANDARD IN HAIRCARE <span>✦</span> DISCOVER THE AURÈLE RITUAL</div>
      <header className="header">
        <button className="mobile-menu icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu"><Menu size={20} /></button>
        <nav className={`nav nav-left ${menuOpen ? "nav-open" : ""}`}>
          <a href="#collection" onClick={() => setMenuOpen(false)}>SHOP</a>
          <div className="philosophy-search-wrap"><a href="#philosophy" onClick={() => { setMenuOpen(false); setSearchOpen(false); }}>OUR PHILOSOPHY</a><button className="search-trigger" onClick={() => { setSearchOpen(open => !open); setSearchQuery(""); }} aria-label="Search products" aria-expanded={searchOpen}><Search size={15} strokeWidth={1.7} /></button></div>
        </nav>
        <a className="wordmark" href="#top" aria-label="AURÈLE home">AURÈLE<span>®</span></a>
        <nav className="nav nav-right">
          <button className="about-trigger" onClick={() => setAboutOpen(true)}>ABOUT</button>
          <button className="cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={17} /> <span>BAG ({count})</span></button>
        </nav>
            {searchOpen && <div className="product-search-panel" role="dialog" aria-label="Search AURÈLE products"><div className="product-search-input-wrap"><Search size={17} /><input autoFocus type="search" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} placeholder="Search the collection..." aria-label="Search products" /><button className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={17} /></button></div><div className="product-search-results">{searchQuery.trim() ? (searchResults.length ? searchResults.map(product => <button className="product-search-result" key={product.id} onClick={() => { setSelectedProduct(product); setSearchOpen(false); }}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.subtitle}</small></span><b>{product.price} MAD</b><ArrowRight size={14} /></button>) : <p className="search-empty">No products found. Try another search.</p>) : <p className="search-hint">Search by product name or haircare need.</p>}</div></div>}
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-image" />
          <div className="hero-shade" />
          <div className="hero-content">
            <p className="eyebrow"><span className="gold-line" /> THE ART OF BEAUTIFUL HAIR</p>
            <h1>Beauty in<br /><em>every</em> detail.</h1>
            <p className="hero-copy">Considered care. Timeless rituals.<br />Hair, elevated to an art.</p>
            <a className="button button-gold" href="#collection">EXPLORE THE COLLECTION <ArrowRight size={15} /></a>
          </div>
          <div className="hero-bottom"><span>01 / 04</span><span>FORMULATED FOR YOUR RITUAL</span><a href="#collection">SCROLL TO DISCOVER <ArrowDown size={13} /></a></div>
        </section>

        <section className="collection section-pad" id="collection">
          <div className="section-heading">
            <div><p className="eyebrow"><span className="gold-line" /> THE COLLECTION</p><h2>Care, <em>curated.</em></h2></div>
            <p>Four essentials. One elevated ritual.<br />Find your moment of care.</p>
          </div>
          <div className="product-grid">
            {products.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <button className="product-view" onClick={() => setSelectedProduct(product)} aria-label={`View details for ${product.name}`}>
                    <img src={product.image} alt={product.name} className="product-image" />
                  </button>
                  <span className="product-tag">{product.tag}</span>
                  <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}>
                    {added === product.id ? "ADDED ✓" : <><Plus size={16} /> QUICK ADD</>}
                  </button>
                </div>
                <div className="product-meta"><span>{product.number} / AURÈLE ESSENTIAL</span><span>{product.size}</span></div>
                <div className="product-title-row"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><span className="price">{product.price} MAD</span></div>
                <p className="product-description">{product.description}</p>
                <button className="text-link" onClick={() => setSelectedProduct(product)}>DISCOVER PRODUCT <ArrowRight size={14} /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="nature section-pad" aria-labelledby="nature-title">
          <div className="nature-heading">
            <p className="eyebrow"><span className="gold-line" /> BOTANICAL INSPIRATION</p>
            <h2 id="nature-title">A touch of <em>nature.</em></h2>
            <p>Inspired by the familiar ingredients loved in haircare rituals.</p>
          </div>
          <div className="nature-grid">
            <article className="nature-item"><span className="nature-number">01</span><div><h3>Aloe Vera</h3><p>Inspired by gentle, refreshing care.</p><span>SHAMPOO</span></div></article>
            <article className="nature-item"><span className="nature-number">02</span><div><h3>Argan Oil</h3><p>A nod to softness and a luminous finish.</p><span>HAIR SERUM</span></div></article>
            <article className="nature-item"><span className="nature-number">03</span><div><h3>Shea Butter</h3><p>Known for its rich, comforting feel.</p><span>CONDITIONER</span></div></article>
            <article className="nature-item"><span className="nature-number">04</span><div><h3>Coconut Oil</h3><p>A familiar touch in nourishing hair rituals.</p><span>HAIR MASK</span></div></article>
          </div>
          <p className="nature-note">Ingredient inspirations only — please refer to each product label for its confirmed ingredients.</p>
        </section>


        <section className="intro section-pad" id="philosophy">
          <div className="intro-label"><span className="gold-dot" /> THE AURÈLE APPROACH</div>
          <div className="intro-copy">
            <h2>Less, but <em>exceptional.</em></h2>
            <p>We believe beautiful hair begins with thoughtful care. A considered collection of essentials, designed to turn the everyday into something extraordinary.</p>
          </div>
          <div className="intro-aside">A QUIETER KIND<br />OF LUXURY <span>✳</span></div>
        </section>

        <section className="quote-section">
          <span className="quote-mark">“</span>
          <blockquote>True luxury is found in the<br /><em>details you choose every day.</em></blockquote>
          <span className="quote-caption">THE AURÈLE PHILOSOPHY</span>
        </section>
      </main>

      <footer className="footer" id="about">
        <div className="footer-main">
          <div className="footer-brand"><a className="wordmark footer-wordmark" href="#top">AURÈLE<span>®</span></a><p>The art of beautiful hair.</p></div>
          <div className="footer-about"><p className="footer-label">ABOUT AURÈLE</p><p>We create considered haircare essentials for the rituals that make you feel your best. Thoughtful by design. Timeless by nature.</p><a href="mailto:hello@aurele.example" className="underlined-link">GET IN TOUCH <ArrowRight size={14} /></a></div>
          <div className="footer-links"><p className="footer-label">EXPLORE</p><a href="#collection">Shop collection</a><a href="#philosophy">Our philosophy</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={14} /> Instagram</a></div>
          <div className="footer-news"><p className="footer-label">A NOTE FROM AURÈLE</p><p>Occasional notes on rituals, care and the art of living beautifully.</p><a href="mailto:hello@aurele.example" className="newsletter-link">JOIN OUR WORLD <ArrowRight size={14} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 AURÈLE. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION.</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>

      {aboutOpen && <div className="about-modal-backdrop" onClick={() => setAboutOpen(false)}>
        <section className="about-modal" role="dialog" aria-modal="true" aria-labelledby="about-modal-title" onClick={event => event.stopPropagation()}>
          <button className="about-modal-close icon-button" onClick={() => setAboutOpen(false)} aria-label="Close about AURÈLE"><X size={21} /></button>
          <p className="eyebrow"><span className="gold-line" /> THE AURÈLE STORY</p>
          <h2 id="about-modal-title">Thoughtful care.<br /><em>Beautifully considered.</em></h2>
          <p className="about-modal-lead">AURÈLE brings together four haircare essentials designed to make everyday care feel more intentional — from a fresh, gentle-feeling cleanse to the finishing touch of shine.</p>
          <div className="about-modal-grid">
            <article><span>01 / CLEANSE</span><h3>Nourishing Shampoo</h3><p>A refreshing first step for anyone who wants a simple, considered wash-day routine.</p></article>
            <article><span>02 / FINISH</span><h3>Hair Serum</h3><p>For those seeking a smoother-looking finish and an added touch of shine.</p></article>
            <article><span>03 / SOFTEN</span><h3>Conditioner</h3><p>For anyone looking to make detangling easier and leave lengths feeling soft.</p></article>
            <article><span>04 / RESTORE</span><h3>Hair Mask</h3><p>A weekly extra-care ritual for people who like to give their lengths more attention.</p></article>
          </div>
          <div className="about-modal-origin"><h3>INSPIRED BY NATURE</h3><p>Our botanical inspiration includes aloe vera, argan oil, shea butter and coconut oil. These are inspirations for the collection, not a confirmed ingredient list: each product’s exact formula and ingredients should always be checked on its own label.</p></div>
          <button className="button button-gold about-modal-cta" onClick={() => { setAboutOpen(false); document.getElementById("collection").scrollIntoView({ behavior: "smooth" }); }}>DISCOVER THE COLLECTION <ArrowRight size={15} /></button>
        </section>
      </div>}

      {selectedProduct && <div className="product-modal-backdrop" onClick={() => setSelectedProduct(null)}>
        <section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" onClick={event => event.stopPropagation()}>
          <button className="product-modal-close icon-button" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X size={21} /></button>
          <div className="product-modal-image">
            <img src={selectedProduct.image} alt={selectedProduct.name} />
            <span className="product-tag">{selectedProduct.tag}</span>
          </div>
          <div className="product-modal-content">
            <p className="eyebrow"><span className="gold-line" /> AURÈLE ESSENTIAL · {selectedProduct.number}</p>
            <h2 id="product-modal-title">{selectedProduct.name}</h2>
            <p className="product-modal-subtitle">{selectedProduct.subtitle}</p>
            <p className="product-modal-description">{selectedProduct.detail}</p>
            <div className="product-modal-price-row"><strong>{selectedProduct.price} MAD</strong><span>{selectedProduct.size}</span></div>
            <div className="product-detail-block">
              <h3>WHY YOU'LL LOVE IT</h3>
              <ul>{selectedProduct.benefits.map((benefit, index) => <li key={index}><span>✦</span>{benefit}</li>)}</ul>
            </div>
            <div className="product-detail-block">
              <h3>MADE FOR</h3>
              <p>{selectedProduct.idealFor}</p>
            </div>
            <div className="product-detail-block">
              <h3>HOW TO USE</h3>
              <p>{selectedProduct.howToUse}</p>
            </div>
            <button className="button button-gold product-modal-add" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>ADD TO BAG <ArrowRight size={15} /></button>
            <p className="product-modal-note">A considered step in your everyday hair ritual.</p>
          </div>
        </section>
      </div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30} /><h3>Your bag is waiting.</h3><p>Discover the AURÈLE essentials and find your ritual.</p><button className="button button-gold" onClick={() => { setCartOpen(false); document.getElementById("collection").scrollIntoView({ behavior: "smooth" }); }}>EXPLORE COLLECTION <ArrowRight size={14} /></button></div> :
            <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><span>{item.size} · {item.price} MAD</span><div className="qty-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><div className="cart-item-end"><b>{item.price * item.qty} MAD</b><button onClick={() => removeItem(item.id)} className="remove-link">REMOVE</button></div></div>)}</div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>{total.toFixed(0)} MAD</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-gold checkout" onClick={checkoutViaWhatsApp}>ORDER VIA WHATSAPP <ArrowRight size={15} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</button></div></>}
        </aside>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

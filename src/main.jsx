import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowRight, Plus, Minus, X, ShoppingBag, Menu, Sparkles, Instagram } from "lucide-react";
import "./styles.css";

const products = [
  {
    id: 1, number: "01", name: "Nourishing Shampoo", subtitle: "A gentle beginning",
    description: "A luxurious cleanse that leaves hair feeling soft, refreshed and beautifully cared for.",
    price: 32, size: "500 ml", image: "/images/shampoo.jpg", tag: "DAILY RITUAL"
  },
  {
    id: 2, number: "02", name: "Hair Serum", subtitle: "The finishing touch",
    description: "A lightweight finishing ritual designed to smooth the look of strands and enhance natural shine.",
    price: 38, size: "30 ml", image: "/images/hair serum.jpg", tag: "BESTSELLER"
  },
  {
    id: 3, number: "03", name: "Conditioner", subtitle: "Softness, renewed",
    description: "A rich yet effortless conditioner that helps detangle and leave lengths feeling silky.",
    price: 34, size: "500 ml", image: "/images/conditioner.jpg", tag: "EVERYDAY LUXURY"
  },
  {
    id: 4, number: "04", name: "Hair Mask", subtitle: "A moment of restoration",
    description: "A deeply indulgent weekly treatment for hair that deserves a little more attention.",
    price: 42, size: "300 ml", image: "/images/hair mask.jpg", tag: "WEEKLY RITUAL"
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [added, setAdded] = useState(null);
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
      `• ${item.name} × ${item.qty} — ${(item.price * item.qty).toFixed(2)}`
    ).join("\\n");
    const message = [
      "Hello AURÈLE! I'd like to place an order:",
      "",
      orderLines,
      "",
      `Total: ${total.toFixed(2)}`,
      "",
      "Please confirm my order. Thank you!"
    ].join("\\n");
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
          <a href="#philosophy" onClick={() => setMenuOpen(false)}>OUR PHILOSOPHY</a>
        </nav>
        <a className="wordmark" href="#top" aria-label="AURÈLE home">AURÈLE<span>®</span></a>
        <nav className="nav nav-right">
          <a href="#about">ABOUT</a>
          <button className="cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={17} /> <span>BAG ({count})</span></button>
        </nav>
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

        <section className="intro section-pad" id="philosophy">
          <div className="intro-label"><span className="gold-dot" /> THE AURÈLE APPROACH</div>
          <div className="intro-copy">
            <h2>Less, but <em>exceptional.</em></h2>
            <p>We believe beautiful hair begins with thoughtful care. A considered collection of essentials, designed to turn the everyday into something extraordinary.</p>
          </div>
          <div className="intro-aside">A QUIETER KIND<br />OF LUXURY <span>✳</span></div>
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
                  <img src={product.image} alt={product.name} className="product-image" />
                  <span className="product-tag">{product.tag}</span>
                  <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to bag`}>
                    {added === product.id ? "ADDED ✓" : <><Plus size={16} /> QUICK ADD</>}
                  </button>
                </div>
                <div className="product-meta"><span>{product.number} / AURÈLE ESSENTIAL</span><span>{product.size}</span></div>
                <div className="product-title-row"><div><h3>{product.name}</h3><p>{product.subtitle}</p></div><span className="price">${product.price}</span></div>
                <p className="product-description">{product.description}</p>
                <button className="text-link" onClick={() => addToCart(product)}>ADD TO BAG <ArrowRight size={14} /></button>
              </article>
            ))}
          </div>
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

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header"><div><p className="eyebrow">YOUR SELECTION</p><h2>Your bag <span>({count})</span></h2></div><button className="icon-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X /></button></div>
          {cart.length === 0 ? <div className="empty-cart"><ShoppingBag size={30} /><h3>Your bag is waiting.</h3><p>Discover the AURÈLE essentials and find your ritual.</p><button className="button button-gold" onClick={() => { setCartOpen(false); document.getElementById("collection").scrollIntoView({ behavior: "smooth" }); }}>EXPLORE COLLECTION <ArrowRight size={14} /></button></div> :
            <><div className="cart-items">{cart.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><span>{item.size} · ${item.price}</span><div className="qty-control"><button onClick={() => changeQty(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => changeQty(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><div className="cart-item-end"><b>${item.price * item.qty}</b><button onClick={() => removeItem(item.id)} className="remove-link">REMOVE</button></div></div>)}</div>
              <div className="cart-summary"><div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><p>Shipping and taxes calculated at checkout.</p><button className="button button-gold checkout" onClick={checkoutViaWhatsApp}>ORDER VIA WHATSAPP <ArrowRight size={15} /></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>CONTINUE SHOPPING</button></div></>}
        </aside>
      </div>}
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function Navbar({ siteConfig }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Kamar', href: '#kamar' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  const waLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=Halo%20Agape%20Kost,%20saya%20ingin%20tanya%20mengenai%20kamar%20yang%20tersedia.`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass py-3 shadow-soft'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-soft">
              <Icon name="home" className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-charcoal-900 group-hover:text-primary-600 transition-colors">
              Agape<span className="text-primary-500">Kost</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-charcoal-600 hover:text-primary-500 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary-500 after:transition-all hover:after:w-full"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-soft hover:shadow-soft-lg transition-all hover:-translate-y-0.5"
            >
              <Icon name="whatsapp" className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-charcoal-700 hover:text-primary-500 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'x' : 'menu'} className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-charcoal-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-72 max-w-sm bg-white p-6 shadow-soft-xl transition-transform duration-300 ease-in-out transform md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between pt-16">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-semibold text-charcoal-800 hover:text-primary-500 transition-colors py-2 border-b border-charcoal-100"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-auto pb-6">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-base font-semibold px-6 py-3.5 rounded-full shadow-soft transition-all"
            >
              <Icon name="whatsapp" className="w-5 h-5" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

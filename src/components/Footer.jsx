import Icon from './Icon';

export default function Footer({ siteConfig }) {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Kamar', href: '#kamar' },
    { name: 'Fasilitas', href: '#fasilitas' },
    { name: 'Lokasi', href: '#lokasi' },
  ];

  const waLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=Halo%20Agape%20Kost,%20saya%20ingin%20tanya%20mengenai%20kamar%20yang%20tersedia.`;

  return (
    <footer className="bg-charcoal-900 text-charcoal-100 pt-16 pb-8 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Col 1: Logo and Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <a href="#beranda" className="flex items-center gap-2 group self-start">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-soft">
                <Icon name="home" className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary-400 transition-colors">
                Agape<span className="text-primary-500">Kost</span>
              </span>
            </a>
            
            <p className="text-sm text-charcoal-400 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 items-center">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-primary-500 hover:text-white flex items-center justify-center text-charcoal-400 transition-all hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Icon name="instagram" className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-primary-500 hover:text-white flex items-center justify-center text-charcoal-400 transition-all hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Icon name="facebook" className="w-5 h-5" />
              </a>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-charcoal-800 hover:bg-primary-500 hover:text-white flex items-center justify-center text-charcoal-400 transition-all hover:-translate-y-1"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Navigasi Halaman
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-charcoal-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
              Hubungi Kami
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex gap-3 items-start">
                <Icon name="mapPin" className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <span className="text-charcoal-400 leading-relaxed">
                  {siteConfig.contact.address}
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Icon name="phone" className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="text-charcoal-400 hover:text-primary-400 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Icon name="mail" className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-charcoal-400 hover:text-primary-400 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-charcoal-800 w-full mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {currentYear} {siteConfig.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-400 transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

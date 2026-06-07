import Icon from './Icon';

export default function Hero({ siteConfig }) {
  const waLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=Halo%20Agape%20Kost,%20saya%20ingin%20tanya%20mengenai%20kamar%20yang%20tersedia.`;

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-primary-50 pt-24 sm:pt-28 pb-16"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 rounded-full bg-primary-200/40 opacity-30 blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-sage-200/40 opacity-40 blur-3xl animate-blob delay-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          {/* Custom Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-500 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Premium Boarding House
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-charcoal-900 mb-6 animate-fade-in-up delay-100 leading-[1.15]">
            Hunian Modern & <br />
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-white bg-primary-500 px-4 py-1 rounded-2xl rotate-[-1deg] inline-block shadow-soft-lg">
                Nyaman
              </span>
            </span> <br />
            di <span className="text-primary-500 font-extrabold">{siteConfig.name}</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-semibold text-charcoal-700 mb-4 animate-fade-in-up delay-200">
            {siteConfig.tagline}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-charcoal-500 mb-8 animate-fade-in-up delay-300 max-w-xl leading-relaxed">
            {siteConfig.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fade-in-up delay-400">
            <a
              href="#kamar"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-4 rounded-full shadow-soft-lg hover:shadow-soft-xl hover:-translate-y-0.5 transition-all text-base"
            >
              Lihat Kamar Tersedia
            </a>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-cream-100 text-primary-500 border border-primary-200 hover:border-primary-300 font-bold px-8 py-4 rounded-full shadow-soft hover:-translate-y-0.5 transition-all text-base"
            >
              <Icon name="whatsapp" className="w-5 h-5" />
              Hubungi Pengelola
            </a>
          </div>
        </div>

        {/* Right Column: Stunning Featured Image Layout */}
        <div className="lg:col-span-6 relative flex items-center justify-center animate-fade-in delay-200">
          <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
            {/* Background Decorative Frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-sage-500/10 rounded-[2.5rem] transform rotate-3" />
            
            {/* Main Image Container */}
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-soft-xl transform hover:rotate-0 transition-transform duration-500">
              <img
                src={`${import.meta.env.BASE_URL}hero-room.png`}
                alt="Agape Kost Room Interior"
                className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
              />
              {/* Glass Dark Overlay at bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 text-white">
                <p className="text-xs font-bold uppercase tracking-wider text-primary-300 mb-1">Room Interior Showcase</p>
                <h3 className="text-xl font-bold">Desain Minimalis & Estetik</h3>
              </div>
            </div>

            {/* Overlapping Floating Badge 1: Room count */}
            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-3xl shadow-soft-xl border border-primary-100 flex items-center gap-3 animate-bounce delay-500">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon name="check" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-400 uppercase">Kamar Ready</p>
                <p className="text-sm font-extrabold text-charcoal-800">Siap Huni</p>
              </div>
            </div>

            {/* Overlapping Floating Badge 2: Facilities */}
            <div className="absolute bottom-12 -left-8 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-soft-xl border border-primary-100 flex items-center gap-3 hidden sm:flex">
              <div className="w-10 h-10 rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center">
                <Icon name="wifi" className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal-400 uppercase">WiFi Cepat</p>
                <p className="text-sm font-extrabold text-charcoal-800">Free 100 Mbps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1.5 text-charcoal-400 animate-bounce">
        <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">Scroll</span>
        <Icon name="chevronDown" className="w-4 h-4" />
      </div>
    </section>
  );
}

import { useInView } from '../hooks/useInView';
import Icon from './Icon';

export default function Banner({ banners }) {
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.1 });
  const activeBanners = banners.filter((banner) => banner.active);

  if (activeBanners.length === 0) return null;

  return (
    <section
      id="promo"
      ref={sectionRef}
      className="py-16 bg-cream-50 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col gap-8">
          {activeBanners.map((banner, index) => {
            const isImage = banner.variant === 'image';
            const isGradient = banner.variant === 'gradient';
            
            let cardBgClass = '';
            if (isGradient) {
              cardBgClass = 'bg-gradient-to-br from-primary-500 to-primary-700 text-white';
            } else if (isImage) {
              cardBgClass = 'bg-cover bg-center text-white';
            } else {
              cardBgClass = 'bg-sage-600 text-white';
            }

            let buttonClass = 'bg-white ';
            if (isGradient) {
              buttonClass += 'text-primary-650 hover:bg-cream-100';
            } else if (isImage) {
              buttonClass += 'text-black hover:bg-neutral-100';
            } else {
              buttonClass += 'text-sage-700 hover:bg-sage-50';
            }
            
            return (
              <div
                key={banner.id}
                className={`relative rounded-3xl p-8 sm:p-12 shadow-soft-lg overflow-hidden transition-all duration-700 transform ${
                  isSectionInView
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                } ${cardBgClass}`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  backgroundImage: isImage && banner.bgImage ? `url(${banner.bgImage})` : undefined
                }}
              >
                {/* Background Overlay for Image Variant */}
                {isImage && (
                  <div className="absolute inset-0 bg-black/60 z-0" />
                )}

                {/* Decorative Background Circles (only for gradient/solid variants) */}
                {!isImage && (
                  <>
                    <div className="absolute w-64 h-64 rounded-full bg-white/10 -top-24 -right-24 blur-xl" />
                    <div className="absolute w-64 h-64 rounded-full bg-white/10 -bottom-24 -left-24 blur-xl" />
                  </>
                )}
                
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="max-w-2xl">
                    {/* Badge */}
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                      {banner.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold mb-3 tracking-tight">
                      {banner.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                      {banner.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 w-full lg:w-auto">
                    <a
                      href={banner.ctaLink}
                      target={banner.ctaLink.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`w-full lg:w-auto inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full transition-all text-base shadow-md hover:shadow-lg hover:scale-105 active:scale-95 ${buttonClass}`}
                    >
                      {banner.ctaText}
                      <Icon name="arrowRight" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

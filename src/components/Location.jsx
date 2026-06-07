import { useInView } from '../hooks/useInView';
import Icon from './Icon';

export default function Location({ location }) {
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.05 });

  // Map types to emojis/badges
  const placeTypeIcons = {
    university: '🎓',
    shopping: '🛒',
    hospital: '🏥',
    transport: '🚌',
    convenience: '🏪',
    worship: '🕌',
  };

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 transform ${
            isSectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 mb-4">
            Lokasi <span className="gradient-text">Strategis</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 leading-relaxed">
            Terletak di area utama yang memudahkan akses Anda ke berbagai fasilitas publik, universitas, dan pusat perbelanjaan.
          </p>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Map Embed (Left Column) */}
          <div
            className={`lg:col-span-7 h-[350px] sm:h-[450px] transition-all duration-700 delay-100 transform ${
              isSectionInView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <div className="w-full h-full rounded-3xl overflow-hidden shadow-soft-lg border border-primary-100/50 relative">
              <iframe
                title="Agape Kost Location Map"
                src={location.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Location details (Right Column) */}
          <div
            className={`lg:col-span-5 flex flex-col justify-between transition-all duration-700 delay-200 transform ${
              isSectionInView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <div>
              {/* Address Header */}
              <div className="flex gap-4 items-start mb-8 bg-primary-50/50 border border-primary-100/30 p-5 rounded-2xl shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
                  <Icon name="mapPin" className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal-800 text-base mb-1">Alamat Agape Kost</h3>
                  <p className="text-sm text-charcoal-600 leading-relaxed">{location.address}</p>
                </div>
              </div>

              {/* Nearby Places */}
              <h3 className="font-bold text-charcoal-800 text-lg mb-4">Akses & Jarak Terdekat</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {location.nearbyPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 bg-cream-50 border border-primary-100/20 rounded-xl text-sm hover:border-primary-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg flex-shrink-0" role="img" aria-label={place.type}>
                        {placeTypeIcons[place.type] || '📍'}
                      </span>
                      <span className="font-medium text-charcoal-700 line-clamp-1">{place.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold whitespace-nowrap">
                      {place.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <div>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold px-6 py-4 rounded-full shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5 transition-all text-base"
              >
                <Icon name="mapPin" className="w-5 h-5" />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

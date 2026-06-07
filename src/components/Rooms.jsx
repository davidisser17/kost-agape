import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import Icon from './Icon';

export default function Rooms({ roomTypes, siteConfig }) {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.05 });

  // Get unique room types for filtering
  const filters = ['Semua', 'AC', 'Non AC'];

  const filteredRooms = roomTypes.filter((room) => {
    if (activeFilter === 'Semua') return true;
    return room.type.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section
      id="kamar"
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
            Pilihan Kamar <span className="gradient-text">Agape Kost</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 leading-relaxed">
            Kami menyediakan tipe kamar kost modern dan nyaman yang dirancang khusus untuk memenuhi kebutuhan kenyamanan Anda.
          </p>
        </div>

        {/* Filters */}
        <div
          className={`flex justify-center items-center gap-3 mb-12 flex-wrap transition-all duration-700 delay-100 transform ${
            isSectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-primary-500 text-white shadow-soft hover:bg-primary-600'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
              }`}
            >
              Tipe {filter}
            </button>
          ))}
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room, index) => {
            const waRoomLink = `https://wa.me/${siteConfig.contact.whatsapp}?text=Halo%20Agape%20Kost,%20saya%20tertarik%20untuk%20bertanya/memesan%20kamar%20tipe%20*${room.name}*.`;
            
            return (
              <div
                key={room.id}
                className={`flex flex-col bg-cream-50 rounded-3xl overflow-hidden border border-primary-100/50 shadow-soft card-hover transition-all duration-700 transform ${
                  isSectionInView
                    ? `translate-y-0 opacity-100`
                    : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {/* Card Image Placeholder / CMS Image */}
                <div className="relative h-56 bg-gradient-to-br from-primary-100 via-primary-200/50 to-sage-100 flex items-center justify-center overflow-hidden">
                  {/* Decorative circle */}
                  <div className="absolute w-32 h-32 rounded-full bg-white/30 -top-10 -right-10 blur-xl" />
                  <div className="absolute w-32 h-32 rounded-full bg-white/30 -bottom-10 -left-10 blur-xl" />
                  
                  <div className="flex flex-col items-center gap-2 text-primary-600 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-soft">
                      <Icon name="bed" className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary-500">
                      {room.type} Room
                    </span>
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-soft ${
                        room.available
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-charcoal-100 text-charcoal-500 border border-charcoal-200'
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          room.available ? 'bg-emerald-500 animate-pulse' : 'bg-charcoal-400'
                        }`}
                      />
                      {room.available ? 'Tersedia' : 'Penuh'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Details */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-100/70 text-primary-700 text-xs font-bold uppercase">
                        {room.type}
                      </span>
                      <span className="text-xs font-semibold text-charcoal-400">
                        Ukuran {room.size}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-charcoal-800 mb-3 hover:text-primary-500 transition-colors">
                      {room.name}
                    </h3>
                    
                    <p className="text-sm text-charcoal-500 mb-6 leading-relaxed line-clamp-2">
                      {room.description}
                    </p>

                    {/* Amenities List */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-400 mb-3">
                        Fasilitas Kamar:
                      </h4>
                      <div className="flex flex-col gap-2">
                        {room.amenities.slice(0, 4).map((amenity, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-charcoal-600">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                              <Icon name="check" className="w-3.5 h-3.5" />
                            </div>
                            <span>{amenity}</span>
                          </div>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="text-xs text-primary-600 font-semibold pl-7">
                            + {room.amenities.length - 4} fasilitas lainnya
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-6 border-t border-primary-100/50">
                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-xs font-semibold text-charcoal-400 uppercase">Tarif Sewa</span>
                      <div>
                        <span className="text-2xl font-bold text-primary-600">{room.priceLabel}</span>
                        <span className="text-xs font-medium text-charcoal-400">{room.period}</span>
                      </div>
                    </div>

                    {/* Availability Note */}
                    <div className="flex justify-between items-center mb-4 text-xs">
                      <span className="text-charcoal-400">Status Ketersediaan:</span>
                      <span className={`font-semibold ${room.availableUnits > 0 ? 'text-primary-600' : 'text-charcoal-400'}`}>
                        {room.availableUnits > 0 ? `Sisa ${room.availableUnits} Kamar` : 'Waiting List'}
                      </span>
                    </div>

                    <a
                      href={room.available ? waRoomLink : `https://wa.me/${siteConfig.contact.whatsapp}?text=Halo%20Agape%20Kost,%20apakah%20saya%20bisa%20masuk%20daftar%20antrian%20kamar%20tipe%20*${room.name}*?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full justify-center inline-flex items-center gap-2 font-bold px-6 py-3.5 rounded-full transition-all text-sm shadow-soft ${
                        room.available
                          ? 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-soft-lg'
                          : 'bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-600'
                      }`}
                    >
                      {room.available ? 'Pesan Kamar Ini' : 'Hubungi Pengelola'}
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

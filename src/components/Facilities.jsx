import { useInView } from '../hooks/useInView';
import Icon from './Icon';

export default function Facilities({ facilities }) {
  const [sectionRef, isSectionInView] = useInView({ threshold: 0.05 });

  // Stagger delays mapping helper
  const delayClasses = [
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
    'delay-100',
    'delay-200',
    'delay-300',
    'delay-400',
  ];

  return (
    <section
      id="fasilitas"
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-sage-50/30 via-cream-50 to-cream-100/50"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 transform ${
            isSectionInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900 mb-4">
            Fasilitas <span className="gradient-text">Agape Kost</span>
          </h2>
          <p className="text-base sm:text-lg text-charcoal-500 leading-relaxed">
            Demi kenyamanan hunian Anda, kami menyediakan berbagai fasilitas lengkap yang siap menunjang segala aktivitas harian Anda.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => {
            const delayClass = delayClasses[index % delayClasses.length];
            return (
              <div
                key={facility.id}
                className={`bg-white/80 backdrop-blur-md border border-primary-50 rounded-3xl p-6 shadow-soft card-hover flex flex-col items-start transition-all duration-700 transform ${
                  isSectionInView
                    ? `translate-y-0 opacity-100`
                    : 'translate-y-12 opacity-0'
                } ${delayClass}`}
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-500 mb-6 shadow-sm">
                  <Icon name={facility.icon} className="w-7 h-7" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-charcoal-800 mb-2">
                  {facility.name}
                </h3>
                <p className="text-sm text-charcoal-500 leading-relaxed">
                  {facility.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Facilities from './components/Facilities';
import Location from './components/Location';
import Banner from './components/Banner';
import Footer from './components/Footer';
import Admin from './components/Admin';

import {
  siteConfig as defaultSiteConfig,
  roomTypes as defaultRoomTypes,
  facilities as defaultFacilities,
  location as defaultLocation,
  banners as defaultBanners,
} from './data/cms';

const LOCAL_STORAGE_KEY = 'agape_kost_cms_data';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [cmsData, setCmsData] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Auto-migration: Convert old room types (Single/Double/Suite) to AC / Non AC
        if (parsed.roomTypes) {
          parsed.roomTypes = parsed.roomTypes.map((room) => {
            if (['Single', 'Double', 'Suite'].includes(room.type)) {
              return {
                ...room,
                type: room.id === 'standard-single' ? 'Non AC' : 'AC',
              };
            }
            return room;
          });
        }

        // Merge with defaults to ensure any new fields aren't missing
        return {
          siteConfig: { ...defaultSiteConfig, ...parsed.siteConfig },
          roomTypes: parsed.roomTypes || defaultRoomTypes,
          facilities: parsed.facilities || defaultFacilities,
          location: parsed.location || defaultLocation,
          banners: parsed.banners || defaultBanners,
        };
      }
    } catch (e) {
      console.error('Error loading CMS data from localStorage:', e);
    }
    return {
      siteConfig: defaultSiteConfig,
      roomTypes: defaultRoomTypes,
      facilities: defaultFacilities,
      location: defaultLocation,
      banners: defaultBanners,
    };
  });

  // Track hash changes for simple routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // If going to a landing page section, smooth scroll
      if (window.location.hash && window.location.hash !== '#admin') {
        const element = document.querySelector(window.location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const saveCmsData = (newData) => {
    setCmsData(newData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
  };

  const resetToDefault = () => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal?')) {
      const defaultData = {
        siteConfig: defaultSiteConfig,
        roomTypes: defaultRoomTypes,
        facilities: defaultFacilities,
        location: defaultLocation,
        banners: defaultBanners,
      };
      setCmsData(defaultData);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  };

  const isAdmin = currentHash === '#admin';

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-[#121214] font-sans">
        <Admin
          cmsData={cmsData}
          onSave={saveCmsData}
          onReset={resetToDefault}
          defaultData={{
            siteConfig: defaultSiteConfig,
            roomTypes: defaultRoomTypes,
            facilities: defaultFacilities,
            location: defaultLocation,
            banners: defaultBanners,
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 font-sans">
      <Navbar siteConfig={cmsData.siteConfig} />
      <main>
        <Hero siteConfig={cmsData.siteConfig} />
        <Rooms roomTypes={cmsData.roomTypes} siteConfig={cmsData.siteConfig} />
        <Facilities facilities={cmsData.facilities} />
        <Location location={cmsData.location} />
        <Banner banners={cmsData.banners} />
      </main>
      <Footer siteConfig={cmsData.siteConfig} />
    </div>
  );
}

export default App;

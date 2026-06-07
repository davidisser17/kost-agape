import { useState } from 'react';
import Icon from './Icon';

export default function Admin({ cmsData, onSave, onReset, defaultData }) {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  // Local editable copies of CMS states
  const [siteConfig, setSiteConfig] = useState(cmsData.siteConfig);
  const [roomTypes, setRoomTypes] = useState(cmsData.roomTypes);
  const [facilities, setFacilities] = useState(cmsData.facilities);
  const [location, setLocation] = useState(cmsData.location);
  const [banners, setBanners] = useState(cmsData.banners);

  const [activeTab, setActiveTab] = useState('rooms');
  const [showExportModal, setShowExportModal] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Password salah. Silakan coba lagi.');
    }
  };

  const handleSaveAll = () => {
    const updatedData = {
      siteConfig,
      roomTypes,
      facilities,
      location,
      banners,
    };
    onSave(updatedData);
    alert('Perubahan berhasil disimpan!');
  };

  const handleResetToDefaultLocal = () => {
    onReset();
    // Re-sync local states from the fresh reset
    setSiteConfig(defaultData.siteConfig);
    setRoomTypes(defaultData.roomTypes);
    setFacilities(defaultData.facilities);
    setLocation(defaultData.location);
    setBanners(defaultData.banners);
  };

  // Rooms Helpers
  const updateRoomField = (index, field, value) => {
    const updated = [...roomTypes];
    updated[index] = { ...updated[index], [field]: value };
    setRoomTypes(updated);
  };

  const toggleRoomAvailable = (index) => {
    const updated = [...roomTypes];
    const newStatus = !updated[index].available;
    updated[index] = { 
      ...updated[index], 
      available: newStatus,
      availableUnits: newStatus ? 3 : 0 // Auto set some units if available
    };
    setRoomTypes(updated);
  };

  const handleAddRoom = () => {
    const newRoom = {
      id: `room-${Date.now()}`,
      name: 'Tipe Kamar Baru',
      type: 'AC',
      price: 1500000,
      priceLabel: 'Rp 1.500.000',
      period: '/ bulan',
      size: '3x3 m',
      available: true,
      totalUnits: 5,
      availableUnits: 2,
      description: 'Keterangan lengkap tipe kamar kost baru.',
      amenities: ['Kasur', 'Lemari', 'WiFi'],
    };
    setRoomTypes([...roomTypes, newRoom]);
  };

  const handleDeleteRoom = (id) => {
    if (window.confirm('Yakin ingin menghapus tipe kamar ini?')) {
      setRoomTypes(roomTypes.filter((r) => r.id !== id));
    }
  };

  // Facilities Helpers
  const updateFacilityField = (index, field, value) => {
    const updated = [...facilities];
    updated[index] = { ...updated[index], [field]: value };
    setFacilities(updated);
  };

  // Location Helpers
  const updateNearbyPlace = (index, field, value) => {
    const updatedPlaces = [...location.nearbyPlaces];
    updatedPlaces[index] = { ...updatedPlaces[index], [field]: value };
    setLocation({ ...location, nearbyPlaces: updatedPlaces });
  };

  const handleAddNearbyPlace = () => {
    const newPlace = { name: 'Tempat Baru', distance: '100m', type: 'convenience' };
    setLocation({
      ...location,
      nearbyPlaces: [...location.nearbyPlaces, newPlace],
    });
  };

  const handleDeleteNearbyPlace = (index) => {
    setLocation({
      ...location,
      nearbyPlaces: location.nearbyPlaces.filter((_, i) => i !== index),
    });
  };

  // Banners Helpers
  const updateBannerField = (index, field, value) => {
    const updated = [...banners];
    updated[index] = { ...updated[index], [field]: value };
    setBanners(updated);
  };

  // Generate the CMS.js code output for user to copy-paste
  const generateCMSCode = () => {
    const dataObj = { siteConfig, roomTypes, facilities, location, banners };
    return `// Simpan kode ini di src/data/cms.js untuk merubah data default secara permanen.

export const siteConfig = ${JSON.stringify(siteConfig, null, 2)};

export const roomTypes = ${JSON.stringify(roomTypes, null, 2)};

export const facilities = ${JSON.stringify(facilities, null, 2)};

export const location = ${JSON.stringify(location, null, 2)};

export const banners = ${JSON.stringify(banners, null, 2)};
`;
  };

  // Login view
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#121214] px-6 text-[#e4e4e7]">
        <div className="w-full max-w-md bg-[#1c1c1f] p-8 rounded-3xl border border-[#2a2a2e] shadow-soft-xl">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-md">
              <Icon name="home" className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Agape<span className="text-neutral-400">Kost</span> CMS
            </h1>
            <p className="text-sm text-neutral-400 text-center">Masuk ke panel pengelola landing page</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Password Administrator
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password..."
                className="w-full px-4 py-3.5 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white transition-colors"
                autoFocus
              />
              {loginError && <p className="text-xs text-red-400 mt-2 font-medium">{loginError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-white hover:bg-neutral-200 text-black font-bold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              Masuk ke Dashboard
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="#"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              ← Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard admin layout
  return (
    <div className="min-h-screen flex flex-col bg-[#121214] text-[#e4e4e7]">
      {/* Top Header */}
      <header className="bg-[#1c1c1f] border-b border-[#2a2a2e] px-6 py-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-md">
              <Icon name="home" className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight">
                Agape Kost <span className="text-xs font-semibold text-neutral-400 ml-1">CMS Panel</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
            <a
              href="#"
              className="px-4 py-2 rounded-xl bg-[#252529] hover:bg-[#2e2e33] text-xs font-bold transition-all border border-[#2a2a2e]"
            >
              Lihat Web Halaman
            </a>
            <button
              onClick={() => setShowExportModal(true)}
              className="px-4 py-2 rounded-xl bg-[#252529] hover:bg-[#2e2e33] text-xs font-bold text-neutral-200 transition-all border border-[#2a2a2e]"
            >
              Ekspor File CMS.js
            </button>
            <button
              onClick={handleResetToDefaultLocal}
              className="px-4 py-2 rounded-xl bg-red-950/35 hover:bg-red-900/30 text-red-400 text-xs font-bold transition-all border border-red-900/30"
            >
              Reset Default
            </button>
            <button
              onClick={handleSaveAll}
              className="px-5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-black shadow-md transition-all active:scale-95"
            >
              Simpan Perubahan
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-neutral-400 hover:text-white transition-colors ml-1"
              title="Keluar"
            >
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout (Using robust Flexbox instead of Grid to prevent squishing and overlaps) */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Navigation Tabs (Left Sidebar) */}
        <aside className="w-full lg:w-64 bg-[#1c1c1f] rounded-3xl border border-[#2a2a2e] p-4 lg:sticky lg:top-24 flex-shrink-0 shadow-sm">
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('site')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                activeTab === 'site'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-[#252529] hover:text-white'
              }`}
            >
              <Icon name="home" className="w-4 h-4" />
              Identitas & Kontak
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                activeTab === 'rooms'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-[#252529] hover:text-white'
              }`}
            >
              <Icon name="bed" className="w-4 h-4" />
              Kelola Kamar
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                activeTab === 'facilities'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-[#252529] hover:text-white'
              }`}
            >
              <Icon name="sparkles" className="w-4 h-4" />
              Kelola Fasilitas
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                activeTab === 'location'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-[#252529] hover:text-white'
              }`}
            >
              <Icon name="mapPin" className="w-4 h-4" />
              Kelola Lokasi
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-left transition-all ${
                activeTab === 'banners'
                  ? 'bg-white text-black font-extrabold shadow-md'
                  : 'text-neutral-400 hover:bg-[#252529] hover:text-white'
              }`}
            >
              <Icon name="arrowRight" className="w-4 h-4" />
              Kelola Banner Promo
            </button>
          </nav>
        </aside>

        {/* CMS Edit Panels (Right Area) */}
        <main className="flex-grow w-full bg-[#1c1c1f] rounded-3xl border border-[#2a2a2e] p-6 sm:p-8 shadow-sm overflow-hidden">
          
          {/* TAB 1: SITE CONFIG */}
          {activeTab === 'site' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-white border-b border-[#2a2a2e] pb-4">
                Identitas Kost & Kontak
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Nama Kost </label>
                  <input
                    type="text"
                    value={siteConfig.name}
                    onChange={(e) => setSiteConfig({ ...siteConfig, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Tagline </label>
                  <input
                    type="text"
                    value={siteConfig.tagline}
                    onChange={(e) => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Deskripsi Kost </label>
                <textarea
                  value={siteConfig.description}
                  onChange={(e) => setSiteConfig({ ...siteConfig, description: e.target.value })}
                  rows="4"
                  className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                />
              </div>

              <div className="h-px bg-[#2a2a2e] my-6" />

              <h3 className="text-base font-bold text-white mb-4">Informasi Kontak & WA</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Telp Tampilan </label>
                  <input
                    type="text"
                    value={siteConfig.contact.phone}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, phone: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> WA (Nomor Saja) </label>
                  <input
                    type="text"
                    value={siteConfig.contact.whatsapp}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, whatsapp: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Gunakan kode negara tanpa +, misal: 628123456789</p>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Email </label>
                  <input
                    type="email"
                    value={siteConfig.contact.email}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      contact: { ...siteConfig.contact, email: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Alamat Fisik </label>
                <input
                  type="text"
                  value={siteConfig.contact.address}
                  onChange={(e) => setSiteConfig({
                    ...siteConfig,
                    contact: { ...siteConfig.contact, address: e.target.value }
                  })}
                  className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                />
              </div>

              <div className="h-px bg-[#2a2a2e] my-6" />

              <h3 className="text-base font-bold text-white mb-4">Tautan Media Sosial</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Instagram </label>
                  <input
                    type="text"
                    value={siteConfig.socials.instagram}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      socials: { ...siteConfig.socials, instagram: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Facebook </label>
                  <input
                    type="text"
                    value={siteConfig.socials.facebook}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      socials: { ...siteConfig.socials, facebook: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> TikTok </label>
                  <input
                    type="text"
                    value={siteConfig.socials.tiktok}
                    onChange={(e) => setSiteConfig({
                      ...siteConfig,
                      socials: { ...siteConfig.socials, tiktok: e.target.value }
                    })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROOM TYPES */}
          {activeTab === 'rooms' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#2a2a2e] pb-4">
                <h2 className="text-lg font-black text-white">Kelola Tipe Kamar Kost</h2>
                <button
                  onClick={handleAddRoom}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <Icon name="check" className="w-3.5 h-3.5" /> Tambah Kamar
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {roomTypes.map((room, idx) => (
                  <div
                    key={room.id}
                    className="bg-[#222226] border border-[#2a2a2e] rounded-2xl p-5 relative shadow-sm"
                  >
                    {/* Header Controls inside card */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#2a2a2e]">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold text-neutral-400 bg-[#121214] px-2.5 py-1 rounded-lg">Kamar {idx + 1}</span>
                        <input
                          type="text"
                          value={room.name}
                          onChange={(e) => updateRoomField(idx, 'name', e.target.value)}
                          className="font-bold text-white bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-white focus:outline-none px-1 text-base w-48 sm:w-64"
                        />
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {/* Toggle Availability */}
                        <button
                          onClick={() => toggleRoomAvailable(idx)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                            room.available
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50'
                              : 'bg-[#121214] text-neutral-400 border-[#2a2a2e]'
                          }`}
                        >
                          <span className={`h-2 w-2 rounded-full ${room.available ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-500'}`} />
                          {room.available ? 'Tersedia' : 'Penuh'}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors font-semibold px-2 py-1 hover:bg-red-950/20 rounded-lg"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    {/* Card Body Forms (Responsive Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Tipe Kamar</label>
                        <select
                          value={room.type}
                          onChange={(e) => updateRoomField(idx, 'type', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        >
                          <option value="AC">AC</option>
                          <option value="Non AC">Non AC</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Ukuran Kamar</label>
                        <input
                          type="text"
                          value={room.size}
                          onChange={(e) => updateRoomField(idx, 'size', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                          placeholder="misal: 3x3 m"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Harga (Teks)</label>
                        <input
                          type="text"
                          value={room.priceLabel}
                          onChange={(e) => updateRoomField(idx, 'priceLabel', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                          placeholder="misal: Rp 1.500.000"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Harga (Angka Baku)</label>
                        <input
                          type="number"
                          value={room.price}
                          onChange={(e) => updateRoomField(idx, 'price', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Sisa Unit Kamar</label>
                        <input
                          type="number"
                          value={room.availableUnits}
                          onChange={(e) => updateRoomField(idx, 'availableUnits', parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Deskripsi Singkat</label>
                        <input
                          type="text"
                          value={room.description}
                          onChange={(e) => updateRoomField(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Amenities list */}
                    <div className="mt-4">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Fasilitas Kamar (Pisahkan dengan koma)</label>
                      <input
                        type="text"
                        value={room.amenities.join(', ')}
                        onChange={(e) => updateRoomField(idx, 'amenities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                        className="w-full px-3 py-2.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        placeholder="Kasur, AC, WiFi, Kamar Mandi Dalam"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FACILITIES */}
          {activeTab === 'facilities' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-white border-b border-[#2a2a2e] pb-4">
                Kelola Fasilitas Kost Umum
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {facilities.map((fac, idx) => (
                  <div
                    key={fac.id}
                    className="bg-[#222226] border border-[#2a2a2e] rounded-2xl p-4 flex gap-4"
                  >
                    <div className="flex-shrink-0">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Ikon</label>
                      <select
                        value={fac.icon}
                        onChange={(e) => updateFacilityField(idx, 'icon', e.target.value)}
                        className="p-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none w-20"
                      >
                        <option value="wifi">WiFi</option>
                        <option value="shield">Security</option>
                        <option value="car">Parkir</option>
                        <option value="shirt">Laundry</option>
                        <option value="utensils">Dapur</option>
                        <option value="droplets">Air</option>
                        <option value="mountain">Rooftop</option>
                        <option value="sparkles">Cleaning</option>
                      </select>
                    </div>

                    <div className="flex-grow space-y-2.5">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Nama Fasilitas</label>
                        <input
                          type="text"
                          value={fac.name}
                          onChange={(e) => updateFacilityField(idx, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">Keterangan</label>
                        <input
                          type="text"
                          value={fac.description}
                          onChange={(e) => updateFacilityField(idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LOCATION */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-white border-b border-[#2a2a2e] pb-4">
                Kelola Peta & Tempat Terdekat
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2"> Google Maps Embed URL (src iframe) </label>
                  <input
                    type="text"
                    value={location.mapEmbedUrl}
                    onChange={(e) => setLocation({ ...location, mapEmbedUrl: e.target.value })}
                    className="w-full px-4 py-3 bg-[#121214] border border-[#2a2a2e] rounded-xl text-white focus:outline-none focus:border-white text-xs"
                  />
                  <p className="text-[10px] text-neutral-500 mt-1">Salin alamat URL yang ada di dalam parameter `src` dari tag iframe Google Maps.</p>
                </div>
              </div>

              <div className="h-px bg-[#2a2a2e] my-6" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Tempat Terdekat & Akses</h3>
                <button
                  onClick={handleAddNearbyPlace}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all active:scale-95"
                >
                  + Tambah Tempat
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {location.nearbyPlaces.map((place, idx) => (
                  <div
                    key={idx}
                    className="bg-[#222226] border border-[#2a2a2e] rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 flex-wrap flex-grow w-full sm:w-auto">
                      <select
                        value={place.type}
                        onChange={(e) => updateNearbyPlace(idx, 'type', e.target.value)}
                        className="px-2 py-1.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none w-32"
                      >
                        <option value="university">🎓 Universitas</option>
                        <option value="shopping">🛒 Perbelanjaan</option>
                        <option value="hospital">🏥 Rumah Sakit</option>
                        <option value="transport">🚌 Transportasi</option>
                        <option value="convenience">🏪 Minimarket</option>
                        <option value="worship">🕌 Ibadah</option>
                      </select>

                      <input
                        type="text"
                        value={place.name}
                        onChange={(e) => updateNearbyPlace(idx, 'name', e.target.value)}
                        className="px-3 py-1.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none flex-grow min-w-[150px]"
                        placeholder="Nama tempat/fasilitas..."
                      />

                      <input
                        type="text"
                        value={place.distance}
                        onChange={(e) => updateNearbyPlace(idx, 'distance', e.target.value)}
                        className="px-3 py-1.5 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none w-24"
                        placeholder="Jarak: 200m"
                      />
                    </div>

                    <button
                      onClick={() => handleDeleteNearbyPlace(idx)}
                      className="text-xs text-red-400 hover:text-red-350 transition-colors font-semibold px-2.5 py-1 hover:bg-red-950/20 rounded-lg sm:self-center self-end"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BANNERS */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-white border-b border-[#2a2a2e] pb-4">
                Kelola Banner Promosi / Info
              </h2>

              <div className="flex flex-col gap-6">
                {banners.map((banner, idx) => (
                  <div
                    key={banner.id}
                    className="bg-[#222226] border border-[#2a2a2e] rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-[#2a2a2e]">
                      <h3 className="font-bold text-white">Banner #{idx + 1}: {banner.title}</h3>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={banner.active}
                          onChange={(e) => updateBannerField(idx, 'active', e.target.checked)}
                          className="w-4 h-4 text-white bg-[#121214] border-[#2a2a2e] rounded focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-xs font-bold text-neutral-300">Tampilkan Banner</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Judul Utama</label>
                        <input
                          type="text"
                          value={banner.title}
                          onChange={(e) => updateBannerField(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Sub-judul / Tag</label>
                        <input
                          type="text"
                          value={banner.subtitle}
                          onChange={(e) => updateBannerField(idx, 'subtitle', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Isi Keterangan Promo</label>
                      <textarea
                        value={banner.description}
                        onChange={(e) => updateBannerField(idx, 'description', e.target.value)}
                        rows="2"
                        className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Tombol CTA (Teks)</label>
                        <input
                          type="text"
                          value={banner.ctaText}
                          onChange={(e) => updateBannerField(idx, 'ctaText', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Tautan Tombol CTA</label>
                        <input
                          type="text"
                          value={banner.ctaLink}
                          onChange={(e) => updateBannerField(idx, 'ctaLink', e.target.value)}
                          className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-neutral-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Varian Tampilan</label>
                      <select
                        value={banner.variant}
                        onChange={(e) => updateBannerField(idx, 'variant', e.target.value)}
                        className="px-3 py-2 bg-[#121214] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none w-48"
                      >
                        <option value="gradient">Gradient (Aksen Hitam/Primary)</option>
                        <option value="solid">Muted Solid (Sage Green)</option>
                        <option value="image">Gambar Latar Belakang (Image)</option>
                      </select>
                    </div>

                    {banner.variant === 'image' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-[#121214] border border-[#2a2a2e] rounded-xl">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Upload File Gambar</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  updateBannerField(idx, 'bgImage', reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full text-xs text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white file:text-black hover:file:bg-neutral-200 cursor-pointer file:cursor-pointer"
                          />
                          <p className="text-[9px] text-neutral-500 mt-1">Disarankan ukuran file kecil (&lt; 1MB) agar penyimpanan browser lancar.</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Atau Paste URL Gambar</label>
                          <input
                            type="text"
                            value={banner.bgImage || ''}
                            onChange={(e) => updateBannerField(idx, 'bgImage', e.target.value)}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full px-3 py-2 bg-[#222226] border border-[#2a2a2e] rounded-lg text-white text-xs focus:outline-none"
                          />
                        </div>
                        
                        {banner.bgImage && (
                          <div className="md:col-span-2 mt-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Pratinjau Gambar Latar</label>
                            <div className="relative h-28 w-full rounded-xl overflow-hidden border border-[#2a2a2e]">
                              <img src={banner.bgImage} alt="Preview" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => updateBannerField(idx, 'bgImage', '')}
                                className="absolute top-2 right-2 bg-black/60 hover:bg-black p-1.5 rounded-full text-white text-xs transition-colors"
                              >
                                Hapus Gambar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Ekspor Modal Overlay */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-[#1c1c1f] rounded-3xl border border-[#2a2a2e] p-6 shadow-soft-xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-[#2a2a2e] pb-4 mb-4">
              <h2 className="text-base font-black text-white">Ekspor Data Berkas CMS.js</h2>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-neutral-400 mb-4">
              Salin seluruh kode di bawah ini lalu tempelkan (*paste*) ke dalam berkas <code className="text-white bg-[#121214] px-1.5 py-0.5 rounded border border-[#2a2a2e]">src/data/cms.js</code> untuk menyimpan perubahan yang telah Anda buat di atas secara permanen ke dalam kode sumber project.
            </p>

            <textarea
              readOnly
              value={generateCMSCode()}
              className="flex-1 w-full bg-[#121214] border border-[#2a2a2e] rounded-xl p-4 font-mono text-[10px] leading-relaxed text-neutral-300 focus:outline-none select-all"
              onClick={(e) => e.target.select()}
            />

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#2a2a2e]">
              <span className="text-[10px] text-neutral-500 font-bold">Tekan Ctrl+A untuk menyalin semua kode.</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generateCMSCode());
                  alert('Kode CMS berhasil disalin ke papan klip!');
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all active:scale-95"
              >
                Salin ke Clipboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

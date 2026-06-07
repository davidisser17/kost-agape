/**
 * CMS Data Layer
 * 
 * This file centralizes all content data that would typically come from a CMS.
 * When integrating with a headless CMS (e.g., Strapi, Sanity, Contentful),
 * replace these static exports with API fetches.
 * 
 * Structure:
 * - rooms: Available rooms with type, price, amenities, and availability status
 * - facilities: Building/complex facilities  
 * - location: Map info, address, nearby landmarks
 * - banners: Promotional banners / announcements
 * - siteConfig: Global site configuration (name, contact, socials)
 */

// ============================================================
// SITE CONFIGURATION
// ============================================================
export const siteConfig = {
  name: "Agape Kost",
  tagline: "Hunian Nyaman, Seperti Rumah Sendiri",
  description:
    "Temukan kenyamanan tinggal di Agape Kost dengan fasilitas modern, lingkungan aman, dan lokasi strategis. Kami menyediakan hunian berkualitas untuk Anda.",
  contact: {
    phone: "+62 812-3456-7890",
    whatsapp: "6281234567890",
    email: "info@agapekost.com",
    address: "Jl. Contoh Raya No. 123, Kota Bandung, Jawa Barat 40123",
  },
  socials: {
    instagram: "https://instagram.com/agapekost",
    facebook: "https://facebook.com/agapekost",
    tiktok: "https://tiktok.com/@agapekost",
  },
};

// ============================================================
// ROOMS (Kamar Available)
// ============================================================
export const roomTypes = [
  {
    id: "standard-single",
    name: "Standard Single",
    type: "Non AC",
    price: 1500000,
    priceLabel: "Rp 1.500.000",
    period: "/ bulan",
    size: "3x3 m",
    available: true,
    totalUnits: 10,
    availableUnits: 3,
    image: null, // Will use placeholder or generated image
    amenities: [
      "Kasur Single",
      "Lemari Pakaian",
      "Meja Belajar",
      "WiFi Gratis",
      "Kamar Mandi Dalam",
    ],
    description:
      "Kamar nyaman untuk satu orang dengan fasilitas lengkap dan kamar mandi dalam.",
  },
  {
    id: "deluxe-single",
    name: "Deluxe Single",
    type: "AC",
    price: 2000000,
    priceLabel: "Rp 2.000.000",
    period: "/ bulan",
    size: "3.5x4 m",
    available: true,
    totalUnits: 8,
    availableUnits: 2,
    image: null,
    amenities: [
      "Kasur Single Premium",
      "Lemari Pakaian",
      "Meja Belajar",
      "WiFi Gratis",
      "Kamar Mandi Dalam",
      "AC",
      "TV LED 32\"",
    ],
    description:
      "Kamar luas dengan AC dan TV untuk kenyamanan ekstra Anda.",
  },
  {
    id: "suite-double",
    name: "Suite Double",
    type: "AC",
    price: 2800000,
    priceLabel: "Rp 2.800.000",
    period: "/ bulan",
    size: "4x5 m",
    available: true,
    totalUnits: 5,
    availableUnits: 1,
    image: null,
    amenities: [
      "Kasur Double",
      "Lemari Pakaian Besar",
      "Meja Kerja",
      "WiFi Gratis",
      "Kamar Mandi Dalam",
      "AC",
      "TV LED 43\"",
      "Kulkas Mini",
      "Balkon",
    ],
    description:
      "Kamar suite luas dengan balkon pribadi, cocok untuk pasangan atau yang menginginkan ruang lebih.",
  },
  {
    id: "premium-single",
    name: "Premium Single",
    type: "AC",
    price: 2500000,
    priceLabel: "Rp 2.500.000",
    period: "/ bulan",
    size: "3.5x4 m",
    available: false,
    totalUnits: 6,
    availableUnits: 0,
    image: null,
    amenities: [
      "Kasur Single Premium",
      "Walk-in Closet",
      "Meja Kerja Ergonomis",
      "WiFi Gratis",
      "Kamar Mandi Dalam (Shower & Bathtub)",
      "AC",
      "Smart TV 43\"",
      "Kulkas Mini",
    ],
    description:
      "Kamar premium dengan interior modern dan fasilitas high-end.",
  },
];

// ============================================================
// FACILITIES (Fasilitas)
// ============================================================
export const facilities = [
  {
    id: "wifi",
    name: "WiFi Fiber Optic",
    description: "Internet cepat hingga 100 Mbps tersedia di seluruh area kost.",
    icon: "wifi",
  },
  {
    id: "security",
    name: "Keamanan 24 Jam",
    description: "CCTV dan satpam bertugas sepanjang hari untuk keamanan Anda.",
    icon: "shield",
  },
  {
    id: "parking",
    name: "Area Parkir",
    description: "Parkir motor dan mobil yang aman dan tertata.",
    icon: "car",
  },
  {
    id: "laundry",
    name: "Laundry",
    description: "Layanan laundry tersedia dengan harga terjangkau.",
    icon: "shirt",
  },
  {
    id: "kitchen",
    name: "Dapur Bersama",
    description: "Dapur bersama lengkap dengan peralatan masak.",
    icon: "utensils",
  },
  {
    id: "water",
    name: "Air & Listrik",
    description: "Air bersih dan listrik sudah termasuk dalam biaya sewa.",
    icon: "droplets",
  },
  {
    id: "rooftop",
    name: "Rooftop Lounge",
    description: "Area bersantai di rooftop dengan pemandangan kota.",
    icon: "mountain",
  },
  {
    id: "cleaning",
    name: "Cleaning Service",
    description: "Area umum dibersihkan setiap hari untuk kenyamanan bersama.",
    icon: "sparkles",
  },
];

// ============================================================
// LOCATION
// ============================================================
export const location = {
  address: "Jl. Contoh Raya No. 123, Kota Bandung, Jawa Barat 40123",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798467115532!2d107.60981331477228!3d-6.914744395003473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64e5f2ef473%3A0x5e4c5c6d36974a1a!2sBandung%2C%20Kota%20Bandung%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1234567890",
  latitude: -6.9147,
  longitude: 107.6098,
  nearbyPlaces: [
    { name: "Universitas Padjadjaran", distance: "500m", type: "university" },
    { name: "Mall Paris Van Java", distance: "1.2 km", type: "shopping" },
    { name: "RS Hasan Sadikin", distance: "800m", type: "hospital" },
    { name: "Halte TransMetro Bandung", distance: "200m", type: "transport" },
    { name: "Minimarket", distance: "100m", type: "convenience" },
    { name: "Masjid Al-Ikhlas", distance: "150m", type: "worship" },
  ],
};

// ============================================================
// BANNERS
// ============================================================
export const banners = [
  {
    id: "promo-1",
    title: "Promo Awal Tahun! 🎉",
    subtitle: "Diskon 15% untuk 3 bulan pertama",
    description:
      "Dapatkan potongan harga spesial untuk penghuni baru yang mendaftar di bulan ini. Berlaku untuk semua tipe kamar.",
    ctaText: "Hubungi Kami",
    ctaLink: `https://wa.me/6281234567890?text=Halo, saya tertarik dengan promo awal tahun Agape Kost`,
    active: true,
    variant: "gradient", // gradient | solid | image
  },
  {
    id: "referral",
    title: "Program Referral",
    subtitle: "Ajak teman, dapat cashback!",
    description:
      "Ajak teman Anda untuk tinggal di Agape Kost dan dapatkan cashback Rp 200.000 untuk setiap referral yang berhasil.",
    ctaText: "Pelajari Lebih Lanjut",
    ctaLink: "#",
    active: true,
    variant: "solid",
  },
];

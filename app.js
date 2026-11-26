(function () {
  "use strict";

  const CART_KEY = "nk_cart_v1";
  const ORDERS_KEY = "nk_orders_v1";
  const CHANNEL_NAME = "nada_klasik_realtime_v1";
  const DEFAULT_COURIER_FEE = 150000;

  // Data Katalog Produk Audio Retro (23 Item Planet Vinyl)
  const retroAudioCatalog = [
    {
      sku: "RA-01",
      name: "JVC RC-M70 Stereo Boombox",
      category: "Boombox Stereo",
      era: "1983",
      condition: "Restored",
      specs: "Dual Stereo Speakers | Cassette Deck | FM/AM Tuner",
      desc: "Boombox stereo portabel ikonik dengan dek kaset analog mekanis, equalizer grafis geser, serta meter VU analog presisi.",
      fullDesc: "JVC RC-M70 keluaran 1983 adalah salah satu boombox stereo portabel paling legendaris di era kejayaan kaset pita. Unit ini telah melalui restorasi menyeluruh pada sabuk penggerak dek kaset, pembersihan potensiometer geser, serta kalibrasi tuner FM/AM agar penangkapan sinyal tetap jernih. Dilengkapi sepasang speaker full-range bertenaga dengan karakter bass punchy dan dua VU meter analog responsif.",
      priceNum: 4800000,
      price: "Rp 4.800.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Boombox_cassette_player_on_tabletop_033f58c8.jpg"
    },
    {
      sku: "RA-02",
      name: "McIntosh MC275 Vacuum Tube Amplifier",
      category: "Amplifier Tabung",
      era: "1972",
      condition: "Mint",
      specs: "KT88 Quad Tubes | Class-A/AB | Output 2x75W",
      desc: "Power amplifier tabung vakum legendaris dengan pendaran filamen hangat yang menghasilkan detail vokal lembut dan natural.",
      fullDesc: "McIntosh MC275 adalah mahakarya teknik audio tabung vakum yang memadukan kekuatan 2x75 Watt dengan musikalitas khas Class-A/AB. Menggunakan empat tabung daya KT88 berpadu trafo output Unity Coupled Circuit, amplifier ini menyajikan panggung suara luas, mid-range vokal yang intim, dan distorsi harmonik yang sangat rendah. Kondisi Mint dengan tabung terukur seimbang.",
      priceNum: 28500000,
      price: "Rp 28.500.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Glowing_vacuum_tube_amplifier_8442267e.jpg"
    },
    {
      sku: "RA-03",
      name: "Dansette Major Deluxe Suitcase Turntable",
      category: "Turntable Portabel",
      era: "1968",
      condition: "Restored",
      specs: "3-Speed 33/45/78 | Built-in Mono Speaker | Koper",
      desc: "Pemutar piringan hitam model koper portabel era 60-an yang ringkas dengan penguat internal dan tiga kecepatan putar.",
      fullDesc: "Dansette Major Deluxe membawa nuansa otentik ruang musik Inggris akhir tahun 1960-an dalam balutan koper portabel yang elegan. Mendukung tiga kecepatan putar (33 1/3, 45, dan 78 RPM) sehingga cocok untuk koleksi piringan hitam LP maupun single 7 inci. Penguat internal dan speaker bawaannya telah direstorasi dengan jarum stylus baru.",
      priceNum: 3900000,
      price: "Rp 3.900.000",
      stock: "Stok: 2 Unit",
      stockMax: 2,
      image: "audio retro/Portable_suitcase_turntable_on_t…_a1ba6bc2.jpg"
    },
    {
      sku: "RA-04",
      name: "Sony CDP-507ESD Compact Disc Player",
      category: "Pemutar CD Klasik",
      era: "1988",
      condition: "Mint",
      specs: "Dual 16-Bit DAC | VFD Display | RCA Line Out",
      desc: "Pemutar Compact Disc generasi awal era 80-an dengan layar fluoresen berpendar klasik dan konverter digital-analog natural.",
      fullDesc: "Sony CDP-507ESD mewakili era keemasan pemutar CD audiophile dengan sasis anti-getar kokoh dan mekanisme optik presisi tinggi. Dibekali arsitektur Dual 16-Bit DAC untuk separasi kanal yang bersih dan dinamika suara hangat tanpa kesan tajam berlebih. Layar VFD berpendar terang dan pembacaan disc sangat cepat.",
      priceNum: 5200000,
      price: "Rp 5.200.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Retro_CD_player_glowing_display_aafebad4.jpg"
    },
    {
      sku: "RA-05",
      name: "Thorens TD-160 Belt-Drive Turntable",
      category: "Turntable / Piringan Hitam",
      era: "1976",
      condition: "Mint",
      specs: "Suspended Sub-Chassis | S-Tonearm | Walnut Plinth",
      desc: "Meja putar piringan hitam suspensi pegas dengan alas kayu kenari solid dan tonearm presisi rendah resonansi untuk audiophile.",
      fullDesc: "Thorens TD-160 adalah standar emas turntable belt-drive asal Swiss dengan sistem suspensi sub-chassis tiga pegas yang efektif meredam getaran lantai. Alas kayu kenari (walnut plinth) tampil mulus berpadu platter aluminium berat dan tonearm presisi. Ideal untuk penikmat piringan hitam yang mengutamakan kestabilan pitch dan detail analog murni.",
      priceNum: 11400000,
      price: "Rp 11.400.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Turntable_playing_vinyl_record_bb6caab7.jpg"
    },
    {
      sku: "RA-06",
      name: "Marantz Model 7C Vacuum Tube Preamplifier",
      category: "Preamplifier Tabung",
      era: "1974",
      condition: "Collector",
      specs: "12AX7 Tube Stage | Rotary Selector | Phono MM",
      desc: "Preamplifier tabung klasik dengan kenop putar aluminium presisi dan tahap penguat phono RIAA untuk memaksimalkan dinamika sinyal.",
      fullDesc: "Marantz Model 7C dikenal luas sebagai salah satu preamplifier tabung paling musikal sepanjang sejarah audio hi-fi. Mengandalkan enam tabung 12AX7 untuk tahap phono RIAA dan line stage, unit ini menghadirkan tekstur suara tiga dimensi yang kaya dan organik. Panel depan aluminium berukir rapi dengan seluruh kenop selektor bekerja presisi.",
      priceNum: 19500000,
      price: "Rp 19.500.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vacuum_tube_preamplifier_with_dials_561687b2.jpg"
    },
    {
      sku: "RA-07",
      name: "Panasonic RS-805US 8-Track Tape Deck",
      category: "Pemutar Pita 8-Track",
      era: "1971",
      condition: "Restored",
      specs: "4-Program Auto Track | Wood Trim | Line Out",
      desc: "Dek pemutar kartrid pita 8-track langka dari era awal 70-an beraksen panel kayu lengkap dengan indikator trek mekanis.",
      fullDesc: "Panasonic RS-805US adalah pemutar kartrid pita 8-track klasik yang jarang ditemui dalam kondisi prima. Dilengkapi fitur perpindahan otomatis antar 4 program lagu, lampu indikator program yang menyala hangat, serta bodi beraksen kayu walnut khas ruang keluarga tahun 70-an. Head magnetik dan motor telah dibersihkan serta dikalibrasi ulang.",
      priceNum: 6200000,
      price: "Rp 6.200.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_8-track_tape_player_disp…_bb5a9209.jpg"
    },
    {
      sku: "RA-08",
      name: "Koss Pro/4AA Studio Monitor Headphones",
      category: "Headphone Vintage",
      era: "1975",
      condition: "Mint",
      specs: "Closed-Back Dynamic | 250 Ohm | 6.35mm Jack",
      desc: "Headphone monitor studio tertutup legendaris dengan bantalan telinga tebal dan isolasi akustik rapat untuk monitoring analog.",
      fullDesc: "Koss Pro/4AA adalah headphone monitor studio ikonik yang menjadi andalan teknisi rekaman dan stasiun radio di era 1970-an. Dengan impedansi 250 Ohm dan desain closed-back berisolasi tinggi, headphone ini mampu memblokir kebisingan luar sekaligus menyajikan respons frekuensi akurat. Menggunakan konektor jack stereo 6.35mm yang siap dipasangkan ke receiver atau amplifier klasik.",
      priceNum: 3100000,
      price: "Rp 3.100.000",
      stock: "Stok: 2 Unit",
      stockMax: 2,
      image: "audio retro/Vintage_audiophile_headphones_in…_8a78caf3.jpg"
    },
    {
      sku: "RA-09",
      name: "Sharp GF-777 Stereo Cassette Recorder",
      category: "Boombox & Perekam",
      era: "1982",
      condition: "Restored",
      specs: "Dual Cassette Deck | Super Woofer | 4-Band Radio",
      desc: "Boombox sekaligus perekam kaset pita bertenaga besar dengan dek ganda, tombol mekanis kokoh, dan kontrol nada terpisah.",
      fullDesc: "Sharp GF-777 dijuluki sebagai salah satu raja boombox era 80-an berkat dimensinya yang gagah dan keluaran suara bertenaga besar. Memiliki dua dek kaset untuk pemutaran dan dubbing, sistem Super Woofer dengan pengaturan level bass independen, serta radio 4-band. Seluruh mekanisme tombol dan dek telah direstorasi hingga siap pakai.",
      priceNum: 5750000,
      price: "Rp 5.750.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_cassette_recorder_boombox_08533eea.jpg"
    },
    {
      sku: "RA-10",
      name: "ADC Sound Shaper Ten Graphic Equalizer",
      category: "Equalizer Analog",
      era: "1984",
      condition: "Mint",
      specs: "10-Band Stereo | ±12dB Slider | LED Level Meter",
      desc: "Equalizer grafis stereo 10-band per kanal dengan deretan slider presisi dan lampu indikator LED untuk kalibrasi frekuensi.",
      fullDesc: "ADC Sound Shaper Ten memberikan kendali penuh atas karakter akustik ruangan melalui 10-band equalizer stereo per kanal dengan rentang penyesuaian ±12dB. Setiap slider dilengkapi lampu LED yang memudahkan pengaturan bahkan di ruangan temaram. Sangat efektif untuk menyempurnakan respons frekuensi sistem hi-fi vintage Anda.",
      priceNum: 4400000,
      price: "Rp 4.400.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_graphic_equalizer_with_l…_929dbd4a.jpg"
    },
    {
      sku: "RA-11",
      name: "Wurlitzer 2200 Neon Vinyl Jukebox",
      category: "Jukebox Kolektor",
      era: "1958",
      condition: "Collector",
      specs: "100-Selection 45 RPM | Tube Amp | Neon Arch",
      desc: "Mesin jukebox klasik berhias lengkungan lampu neon warna-warni dengan mekanisme pemilih piringan hitam 45 RPM otomatis.",
      fullDesc: "Wurlitzer 2200 tahun 1958 adalah barang koleksi tingkat museum yang menghadirkan atmosfer diner dan lounge klasik Amerika langsung ke ruangan Anda. Mekanisme carousel otomatisnya mampu menampung hingga 50 piringan hitam 45 RPM (100 pilihan lagu sisi A/B), ditenagai amplifier tabung internal dan dihiasi lengkungan neon berpendar memukau.",
      priceNum: 85000000,
      price: "Rp 85.000.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_jukebox_glowing_with_neon_f464d3cb.jpg"
    },
    {
      sku: "RA-12",
      name: "Sony Walkman TPS-L2 Portable Cassette",
      category: "Pemutar Kaset Portabel",
      era: "1981",
      condition: "Restored",
      specs: "Bodi Logam | Dual Headphone Jack | Hotline Mic",
      desc: "Pemutar kaset saku portabel legendaris berbalut sasis logam kokoh dengan keluaran headphone ganda dan motor pita stabil.",
      fullDesc: "Sony Walkman TPS-L2 adalah ikon budaya pop yang merevolusi cara orang mendengarkan musik secara personal. Hadir dengan bodi logam biru-perak khas, dua jack headphone 3.5mm untuk mendengarkan musik berdua, serta tombol Hotline oranye ikonik. Motor pemutar, pinch roller, dan sabuk karet telah diganti baru agar kecepatan putar tetap akurat.",
      priceNum: 4200000,
      price: "Rp 4.200.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_portable_cassette_player…_dd486fd7.jpg"
    },
    {
      sku: "RA-13",
      name: "Akai GX-4000D Reel-to-Reel Tape Deck",
      category: "Reel-to-Reel Tape",
      era: "1977",
      condition: "Restored",
      specs: "7-Inch Open Reel | Glass & X'tal Head | Dual VU",
      desc: "Dek pita magnetik open-reel 7 inci kelas studio dengan head GX tahan aus, dua VU meter analog besar, dan panel kayu klasik.",
      fullDesc: "Akai GX-4000D adalah deck pita open-reel 7 inci yang terkenal tangguh berkat teknologi Glass & X'tal Ferrite (GX) Head yang nyaris bebas aus. Dilengkapi dua VU meter analog besar untuk memantau level perekaman dan pemutaran secara presisi, serta kabinet samping kayu walnut yang menawan. Mendukung kecepatan 3 3/4 dan 7 1/2 IPS.",
      priceNum: 14800000,
      price: "Rp 14.800.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_reel_tape_deck_displayed_08edf436.jpg"
    },
    {
      sku: "RA-14",
      name: "RCA 44-BX Broadcast Ribbon Microphone",
      category: "Mikrofon Studio",
      era: "1962",
      condition: "Collector",
      specs: "Figure-8 Polar | Ribbon Transducer | Boom Arm",
      desc: "Mikrofon pita klasik era keemasan penyiaran radio lengkap dengan lengan penyangga, ideal untuk karakter vokal hangat.",
      fullDesc: "RCA 44-BX adalah mikrofon ribbon legendaris yang membentuk suara vokal dan instrumen tiup di studio rekaman serta stasiun radio klasik. Dengan pola tangkap Figure-8 (bidirectional) dan pita aluminium ultra-tipis, mikrofon ini menghasilkan karakter mid-low yang penuh, halus, dan minim sibilance. Disertakan lengkap dengan boom arm bergaya studio antik.",
      priceNum: 8900000,
      price: "Rp 8.900.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_ribbon_microphone_on_arm_cd7fc6df.jpg"
    },
    {
      sku: "RA-15",
      name: "Ashly XR-1001 Analog Crossover Processor",
      category: "Prosesor Audio Studio",
      era: "1979",
      condition: "Restored",
      specs: "2-Way/3-Way Active | 24dB/Octave | 19\" Rackmount",
      desc: "Unit pemisah frekuensi aktif analog rak 19 inci untuk sistem tata suara multi-jalur dengan kenop putar presisi.",
      fullDesc: "Ashly XR-1001 merupakan crossover aktif analog standar studio yang dirancang untuk membagi spektrum frekuensi secara akurat ke amplifier subwoofer, mid-range, dan tweeter. Menggunakan filter Linkwitz-Riley 24dB/octave dalam format rackmount 19 inci yang kokoh. Seluruh kenop putar dan sakelar telah dibersihkan agar bebas noise.",
      priceNum: 6500000,
      price: "Rp 6.500.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_studio_crossover_process…_d7f181f8.jpg"
    },
    {
      sku: "RA-16",
      name: "Neve 8068 Analog Studio Mixing Console",
      category: "Konsol Mixer Analog",
      era: "1978",
      condition: "Collector",
      specs: "Discrete Class-A | 3-Band EQ | VU Meter Bridge",
      desc: "Meja mixing konsol rekaman analog diskrit dengan preamp ikonik yang memberi warna saturasi musik era keemasan.",
      fullDesc: "Neve 8068 adalah konsol rekaman analog legendaris yang digunakan untuk memproduksi ratusan album rock dan jazz klasik dunia. Dibangun sepenuhnya dengan sirkuit diskrit Class-A, trafo Marinair, serta 3-band EQ musikal yang mampu memberikan kehangatan dan bobot saturasi harmonik khas rekaman analog sejati.",
      priceNum: 54000000,
      price: "Rp 54.000.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_studio_mixing_console_desk_70f1ee6d.jpg"
    },
    {
      sku: "RA-17",
      name: "Zenith Royal 500 Transistor Radio",
      category: "Radio Portabel",
      era: "1966",
      condition: "Mint",
      specs: "8-Transistor Circuit | AM/FM Band | Telescopic Antenna",
      desc: "Radio transistor saku ringkas dengan grille depan klasik, antena teleskopik krom, dan penangkapan sinyal jernih.",
      fullDesc: "Zenith Royal 500 menghadirkan desain industrial Amerika pertengahan abad ke-20 dalam ukuran portabel yang menawan. Menggunakan sirkuit 8-transistor sensitif untuk menangkap siaran AM dan FM dengan kejernihan suara vokal yang khas, dilengkapi antena teleskopik krom mulus dan grille depan bernuansa retro.",
      priceNum: 1850000,
      price: "Rp 1.850.000",
      stock: "Stok: 2 Unit",
      stockMax: 2,
      image: "audio retro/Vintage_transistor_radio_on_counter_942c0971.jpg"
    },
    {
      sku: "RA-18",
      name: "Telefunken Gavotte 54 Vacuum Tube Radio",
      category: "Radio Tabung Klasik",
      era: "1954",
      condition: "Restored",
      specs: "6-Tube Superheterodyne | Magic Eye | Walnut Case",
      desc: "Radio meja bertenaga tabung vakum pertengahan abad ke-20 dengan tampilan dial skala frekuensi kaca berpendar hangat.",
      fullDesc: "Telefunken Gavotte 54 asal Jerman ini memancarkan keanggunan era 1950-an lewat kabinet kayu walnut mengilap dan panel skala frekuensi kaca yang berpendar hangat saat dinyalakan. Ditenagai 6 tabung vakum superheterodyne lengkap dengan indikator penala 'Magic Eye' hijau klasik dan karakter suara radio tabung yang tebal serta menenangkan.",
      priceNum: 7300000,
      price: "Rp 7.300.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_tube_radio_displayed_ab60cdb1.jpg"
    },
    {
      sku: "RA-19",
      name: "Grundig KS-560 Wooden Stereo Console",
      category: "Konsol Stereo Kayu",
      era: "1965",
      condition: "Collector",
      specs: "All-in-One Credenza | Tube Receiver | Built-in Turntable",
      desc: "Lemari audio stereo terpadu berbahan kayu kenari solid dengan pemutar piringan hitam dan radio tabung di dalamnya.",
      fullDesc: "Grundig KS-560 adalah furnitur audio mid-century modern asal Jerman yang memadukan estetika ruang tamu kelas atas dengan sistem hi-fi terpadu. Di balik penutup kayu kenari solidnya tersimpan turntable otomatis, receiver radio tabung multi-band, serta sepasang speaker internal berkarakter hangat yang mengisi ruangan dengan suara penuh.",
      priceNum: 32000000,
      price: "Rp 32.000.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Vintage_wooden_stereo_cabinet_di…_addefd6b.jpg"
    },
    {
      sku: "RA-20",
      name: "Rogers LS3/5A Wooden Bookshelf Speakers",
      category: "Speaker Rak Kayu",
      era: "1974",
      condition: "Mint",
      specs: "2-Way Acoustic Suspension | 15 Ohm | Walnut Veneer",
      desc: "Sepasang speaker monitor rak standar penyiaran BBC dengan kabinet lapis kayu kenari dan reproduksi vokal akurat.",
      fullDesc: "Rogers LS3/5A dirancang sesuai spesifikasi ketat BBC sebagai monitor referensi jarak dekat. Meski berukuran ringkas, speaker 2-way acoustic suspension 15 Ohm ini terkenal di kalangan audiophile berkat pencitraan stereo (imaging) yang sangat presisi dan reproduksi vokal yang begitu hidup. Kabinet walnut veneer dalam kondisi terawat istimewa.",
      priceNum: 7800000,
      price: "Rp 7.800.000",
      stock: "Stok: 1 Pasang",
      stockMax: 1,
      image: "audio retro/Wooden_bookshelf_speakers_with_d…_2acb40f0.jpg"
    },
    {
      sku: "RA-21",
      name: "Victor Victrola VV-IV Brass Horn Gramophone",
      category: "Gramofon Antik",
      era: "1925",
      condition: "Collector",
      specs: "Hand-Crank Spring Motor | 78 RPM Shellac | Brass Horn",
      desc: "Gramofon mekanis engkol tangan era 1920-an dengan corong akustik kuningan murni dan kotak kayu ukir bernilai historis.",
      fullDesc: "Victor Victrola VV-IV adalah artefak musik mekanis sejati dari tahun 1925 yang bekerja sepenuhnya tanpa listrik. Menggunakan motor pegas engkol tangan yang telah diservis agar putaran stabil pada 78 RPM untuk memutar piringan shellac klasik. Corong akustik berbahan kuningan murni dan kotak kayu ukirnya memberikan nilai koleksi sekaligus dekorasi historis yang tak ternilai.",
      priceNum: 16500000,
      price: "Rp 16.500.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Wooden_gramophone_with_brass_horn_bfe49a4b.jpg"
    },
    {
      sku: "RA-22",
      name: "Pioneer TX-9100 Analog Stereo Tuner",
      category: "Radio Tuner Analog",
      era: "1973",
      condition: "Restored",
      specs: "FM/AM Stereo | Flywheel Tuning | Dual Signal Meter",
      desc: "Unit tuner radio stereo kelas audiophile berlapis kabinet kayu dengan roda pemutar tuning halus dan indikator sinyal ganda.",
      fullDesc: "Pioneer TX-9100 adalah tuner radio stereo flagship era 70-an yang mengedepankan sensitivitas penangkapan sinyal FM/AM dan kejernihan suara setara sumber rekaman studio. Dilengkapi roda flywheel tuning berbobot mantap yang berputar sangat halus serta dua meter analog untuk kekuatan sinyal dan pusat tuning. Kabinet kayu telah dipoles ulang.",
      priceNum: 4950000,
      price: "Rp 4.950.000",
      stock: "Stok: 1 Unit",
      stockMax: 1,
      image: "audio retro/Wooden_radio_tuner_on_table_f5fa6282.jpg"
    },
    {
      sku: "RA-23",
      name: "JBL L200 Wooden Floorstanding Speakers",
      category: "Speaker Menara Lantai",
      era: "1978",
      condition: "Mint",
      specs: "15\" Woofer + Horn Tweeter | Bass Reflex | Oiled Walnut",
      desc: "Sepasang speaker menara lantai berbalut kayu walnut dengan woofer 15 inci, dentuman bass dalam, dan panggung suara luas.",
      fullDesc: "JBL L200 Studio Master menghadirkan pengalaman mendengarkan konser live di dalam ruangan. Menggabungkan woofer 15 inci berdaya tinggi dengan compression driver horn tweeter legendaris JBL, speaker ini mampu mereproduksi dinamika jazz, rock klasik, hingga orkestra dengan effortless. Kabinet oiled walnut dalam kondisi Mint dan siap memanjakan telinga Anda.",
      priceNum: 21000000,
      price: "Rp 21.000.000",
      stock: "Stok: 1 Pasang",
      stockMax: 1,
      image: "audio retro/Wooden_speaker_tower_catalog_shot_0810d374.jpg"
    }
  ];

  // BroadcastChannel untuk sinkronisasi realtime antar-tab
  let channel = null;
  if (typeof BroadcastChannel !== "undefined") {
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
    } catch (_) {
      channel = null;
    }
  }

  function broadcastEvent(type, payload) {
    if (channel) {
      try {
        channel.postMessage({ type: type, payload: payload, ts: Date.now() });
      } catch (_) {}
    }
  }

  function onRealtimeUpdate(callback) {
    window.addEventListener("storage", function (e) {
      if (e.key === ORDERS_KEY || e.key === CART_KEY) {
        callback({ source: "storage", key: e.key });
      }
    });
    if (channel) {
      channel.addEventListener("message", function (e) {
        callback({ source: "broadcast", data: e.data });
      });
    }
  }

  function formatRupiah(amount) {
    const num = Number(amount) || 0;
    return "Rp " + num.toLocaleString("id-ID");
  }

  function formatWaktu(isoString) {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Cart API
  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    broadcastEvent("CART_UPDATED", { count: getCartCount() });
    updateNavBadge();
  }

  function getProductBySku(sku) {
    return retroAudioCatalog.find(function (item) {
      return item.sku === sku;
    });
  }

  function addToCart(sku, qty) {
    const product = getProductBySku(sku);
    if (!product) return { ok: false, reason: "NOT_FOUND" };

    const addQty = Math.max(1, parseInt(qty, 10) || 1);
    const maxAllowed = product.stockMax || 1;
    const cart = getCart();
    const existing = cart.find(function (c) {
      return c.sku === sku;
    });

    if (existing) {
      if (existing.qty >= maxAllowed) {
        return { ok: false, reason: "MAX_STOCK", product: product, currentQty: existing.qty };
      }
      existing.qty = Math.min(maxAllowed, existing.qty + addQty);
    } else {
      cart.push({
        sku: product.sku,
        name: product.name,
        category: product.category,
        era: product.era,
        condition: product.condition,
        image: product.image,
        stock: product.stock,
        stockMax: maxAllowed,
        priceNum: product.priceNum,
        qty: Math.min(maxAllowed, addQty)
      });
    }

    saveCart(cart);
    return { ok: true, cart: cart, product: product };
  }

  function updateCartQty(sku, newQty) {
    const qty = parseInt(newQty, 10);
    if (isNaN(qty) || qty < 1) {
      return removeFromCart(sku);
    }
    const product = getProductBySku(sku);
    const maxAllowed = product ? (product.stockMax || 1) : 99;
    const cart = getCart();
    const item = cart.find(function (c) {
      return c.sku === sku;
    });
    if (item) {
      item.qty = Math.min(maxAllowed, qty);
      saveCart(cart);
    }
    return cart;
  }

  function removeFromCart(sku) {
    const cart = getCart().filter(function (c) {
      return c.sku !== sku;
    });
    saveCart(cart);
    return cart;
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartCount() {
    return getCart().reduce(function (sum, item) {
      return sum + (parseInt(item.qty, 10) || 0);
    }, 0);
  }

  function getCartTotals(shippingCost) {
    const cart = getCart();
    const subtotal = cart.reduce(function (sum, item) {
      return sum + item.priceNum * item.qty;
    }, 0);
    const ongkir = cart.length > 0 ? (typeof shippingCost === "number" ? shippingCost : DEFAULT_COURIER_FEE) : 0;
    const grandTotal = subtotal + ongkir;
    return { subtotal: subtotal, ongkir: ongkir, grandTotal: grandTotal };
  }

  // Orders API
  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }

  function saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getOrderById(orderId) {
    return getOrders().find(function (o) {
      return o.id === orderId;
    });
  }

  function generateOrderId() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(1000 + Math.random() * 9000);
    return "INV-PV-" + y + m + d + "-" + rand;
  }

  function createOrder(customer, shippingMethod) {
    const cart = getCart();
    if (cart.length === 0) return null;

    const ongkir = shippingMethod === "pickup" ? 0 : DEFAULT_COURIER_FEE;
    const totals = getCartTotals(ongkir);
    const orderId = generateOrderId();
    const nowIso = new Date().toISOString();

    const order = {
      id: orderId,
      createdAt: nowIso,
      paidAt: null,
      rejectedAt: null,
      status: "PENDING", // PENDING | PAID | REJECTED
      paymentMethod: "QRIS",
      qrisRef: "QRIS" + Date.now().toString().slice(-8),
      approvalRef: null,
      shippingMethod:
        shippingMethod === "pickup"
          ? "Ambil di Toko Kemang (Jakarta Selatan)"
          : "Kurir Khusus Audio & Packing Kayu",
      customer: {
        nama: customer.nama,
        telepon: customer.telepon,
        alamat: customer.alamat,
        kota: customer.kota,
        catatan: customer.catatan || ""
      },
      items: cart.map(function (c) {
        return {
          sku: c.sku,
          name: c.name,
          era: c.era,
          condition: c.condition,
          image: c.image,
          stock: c.stock,
          priceNum: c.priceNum,
          qty: c.qty,
          subtotal: c.priceNum * c.qty
        };
      }),
      subtotal: totals.subtotal,
      ongkir: totals.ongkir,
      grandTotal: totals.grandTotal
    };

    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    clearCart();
    broadcastEvent("ORDER_CREATED", { orderId: order.id });
    return order;
  }

  function updateOrderStatus(orderId, newStatus) {
    const orders = getOrders();
    const order = orders.find(function (o) {
      return o.id === orderId;
    });
    if (!order) return null;

    order.status = newStatus;
    if (newStatus === "PAID") {
      order.paidAt = new Date().toISOString();
      order.approvalRef = "APR-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    } else if (newStatus === "REJECTED") {
      order.rejectedAt = new Date().toISOString();
    }
    saveOrders(orders);
    broadcastEvent("ORDER_STATUS_CHANGED", { orderId: order.id, status: newStatus });
    return order;
  }

  // Status Badge & Deterministic QRIS SVG Generator
  function renderStatusBadge(status) {
    if (status === "PAID") {
      return '<span class="status-badge status-paid">&#10003; Paid / Lunas</span>';
    }
    if (status === "REJECTED") {
      return '<span class="status-badge status-rejected">&#10005; Ditolak</span>';
    }
    return '<span class="status-badge status-pending"><span class="pulse-dot"></span> Menunggu Bayar</span>';
  }

  function generateDummyQrisSvg(seedText) {
    const size = 25;
    const cell = 8;
    const quiet = 16;
    const totalPx = size * cell + quiet * 2;

    let hash = 2166136261;
    const text = String(seedText || "PLANET-VINYL-QRIS");
    for (let i = 0; i < text.length; i++) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    function nextBit() {
      hash ^= hash << 13;
      hash ^= hash >>> 17;
      hash ^= hash << 5;
      return (hash >>> 0) % 2 === 1;
    }

    const grid = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });
    const reserved = Array.from({ length: size }, function () {
      return Array(size).fill(false);
    });

    function placeFinder(r0, c0) {
      for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          if (rr < 0 || rr >= size || cc < 0 || cc >= size) continue;
          reserved[rr][cc] = true;
          const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
          const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
          const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[rr][cc] = inOuter && (onBorder || inInner);
        }
      }
    }

    function placeAlignment(r0, c0) {
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const rr = r0 + r;
          const cc = c0 + c;
          reserved[rr][cc] = true;
          grid[rr][cc] = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
        }
      }
    }

    placeFinder(0, 0);
    placeFinder(0, size - 7);
    placeFinder(size - 7, 0);
    placeAlignment(size - 7, size - 7);

    for (let i = 8; i < size - 8; i++) {
      reserved[6][i] = true;
      reserved[i][6] = true;
      grid[6][i] = i % 2 === 0;
      grid[i][6] = i % 2 === 0;
    }

    for (let r = 10; r <= 14; r++) {
      for (let c = 10; c <= 14; c++) {
        reserved[r][c] = true;
        grid[r][c] = false;
      }
    }

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!reserved[r][c]) {
          grid[r][c] = nextBit();
        }
      }
    }

    let rects = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (grid[r][c]) {
          const x = quiet + c * cell;
          const y = quiet + r * cell;
          rects += '<rect x="' + x + '" y="' + y + '" width="' + cell + '" height="' + cell + '" fill="#231F20"/>';
        }
      }
    }

    const cx = totalPx / 2;
    const cy = totalPx / 2;

    return (
      '<svg xmlns="http://www.w3.org/2000/svg" width="' + totalPx + '" height="' + totalPx + '" viewBox="0 0 ' + totalPx + " " + totalPx + '" role="img" aria-label="Kode QRIS Simulasi">' +
      '<rect width="100%" height="100%" fill="#FFFFFF"/>' +
      rects +
      '<rect x="' + (cx - 24) + '" y="' + (cy - 13) + '" width="48" height="26" fill="#FFFFFF" stroke="#231F20" stroke-width="2"/>' +
      '<text x="' + cx + '" y="' + (cy + 4) + '" text-anchor="middle" font-family="\'Courier New\', monospace" font-size="11" font-weight="800" fill="#231F20">QRIS</text>' +
      "</svg>"
    );
  }

  // Shared Header / Topbar + Side Drawer (Estetika 1970-an - Planet Vinyl)
  function renderTopbar(activePage) {
    const holder = document.getElementById("site-topbar");
    if (!holder) return;

    const count = getCartCount();
    holder.innerHTML =
      '<div class="groovy-stripe" aria-hidden="true">' +
      '  <span></span><span></span><span></span><span></span>' +
      '</div>' +
      '<header class="site-header">' +
      '  <div class="header-container">' +
      '    <a href="index.html" class="brand">' +
      '      <img src="logo/Planet Vinyl.png" alt="Logo Planet Vinyl" class="brand-logo" width="52" height="52">' +
      '      <div>' +
      '        <div class="brand-title">PLANET VINYL</div>' +
      '        <div class="brand-subtitle">TOKO PERANGKAT AUDIO RETRO &amp; ANALOG</div>' +
      '      </div>' +
      '    </a>' +
      '    <button type="button" class="drawer-toggle" id="nk-drawer-toggle" aria-label="Buka menu navigasi" aria-expanded="false" aria-controls="nk-side-drawer">' +
      '      <span class="drawer-hamburger" aria-hidden="true"><span></span><span></span><span></span></span>' +
      '      <span>Menu</span>' +
      '      <span class="cart-badge" id="nav-cart-count">' + count + '</span>' +
      '    </button>' +
      '  </div>' +
      '</header>' +
      '<div class="drawer-backdrop" id="nk-drawer-backdrop" hidden></div>' +
      '<aside class="side-drawer" id="nk-side-drawer" aria-label="Navigasi Utama" aria-hidden="true">' +
      '  <div class="drawer-head">' +
      '    <div>' +
      '      <div class="drawer-kicker">HI-FI STEREO &bull; EST. 1974</div>' +
      '      <div class="drawer-title">PLANET VINYL</div>' +
      '    </div>' +
      '    <button type="button" class="drawer-close" id="nk-drawer-close" aria-label="Tutup menu">&times;</button>' +
      '  </div>' +
      '  <div class="groovy-stripe slim" aria-hidden="true">' +
      '    <span></span><span></span><span></span><span></span>' +
      '  </div>' +
      '  <nav class="drawer-nav">' +
      '    <a href="index.html" class="drawer-link ' + (activePage === "katalog" ? "active" : "") + '">' +
      '      <span class="drawer-num">01</span>' +
      '      <span>Katalog</span>' +
      '    </a>' +
      '    <a href="cart.html" class="drawer-link ' + (activePage === "cart" ? "active" : "") + '">' +
      '      <span class="drawer-num">02</span>' +
      '      <span>Keranjang</span>' +
      '      <span class="cart-badge" id="drawer-cart-count">' + count + '</span>' +
      '    </a>' +
      '    <a href="history.html" class="drawer-link ' + (activePage === "history" ? "active" : "") + '">' +
      '      <span class="drawer-num">03</span>' +
      '      <span>Riwayat</span>' +
      '    </a>' +
      '    <a href="qris-approve.html" target="_blank" rel="noopener" class="drawer-link sim-link" title="Buka halaman simulator approval QRIS di tab baru">' +
      '      <span class="drawer-num">04</span>' +
      '      <span>Simulator QRIS &#8599;</span>' +
      '    </a>' +
      '  </nav>' +
      '  <div class="drawer-foot">' +
      '    <div>KEMANG RAYA NO. 45 &bull; JKT</div>' +
      '    <div>GARANSI SERVIS ANALOG 6 BULAN</div>' +
      '  </div>' +
      '</aside>';

    const toggleBtn = document.getElementById("nk-drawer-toggle");
    const closeBtn = document.getElementById("nk-drawer-close");
    const backdrop = document.getElementById("nk-drawer-backdrop");
    const drawer = document.getElementById("nk-side-drawer");

    function setDrawerOpen(open) {
      if (!drawer || !backdrop || !toggleBtn) return;
      drawer.classList.toggle("open", open);
      backdrop.classList.toggle("open", open);
      backdrop.hidden = !open;
      toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("drawer-open", open);
    }

    if (toggleBtn) toggleBtn.addEventListener("click", function () { setDrawerOpen(true); });
    if (closeBtn) closeBtn.addEventListener("click", function () { setDrawerOpen(false); });
    if (backdrop) backdrop.addEventListener("click", function () { setDrawerOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer && drawer.classList.contains("open")) {
        setDrawerOpen(false);
      }
    });
  }

  function updateNavBadge() {
    const val = String(getCartCount());
    const badge = document.getElementById("nav-cart-count");
    const drawerBadge = document.getElementById("drawer-cart-count");
    if (badge) badge.textContent = val;
    if (drawerBadge) drawerBadge.textContent = val;
  }

  // Toast helper
  let toastTimer = null;
  function showToast(message) {
    let el = document.getElementById("nk-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "nk-toast";
      el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("show");
    }, 2600);
  }

  onRealtimeUpdate(function () {
    updateNavBadge();
  });

  window.NKStore = {
    DEFAULT_COURIER_FEE: DEFAULT_COURIER_FEE,
    retroAudioCatalog: retroAudioCatalog,
    formatRupiah: formatRupiah,
    formatWaktu: formatWaktu,
    escapeHtml: escapeHtml,
    getCart: getCart,
    addToCart: addToCart,
    updateCartQty: updateCartQty,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotals: getCartTotals,
    getOrders: getOrders,
    getOrderById: getOrderById,
    createOrder: createOrder,
    updateOrderStatus: updateOrderStatus,
    renderStatusBadge: renderStatusBadge,
    generateDummyQrisSvg: generateDummyQrisSvg,
    renderTopbar: renderTopbar,
    updateNavBadge: updateNavBadge,
    showToast: showToast,
    onRealtimeUpdate: onRealtimeUpdate
  };
})();
import { useState } from "react";

// DESIGN TOKENS - Corporate Institutional
const T = {
  // Primary
  navy:     "#0B1F3A",   // sidebar, header
  navyMid:  "#112A4E",   // card headers
  navyLight:"#1A3A6B",   // hover states
  // Accent
  blue:     "#0066CC",   // primary action, links
  blueLight:"#E8F0FB",   // active nav bg, tag bg
  gold:     "#C9A227",   // signature accent - from PAMA logo
  goldLight:"#FBF6E7",   // gold bg tint
  // Neutral
  white:    "#FFFFFF",
  bg:       "#F4F7FB",   // page background
  surface:  "#FFFFFF",   // cards
  border:   "#DDE3ED",   // dividers
  border2:  "#C5CFDF",   // stronger border
  // Text
  text:     "#0D1B2A",   // primary text
  textSub:  "#4A5568",   // secondary text
  textMute: "#8A94A6",   // muted / placeholder
  // Status
  green:    "#0E7C4A",
  greenBg:  "#E6F4EE",
  red:      "#C0392B",
  redBg:    "#FDECEA",
  amber:    "#B45309",
  amberBg:  "#FEF3C7",
  orange:   "#D97706",
};

// Shared style helpers
const card  = { background:T.surface, border:`1px solid ${T.border}`, borderRadius:8 };
const badge = (color, bg) => ({ fontSize:10, fontWeight:700, letterSpacing:0.8, padding:"2px 8px", borderRadius:4, color, background:bg, display:"inline-block" });
const btn   = (bg, color, border) => ({ padding:"9px 20px", borderRadius:6, border: border || "none", background:bg, color, fontSize:12, fontWeight:600, cursor:"pointer", letterSpacing:0.3 });

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNGNaA5xbz6ev5-Npy8XqTGaZLLsDaPVV5yNG4UhOgBCmelJzCZl2Vkc0nRSWsLl-X0Q/exec";

// --- SUPABASE CONFIG ----------------------------------------------
const SUPA_URL   = "https://jperdcyynzfugcyommzl.supabase.co";
const SUPA_KEY   = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwZXJkY3l5bnpmdWdjeW9tbXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwNjk5NTMsImV4cCI6MjA5ODY0NTk1M30.zRWKR2pxobyQQ5nKh6d5v1rO6l6Nc0FKq9Ialp-NUfQ";
const SUPA_TABLE = "arsip_vlog";

// Helper: fetch ke Supabase
const supaFetch = async (method, path, body) => {
  const res = await fetch(SUPA_URL + "/rest/v1/" + path, {
    method,
    headers: {
      "apikey":        SUPA_KEY,
      "Authorization": "Bearer " + SUPA_KEY,
      "Content-Type":  "application/json",
      "Prefer":        method === "POST" ? "return=representation" : "",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error("Supabase error: " + res.status);
  return method === "DELETE" ? null : res.json();
};
const DRIVE_FOLDERS = {
  Pelatihan:    "https://drive.google.com/drive/folders/1oeGz5Q3HGA69L3NZUll-teTH45a7HJxK",
  Pendampingan: "https://drive.google.com/drive/folders/1suviA9EZWR-Z60uk-A-r_e9m53DzGz27",
  Pembiayaan:   "https://drive.google.com/drive/folders/1miGizKv4_DGgDOs9w9efvvsv1WrwJBf0",
  Pemasaran:    "https://drive.google.com/drive/folders/1DBlzm_kh7gL1dkiyLLBddjzv5-Wjs1dr",
  Lainnya:      "https://drive.google.com/drive/folders/1J_oiaL9cjCqjqmymYgjsuY2TcqxhdcWv",
};


// --- DATA --------------------------------------------------------
const FASILITATOR = ["Raihan Syafiq", "Muhammad Nurhan", "Markus Nandus"];
const ADMIN       = ["Nur Mitasari"];
const KOORDINATOR = ["Rifki Maulana"];
const PENGGUNA    = [
  ...FASILITATOR.map(n => ({ nama:n, peran:"Fasilitator" })),
  ...ADMIN.map(n => ({ nama:n, peran:"Admin" })),
  ...KOORDINATOR.map(n => ({ nama:n, peran:"Koordinator" })),
];

const PILAR = [
  { id:"pelatihan",    label:"Pelatihan",    icon:"P", color:T.blue },
  { id:"pendampingan", label:"Pendampingan", icon:"D", color:"#0E7C4A" },
  { id:"pembiayaan",   label:"Pembiayaan",   icon:"B", color:"#7B3F9E" },
  { id:"pemasaran",    label:"Pemasaran",    icon:"M", color:"#B45309" },
  { id:"lainnya",      label:"Lainnya",      icon:"+", color:T.textMute },
];

const NAV = [
  { id:"beranda",    label:"Beranda",        short:"BRD" },
  { id:"sop",        label:"SOP & Panduan",  short:"SOP" },
  { id:"template",   label:"Script & Audio", short:"SCR" },
  { id:"submission", label:"Submission",     short:"SUB" },
  { id:"arsip",      label:"Arsip Vlog",     short:"ARS" },
];

const SOP_DATA = [
  { phase:"PRA-PRODUKSI", color:T.blue, items:[
    "Konfirmasi jadwal, lokasi, narasumber dan pilar kegiatan",
    "Charge baterai kamera/smartphone min. 80% dan cek storage min. 8GB",
    "Siapkan tripod/stabilizer dan mic eksternal lavalier atau shotgun",
    "Siapkan musik latar bebas royalti sesuai mood kegiatan",
    "Buat desain teks judul kegiatan di CapCut (kotak hitam + teks bold)",
    "Jika kegiatan multi-hari: siapkan label DAY ONE atau DAY TWO",
    "Unduh dan isi template script V-KNOW sesuai pilar kegiatan",
    "Generate voiceover per segmen di ElevenLabs, simpan .mp3",
    "Siapkan file twibbon LPB PABETA (PNG transparan) di galeri HP",
    "Siapkan logo bar PAMA-ASTRA-LPB-Satu Indonesia di galeri HP",
  ]},
  { phase:"PRODUKSI", color:T.gold, items:[
    "WAJIB rekam dalam orientasi PORTRAIT vertikal 9:16",
    "Segmen 1 - Hook: rekam banner/spanduk kegiatan (5-8 detik)",
    "Segmen 2 - Konteks: rekam pembukaan dan sambutan (10-15 detik)",
    "Segmen 3 - Inti: rekam aktivitas utama multi-angle",
    "Segmen 4 - Testimoni: wawancara peserta/mitra (20-25 detik)",
    "Segmen 5 - Hasil: rekam output/produk kegiatan close-up (8-10 detik)",
    "Segmen 6 - Closing: rekam foto bersama atau suasana penutup (5-8 detik)",
    "Rekam ambience audio lokasi terpisah min. 30 detik",
  ]},
  { phase:"PASCA-PRODUKSI (CapCut)", color:T.red, items:[
    "[SETUP] Buka CapCut, New Project, set rasio 9:16 Portrait, import semua klip",
    "[MULTI-KLIP] Susun klip sesuai urutan 6 segmen di timeline",
    "[SPLIT] Potong klip, hapus bagian awal/akhir yang goyang (0.5 dtk)",
    "[SPLIT] Potong wawancara: hapus jeda panjang dan pengulangan kalimat",
    "[TRANSITION] Gunakan Cut tanpa transisi untuk segmen Hook dan Testimoni",
    "[TRANSITION] Gunakan Dissolve 0.3 dtk untuk segmen Konteks dan Inti",
    "[OVERLAY] Overlay, Add, pilih twibbon PNG, scale full frame, lock sepanjang video",
    "[CHROMA KEY] Jika twibbon berlatar hijau: Chroma Key, Intensity 80, Shadow 15",
    "[OVERLAY] Overlay, Add, pilih logo bar PNG, posisi TOP frame, opacity 100%",
    "[TEXT] Add Text, ketik judul kegiatan, font Bold, background kotak Hitam",
    "[TEXT] Animasi teks judul: Slide Up, durasi 0.3 dtk, posisi tengah frame",
    "[TEXT] Multi-hari: tambah teks DAY ONE atau DAY TWO, font Bold, animasi Pop",
    "[TEXT] Lower-third nama kegiatan dan lokasi, Slide In dari kiri 0.3 dtk",
    "[TEXT] Lower-third nama narasumber saat segmen Testimoni",
    "[SPEED] B-roll terlalu lama: Speed Normal, tarik ke 1.2x sampai 1.5x",
    "[SLOW-MO] B-roll detail produk: Speed Normal, tarik ke 0.5x (butuh rekam 60fps)",
    "[AUTO CAPTIONS] Text, Auto Captions, Language Indonesian, Generate, koreksi teks",
    "[AUTO CAPTIONS] Style caption: font Bold, posisi bawah frame, Putih + outline Hitam",
    "[AUDIO] Voiceover ElevenLabs: Volume 75% (-12dB), sinkronkan dengan klip B-roll",
    "[AUDIO] Ambience lokasi: Volume 35% (-24dB), Fade In 0.5 dtk, Fade Out 1 dtk",
    "[AUDIO] Musik latar: Volume 22% (-30dB), Fade In 1 dtk, Fade Out 2 dtk",
    "[AUDIO] Audio wawancara asli: Volume 75% (-12dB), pastikan tidak ada clipping",
    "[FILTER] Filter, kategori Film atau Cinematic, intensity 30-40%, apply to all",
    "[COLOR] Adjust: Brightness +5, Contrast +10, Saturation +5, Warmth +10",
    "[STICKER] Stickers, cari LIVE, tambah badge LIVE di segmen Hook (0:00-0:10)",
    "[STICKER] Tambah sticker sparkle untuk mempercantik transisi segmen Closing",
    "[TEMPLATE] Save as Template, beri nama VKNOW Pilar untuk dipakai ulang",
    "[REVIEW] Putar ulang video full, cek visual, audio, sinkronisasi, dan ejaan teks",
    "[EXPORT] Export, Resolusi 1080p, Frame Rate 30fps, Format MP4",
    "[SUBMIT] Upload file FINAL ke platform V-KNOW melalui Modul Submission",
  ]},
];

const TEMPLATES = [
  { pilar:"Pelatihan", color:T.blue,
    hook:"Hari ini, [JUMLAH] peserta berkumpul di [LOKASI] untuk mengikuti Pelatihan [TOPIK].",
    konteks:"Program Pelatihan [TOPIK] oleh LPB Pama Bessai Berinta diselenggarakan pada [TANGGAL] di [LOKASI], bertujuan [TUJUAN SINGKAT].",
    inti:"Materi yang disampaikan meliputi [POIN 1], [POIN 2], dan [POIN 3]. Peserta mendapatkan praktik langsung di bawah bimbingan fasilitator berpengalaman.",
    closing:"Pelatihan ini adalah wujud nyata komitmen LPB Pama Bessai Berinta dalam meningkatkan kapasitas SDM masyarakat dan mitra binaan.",
  },
  { pilar:"Pendampingan", color:"#0E7C4A",
    hook:"Di balik usaha [NAMA USAHA] ini, ada semangat dan kerja keras yang terus kami dukung.",
    konteks:"LPB Pama Bessai Berinta melakukan pendampingan kepada [NAMA MITRA] di [LOKASI] pada [TANGGAL] sebagai bagian dari program [NAMA PROGRAM].",
    inti:"Pendampingan kali ini mencakup [ASPEK 1], [ASPEK 2], dan [ASPEK 3]. Dengan pendampingan ini, mitra binaan kini mampu [CAPAIAN NYATA].",
    closing:"Setiap langkah pendampingan adalah investasi nyata untuk kemandirian masyarakat yang berkelanjutan.",
  },
  { pilar:"Pembiayaan", color:"#7B3F9E",
    hook:"Akses modal yang tepat bisa mengubah mimpi menjadi kenyataan, inilah yang kami wujudkan bersama [NAMA MITRA].",
    konteks:"LPB Pama Bessai Berinta menyalurkan pembiayaan kepada [NAMA MITRA] di [LOKASI] pada [TANGGAL] melalui skema [JENIS PEMBIAYAAN].",
    inti:"Pembiayaan senilai [NOMINAL] ini digunakan untuk [TUJUAN PENGGUNAAN] dan diharapkan mendorong [TARGET CAPAIAN] dalam kurun waktu [PERIODE].",
    closing:"Pembiayaan yang tepat sasaran adalah kunci pertumbuhan ekonomi masyarakat yang inklusif dan berkeadilan.",
  },
  { pilar:"Pemasaran", color:"#B45309",
    hook:"Produk berkualitas dari tangan masyarakat binaan kini siap menjangkau pasar yang lebih luas.",
    konteks:"LPB Pama Bessai Berinta memfasilitasi kegiatan pemasaran untuk [NAMA PRODUK/MITRA] di [LOKASI] pada [TANGGAL] melalui program [NAMA PROGRAM].",
    inti:"Kegiatan pemasaran mencakup [ASPEK 1], [ASPEK 2], dan [ASPEK 3]. Produk [NAMA] berhasil menjangkau [TARGET PASAR].",
    closing:"Dengan akses pasar yang lebih luas, masyarakat binaan LPB Pama Bessai Berinta semakin berdaya dan mandiri.",
  },
  { pilar:"Lainnya", color:T.textMute,
    hook:"[KALIMAT PEMBUKA YANG MENGGAMBARKAN KONTEKS KEGIATAN].",
    konteks:"LPB Pama Bessai Berinta melaksanakan kegiatan [NAMA KEGIATAN] di [LOKASI] pada [TANGGAL]. Kegiatan ini bertujuan [TUJUAN].",
    inti:"[URAIAN ISI KEGIATAN - apa yang dilakukan, siapa yang terlibat, bagaimana prosesnya, dan apa hasilnya].",
    closing:"Kegiatan ini merupakan bagian dari upaya LPB Pama Bessai Berinta dalam mewujudkan masyarakat yang mandiri dan sejahtera.",
  },
];

const ARSIP_INIT = [
  { id:"VK-INIT-001", judul:"Pelatihan SOP Panen, Pasca Panen dan Tanam Berkelanjutan Jahe Merah", pilar:"Pelatihan", tanggal:"15-16 Mei 2026", fasilitator:"Raihan Syafiq", lokasi:"Desa Sukarahmat", durasi:"2:02", status:"approved", catatan:"Video sudah sesuai standar V-KNOW. Twibbon terpasang rapi, logo bar di top frame, dan voiceover ElevenLabs sinkron dengan B-roll.", submitAt:"17 Mei 2026", folderUrl:"" },
];

// --- LOGOS ASLI (compressed dari file upload) --------------------
const LOGO_PAMA = "data:image/png;base64,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";
const LOGO_YASTRA = "data:image/png;base64,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";
const LOGO_ASTRA46 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABQAFADASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAQFBgcDAQL/xAAyEAABAwMDAgUCBQQDAAAAAAABAAIDBAURBhIhMUETFCJRYYGRMnGhscEVQlJi0eHw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAMCBAX/xAAqEQACAgEDAgUDBQAAAAAAAAABAgADEQQSQTFhEyEiMoEFQnEUI1Hh8P/aAAwDAQACEQMRAD8A6+iIkQiIkQiIkQiIkQiIkQiIkQi8aurgoaZ9RUPDI2Dk+/wPlZ6TXVDDE6WSmlaxoySXhUSp39ok3tRDhjNOqbUt/jslF6SHVU2RCw9vdx+Ao1q1lSXGx1l4kppaWmpXFvrcCXnA4GO/IH1XOa+7z3i5yVtSTvkOGRt52js0K9NHqJt8gOsm9jMAlIyzdMTZ2K6Xq6VTIfOvI6vdtHpHv0Wo/rFuaMOq2twM+vLTgHbnke4IWRs18hsFOKeSgd5mQh0odK0PHsC0Zx+ROVo7fLZ7uTJHSRiYclsjBu5+e45S3DHcF9MzWpr9DMC35zJjbvb3SRxiqZvk/AOfVzjhTFFbbKBjg5tJECHh4O3o4dCpS5jt4nSM8wvGsq6egpZKqqlEUMYy5x/91X2qqoKKmkqamVsUMTdz3uPAC5DqPVFZqu6R0tHFJ5YP209O0Zc93+RHv+ytRQbT2HWRuuFY7yxu2oKvUlybHAx4iBIggHX8z8/ss9di98/gl+WxgZx0z3W8gsUektK1NXUEPuM7BGX9o93G1v0zk91gn7qmp8OFpkkldgAdST2C7/1VNKFuB5DvIaf6dqNXcEXr1J4A7mXFxkbHpi0WCjcZJ5HGoqY4+SXu5Y388Hp8BarRmnqG3VMvjuZPdIGtdIBy2n3Zw0f7cclV1PYqvS+nqi7Q04qLmG43DkU7T1IHcjuf4Wf07qGrste+qZicTDEzXn8fOc59891w1U26lTY5/AnqarVUaPGn03T7m5PYdu3M6Fq2yW+qsFZO6niingidLHMxoa4Ec9R1yszourmf5SV5Jd4mwk/3DOF+L3qet1FTeSZGyjpXkeLtcXOf8Z44VtpO27pY3MZtgp+/uew/ldQVq6SLJ4ljLbcvhzaIiLzJ6szuurbWXXTMlLQwOnmM0btjSASAeeq5izSOpI5RttVXG4d2t5+4K7gi6K9TZWmxJPwamfe4z2zj+5w65Wu52gRsuLZWvlbvbHJLuOM4zjJwp2hLbNctWQyy8RUjHTEdgcYH6lavUelbxedQTVjGwGnEbY4Q6XBwBzxjjklWmkNOz2NtU+rbGJZi1o2O3DaP+ytlKgniE5c/74lW12of9hF2V/wBgfPJ+TNA18LRsEjOB03BZy46MsFdK6eJ4o5HckwyN2nvnaePthWTdPUbdh3SFzcAnPXGT9OT+i8xYYGOawU73MYctzOMH5Ix15U0bYcq2JB13jDCVNPpex26rjiqa2ad743StaRhpa3knLf+ecH2V5Fd7bTU0IiZLHA+F00e2B23Y3kn9vuF5m0MM7KnymJ4g3w3ifluMgAcdPUfukdmjZTiHyx27JWHM/OJMF3bqcfRadw/uJMylez2jElQ3ihnNMGTHNU5zYgWEZLeoPt/KmqsGn7cHxvERDoiDFh2PD9W/wBPtyrJoIaA524gcnGMqDbftll3cz6iIszUIiJEIiJEIiJEIiJE/9k=";
const LOGO_LPB = "data:image/jpeg;base64,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";
const LOGO_SATU = "data:image/jpeg;base64,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";


// --- LOGO COMPONENTS ---------------------------------------------

function LogoBar({ compact = false }) {
  const h = compact ? 22 : 32;
  const gap = compact ? 8 : 12;
  const divH = compact ? 18 : 26;
  const div = { width:1, height:divH, background:T.border2, flexShrink:0 };
  return (
    <div style={{ background:T.white, borderRadius:6, padding: compact ? "4px 10px" : "6px 16px", display:"inline-flex", alignItems:"center", gap, boxShadow:"0 1px 4px rgba(0,0,0,0.12)", border:`1px solid ${T.border}` }}>
      <img src={LOGO_PAMA}    alt="PAMA"    style={{ height:h, maxWidth:compact?48:60, objectFit:"contain" }}/>
      <div style={div}/>
      <img src={LOGO_YASTRA}  alt="ASTRA"   style={{ height:compact?18:24, maxWidth:compact?60:80, objectFit:"contain" }}/>
      <div style={div}/>
      <img src={LOGO_ASTRA46} alt="46Thn"   style={{ height:h, maxWidth:compact?32:44, objectFit:"contain" }}/>
      <div style={div}/>
      <img src={LOGO_LPB}     alt="LPB"     style={{ height:h, maxWidth:compact?28:38, objectFit:"contain" }}/>
      <div style={div}/>
      <img src={LOGO_SATU}    alt="SatuID"  style={{ height:compact?18:24, maxWidth:compact?52:70, objectFit:"contain" }}/>
    </div>
  );
}

function LPBLogo({ size = 36 }) {
  return <img src={LOGO_LPB} alt="LPB" style={{ width:size, height:size, borderRadius:"50%", objectFit:"cover", border:`2px solid ${T.gold}`, background:T.white }}/>;
}

function StatusBadge({ status }) {
  const map = {
    approved: { label:"Disetujui", color:T.green,  bg:T.greenBg  },
    review:   { label:"Review",    color:T.amber,  bg:T.amberBg  },
    rejected: { label:"Ditolak",   color:T.red,    bg:T.redBg    },
  };
  const s = map[status] || { label:status, color:T.textMute, bg:T.bg };
  return <span style={badge(s.color, s.bg)}>{s.label.toUpperCase()}</span>;
}

function PilarBadge({ pilar }) {
  const p = PILAR.find(x => x.label === pilar) || PILAR[4];
  return <span style={badge(p.color, p.color + "15")}>{pilar}</span>;
}

function Toast({ msg, color }) {
  return (
    <div style={{ position:"fixed", top:20, right:20, background:color, color:T.white, padding:"10px 18px", borderRadius:6, fontWeight:600, fontSize:12, zIndex:9999, boxShadow:"0 4px 16px rgba(0,0,0,0.2)", letterSpacing:0.3 }}>
      {msg}
    </div>
  );
}

// Gold accent line - signature element
function GoldRule() {
  return <div style={{ height:3, background:`linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, borderRadius:2, marginBottom:24 }}/>;
}

function SectionLabel({ children }) {
  return <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:T.textMute, textTransform:"uppercase", marginBottom:8 }}>{children}</div>;
}

// --- MAIN APP -----------------------------------------------------
export default function VKnow() {
  const [page, setPage]       = useState("beranda");
  const [sideOpen, setSideOpen] = useState(true);
  const [sopCl, setSopCl]     = useState(SOP_DATA.map(s => ({ ...s, items: s.items.map(label => ({ label, done:false })) })));
  const [tmplIdx, setTmplIdx] = useState(0);
  const [subStep, setSubStep] = useState(1);
  const [subData, setSubData] = useState({ judul:"", pilar:"", pilarLain:"", lokasi:"", tanggal:"", fasilitator:"" });
  const [arsip, setArsip]     = useState(ARSIP_INIT);
  const [toast, setToast]     = useState(null);

  const showToast = (msg, color = T.green) => { setToast({ msg, color }); setTimeout(() => setToast(null), 3000); };

  const total = sopCl.reduce((a,s) => a + s.items.length, 0);
  const done  = sopCl.reduce((a,s) => a + s.items.filter(i => i.done).length, 0);
  const pct   = Math.round((done / total) * 100);

  const toggleSop = (si, ii) => setSopCl(prev =>
    prev.map((s, sI) => sI !== si ? s : { ...s, items: s.items.map((item, iI) => iI !== ii ? item : { ...item, done:!item.done }) })
  );

  const pages = {
    beranda:    <Beranda    setPage={setPage} pct={pct} done={done} total={total} arsip={arsip} />,
    sop:        <SOPPage    cl={sopCl} toggle={toggleSop} pct={pct} done={done} total={total} />,
    template:   <TemplatePage idx={tmplIdx} setIdx={setTmplIdx} />,
    submission: <SubmissionPage step={subStep} setStep={setSubStep} data={subData} setData={setSubData} showToast={showToast}
                  onSubmitSuccess={(e) => { setArsip(prev => [e, ...prev]); setTimeout(() => setPage("arsip"), 1500); }} />,
    arsip:      <ArsipPage arsip={arsip} setArsip={setArsip} showToast={showToast} />,
  };

  return (
    <div style={{ display:"flex", height:"100vh", background:T.bg, fontFamily:"'Inter',system-ui,sans-serif", color:T.text, overflow:"hidden" }}>
      {toast && <Toast msg={toast.msg} color={toast.color} />}

      {/* -- OVERLAY (mobile) -- */}
      {sideOpen && (
        <div onClick={() => setSideOpen(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:40, display: typeof window !== 'undefined' && window.innerWidth < 768 ? "block" : "none" }}/>
      )}

      {/* -- SIDEBAR -- */}
      <aside style={{
        position: "fixed",
        top: 0, left: 0,
        height: "100vh",
        width: sideOpen ? 240 : 0,
        background: T.navy,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: sideOpen ? "4px 0 16px rgba(0,0,0,0.2)" : "none",
        zIndex: 50,
      }}>
        {/* Logo area */}
        <div style={{ padding:"20px 16px 16px", borderBottom:`1px solid ${T.navyLight}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <LPBLogo size={36} />
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:T.white, letterSpacing:0.5, whiteSpace:"nowrap" }}>V-KNOW</div>
              <div style={{ fontSize:9, color:T.gold, letterSpacing:1.5, textTransform:"uppercase", marginTop:1, whiteSpace:"nowrap" }}>LPB Pama Bessai Berinta</div>
            </div>
          </div>
          {/* Close button */}
          <button onClick={() => setSideOpen(false)} style={{ background:"transparent", border:"none", color:"#94A3B8", cursor:"pointer", fontSize:18, fontWeight:700, lineHeight:1, padding:4, flexShrink:0 }}>x</button>
        </div>

        {/* Gold accent line */}
        <div style={{ height:2, background:T.gold, flexShrink:0 }}/>

        {/* Nav */}
        <nav style={{ flex:1, padding:"12px 8px", overflowY:"auto" }}>
          {NAV.map(n => {
            const active = page === n.id;
            return (
              <button key={n.id} onClick={() => { setPage(n.id); setSideOpen(false); }} style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"12px 12px", borderRadius:6, border:"none", cursor:"pointer", marginBottom:4, background: active ? T.gold : "transparent", color: active ? T.navy : "#94A3B8", fontSize:13, fontWeight: active ? 700 : 400, textAlign:"left", transition:"all 0.15s", whiteSpace:"nowrap" }}>
                <div style={{ width:30, height:30, borderRadius:5, background: active ? T.navy : T.navyLight, display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color: active ? T.gold : "#94A3B8", letterSpacing:0.5, flexShrink:0 }}>{n.short}</div>
                <span>{n.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mini logo bar */}
        <div style={{ padding:"0 12px 16px" }}>
          <LogoBar compact />
        </div>
      </aside>

      {/* -- MAIN -- */}
      <main style={{ flex:1, overflow:"auto", display:"flex", flexDirection:"column", marginLeft:0 }}>

        {/* Topbar */}
        <header style={{ padding:"0 16px", height:56, borderBottom:`1px solid ${T.border}`, background:T.white, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, boxShadow:"0 1px 3px rgba(0,0,0,0.06)", position:"sticky", top:0, zIndex:30 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            {/* Hamburger button */}
            <button onClick={() => setSideOpen(!sideOpen)} style={{ background:"transparent", border:`1px solid ${T.border}`, borderRadius:6, cursor:"pointer", padding:"6px 8px", display:"flex", flexDirection:"column", gap:4, alignItems:"center", justifyContent:"center" }}>
              <div style={{ width:18, height:2, background:T.navy, borderRadius:1 }}/>
              <div style={{ width:18, height:2, background:T.navy, borderRadius:1 }}/>
              <div style={{ width:18, height:2, background:T.navy, borderRadius:1 }}/>
            </button>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{NAV.find(n => n.id === page)?.label}</div>
              <div style={{ fontSize:10, color:T.textMute, letterSpacing:0.5 }}>LPB Pama Bessai Berinta</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <LogoBar />
            <div style={{ display:"flex", alignItems:"center", gap:6, padding:"5px 10px", borderRadius:4, background:T.redBg, border:`1px solid ${T.red}` }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:T.red }}/>
              <span style={{ fontSize:11, fontWeight:700, color:T.red, letterSpacing:1 }}>LIVE</span>
            </div>
          </div>
        </header>

        {/* Gold rule under header */}
        <div style={{ height:3, background:`linear-gradient(90deg, ${T.gold}, transparent)`, flexShrink:0 }}/>

        {/* Content */}
        <div style={{ flex:1, padding:"24px 16px", maxWidth:1100, width:"100%", boxSizing:"border-box" }}>
          {pages[page]}
        </div>
      </main>
    </div>
  );
}

// --- BERANDA ------------------------------------------------------
function Beranda({ setPage, pct, done, total, arsip }) {
  const stats = [
    { label:"Total Vlog",    val:arsip.length,                                    color:T.blue,  bg:T.blueLight },
    { label:"Disetujui",     val:arsip.filter(d=>d.status==="approved").length,   color:T.green, bg:T.greenBg   },
    { label:"Perlu Review",  val:arsip.filter(d=>d.status==="review").length,     color:T.amber, bg:T.amberBg   },
    { label:"Progress SOP",  val:pct+"%",                                         color:T.navy,  bg:T.blueLight, sub:`${done} dari ${total} langkah` },
  ];

  const quick = [
    { id:"sop",        label:"Checklist SOP Produksi",    desc:"30 langkah pra-produksi, produksi, dan pasca-produksi CapCut", color:T.blue    },
    { id:"template",   label:"Template Script & Audio",   desc:"Naskah voiceover siap pakai untuk 5 pilar kegiatan",           color:"#0E7C4A" },
    { id:"submission", label:"Submit Vlog Baru",          desc:"Unggah hasil produksi dan simpan ke Google Drive",             color:"#7B3F9E" },
    { id:"arsip",      label:"Arsip & Review Vlog",       desc:"Kelola, approve, dan review seluruh vlog kegiatan",            color:T.amber   },
  ];

  return (
    <div>
      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, ${T.navyMid} 60%, ${T.navyLight} 100%)`, borderRadius:10, padding:"36px 40px", marginBottom:24, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, right:0, width:300, height:"100%", background:`linear-gradient(to left, ${T.gold}18, transparent)`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-30, right:40, width:180, height:180, borderRadius:"50%", border:`2px solid ${T.gold}22`, pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:-60, right:80, width:260, height:260, borderRadius:"50%", border:`1px solid ${T.gold}11`, pointerEvents:"none" }}/>

        <div style={{ marginBottom:20 }}><LogoBar /></div>

        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between" }}>
          <div style={{ zIndex:1 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:3, textTransform:"uppercase", marginBottom:8, fontWeight:600 }}>Platform Dokumentasi Kegiatan</div>
            <div style={{ fontSize:32, fontWeight:900, color:T.white, letterSpacing:-1, lineHeight:1.1, marginBottom:6 }}>V-KNOW</div>
            <div style={{ fontSize:13, color:"#94A3B8", marginBottom:6 }}>Video Knowledge Management</div>
            <div style={{ fontSize:12, color:"#CBD5E1", maxWidth:480, lineHeight:1.8, marginBottom:24 }}>
              Standarisasi dokumentasi vlog kegiatan Fasilitator LPB Pama Bessai Berinta sebagai aset knowledge management yang bernilai bagi institusi dan mitra binaan.
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setPage("sop")} style={{ ...btn(T.gold, T.navy), fontWeight:700, padding:"10px 24px" }}>Mulai Checklist SOP</button>
              <button onClick={() => setPage("submission")} style={{ ...btn("transparent", T.white, `1px solid ${"#475569"}`), padding:"10px 20px" }}>Submit Vlog</button>
            </div>
          </div>
          <div style={{ flexShrink:0 }}><LPBLogo size={96} /></div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
        {stats.map((s,i) => (
          <div key={i} style={{ ...card, padding:"18px 20px", borderTop:`3px solid ${s.color}` }}>
            <div style={{ fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div style={{ fontSize:12, color:T.text, fontWeight:600, marginTop:4 }}>{s.label}</div>
            {s.sub && <div style={{ fontSize:10, color:T.textMute, marginTop:2 }}>{s.sub}</div>}
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Aktivitas terbaru */}
        <div style={{ ...card, padding:20 }}>
          <SectionLabel>Aktivitas Terbaru</SectionLabel>
          <GoldRule />
          {arsip.length === 0 ? (
            <div style={{ fontSize:12, color:T.textMute, fontStyle:"italic", padding:"12px 0" }}>Belum ada vlog yang disubmit.</div>
          ) : arsip.slice(0,4).map((a,i) => (
            <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"10px 0", borderBottom: i < Math.min(arsip.length,4)-1 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ width:36, height:36, borderRadius:6, background: a.status==="approved" ? T.greenBg : a.status==="rejected" ? T.redBg : T.amberBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <PilarBadge pilar={a.pilar} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:12, color:T.text, fontWeight:500, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.judul}</div>
                <div style={{ fontSize:10, color:T.textMute, marginTop:2 }}>{a.fasilitator} - {a.submitAt}</div>
              </div>
              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>

        {/* Quick access */}
        <div style={{ ...card, padding:20 }}>
          <SectionLabel>Akses Cepat</SectionLabel>
          <GoldRule />
          {quick.map(m => (
            <button key={m.id} onClick={() => setPage(m.id)} style={{ width:"100%", display:"flex", alignItems:"center", gap:12, background:T.bg, border:`1px solid ${T.border}`, borderRadius:7, padding:"12px 14px", cursor:"pointer", textAlign:"left", marginBottom:8, transition:"border-color 0.15s" }}>
              <div style={{ width:32, height:32, borderRadius:6, background:m.color, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:12, fontWeight:800, color:T.white }}>{PILAR.find(p=>p.label===m.label?.split(" ")[0])?.icon || m.label[0]}</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:12, color:T.text, fontWeight:600, marginBottom:2 }}>{m.label}</div>
                <div style={{ fontSize:10, color:T.textMute, lineHeight:1.4 }}>{m.desc}</div>
              </div>
              <span style={{ color:T.textMute, fontSize:14 }}>{">"}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- SOP PAGE -----------------------------------------------------
function SOPPage({ cl, toggle, pct, done, total }) {
  const tagColors = { "SETUP":T.textMute, "MULTI-KLIP":T.blue, "SPLIT":T.blue, "TRANSITION":"#6366F1", "OVERLAY":"#7B3F9E", "CHROMA KEY":"#7B3F9E", "TEXT":T.amber, "SPEED":T.orange, "SLOW-MO":T.orange, "AUTO CAPTIONS":"#0E7C4A", "AUDIO":"#DB2777", "FILTER":T.orange, "COLOR":T.orange, "STICKER":"#0891B2", "TEMPLATE":"#6366F1", "REVIEW":T.blue, "EXPORT":T.red, "SUBMIT":T.red };

  return (
    <div>
      <SectionLabel>Modul 01</SectionLabel>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
        <h2 style={{ fontSize:22, fontWeight:800, color:T.text, margin:0 }}>SOP dan Panduan Produksi</h2>
        <div style={{ fontSize:12, fontWeight:600, color:T.blue }}>{done}/{total} langkah ({pct}%)</div>
      </div>
      <div style={{ height:6, background:T.border, borderRadius:3, overflow:"hidden", marginBottom:6 }}>
        <div style={{ height:"100%", width:`${pct}%`, background:`linear-gradient(90deg,${T.gold},${T.blue})`, borderRadius:3, transition:"width 0.3s" }}/>
      </div>
      <GoldRule />

      {/* Framing guide */}
      <div style={{ ...card, padding:18, marginBottom:20 }}>
        <SectionLabel>Panduan Framing</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
          {[
            { shot:"WIDE",     use:"Hook banner / suasana lokasi",    rule:"Subjek isi bawah 1/3 frame", color:T.blue    },
            { shot:"MEDIUM",   use:"Interview peserta / petani",      rule:"Kepala-pinggang, off-center", color:"#0E7C4A" },
            { shot:"CLOSE-UP", use:"Produk, tanaman, tangan",         rule:"Fokus tajam, bokeh latar",    color:"#7B3F9E" },
            { shot:"OTS",      use:"Fasilitator mendampingi mitra",   rule:"Bahu 30% frame",              color:T.amber   },
          ].map((f,i) => (
            <div key={i} style={{ background:T.bg, borderRadius:7, padding:12, borderLeft:`3px solid ${f.color}` }}>
              <div style={{ fontSize:10, fontWeight:800, color:f.color, letterSpacing:1, marginBottom:4 }}>{f.shot}</div>
              <div style={{ fontSize:11, color:T.text, marginBottom:3 }}>{f.use}</div>
              <div style={{ fontSize:10, color:T.textMute }}>{f.rule}</div>
            </div>
          ))}
        </div>
      </div>

      {cl.map((phase, si) => {
        const pd = phase.items.filter(i => i.done).length;
        const offset = cl.slice(0, si).reduce((a,s) => a + s.items.length, 0);
        return (
          <div key={si} style={{ ...card, marginBottom:16, overflow:"hidden" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", background:T.bg, borderBottom:`1px solid ${T.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:32, height:32, borderRadius:6, background:phase.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:900, color:T.white }}>{si+1}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:T.text }}>{phase.phase}</div>
                  <div style={{ fontSize:10, color:T.textMute }}>Langkah {offset+1} sampai {offset+phase.items.length} dari {total}</div>
                </div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ fontSize:11, color:T.textMute, fontWeight:500 }}>{pd}/{phase.items.length}</div>
                <div style={{ width:80, height:5, background:T.border, borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(pd/phase.items.length)*100}%`, background:phase.color, borderRadius:3 }}/>
                </div>
              </div>
            </div>
            <div style={{ padding:"10px 16px 14px" }}>
              {phase.items.map((item, ii) => {
                const tagMatch = item.label.match(/^\[([^\]]+)\]\s*(.*)/);
                const tag  = tagMatch ? tagMatch[1] : null;
                const text = tagMatch ? tagMatch[2] : item.label;
                const tagColor = tag ? (tagColors[tag] || T.textMute) : phase.color;
                return (
                  <button key={ii} onClick={() => toggle(si, ii)} style={{ width:"100%", display:"flex", alignItems:"flex-start", gap:12, padding:"9px 10px", marginBottom:4, background: item.done ? T.bg : T.white, border:`1px solid ${item.done ? T.border : T.border}`, borderRadius:6, cursor:"pointer", textAlign:"left", transition:"all 0.12s" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", flexShrink:0, background: item.done ? phase.color : T.white, border:`2px solid ${item.done ? phase.color : T.border2}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color: item.done ? T.white : T.textMute, marginTop:2 }}>
                      {item.done ? "v" : offset+ii+1}
                    </div>
                    <div style={{ flex:1, paddingTop:1 }}>
                      {tag && <span style={{ ...badge(tagColor, tagColor+"18"), marginRight:6, marginBottom:3, display:"inline-block" }}>{tag}</span>}
                      <span style={{ fontSize:11, lineHeight:1.6, color: item.done ? T.textMute : T.text, textDecoration: item.done ? "line-through" : "none" }}>{text}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// --- TEMPLATE PAGE ------------------------------------------------
function TemplatePage({ idx, setIdx }) {
  const t = TEMPLATES[idx];
  const [copied, setCopied] = useState(null);
  const copy = (text, key) => { navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(null), 2000); }); };

  const timeline = [
    { seg:"HOOK",      time:"0:00-0:05", color:T.blue    },
    { seg:"KONTEKS",   time:"0:05-0:20", color:"#0E7C4A" },
    { seg:"INTI",      time:"0:20-0:50", color:T.navy, flex:2 },
    { seg:"TESTIMONI", time:"0:50-1:10", color:"#7B3F9E" },
    { seg:"HASIL",     time:"1:10-1:25", color:T.amber   },
    { seg:"CLOSING",   time:"1:25-1:35", color:T.gold    },
  ];

  const segs = [
    { key:"hook",    label:"HOOK (0:00-0:05)",    hint:"Baca cepat dan penuh energi" },
    { key:"konteks", label:"KONTEKS (0:05-0:20)", hint:"Nada natural, informasi padat" },
    { key:"inti",    label:"INTI (0:20-0:50)",    hint:"Bisa dipecah 2 kalimat di ElevenLabs" },
    { key:"closing", label:"CLOSING (1:25-1:35)", hint:"Lambat dan penuh keyakinan" },
  ];

  return (
    <div>
      <SectionLabel>Modul 02</SectionLabel>
      <h2 style={{ fontSize:22, fontWeight:800, color:T.text, margin:"0 0 4px" }}>Template Script dan Audio</h2>
      <div style={{ fontSize:12, color:T.textMute, marginBottom:4 }}>Pilih pilar kegiatan, salin naskah, paste ke ElevenLabs</div>
      <GoldRule />

      {/* Timeline */}
      <div style={{ ...card, padding:18, marginBottom:20 }}>
        <SectionLabel>Struktur Sinematik 90 Detik</SectionLabel>
        <div style={{ display:"flex", borderRadius:6, overflow:"hidden", height:36, marginBottom:14, border:`1px solid ${T.border}` }}>
          {timeline.map((s,i) => (
            <div key={i} style={{ flex:s.flex||1, background:s.color, borderRight: i < timeline.length-1 ? "1px solid rgba(255,255,255,0.3)" : "none", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2px 4px" }}>
              <span style={{ fontSize:8, fontWeight:800, color:T.white, letterSpacing:1 }}>{s.seg}</span>
              <span style={{ fontSize:7, color:"rgba(255,255,255,0.7)" }}>{s.time}</span>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {timeline.map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:8, height:8, borderRadius:2, background:s.color, flexShrink:0 }}/>
              <span style={{ fontSize:10, color:T.textSub }}><strong style={{ color:s.color }}>{s.seg}</strong> {s.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pilar selector */}
      <div style={{ marginBottom:16 }}>
        <SectionLabel>Pilih Pilar Kegiatan</SectionLabel>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
          {PILAR.map((p,i) => {
            const active = idx === i;
            return (
              <button key={i} onClick={() => setIdx(i)} style={{ padding:"14px 6px", borderRadius:7, border:`2px solid ${active ? p.color : T.border}`, cursor:"pointer", background: active ? p.color+"18" : T.white, display:"flex", flexDirection:"column", alignItems:"center", gap:6, transition:"all 0.15s" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background: active ? p.color : T.bg, border:`2px solid ${active ? p.color : T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:900, color: active ? T.white : T.textMute }}>{p.icon}</div>
                <span style={{ fontSize:10, fontWeight: active ? 700 : 500, color: active ? p.color : T.textSub }}>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Script */}
      <div style={{ ...card, padding:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{ width:4, height:20, background:t.color, borderRadius:2 }}/>
          <span style={{ fontSize:13, fontWeight:700, color:T.text }}>Naskah Pilar {t.pilar}</span>
          <PilarBadge pilar={t.pilar} />
        </div>
        {segs.map(seg => (
          <div key={seg.key} style={{ marginBottom:12, background:T.bg, borderRadius:7, padding:14, borderLeft:`3px solid ${t.color}` }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:t.color, letterSpacing:1 }}>{seg.label}</div>
                <div style={{ fontSize:10, color:T.textMute, marginTop:2 }}>{seg.hint}</div>
              </div>
              <button onClick={() => copy(t[seg.key], seg.key)} style={{ ...btn(copied===seg.key ? T.greenBg : T.white, copied===seg.key ? T.green : T.textSub, `1px solid ${T.border}`), padding:"4px 10px", fontSize:10 }}>
                {copied === seg.key ? "Disalin" : "Salin"}
              </button>
            </div>
            <div style={{ fontSize:12, color:T.text, lineHeight:1.8, fontStyle:"italic" }}>"{t[seg.key]}"</div>
          </div>
        ))}
        <div style={{ background:T.goldLight, border:`1px solid ${T.gold}55`, borderRadius:7, padding:12, marginTop:4 }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.amber, marginBottom:6, letterSpacing:0.5 }}>Setting ElevenLabs yang Disarankan</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4 }}>
            {[["Voice","Rachel (profesional) atau Adam (hangat)"],["Stability","0.50"],["Clarity","0.80"],["Style","0.30"]].map(([k,v],i) => (
              <div key={i} style={{ fontSize:10, color:T.textSub }}><strong style={{ color:T.amber }}>{k}:</strong> {v}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SUBMISSION PAGE ----------------------------------------------
function SubmissionPage({ step, setStep, data, setData, showToast, onSubmitSuccess }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [result, setResult]   = useState(null);

  const reset = () => { setDone(false); setStep(1); setResult(null); setData({ judul:"", pilar:"", pilarLain:"", lokasi:"", tanggal:"", fasilitator:"" }); };

  const handleSubmit = async () => {
    setLoading(true);
    const submitAt = new Date().toLocaleDateString("id-ID", { day:"numeric", month:"long", year:"numeric" });
    const newEntry = { id:"VK-"+Date.now(), judul:data.judul, pilar:data.pilar==="Lainnya"&&data.pilarLain?`Lainnya - ${data.pilarLain}`:data.pilar, tanggal:data.tanggal, fasilitator:data.fasilitator, lokasi:data.lokasi, durasi:"-", status:"review", catatan:"", submitAt, folder_url:"" };

    try {
      await supaFetch("POST", SUPA_TABLE, { id:newEntry.id, submit_at:submitAt, judul:newEntry.judul, pilar:newEntry.pilar, tanggal:newEntry.tanggal, lokasi:newEntry.lokasi, fasilitator:newEntry.fasilitator, status:"review", catatan:"", link_video:"", folder_url:"", durasi:"-" });
      const params = new URLSearchParams({ action:"submit", judul:newEntry.judul||"", pilar:newEntry.pilar||"", tanggal:newEntry.tanggal||"", lokasi:newEntry.lokasi||"", fasilitator:newEntry.fasilitator||"" });
      fetch(APPS_SCRIPT_URL+"?"+params.toString(), { method:"GET", mode:"no-cors" }).catch(()=>{});
      if (onSubmitSuccess) onSubmitSuccess(newEntry);
      setResult(newEntry); setDone(true);
      showToast("Vlog berhasil disubmit!", T.green);
    } catch(e) {
      if (onSubmitSuccess) onSubmitSuccess(newEntry);
      setResult(newEntry); setDone(true);
      showToast("Tersimpan lokal. Cek koneksi.", T.amber);
    } finally { setLoading(false); }
  };

  const inp = { width:"100%", background:T.bg, border:`1px solid ${T.border}`, borderRadius:6, padding:"10px 12px", color:T.text, fontSize:12, outline:"none", boxSizing:"border-box", transition:"border-color 0.15s" };
  const lbl = { fontSize:10, fontWeight:600, color:T.textSub, letterSpacing:0.8, display:"block", marginBottom:6, textTransform:"uppercase" };
  const steps = ["Detail Kegiatan", "Upload File", "Konfirmasi"];

  if (done && result) return (
    <div>
      <div style={{ background:`linear-gradient(135deg,${T.navy},${T.navyLight})`, borderRadius:10, padding:32, marginBottom:20, textAlign:"center" }}>
        <div style={{ width:60, height:60, borderRadius:"50%", background:T.gold+"33", border:`2px solid ${T.gold}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, fontWeight:900, margin:"0 auto 16px", color:T.gold }}>v</div>
        <div style={{ fontSize:20, fontWeight:800, color:T.white, marginBottom:6 }}>Vlog Berhasil Disubmit</div>
        <div style={{ fontSize:12, color:"#94A3B8" }}>Data tersimpan. Admin akan mereview dalam 1x24 jam.</div>
      </div>
      <div style={{ ...card, padding:20, marginBottom:16 }}>
        <SectionLabel>Langkah Selanjutnya</SectionLabel>
        <GoldRule />
        {["Buka folder Google Drive pilar "+result.pilar,"Upload file MP4 ke sub-folder 01_Video","Upload MP3 ElevenLabs ke 02_Audio_Voiceover","Upload thumbnail ke 03_Thumbnail"].map((s,i) => (
          <div key={i} style={{ display:"flex", gap:12, padding:"8px 0", borderBottom: i<3?`1px solid ${T.border}`:"none" }}>
            <div style={{ width:22, height:22, borderRadius:"50%", background:T.gold, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, color:T.navy, flexShrink:0 }}>{i+1}</div>
            <div style={{ fontSize:12, color:T.textSub, lineHeight:1.5 }}>{s}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        <a href={DRIVE_FOLDERS[result.pilar]||"#"} target="_blank" rel="noopener noreferrer" style={{ ...btn(T.green, T.white), textDecoration:"none", display:"inline-block" }}>Buka Folder Drive</a>
        <button onClick={reset} style={btn(T.bg, T.textSub, `1px solid ${T.border}`)}>Submit Vlog Lain</button>
      </div>
    </div>
  );

  return (
    <div>
      <SectionLabel>Modul 03</SectionLabel>
      <h2 style={{ fontSize:22, fontWeight:800, color:T.text, margin:"0 0 4px" }}>Submission Vlog</h2>
      <div style={{ fontSize:12, color:T.textMute, marginBottom:4 }}>Isi form, upload file ke Drive, lalu submit</div>
      <GoldRule />

      {/* Steps */}
      <div style={{ display:"flex", alignItems:"center", marginBottom:24 }}>
        {steps.map((s,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", flex: i < steps.length-1 ? 1 : "none" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", background: step>i+1 ? T.green : step===i+1 ? T.navy : T.bg, border:`2px solid ${step>=i+1 ? (step>i+1?T.green:T.navy) : T.border}`, color: step>i+1 ? T.white : step===i+1 ? T.white : T.textMute, fontSize:11, fontWeight:800 }}>{step>i+1?"v":i+1}</div>
              <div style={{ fontSize:9, fontWeight: step===i+1?700:400, color: step===i+1?T.navy:T.textMute, whiteSpace:"nowrap", letterSpacing:0.3 }}>{s}</div>
            </div>
            {i < steps.length-1 && <div style={{ flex:1, height:2, background: step>i+1?T.green:T.border, margin:"0 8px", marginBottom:20 }}/>}
          </div>
        ))}
      </div>

      {/* Drive shortcut */}
      <div style={{ background:T.greenBg, border:`1px solid ${T.green}33`, borderRadius:7, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:11, color:T.green, fontWeight:600 }}>Akses Cepat Folder Google Drive</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {PILAR.map((p,i) => (
            <a key={i} href={DRIVE_FOLDERS[p.label]||"#"} target="_blank" rel="noopener noreferrer" style={{ padding:"3px 10px", borderRadius:4, fontSize:9, fontWeight:700, background: data.pilar===p.label ? p.color : T.white, border:`1px solid ${data.pilar===p.label ? p.color : T.border}`, color: data.pilar===p.label ? T.white : T.textSub, textDecoration:"none" }}>{p.label}</a>
          ))}
        </div>
      </div>

      <div style={{ ...card, padding:24 }}>
        {step === 1 && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Judul Kegiatan</label>
              <input value={data.judul||""} onChange={e=>setData({...data,judul:e.target.value})} placeholder="cth: Pelatihan SOP Panen Jahe Merah - Desa Sukarahmat" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Nama Fasilitator / Admin</label>
              <select value={data.fasilitator||""} onChange={e=>setData({...data,fasilitator:e.target.value})} style={{...inp,cursor:"pointer"}}>
                <option value="">-- Pilih --</option>
                <optgroup label="Fasilitator">{FASILITATOR.map(n=><option key={n} value={n}>{n}</option>)}</optgroup>
                <optgroup label="Admin">{ADMIN.map(n=><option key={n} value={n}>{n} (Admin)</option>)}</optgroup>
                <optgroup label="Koordinator">{KOORDINATOR.map(n=><option key={n} value={n}>{n} (Koordinator)</option>)}</optgroup>
              </select>
            </div>
            <div>
              <label style={lbl}>Lokasi</label>
              <input value={data.lokasi||""} onChange={e=>setData({...data,lokasi:e.target.value})} placeholder="Desa / Kecamatan / Kota" style={inp}/>
            </div>
            <div>
              <label style={lbl}>Tanggal Kegiatan</label>
              <input value={data.tanggal||""} onChange={e=>setData({...data,tanggal:e.target.value})} placeholder="cth: 15-16 Mei 2026" style={inp}/>
            </div>
            <div style={{ gridColumn:"1/-1" }}>
              <label style={lbl}>Pilar Kegiatan</label>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
                {PILAR.map((p,i) => { const active=data.pilar===p.label; return (
                  <button key={i} type="button" onClick={()=>setData({...data,pilar:p.label})} style={{ padding:"10px 4px", borderRadius:7, border:`2px solid ${active?p.color:T.border}`, background:active?p.color+"15":T.bg, cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:active?p.color:T.white, border:`1px solid ${active?p.color:T.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:900, color:active?T.white:T.textMute }}>{p.icon}</div>
                    <span style={{ fontSize:10, fontWeight:active?700:400, color:active?p.color:T.textSub }}>{p.label}</span>
                  </button>
                ); })}
              </div>
              {data.pilar==="Lainnya" && <div style={{ marginTop:10 }}><label style={lbl}>Keterangan</label><input value={data.pilarLain||""} onChange={e=>setData({...data,pilarLain:e.target.value})} placeholder="cth: Monitoring, Rapat Koordinasi, dll." style={inp}/></div>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ background:T.greenBg, border:`1px solid ${T.green}44`, borderRadius:7, padding:14, marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.green, marginBottom:6 }}>Upload File ke Google Drive</div>
              <div style={{ fontSize:11, color:T.textSub, marginBottom:10 }}>Buka folder pilar <strong>{data.pilar||"kegiatan"}</strong> di Drive, lalu upload ke sub-folder yang sesuai.</div>
              <a href={DRIVE_FOLDERS[data.pilar]||"#"} target="_blank" rel="noopener noreferrer" style={{ ...btn(T.green,T.white), textDecoration:"none", display:"inline-block", fontSize:11 }}>Buka Folder Drive</a>
            </div>
            {[{label:"01_Video",color:T.blue,desc:`VKNOW_${data.pilar||"[Pilar]"}_[NamaKegiatan]_[DDMMYY]_FINAL.mp4`},{label:"02_Audio_Voiceover",color:"#0E7C4A",desc:"File .mp3 dari ElevenLabs - hook, konteks, inti, closing"},{label:"03_Thumbnail",color:"#7B3F9E",desc:"Gambar JPG/PNG 1080x1920 - frame terbaik + twibbon"}].map((f,i) => (
              <div key={i} style={{ border:`1px solid ${f.color}33`, borderRadius:7, padding:"12px 16px", marginBottom:10, background:f.color+"08", display:"flex", alignItems:"flex-start", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:f.color, marginTop:4, flexShrink:0 }}/>
                <div><div style={{ fontSize:12, color:f.color, fontWeight:700, marginBottom:2 }}>{f.label}</div><div style={{ fontSize:10, color:T.textMute }}>{f.desc}</div></div>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div>
            <SectionLabel>Konfirmasi Data Submission</SectionLabel>
            <GoldRule />
            {[["Judul Kegiatan",data.judul],["Fasilitator/Admin",data.fasilitator],["Lokasi",data.lokasi],["Tanggal",data.tanggal],["Pilar",data.pilar==="Lainnya"&&data.pilarLain?`Lainnya - ${data.pilarLain}`:data.pilar]].map(([k,v],i) => (
              <div key={i} style={{ display:"flex", padding:"10px 0", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ width:160, fontSize:11, color:T.textMute, fontWeight:500 }}>{k}</div>
                <div style={{ fontSize:12, color:T.text, fontWeight: v?500:400, fontStyle: v?"normal":"italic" }}>{v||"Belum diisi"}</div>
              </div>
            ))}
            <div style={{ marginTop:14, display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div style={{ background:T.blueLight, border:`1px solid ${T.blue}33`, borderRadius:7, padding:10 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.blue, marginBottom:2 }}>Google Sheets</div>
                <div style={{ fontSize:10, color:T.textMute }}>Data tersimpan otomatis sebagai arsip</div>
              </div>
              <div style={{ background:T.greenBg, border:`1px solid ${T.green}33`, borderRadius:7, padding:10 }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.green, marginBottom:2 }}>Google Drive</div>
                <div style={{ fontSize:10, color:T.textMute }}>Folder kegiatan dibuat otomatis</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ display:"flex", justifyContent:"space-between", marginTop:20, paddingTop:16, borderTop:`1px solid ${T.border}` }}>
          {step > 1 ? <button onClick={()=>setStep(step-1)} style={btn(T.bg,T.textSub,`1px solid ${T.border}`)}>Kembali</button> : <div/>}
          {step < 3
            ? <button onClick={()=>setStep(step+1)} style={btn(T.navy,T.white)}>Lanjut</button>
            : <button onClick={handleSubmit} disabled={loading} style={btn(loading?T.textMute:T.navy, T.white)}>{loading?"Menyimpan...":"Submit Vlog"}</button>
          }
        </div>
      </div>
    </div>
  );
}

// --- ARSIP PAGE ---------------------------------------------------
function ArsipPage({ arsip, setArsip, showToast }) {
  const [selected, setSelected]         = useState(null);
  const [editMode, setEditMode]         = useState(false);
  const [editData, setEditData]         = useState(null);
  const [filterPilar, setFilterPilar]   = useState("Semua");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [catatan, setCatatan]           = useState("");
  const [delConfirm, setDelConfirm]     = useState(null);
  const [syncing, setSyncing]           = useState(false);
  const [lastSync, setLastSync]         = useState(null);

  const refreshFromSheets = async () => {
    setSyncing(true);
    try {
      const data = await supaFetch("GET", SUPA_TABLE+"?select=*&order=created_at.desc");
      if (Array.isArray(data) && data.length > 0) {
        const mapped = data.map(d => ({ id:d.id||"", judul:d.judul||"", pilar:d.pilar||"", tanggal:d.tanggal||"", lokasi:d.lokasi||"", fasilitator:d.fasilitator||"", durasi:d.durasi||"-", status:d.status||"review", catatan:d.catatan||"", submitAt:d.submit_at||"", folderUrl:d.folder_url||"" }));
        const supaIds = new Set(mapped.map(d=>String(d.id)));
        const localOnly = arsip.filter(d=>!supaIds.has(String(d.id)));
        setArsip([...mapped,...localOnly]);
        setLastSync(new Date().toLocaleTimeString("id-ID"));
        showToast("Berhasil! "+mapped.length+" data dimuat.", T.green);
      } else { showToast("Database kosong.", T.amber); }
    } catch(e) { showToast("Gagal: "+e.message, T.red); }
    finally { setSyncing(false); }
  };

  const syncToSheets = async (id, status, catatanVal) => {
    try { await supaFetch("PATCH", SUPA_TABLE+"?id=eq."+encodeURIComponent(id), { status, catatan:catatanVal||"" }); } catch(e) {}
    try { const p=new URLSearchParams({action:"updateStatus",id:String(id),status,catatan:catatanVal||""}); fetch(APPS_SCRIPT_URL+"?"+p.toString(),{method:"GET",mode:"no-cors"}).catch(()=>{}); } catch(e) {}
  };

  const approve = (id) => {
    const nc = catatan||arsip.find(d=>d.id===id)?.catatan||"";
    setArsip(prev=>prev.map(d=>d.id===id?{...d,status:"approved",catatan:nc}:d));
    setSelected(prev=>prev?{...prev,status:"approved",catatan:nc}:prev);
    setCatatan(""); showToast("Vlog disetujui.", T.green); syncToSheets(id,"approved",nc);
  };
  const reject = (id) => {
    if(!catatan.trim()){showToast("Isi catatan alasan penolakan dulu.",T.amber);return;}
    setArsip(prev=>prev.map(d=>d.id===id?{...d,status:"rejected",catatan}:d));
    setSelected(prev=>prev?{...prev,status:"rejected",catatan}:prev);
    const cv=catatan; setCatatan(""); showToast("Vlog ditolak.",T.red); syncToSheets(id,"rejected",cv);
  };
  const saveEdit = () => {
    setArsip(prev=>prev.map(d=>d.id===editData.id?{...editData}:d));
    setSelected(editData); setEditMode(false); showToast("Data diperbarui."); syncToSheets(editData.id,editData.status,editData.catatan);
  };
  const del = (id) => {
    setArsip(prev=>prev.filter(d=>d.id!==id));
    setSelected(null); setDelConfirm(null); showToast("Vlog dihapus.",T.red);
  };

  const filtered = arsip.filter(d=>(filterPilar==="Semua"||d.pilar===filterPilar)&&(filterStatus==="Semua"||d.status===filterStatus));
  const item = selected ? (arsip.find(d=>d.id===selected.id)||selected) : null;
  const inp = { width:"100%", background:T.bg, border:`1px solid ${T.border}`, borderRadius:6, padding:"8px 12px", color:T.text, fontSize:12, outline:"none", boxSizing:"border-box" };

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:4 }}>
        <div>
          <SectionLabel>Arsip</SectionLabel>
          <h2 style={{ fontSize:22, fontWeight:800, color:T.text, margin:0 }}>Repositori Vlog Kegiatan</h2>
          <div style={{ fontSize:11, color:T.textMute, marginTop:2 }}>Klik baris untuk membuka detail, review, edit, atau hapus</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <button onClick={refreshFromSheets} disabled={syncing} style={{ ...btn(syncing?T.bg:T.navy, syncing?T.textMute:T.white, `1px solid ${T.border}`), display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ width:12,height:12,borderRadius:"50%",border:`2px solid ${syncing?T.textMute:T.white}`,borderTopColor:"transparent",animation:syncing?"spin 0.8s linear infinite":"none" }}/>
            {syncing ? "Memuat..." : "Refresh dari Database"}
          </button>
          {lastSync && <div style={{ fontSize:10, color:T.textMute, marginTop:4 }}>Sync: {lastSync}</div>}
        </div>
      </div>
      <GoldRule />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

      {/* Stat cards */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:16 }}>
        {[{label:"Total",val:arsip.length,color:T.blue,f:"Semua"},{label:"Disetujui",val:arsip.filter(d=>d.status==="approved").length,color:T.green,f:"approved"},{label:"Review",val:arsip.filter(d=>d.status==="review").length,color:T.amber,f:"review"},{label:"Ditolak",val:arsip.filter(d=>d.status==="rejected").length,color:T.red,f:"rejected"}].map((s,i) => (
          <div key={i} onClick={()=>setFilterStatus(s.f)} style={{ ...card, padding:"12px 16px", borderTop:`3px solid ${s.color}`, cursor:"pointer", borderColor: filterStatus===s.f ? s.color : T.border }}>
            <div style={{ fontSize:22,fontWeight:800,color:s.color }}>{s.val}</div>
            <div style={{ fontSize:10,color:T.textSub,marginTop:2,fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
        <span style={{ fontSize:10, color:T.textMute, fontWeight:600, letterSpacing:0.5 }}>PILAR:</span>
        {["Semua",...PILAR.map(p=>p.label)].map(f => (
          <button key={f} onClick={()=>setFilterPilar(f)} style={{ padding:"3px 10px", borderRadius:4, border:`1px solid ${filterPilar===f?T.navy:T.border}`, background:filterPilar===f?T.navy:T.white, color:filterPilar===f?T.white:T.textSub, fontSize:10, cursor:"pointer", fontWeight:filterPilar===f?600:400 }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ ...card, overflow:"hidden", marginRight: item?440:0, transition:"margin 0.2s" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 110px 130px 90px 95px", padding:"10px 18px", background:T.navy, gap:8 }}>
          {["Judul Kegiatan","Pilar","Fasilitator","Tanggal","Status"].map(h => (
            <div key={h} style={{ fontSize:10, color:T.gold, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase" }}>{h}</div>
          ))}
        </div>
        {filtered.length === 0
          ? <div style={{ padding:32, textAlign:"center", color:T.textMute, fontSize:12, fontStyle:"italic" }}>Tidak ada data yang sesuai filter.</div>
          : filtered.map(row => {
            const isSel = selected?.id === row.id;
            return (
              <div key={row.id} onClick={()=>{setSelected(row);setEditMode(false);setCatatan(row.catatan||"");}} style={{ display:"grid", gridTemplateColumns:"1fr 110px 130px 90px 95px", padding:"12px 18px", borderBottom:`1px solid ${T.border}`, alignItems:"center", cursor:"pointer", background: isSel ? T.blueLight : row.status==="review" ? T.amberBg+"55" : T.white, borderLeft:`3px solid ${isSel?T.navy:"transparent"}`, transition:"all 0.1s", gap:8 }}>
                <div>
                  <div style={{ fontSize:12, color:T.text, fontWeight:500, marginBottom:2 }}>{row.judul}</div>
                  {row.catatan && <div style={{ fontSize:10, color:T.textMute, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>"{row.catatan}"</div>}
                </div>
                <PilarBadge pilar={row.pilar} />
                <div style={{ fontSize:11, color:T.textSub }}>{row.fasilitator}</div>
                <div style={{ fontSize:11, color:T.textMute }}>{row.tanggal}</div>
                <StatusBadge status={row.status} />
              </div>
            );
          })
        }
      </div>

      {/* Detail panel */}
      {item && (
        <div style={{ position:"fixed", top:0, right:0, width:420, height:"100vh", background:T.white, borderLeft:`1px solid ${T.border}`, zIndex:100, display:"flex", flexDirection:"column", overflowY:"auto", boxShadow:"-4px 0 20px rgba(0,0,0,0.1)" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.navy, position:"sticky", top:0 }}>
            <div style={{ fontSize:12, fontWeight:700, color:T.white, letterSpacing:0.5 }}>DETAIL VLOG</div>
            <button onClick={()=>{setSelected(null);setEditMode(false);setCatatan("");}} style={{ background:"transparent", border:"none", color:"#94A3B8", cursor:"pointer", fontSize:16, fontWeight:700, lineHeight:1 }}>X</button>
          </div>
          <div style={{ height:3, background:T.gold }}/>

          <div style={{ padding:20, flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <StatusBadge status={item.status} />
              <div style={{ fontSize:10, color:T.textMute }}>Submit: {item.submitAt}</div>
            </div>

            {!editMode ? (
              <>
                <div style={{ background:T.bg, borderRadius:7, padding:14, marginBottom:14 }}>
                  {[["Judul",item.judul],["Pilar",item.pilar],["Tanggal",item.tanggal],["Lokasi",item.lokasi],["Fasilitator/Admin",item.fasilitator],["Durasi",item.durasi]].map(([lbl,val],i) => (
                    <div key={i} style={{ display:"flex", gap:8, padding:"7px 0", borderBottom:i<5?`1px solid ${T.border}`:"none" }}>
                      <div style={{ width:130, fontSize:10, color:T.textMute, fontWeight:500, flexShrink:0 }}>{lbl}</div>
                      <div style={{ fontSize:12, color:T.text }}>{val||"-"}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:10, fontWeight:600, color:T.textSub, letterSpacing:0.8, marginBottom:6 }}>CATATAN REVIEW</div>
                  <div style={{ background:T.bg, borderRadius:7, padding:12, fontSize:12, color:item.catatan?T.text:T.textMute, fontStyle:item.catatan?"normal":"italic", lineHeight:1.6, minHeight:48, border:`1px solid ${T.border}` }}>{item.catatan||"Belum ada catatan."}</div>
                </div>

                {item.status === "review" && (
                  <div style={{ background:T.amberBg, border:`1px solid ${T.amber}44`, borderRadius:8, padding:14, marginBottom:14 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:T.amber, marginBottom:10, letterSpacing:0.5 }}>TINDAKAN ADMIN</div>
                    <textarea value={catatan} onChange={e=>setCatatan(e.target.value)} placeholder="Tulis catatan (wajib jika menolak)..." style={{...inp,resize:"vertical",minHeight:72,marginBottom:10,fontSize:11}}/>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={()=>approve(item.id)} style={{ ...btn(T.green,T.white), flex:1 }}>Setujui</button>
                      <button onClick={()=>reject(item.id)} style={{ ...btn(T.white,T.red,`1px solid ${T.red}`), flex:1 }}>Tolak</button>
                    </div>
                  </div>
                )}

                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>{setEditMode(true);setEditData({...item});}} style={{ ...btn(T.bg,T.textSub,`1px solid ${T.border}`), flex:1 }}>Edit Data</button>
                  <button onClick={()=>setDelConfirm(item.id)} style={{ ...btn(T.redBg,T.red,`1px solid ${T.red}44`), padding:"9px 16px" }}>Hapus</button>
                </div>
              </>
            ) : (
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:T.amber, letterSpacing:0.8, marginBottom:12 }}>MODE EDIT</div>
                {[["judul","Judul Kegiatan"],["fasilitator","Fasilitator/Admin"],["lokasi","Lokasi"],["tanggal","Tanggal"],["durasi","Durasi Video"]].map(([key,lbl]) => (
                  <div key={key} style={{ marginBottom:10 }}>
                    <label style={{ fontSize:9, fontWeight:600, color:T.textSub, letterSpacing:0.8, display:"block", marginBottom:4, textTransform:"uppercase" }}>{lbl}</label>
                    <input value={editData[key]||""} onChange={e=>setEditData({...editData,[key]:e.target.value})} style={inp}/>
                  </div>
                ))}
                <div style={{ marginBottom:10 }}>
                  <label style={{ fontSize:9, fontWeight:600, color:T.textSub, letterSpacing:0.8, display:"block", marginBottom:4, textTransform:"uppercase" }}>Pilar</label>
                  <select value={editData.pilar} onChange={e=>setEditData({...editData,pilar:e.target.value})} style={{...inp,cursor:"pointer"}}>
                    {PILAR.map(p=><option key={p.id}>{p.label}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:9, fontWeight:600, color:T.textSub, letterSpacing:0.8, display:"block", marginBottom:4, textTransform:"uppercase" }}>Catatan</label>
                  <textarea value={editData.catatan||""} onChange={e=>setEditData({...editData,catatan:e.target.value})} style={{...inp,resize:"vertical",minHeight:64}}/>
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={saveEdit} style={{ ...btn(T.navy,T.white), flex:1 }}>Simpan Perubahan</button>
                  <button onClick={()=>setEditMode(false)} style={{ ...btn(T.bg,T.textSub,`1px solid ${T.border}`), flex:1 }}>Batal</button>
                </div>
              </div>
            )}
          </div>

          {delConfirm === item.id && (
            <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
              <div style={{ ...card, padding:24, width:"100%" }}>
                <div style={{ fontSize:14, fontWeight:800, color:T.red, marginBottom:8 }}>Hapus Vlog?</div>
                <div style={{ fontSize:12, color:T.textSub, marginBottom:20, lineHeight:1.6 }}>"{item.judul}" akan dihapus permanen dari arsip.</div>
                <div style={{ display:"flex", gap:8 }}>
                  <button onClick={()=>del(item.id)} style={{ ...btn(T.red,T.white), flex:1 }}>Ya, Hapus</button>
                  <button onClick={()=>setDelConfirm(null)} style={{ ...btn(T.bg,T.textSub,`1px solid ${T.border}`), flex:1 }}>Batal</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

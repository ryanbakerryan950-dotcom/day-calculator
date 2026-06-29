(function () {
  'use strict';

  const DAYS_ID = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const MONTHS_ID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const hijriMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Tsani',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', "Sya'ban",
    'Ramadan', 'Syawal', "Dzulqa'dah", 'Dzulhijjah'
  ];

  const hijriMonthsAr = [
    'مُحَرَّم', 'صَفَر', 'رَبِيع الأَوَّل', 'رَبِيع الثَّانِي',
    'جُمَادَى الأُولَى', 'جُمَادَى الآخِرَة', 'رَجَب', 'شَعْبَان',
    'رَمَضَان', 'شَوَّال', 'ذُو القَعْدَة', 'ذُو الحِجَّة'
  ];

  const wetonDescriptions = {
    'Minggu Legi': 'Memiliki jiwa pemimpin yang kuat, berani mengambil keputusan, dan disegani oleh lingkungan.',
    'Minggu Pahing': 'Bersifat tegas dan lugas, memiliki kemampuan organisasi yang baik serta jiwa ksatria.',
    'Minggu Pon': 'Ramah dan mudah bergaul, memiliki daya tarik alami serta kemampuan komunikasi yang baik.',
    'Minggu Wage': 'Pekerja keras dan ulet, memiliki kesabaran tinggi serta ketekunan dalam menyelesaikan tugas.',
    'Minggu Kliwon': 'Memiliki intuisi tajam, spiritualitas tinggi, dan sering dihormati dalam lingkungan sosial.',
    'Senin Legi': 'Cerdas dan analitis, memiliki kemampuan berpikir logis serta sifat perfeksionis.',
    'Senin Pahing': 'Kreatif dan inovatif, senang mengeksplorasi ide baru serta memiliki imajinasi luas.',
    'Senin Pon': 'Diplomatis dan bijaksana, mampu menyelesaikan konflik dengan baik dan dipercaya orang.',
    'Senin Wage': 'Setia dan dapat diandalkan, memiliki integritas tinggi serta komitmen yang kuat.',
    'Senin Kliwon': 'Memiliki karisma alami, bijaksana dalam bertindak, dan sering menjadi penengah.',
    'Selasa Legi': 'Berani dan penuh semangat, tidak mudah menyerah serta memiliki tekad yang kuat.',
    'Selasa Pahing': 'Sensitif dan perhatian, memiliki empati tinggi terhadap perasaan orang lain.',
    'Selasa Pon': 'Optimis dan ceria, membawa energi positif ke lingkungan sekitarnya.',
    'Selasa Wage': 'Praktis dan efisien, pandai mengelola waktu serta sumber daya dengan baik.',
    'Selasa Kliwon': 'Memiliki wawasan luas, bijak dalam mengambil keputusan, dan dihormati banyak orang.',
    'Rabu Legi': 'Komunikatif dan persuasif, memiliki bakat dalam berbicara dan meyakinkan orang.',
    'Rabu Pahing': 'Artistik dan ekspresif, memiliki kepekaan estetika yang tinggi serta kreativitas.',
    'Rabu Pon': 'Adaptif dan fleksibel, mampu menyesuaikan diri dengan berbagai situasi dengan mudah.',
    'Rabu Wage': 'Tekun dan detail-oriented, teliti dalam bekerja serta menghasilkan karya berkualitas.',
    'Rabu Kliwon': 'Spiritual dan tenang, memiliki kedalaman pemikiran serta kebijaksanaan batin.',
    'Kamis Legi': 'Ambisius dan berorientasi pada tujuan, memiliki dorongan kuat untuk berprestasi.',
    'Kamis Pahing': 'Hangat dan penyayang, memiliki hati yang lembut serta peduli pada keluarga.',
    'Kamis Pon': 'Sosial dan ramah, mudah membangun relasi serta memiliki banyak teman.',
    'Kamis Wage': 'Bertanggung jawab dan disiplin, dapat diandalkan dalam pekerjaan maupun kehidupan.',
    'Kamis Kliwon': 'Memiliki kepemimpinan alami, bijaksana, dan sering diminta nasihat oleh orang lain.',
    'Jumat Legi': 'Berwibawa dan tegas, memiliki kemampuan memimpin serta mengambil keputusan penting.',
    'Jumat Pahing': 'Romantis dan penuh perasaan, memiliki kepekaan emosional yang tinggi.',
    'Jumat Pon': 'Murah hati dan dermawan, senang berbagi serta membantu orang yang membutuhkan.',
    'Jumat Wage': 'Gigih dan pantang menyerah, memiliki stamina mental yang kuat dalam menghadapi tantangan.',
    'Jumat Kliwon': 'Memiliki aura spiritual yang kuat, sering dianggap sebagai orang yang berkah.',
    'Sabtu Legi': 'Mandiri dan percaya diri, memiliki kemampuan untuk berdiri sendiri dan memimpin.',
    'Sabtu Pahing': 'Penuh semangat dan energik, aktif dalam berbagai kegiatan serta tidak mudah lelah.',
    'Sabtu Pon': 'Harmonis dan damai, menciptakan suasana nyaman di lingkungan sekitarnya.',
    'Sabtu Wage': 'Realistis dan pragmatis, memiliki kemampuan mengelola keuangan dan sumber daya.',
    'Sabtu Kliwon': 'Memiliki kekuatan batin yang besar, sering dipercaya dalam urusan spiritual dan adat.'
  };

  let countdownInterval = null;
  let tambahOp = 'add';
  let tambahUnit = 'days';
  const pdfResults = {};
  const UNIT_LABELS = { days: 'Hari', weeks: 'Minggu', months: 'Bulan', years: 'Tahun' };
  const OP_LABELS = { add: 'Tambah', sub: 'Kurangi' };

  function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function pdfTimestamp() {
    return new Date().toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });
  }

  function getJsPDF() {
    const lib = window.jspdf?.jsPDF || window.jsPDF;
    if (!lib) throw new Error('Pustaka PDF tidak tersedia. Muat ulang halaman lalu coba lagi.');
    return lib;
  }

  function loadLogoDataUrl() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => reject(new Error('logo unavailable'));
      img.src = 'images/brand-logo.webp';
    });
  }

  function pdfLineHeight(fontSize) {
    return fontSize * 0.38;
  }

  function measureWrappedText(doc, text, maxWidth, fontSize, fontStyle = 'normal') {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(String(text || ''), maxWidth);
    const lineHeight = pdfLineHeight(fontSize);
    return { lines, lineHeight, height: Math.max(lineHeight, lines.length * lineHeight) };
  }

  function ensurePdfSpace(doc, y, needed, margin, pageW, pageH) {
    if (y + needed <= pageH - 22) return y;
    drawPdfFooter(doc, margin, pageW, pageH - 16);
    doc.addPage();
    drawPdfPageBg(doc, pageW, pageH);
    return margin + 6;
  }

  function drawPdfPageBg(doc, pageW, pageH) {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageW, pageH, 'F');
  }

  async function drawPdfHeader(doc, margin, pageW, subtitle) {
    const dark = hexToRgb('#0F172A');
    const teal = hexToRgb('#0891B2');
    const purple = hexToRgb('#1E4D6B');
    const headerH = 48;

    doc.setFillColor(dark[0], dark[1], dark[2]);
    doc.rect(0, 0, pageW, headerH, 'F');
    doc.setFillColor(purple[0], purple[1], purple[2]);
    doc.rect(0, headerH - 18, pageW, 18, 'F');
    doc.setFillColor(teal[0], teal[1], teal[2]);
    doc.rect(0, headerH, pageW, 1.5, 'F');

    try {
      const logoData = await loadLogoDataUrl();
      doc.addImage(logoData, 'PNG', margin, 11, 15, 16);
    } catch (_) { /* logo optional */ }

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.text('KalkulatorHari', margin + 19, 20);

    const sub = measureWrappedText(doc, subtitle, pageW - margin - 19, 9, 'normal');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(210, 225, 238);
    doc.text(sub.lines, margin + 19, 28);

    doc.setFontSize(7.5);
    doc.setTextColor(180, 200, 215);
    doc.text(`Dibuat: ${pdfTimestamp()}`, margin + 19, 40);

    return headerH + 10;
  }

  function drawPdfFooter(doc, margin, pageW, footerY) {
    const muted = [100, 116, 139];
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY, pageW - margin, footerY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text('Dihasilkan oleh KalkulatorHari — kalkulator tanggal Indonesia', margin, footerY + 5);
    doc.text('Gratis · Instan · Tanpa daftar', pageW - margin, footerY + 5, { align: 'right' });
  }

  function drawBadge(doc, margin, y, text) {
    const teal = hexToRgb('#0891B2');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    const textW = doc.getTextWidth(text);
    const padX = 6;
    const w = textW + padX * 2;
    const h = 9;
    doc.setFillColor(236, 254, 255);
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.35);
    doc.roundedRect(margin, y, w, h, 4.5, 4.5, 'FD');
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text(text, margin + padX, y + 6.2);
    return y + h + 12;
  }

  function drawSectionTitle(doc, margin, y, title) {
    const purple = hexToRgb('#1E4D6B');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(purple[0], purple[1], purple[2]);
    doc.text(title, margin, y);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.25);
    doc.line(margin, y + 2, margin + 42, y + 2);
    return y + 8;
  }

  function drawCards(doc, margin, y, contentW, cards) {
    const gap = 6;
    const pad = 6;
    const labelGap = 5;
    const colW = cards.length === 1 ? contentW : (contentW - gap * (cards.length - 1)) / cards.length;
    const valueMaxW = colW - pad * 2;

    const layouts = cards.map((card) => measureWrappedText(doc, card.value, valueMaxW, 9.5, 'bold'));
    const cardH = Math.max(...layouts.map((m) => labelGap + m.height + pad * 2), 22);

    cards.forEach((card, i) => {
      const x = margin + i * (colW + gap);
      const measure = layouts[i];
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(x, y, colW, cardH, 3, 3, 'FD');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(card.label, x + pad, y + pad + 3);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(measure.lines, x + pad, y + pad + labelGap + 4, {
        lineHeightFactor: 1.35,
        maxWidth: valueMaxW
      });
    });

    return y + cardH + 10;
  }

  function drawNote(doc, margin, y, contentW, note) {
    const pad = 6;
    const measure = measureWrappedText(doc, note, contentW - pad * 2, 8, 'italic');
    const boxH = measure.height + pad * 2;
    const teal = hexToRgb('#0891B2');
    doc.setFillColor(236, 254, 255);
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.25);
    doc.roundedRect(margin, y, contentW, boxH, 3, 3, 'FD');
    doc.setTextColor(teal[0], teal[1], teal[2]);
    doc.text(measure.lines, margin + pad, y + pad + 3, { lineHeightFactor: 1.35 });
    return y + boxH + 10;
  }

  function drawHighlight(doc, margin, y, contentW, highlight) {
    const pad = 10;
    const innerW = contentW - pad * 2;
    const teal = hexToRgb('#0891B2');
    const pink = hexToRgb('#DB2777');
    const purple = hexToRgb('#1E4D6B');
    const muted = [100, 116, 139];

    const labelM = measureWrappedText(doc, highlight.label, innerW, 9, 'normal');
    let contentH = labelM.height + 6;
    let numM;
    let unitM;
    let valM;

    if (highlight.unit) {
      numM = measureWrappedText(doc, highlight.value, innerW, 26, 'bold');
      unitM = measureWrappedText(doc, highlight.unit, innerW, 11, 'bold');
      contentH += numM.height + 2 + unitM.height + 4;
    } else {
      valM = measureWrappedText(doc, highlight.value, innerW, 15, 'bold');
      contentH += valM.height + 6;
    }

    const lineBlocks = (highlight.lines || []).map((line) => {
      const m = measureWrappedText(doc, line, innerW, 9, 'normal');
      contentH += m.height + 3;
      return m;
    });

    const boxH = contentH + pad * 2;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(teal[0], teal[1], teal[2]);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentW, boxH, 4, 4, 'FD');

    let cy = y + pad + 4;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(muted[0], muted[1], muted[2]);
    doc.text(labelM.lines, margin + pad, cy, { lineHeightFactor: 1.35, maxWidth: innerW });
    cy += labelM.height + 6;

    if (highlight.unit) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(26);
      doc.setTextColor(pink[0], pink[1], pink[2]);
      doc.text(numM.lines, margin + pad, cy, { lineHeightFactor: 1.2, maxWidth: innerW });
      cy += numM.height + 2;
      doc.setFontSize(11);
      doc.setTextColor(purple[0], purple[1], purple[2]);
      doc.text(unitM.lines, margin + pad, cy, { lineHeightFactor: 1.35, maxWidth: innerW });
      cy += unitM.height + 4;
    } else {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(purple[0], purple[1], purple[2]);
      doc.text(valM.lines, margin + pad, cy, { lineHeightFactor: 1.35, maxWidth: innerW });
      cy += valM.height + 4;
    }

    if (lineBlocks.length) {
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.line(margin + pad, cy - 2, margin + contentW - pad, cy - 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(purple[0], purple[1], purple[2]);
      lineBlocks.forEach((m) => {
        doc.text(m.lines, margin + pad, cy, { lineHeightFactor: 1.35, maxWidth: innerW });
        cy += m.height + 3;
      });
    }

    return y + boxH + 12;
  }

  function drawRows(doc, margin, y, contentW, rows) {
    const labelColW = 38;
    const pad = 5;
    const valueMaxW = contentW - labelColW - pad * 2;

    rows.forEach((row) => {
      const valueM = measureWrappedText(doc, row.value, valueMaxW, 9.5, 'bold');
      const rowH = Math.max(16, valueM.height + pad * 2);

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.25);
      doc.roundedRect(margin, y, contentW, rowH, 2.5, 2.5, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(row.label, margin + pad, y + pad + 3);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text(valueM.lines, margin + labelColW, y + pad + 3, {
        lineHeightFactor: 1.35,
        maxWidth: valueMaxW
      });

      y += rowH + 5;
    });

    return y + 4;
  }

  function drawBodyBlock(doc, margin, y, contentW, body) {
    const pad = 8;
    const measure = measureWrappedText(doc, body, contentW - pad * 2, 9.5, 'normal');
    const boxH = measure.height + pad * 2;
    const gold = hexToRgb('#CA8A04');

    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(gold[0], gold[1], gold[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentW, boxH, 3, 3, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    doc.text(measure.lines, margin + pad, y + pad + 3, {
      lineHeightFactor: 1.4,
      maxWidth: contentW - pad * 2
    });

    return y + boxH + 12;
  }

  function estimateRowsHeight(doc, contentW, rows) {
    const labelColW = 38;
    const valueMaxW = contentW - labelColW - 10;
    return rows.reduce((sum, row) => {
      const m = measureWrappedText(doc, row.value, valueMaxW, 9.5, 'bold');
      return sum + Math.max(16, m.height + 10) + 5;
    }, 14);
  }

  function estimateHighlightHeight(doc, contentW, highlight) {
    const innerW = contentW - 20;
    let h = 20;
    h += measureWrappedText(doc, highlight.label, innerW, 9, 'normal').height + 6;
    if (highlight.unit) {
      h += measureWrappedText(doc, highlight.value, innerW, 26, 'bold').height + 2;
      h += measureWrappedText(doc, highlight.unit, innerW, 11, 'bold').height + 8;
    } else {
      h += measureWrappedText(doc, highlight.value, innerW, 15, 'bold').height + 8;
    }
    (highlight.lines || []).forEach((line) => {
      h += measureWrappedText(doc, line, innerW, 9, 'normal').height + 3;
    });
    return h + 12;
  }

  async function downloadResultPdf(mode) {
    const data = pdfResults[mode];
    if (!data) throw new Error('Hitung terlebih dahulu sebelum mengunduh PDF.');

    const jsPDF = getJsPDF();
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 18;
    const contentW = pageW - margin * 2;

    drawPdfPageBg(doc, pageW, pageH);
    let y = await drawPdfHeader(doc, margin, pageW, data.subtitle);
    y = drawBadge(doc, margin, y, data.badge);

    if (data.cards?.length) {
      y = ensurePdfSpace(doc, y, 40, margin, pageW, pageH);
      y = drawSectionTitle(doc, margin, y, data.cardsTitle || 'Input');
      y = drawCards(doc, margin, y, contentW, data.cards);
    }

    if (data.note) {
      y = ensurePdfSpace(doc, y, 20, margin, pageW, pageH);
      y = drawNote(doc, margin, y, contentW, data.note);
    }

    if (data.highlight) {
      y = ensurePdfSpace(doc, y, estimateHighlightHeight(doc, contentW, data.highlight), margin, pageW, pageH);
      y = drawSectionTitle(doc, margin, y, 'Hasil Utama');
      y = drawHighlight(doc, margin, y, contentW, data.highlight);
    }

    if (data.rows?.length) {
      y = ensurePdfSpace(doc, y, estimateRowsHeight(doc, contentW, data.rows), margin, pageW, pageH);
      y = drawSectionTitle(doc, margin, y, 'Detail Hasil');
      y = drawRows(doc, margin, y, contentW, data.rows);
    }

    if (data.body) {
      const bodyMeasure = measureWrappedText(doc, data.body, contentW - 16, 9.5, 'normal');
      y = ensurePdfSpace(doc, y, bodyMeasure.height + 34, margin, pageW, pageH);
      y = drawSectionTitle(doc, margin, y, 'Interpretasi Weton');
      y = drawBodyBlock(doc, margin, y, contentW, data.body);
    }

    drawPdfFooter(doc, margin, pageW, pageH - 16);
    doc.save(data.filename);
  }

  function initPdfDownloads() {
    document.querySelector('.calc-body').addEventListener('click', async (e) => {
      const btn = e.target.closest('.btn-pdf-download');
      if (!btn) return;
      btn.disabled = true;
      try {
        await downloadResultPdf(btn.dataset.pdfMode);
      } catch (err) {
        alert(err.message || 'Gagal membuat PDF. Silakan coba lagi.');
      } finally {
        btn.disabled = false;
      }
    });
  }

  function todayISO() {
    const d = new Date();
    return d.toISOString().split('T')[0];
  }

  function parseDate(str) {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatDateID(date) {
    return `${DAYS_ID[date.getDay()]}, ${date.getDate()} ${MONTHS_ID[date.getMonth()]} ${date.getFullYear()}`;
  }

  function toHijri(gYear, gMonth, gDay) {
    let jd = Math.floor((14 - gMonth) / 12);
    let y = gYear + 4800 - jd;
    let m = gMonth + 12 * jd - 3;
    let JD = gDay + Math.floor((153 * m + 2) / 5) + 365 * y
      + Math.floor(y / 4) - Math.floor(y / 100)
      + Math.floor(y / 400) - 32045;
    let l = JD - 1948440 + 10632;
    let n = Math.floor((l - 1) / 10631);
    l = l - 10631 * n + 354;
    let j = Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719)
      + Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
    l = l - Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50)
      - Math.floor(j / 16) * Math.floor((15238 * j) / 43) + 29;
    let month = Math.floor((24 * l) / 709);
    let day = l - Math.floor((709 * month) / 24);
    let year = 30 * n + j - 30;
    return { year, month, day };
  }

  function toGregorian(hYear, hMonth, hDay) {
    let jd = Math.floor((11 * hYear + 3) / 30) + 354 * hYear + 30 * hMonth
      - Math.floor((hMonth - 1) / 2) + hDay + 1948440 - 385;
    let l = jd + 68569;
    let n = Math.floor((4 * l) / 146097);
    l = l - Math.floor((146097 * n + 3) / 4);
    let i = Math.floor((4000 * (l + 1)) / 1461001);
    l = l - Math.floor((1461 * i) / 4) + 31;
    let j = Math.floor((80 * l) / 2447);
    let day = l - Math.floor((2447 * j) / 80);
    l = Math.floor(j / 11);
    let month = j + 2 - 12 * l;
    let year = 100 * (n - 49) + i + l;
    return { year, month, day };
  }

  function getWeton(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const pasaran = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'];
    const dayNeptu = [5, 4, 3, 7, 8, 6, 9];
    const pasNeptu = [5, 9, 7, 4, 8];

    const ref = new Date(2000, 0, 1);
    const diff = Math.floor((date - ref) / 86400000);
    const dayIdx = date.getDay();
    const pasIdx = ((diff % 5) + 5 + 4) % 5;

    const neptu = dayNeptu[dayIdx] + pasNeptu[pasIdx];
    return {
      hari: days[dayIdx],
      pasaran: pasaran[pasIdx],
      weton: `${days[dayIdx]} ${pasaran[pasIdx]}`,
      neptu
    };
  }

  function countWorkdays(start, end) {
    let count = 0;
    const current = new Date(start);
    while (current <= end) {
      const day = current.getDay();
      if (day !== 0 && day !== 6) count++;
      current.setDate(current.getDate() + 1);
    }
    return count;
  }

  function dateDiffBreakdown(start, end) {
    const msPerDay = 86400000;
    const totalDays = Math.round((end - start) / msPerDay);
    const weeks = Math.floor(totalDays / 7);
    const remainDays = totalDays % 7;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { totalDays, weeks, remainDays, years, months, days };
  }

  function resetPanelResult(panel) {
    panel.classList.remove('show-result');
    panel.querySelectorAll('.result-area, .countdown-wrap').forEach(el => {
      el.hidden = true;
    });
    if (panel.id === 'panel-mundur' && countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  function showPanelResult(panel, resultEl) {
    panel.classList.add('show-result');
    resultEl.hidden = false;
  }

  function initResultBackButtons() {
    document.querySelectorAll('.btn-back-calc').forEach(btn => {
      btn.addEventListener('click', () => {
        const panel = btn.closest('.calc-panel');
        if (panel) resetPanelResult(panel);
      });
    });
  }

  function switchTab(tabId) {
    document.querySelectorAll('.calc-panel').forEach(p => resetPanelResult(p));
    document.querySelectorAll('.calc-tab').forEach(t => {
      const active = t.dataset.tab === tabId;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', active);
    });
    document.querySelectorAll('.calc-panel').forEach(p => {
      const active = p.id === `panel-${tabId}`;
      p.classList.toggle('active', active);
      p.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) {
        p.removeAttribute('inert');
      } else {
        p.setAttribute('inert', '');
      }
    });
  }

  function initTabs() {
    document.querySelectorAll('.calc-tab').forEach(tab => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    document.querySelectorAll('.mode-card').forEach(card => {
      const openMode = () => {
        switchTab(card.dataset.tab);
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      };
      card.addEventListener('click', openMode);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMode();
        }
      });
    });

    document.querySelectorAll('[data-tab-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        switchTab(link.dataset.tabLink);
        document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function initSelisih() {
    const startInput = document.getElementById('selisih-start');
    const endInput = document.getElementById('selisih-end');
    startInput.value = todayISO();
    endInput.value = todayISO();

    document.getElementById('btn-selisih').addEventListener('click', () => {
      const resultArea = document.getElementById('result-selisih');
      const errorEl = document.getElementById('error-selisih');
      const workdaysOnly = document.getElementById('selisih-workdays').checked;

      const start = parseDate(startInput.value);
      const end = parseDate(endInput.value);

      if (end < start) {
        resetPanelResult(document.getElementById('panel-selisih'));
        errorEl.hidden = false;
        return;
      }

      errorEl.hidden = true;
      const breakdown = dateDiffBreakdown(start, end);
      const total = workdaysOnly ? countWorkdays(start, end) : breakdown.totalDays;

      document.getElementById('selisih-total').textContent = total.toLocaleString('id-ID');
      document.getElementById('selisih-label').textContent = workdaysOnly ? 'hari kerja' : 'hari';

      const parts = [];
      if (!workdaysOnly) {
        parts.push(`${breakdown.weeks} minggu ${breakdown.remainDays} hari`);
        if (breakdown.years > 0 || breakdown.months > 0) {
          parts.push(`${breakdown.years} tahun ${breakdown.months} bulan ${breakdown.days} hari`);
        }
      }
      document.getElementById('selisih-breakdown').innerHTML = parts.join('<br>');

      pdfResults.selisih = {
        subtitle: 'Laporan Hasil Perhitungan — Selisih Hari',
        badge: 'SELISIH HARI',
        filename: `hasil-selisih-hari-${startInput.value}-sd-${endInput.value}.pdf`,
        cardsTitle: 'Rentang Tanggal',
        cards: [
          { label: 'Tanggal Mulai', value: formatDateID(start) },
          { label: 'Tanggal Akhir', value: formatDateID(end) }
        ],
        note: workdaysOnly ? '* Perhitungan hanya hari kerja (Senin–Jumat)' : null,
        highlight: {
          label: 'Total Selisih',
          value: total.toLocaleString('id-ID'),
          unit: workdaysOnly ? 'hari kerja' : 'hari',
          lines: parts
        }
      };

      showPanelResult(document.getElementById('panel-selisih'), resultArea);
    });
  }

  function initTambah() {
    document.getElementById('tambah-start').value = todayISO();

    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tambahOp = btn.dataset.op;
      });
    });

    document.querySelectorAll('.unit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tambahUnit = btn.dataset.unit;
      });
    });

    document.getElementById('btn-tambah').addEventListener('click', () => {
      const start = parseDate(document.getElementById('tambah-start').value);
      const amount = parseInt(document.getElementById('tambah-amount').value, 10) || 0;
      const sign = tambahOp === 'add' ? 1 : -1;
      const result = new Date(start);

      switch (tambahUnit) {
        case 'days':
          result.setDate(result.getDate() + sign * amount);
          break;
        case 'weeks':
          result.setDate(result.getDate() + sign * amount * 7);
          break;
        case 'months':
          result.setMonth(result.getMonth() + sign * amount);
          break;
        case 'years':
          result.setFullYear(result.getFullYear() + sign * amount);
          break;
      }

      document.getElementById('tambah-result').textContent = formatDateID(result);
      document.getElementById('tambah-result-sub').textContent =
        `${result.getDate().toString().padStart(2, '0')}/${(result.getMonth() + 1).toString().padStart(2, '0')}/${result.getFullYear()}`;
      pdfResults.tambah = {
        subtitle: 'Laporan Hasil Perhitungan — Tambah/Kurang',
        badge: 'TAMBAH / KURANG',
        filename: `hasil-tambah-kurang-${document.getElementById('tambah-start').value}.pdf`,
        cardsTitle: 'Input',
        cards: [
          { label: 'Tanggal Awal', value: formatDateID(start) },
          { label: 'Operasi', value: `${OP_LABELS[tambahOp]} ${amount} ${UNIT_LABELS[tambahUnit]}` }
        ],
        highlight: {
          label: 'Hasil Tanggal',
          value: formatDateID(result)
        }
      };
      showPanelResult(document.getElementById('panel-tambah'), document.getElementById('result-tambah'));
    });
  }

  function initMundur() {
    document.getElementById('btn-mundur').addEventListener('click', () => {
      const dateStr = document.getElementById('mundur-date').value;
      const eventName = document.getElementById('mundur-event').value;
      if (!dateStr) return;

      if (countdownInterval) clearInterval(countdownInterval);

      const targetDate = parseDate(dateStr);
      targetDate.setHours(23, 59, 59, 999);

      document.getElementById('countdown-event').textContent =
        eventName ? `Menuju: ${eventName}` : `Menuju: ${formatDateID(targetDate)}`;
      showPanelResult(document.getElementById('panel-mundur'), document.getElementById('countdown-wrap'));

      function updateMundurPdf(days, hours, minutes, seconds) {
        pdfResults.mundur = {
          subtitle: 'Laporan Hasil Perhitungan — Hitung Mundur',
          badge: 'HITUNG MUNDUR',
          filename: `hasil-hitung-mundur-${dateStr}.pdf`,
          cardsTitle: 'Target',
          cards: [
            { label: 'Tanggal Target', value: formatDateID(targetDate) },
            { label: 'Nama Acara', value: eventName || '—' }
          ],
          highlight: {
            label: 'Sisa Waktu',
            value: String(days),
            unit: 'hari',
            lines: [`${hours} jam · ${minutes} menit · ${seconds} detik`]
          }
        };
      }

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
          document.getElementById('cd-days').textContent = '0';
          document.getElementById('cd-hours').textContent = '0';
          document.getElementById('cd-minutes').textContent = '0';
          document.getElementById('cd-seconds').textContent = '0';
          updateMundurPdf(0, '00', '00', '00');
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('cd-days').textContent = days;
        document.getElementById('cd-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('cd-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('cd-seconds').textContent = seconds.toString().padStart(2, '0');
        updateMundurPdf(
          days,
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        );
      }

      updateCountdown();
      countdownInterval = setInterval(updateCountdown, 1000);
    });
  }

  function initHari() {
    document.getElementById('hari-date').value = todayISO();

    document.getElementById('btn-hari').addEventListener('click', () => {
      const date = parseDate(document.getElementById('hari-date').value);
      document.getElementById('hari-name').textContent = DAYS_ID[date.getDay()];
      document.getElementById('hari-full').textContent = formatDateID(date);
      pdfResults.hari = {
        subtitle: 'Laporan Hasil Perhitungan — Hari dalam Seminggu',
        badge: 'HARI MINGGU',
        filename: `hasil-hari-${document.getElementById('hari-date').value}.pdf`,
        cardsTitle: 'Tanggal',
        cards: [{ label: 'Tanggal Dipilih', value: formatDateID(date) }],
        highlight: {
          label: 'Hari',
          value: DAYS_ID[date.getDay()]
        }
      };
      showPanelResult(document.getElementById('panel-hari'), document.getElementById('result-hari'));
    });
  }

  function initHijriah() {
    document.getElementById('hijri-g-date').value = todayISO();

    document.querySelectorAll('input[name="hijri-dir"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const isG2H = radio.value === 'g2h';
        document.getElementById('hijri-g-input').hidden = !isG2H;
        document.getElementById('hijri-h-input').hidden = isG2H;
      });
    });

    document.getElementById('btn-hijriah').addEventListener('click', () => {
      const dir = document.querySelector('input[name="hijri-dir"]:checked').value;
      let html = '';

      if (dir === 'g2h') {
        const d = parseDate(document.getElementById('hijri-g-date').value);
        const h = toHijri(d.getFullYear(), d.getMonth() + 1, d.getDate());
        const mIdx = h.month - 1;
        html = `${h.day} ${hijriMonthsAr[mIdx]} (${hijriMonths[mIdx]})<br>${h.year} H`;
        pdfResults.hijriah = {
          subtitle: 'Laporan Hasil Perhitungan — Konverter Hijriah',
          badge: 'KONVERSI HIJRIAH',
          filename: `hasil-konversi-hijriah-${document.getElementById('hijri-g-date').value}.pdf`,
          cardsTitle: 'Input',
          cards: [{ label: 'Tanggal Gregorian', value: formatDateID(d) }],
          highlight: {
            label: 'Hasil Hijriah',
            value: `${h.day} ${hijriMonths[mIdx]} ${h.year} H`,
            lines: [hijriMonthsAr[mIdx]]
          }
        };
      } else {
        const hDay = parseInt(document.getElementById('hijri-h-day').value, 10);
        const hMonth = parseInt(document.getElementById('hijri-h-month').value, 10);
        const hYear = parseInt(document.getElementById('hijri-h-year').value, 10);
        const g = toGregorian(hYear, hMonth, hDay);
        const gDate = new Date(g.year, g.month - 1, g.day);
        html = `${formatDateID(gDate)}<br>${g.day} ${MONTHS_ID[g.month - 1]} ${g.year}`;
        pdfResults.hijriah = {
          subtitle: 'Laporan Hasil Perhitungan — Konverter Hijriah',
          badge: 'KONVERSI HIJRIAH',
          filename: `hasil-konversi-hijriah-${hYear}-${hMonth}-${hDay}.pdf`,
          cardsTitle: 'Input',
          cards: [{ label: 'Tanggal Hijriah', value: `${hDay} ${hijriMonths[hMonth - 1]} ${hYear} H` }],
          highlight: {
            label: 'Hasil Gregorian',
            value: formatDateID(gDate)
          }
        };
      }

      document.getElementById('hijri-result').innerHTML = html;
      showPanelResult(document.getElementById('panel-hijriah'), document.getElementById('result-hijriah'));
    });
  }

  function initWeton() {
    document.getElementById('weton-date').value = todayISO();

    document.getElementById('btn-weton').addEventListener('click', () => {
      const date = parseDate(document.getElementById('weton-date').value);
      const w = getWeton(date);

      document.getElementById('weton-hari').textContent = w.hari;
      document.getElementById('weton-pasaran').textContent = w.pasaran;
      document.getElementById('weton-name').textContent = w.weton;
      document.getElementById('weton-neptu').textContent = w.neptu;
      document.getElementById('weton-desc').textContent =
        wetonDescriptions[w.weton] || 'Memiliki karakter unik sesuai tradisi Jawa.';
      pdfResults.weton = {
        subtitle: 'Laporan Hasil Perhitungan — Weton Jawa',
        badge: 'WETON JAWA',
        filename: `hasil-weton-${document.getElementById('weton-date').value}.pdf`,
        cardsTitle: 'Tanggal',
        cards: [{ label: 'Tanggal Lahir', value: formatDateID(date) }],
        rows: [
          { label: 'Hari', value: w.hari },
          { label: 'Pasaran', value: w.pasaran },
          { label: 'Weton', value: w.weton },
          { label: 'Neptu', value: String(w.neptu) }
        ],
        body: wetonDescriptions[w.weton] || 'Memiliki karakter unik sesuai tradisi Jawa.'
      };
      showPanelResult(document.getElementById('panel-weton'), document.getElementById('result-weton'));
    });
  }

  function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const answer = item.querySelector('.faq-answer');
        const isOpen = item.classList.contains('open');

        document.querySelectorAll('.faq-item').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-answer').classList.remove('open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('open');
          answer.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function initNavHighlight() {
    const sections = ['mode', 'tentang', 'cara-pakai', 'mengapa'];
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', () => {
      document.getElementById('header').classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    btn.addEventListener('click', () => nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  function initHeroCTA() {
    document.getElementById('hero-cta').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.calc-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  function initImageFallbacks() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', function onError() {
        if (this.dataset.fallback && this.src !== this.dataset.fallback) {
          this.src = this.dataset.fallback;
          return;
        }
        const w = this.getAttribute('width') || 400;
        const h = this.getAttribute('height') || 300;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
          <rect width="${w}" height="${h}" fill="#F1F1F1"/>
          <text x="50%" y="50%" font-family="Inter,sans-serif" font-size="14"
                fill="#1E4D6B" text-anchor="middle" dy=".3em">📅 Gambar</text>
        </svg>`;
        this.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
        this.removeEventListener('error', onError);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initResultBackButtons();
    initPdfDownloads();
    initSelisih();
    initTambah();
    initMundur();
    initHari();
    initHijriah();
    initWeton();
    initFAQ();
    initScrollReveal();
    initNavHighlight();
    initMobileMenu();
    initHeroCTA();
    initImageFallbacks();
    switchTab('selisih');
  });
})();

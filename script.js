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

  function switchTab(tabId) {
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
        resultArea.hidden = true;
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

      resultArea.hidden = false;
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
      document.getElementById('result-tambah').hidden = false;
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
      document.getElementById('countdown-wrap').hidden = false;

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
          document.getElementById('cd-days').textContent = '0';
          document.getElementById('cd-hours').textContent = '0';
          document.getElementById('cd-minutes').textContent = '0';
          document.getElementById('cd-seconds').textContent = '0';
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
      document.getElementById('result-hari').hidden = false;
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
      } else {
        const hDay = parseInt(document.getElementById('hijri-h-day').value, 10);
        const hMonth = parseInt(document.getElementById('hijri-h-month').value, 10);
        const hYear = parseInt(document.getElementById('hijri-h-year').value, 10);
        const g = toGregorian(hYear, hMonth, hDay);
        const gDate = new Date(g.year, g.month - 1, g.day);
        html = `${formatDateID(gDate)}<br>${g.day} ${MONTHS_ID[g.month - 1]} ${g.year}`;
      }

      document.getElementById('hijri-result').innerHTML = html;
      document.getElementById('result-hijriah').hidden = false;
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
      document.getElementById('result-weton').hidden = false;
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

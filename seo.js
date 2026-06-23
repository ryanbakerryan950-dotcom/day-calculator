(function () {
  'use strict';

  var SITE_URL = 'https://www.kalkulatorhari.com';
  var ORG_NAME = 'KalkulatorHari';
  var LOGO_URL = SITE_URL + '/images/brand-logo.webp';

  var SOCIAL = [
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://x.com/',
    'https://www.youtube.com/',
    'https://www.pinterest.com/',
    'https://www.quora.com/',
    'https://www.reddit.com/'
  ];

  var FAQ_ITEMS = [
    {
      q: 'Apa itu kalkulator hari dan bagaimana cara menggunakannya?',
      a: 'Kalkulator hari adalah alat daring untuk menghitung selisih tanggal, hitung mundur, hari kerja, weton, dan konversi kalender. Anda dapat menggunakannya dengan memilih mode dan memasukkan tanggal serta hasil yang ditampilkan.'
    },
    {
      q: 'Bagaimana cara menghitung selisih hari antara dua tanggal?',
      a: "Pilih mode 'Hitung hari'. Masukkan tanggal mulai dan tanggal akhir, dan alat ini akan secara otomatis menghitung total hari yang telah berlalu."
    },
    {
      q: 'Ada berapa hari dalam setahun (365 atau 366)?',
      a: 'Dalam setahun terdapat 365 hari, kecuali hari kabisat. Tahun kabisat memiliki 366 hari termasuk tanggal 29 Februari.'
    },
    {
      q: 'Apa itu tahun kabisat dan kapan terjadi?',
      a: 'Tahun kabisat adalah tahun dalam kalender Gregorian yang memiliki 366 hari meskipun jumlah hari dalam kalender adalah 365. Tanggal 29 Februari yang ditambahkan di belakang tanggal tersebut merupakan hari tambahan untuk mengimbangi satu orbit bumi mengelilingi matahari. Tahun kabisat terjadi setiap empat tahun sekali ketika jumlah harinya habis dibagi empat.'
    },
    {
      q: 'Bagaimana saya tahu hari apa pada tanggal tertentu?',
      a: 'Gunakan mode tampilan hari dalam seminggu pada kalkulator tanggal kami. Masukkan tanggal dan kalkulator akan memberikan hari yang tepat.'
    },
    {
      q: 'Apa Weton dalam kalender Jawa?',
      a: 'Weton adalah siklus 35 hari yang menggabungkan minggu Gregorian 7 hari dengan minggu pasar Jawa 5 hari untuk menentukan profil tanggal seremonial seseorang.'
    },
    {
      q: 'Apa perbedaan antara kalender Gregorian, Hijriah, dan Jawa?',
      a: 'Kalender Gregorian adalah kalender sipil internasional yang berdasarkan tanggal matahari, kalender Hijriah mengikuti siklus bulan Islam, sedangkan kalender Jawa menggabungkan sistem penanggalan budaya dan tradisional yang digunakan di Indonesia.'
    },
    {
      q: 'Bisakah kalkulator ini menghitung umur dalam hari?',
      a: 'Bisa, masukkan tanggal lahir Anda yang tepat di tab awal dan tanggal hari ini di tab akhir. Ini akan memberikan umur dalam hari, minggu, bulan, dan tahun.'
    },
    {
      q: 'Bagaimana cara menghitung hari kerja (tidak termasuk akhir pekan)?',
      a: 'Gunakan mode hari kerja pada kalkulator. Alat ini secara otomatis mengecualikan akhir pekan dan memberi tahu Anda jumlah hari kerja antara dua tanggal.'
    }
  ];

  var PAGES = {
    home: {
      path: '/',
      canonical: SITE_URL + '/',
      breadcrumb: null,
      robots: 'index, follow',
      schemas: ['organization', 'webapp', 'faq']
    },
    'about-us': {
      path: '/about-us.html',
      canonical: SITE_URL + '/about-us.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Tentang Kami' }],
      robots: 'index, follow',
      schemas: ['breadcrumb']
    },
    'contact-us': {
      path: '/contact-us.html',
      canonical: SITE_URL + '/contact-us.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Hubungi Kami' }],
      robots: 'index, follow',
      schemas: ['breadcrumb']
    },
    author: {
      path: '/author.html',
      canonical: SITE_URL + '/author.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Penulis' }],
      robots: 'index, follow',
      schemas: ['breadcrumb', 'person']
    },
    'privacy-policy': {
      path: '/privacy-policy.html',
      canonical: SITE_URL + '/privacy-policy.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Kebijakan Privasi' }],
      robots: 'noindex, follow',
      schemas: ['breadcrumb']
    },
    'terms-and-conditions': {
      path: '/terms-and-conditions.html',
      canonical: SITE_URL + '/terms-and-conditions.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Syarat dan Ketentuan' }],
      robots: 'noindex, follow',
      schemas: ['breadcrumb']
    },
    disclaimer: {
      path: '/disclaimer.html',
      canonical: SITE_URL + '/disclaimer.html',
      breadcrumb: [{ name: 'Beranda', url: SITE_URL + '/' }, { name: 'Penafian' }],
      robots: 'noindex, follow',
      schemas: ['breadcrumb']
    }
  };

  function getPageKey() {
    var path = window.location.pathname || '/';
    if (path === '/' || /\/index\.html$/i.test(path)) return 'home';
    var file = path.split('/').pop().replace(/\.html$/i, '');
    return PAGES[file] ? file : null;
  }

  function absUrl(url) {
    if (!url) return SITE_URL + '/';
    if (/^https?:\/\//i.test(url)) return url;
    return SITE_URL + (url.charAt(0) === '/' ? url : '/' + url);
  }

  function injectMeta(name, content) {
    if (!content) return;
    var el = document.createElement('meta');
    el.setAttribute('name', name);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }

  function injectLink(rel, href, attrs) {
    var el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('href', href);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    document.head.appendChild(el);
  }

  function injectJsonLd(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function organizationSchema() {
    return {
      '@type': 'Organization',
      '@id': SITE_URL + '/#organization',
      name: ORG_NAME,
      url: SITE_URL + '/',
      logo: {
        '@type': 'ImageObject',
        url: LOGO_URL,
        width: 372,
        height: 401
      },
      sameAs: SOCIAL
    };
  }

  function webAppSchema() {
    return {
      '@type': 'WebApplication',
      '@id': SITE_URL + '/#webapp',
      name: ORG_NAME,
      url: SITE_URL + '/',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IDR'
      },
      description: 'Kalkulator tanggal Indonesia: selisih hari, hitung mundur, konversi Hijriah, dan Weton Jawa.',
      image: SITE_URL + '/images/brand-og.webp',
      publisher: { '@id': SITE_URL + '/#organization' }
    };
  }

  function faqSchema() {
    return {
      '@type': 'FAQPage',
      '@id': SITE_URL + '/#faq',
      mainEntity: FAQ_ITEMS.map(function (item) {
        return {
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        };
      })
    };
  }

  function breadcrumbSchema(items) {
    return {
      '@type': 'BreadcrumbList',
      itemListElement: items.map(function (item, index) {
        var entry = {
          '@type': 'ListItem',
          position: index + 1,
          name: item.name
        };
        if (item.url) entry.item = item.url;
        return entry;
      })
    };
  }

  function personSchema() {
    return {
      '@type': 'Person',
      name: 'Rina Kartika',
      jobTitle: 'Penulis Utama & Pengembang Konten',
      worksFor: { '@id': SITE_URL + '/#organization' },
      url: SITE_URL + '/author.html',
      image: SITE_URL + '/images/author-penulis-portrait.webp'
    };
  }

  function buildSchemas(page) {
    var graph = [];
    page.schemas.forEach(function (type) {
      if (type === 'organization') graph.push(organizationSchema());
      if (type === 'webapp') graph.push(webAppSchema());
      if (type === 'faq') graph.push(faqSchema());
      if (type === 'breadcrumb' && page.breadcrumb) graph.push(breadcrumbSchema(page.breadcrumb));
      if (type === 'person') graph.push(personSchema());
    });
    if (!graph.length) return null;
    return { '@context': 'https://schema.org', '@graph': graph };
  }

  function init() {
    var key = getPageKey();
    if (!key) return;
    var page = PAGES[key];

    if (!document.querySelector('link[rel="canonical"]')) {
      injectLink('canonical', page.canonical);
    }
    if (!document.querySelector('link[rel="alternate"][hreflang="id"]')) {
      injectLink('alternate', page.canonical, { hreflang: 'id' });
    }
    if (!document.querySelector('link[rel="alternate"][hreflang="x-default"]')) {
      injectLink('alternate', SITE_URL + '/', { hreflang: 'x-default' });
    }

    var robotsContent = document.querySelector('meta[name="robots"]');
    if (!robotsContent) {
      injectMeta('robots', page.robots);
    }

    var schema = buildSchemas(page);
    if (schema) injectJsonLd(schema);
  }

  init();
})();

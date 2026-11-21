(function () {
  'use strict';
  var STORAGE_KEY = 'vivinea-lang';
  var SUPPORTED = ['en', 'zh-CN', 'zh-TW', 'ko', 'ja', 'ru'];
  var cache = {};
  var current = 'en';
  // Sequence guard against fast language switching: each setLang call
  // takes the next request id, and only the newest request may apply
  // its dictionary or write localStorage. A slower earlier request
  // (e.g. ko) that resolves after a later one (e.g. ja) is ignored.
  var requestId = 0;
  window.__vivineaMissingKeys = [];
  function normalize(code) {
    if (!code) return 'en';
    code = String(code).replace('_', '-');
    if (SUPPORTED.indexOf(code) !== -1) return code;
    // Traditional Chinese: Taiwan, Hong Kong, Macao, or Hant script.
    if (code === 'zh-HK' || code === 'zh-MO' || code.indexOf('zh-Hant') === 0) return 'zh-TW';
    // Simplified Chinese: mainland, Singapore, or Hans script.
    if (code === 'zh-SG' || code.indexOf('zh-Hans') === 0) return 'zh-CN';
    var base = code.split('-')[0];
    if (base === 'zh') return 'zh-CN';
    if (base === 'ko') return 'ko';
    if (base === 'ja') return 'ja';
    if (base === 'ru') return 'ru';
    return 'en';
  }
  function detect() {
    try { return normalize(navigator.language || navigator.userLanguage || 'en'); } catch (e) { return 'en'; }
  }
  function load(lang) {
    if (cache[lang]) return Promise.resolve(cache[lang]);
    return fetch(new URL('locales/' + lang + '.json', document.baseURI)).then(function (r) {
      if (!r.ok) throw new Error('locale load failed: ' + lang);
      return r.json();
    }).then(function (d) { cache[lang] = d; return d; });
  }
  function t(dict, key) {
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var en = cache.en;
    if (en && Object.prototype.hasOwnProperty.call(en, key)) {
      window.__vivineaMissingKeys.push(key);
      return en[key];
    }
    return null;
  }
  function apply(lang, dict) {
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = t(dict, el.getAttribute('data-i18n'));
      if (v !== null) el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var v = t(dict, el.getAttribute('data-i18n-html'));
      if (v !== null) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var v = t(dict, el.getAttribute('data-i18n-aria'));
      if (v !== null) el.setAttribute('aria-label', v);
    });
    var title = t(dict, 'meta.title');
    if (title) document.title = title;
    var sel = document.getElementById('langSelect');
    if (sel) sel.value = lang;
  }
  function setLang(lang, persist) {
    lang = normalize(lang);
    var myId = ++requestId;
    return load('en').then(function () { return load(lang); }).then(function (dict) {
      if (myId !== requestId) return; // superseded by a newer selection
      apply(lang, dict);
      if (persist) { try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {} }
    }).catch(function () {
      if (myId !== requestId) return; // superseded; do not clobber the newer language
      apply('en', cache.en || {});
    });
  }
  function init() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    var initial = saved ? normalize(saved) : detect();
    var sel = document.getElementById('langSelect');
    if (sel) {
      sel.addEventListener('change', function () { setLang(sel.value, true); });
    }
    setLang(initial, false);
  }
  window.VivineaI18n = { setLang: setLang, current: function () { return current; }, supported: SUPPORTED };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

/* The Red Letters — KJV reader.
 * All Scripture text is local in data.json. Narration uses browser speechSynthesis.
 * onboundary (word event) provides accurate tracking where supported; a clearly
 * approximate timer fallback is used when the OS voice sends no word boundaries.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const store = 'kin-red-letters-v1';
  const defaults = { book: 'John', chapter: 1, done: [], font: 22, speed: 1, voice: '', night: false, autoNext: true };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(store) || '{}') || {}; } catch {}
  const state = { ...defaults, ...saved };
  if (!Array.isArray(state.done)) state.done = [];
  let data = null, book = null, chapter = null, sayings = [], speech = null, playing = false, run = 0;
  let currentIndex = 0, wordIndex = -1, fallback = null, utteranceStarted = 0;
  let voices = [], searchDebounce = null;
  const supportsSpeech = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const escapeHTML = s => String(s).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch]));
  const save = () => { try { localStorage.setItem(store, JSON.stringify(state)); } catch {} };
  const key = (b, c) => b + ':' + c;
  const chapterList = () => data.books.flatMap(b => b.chapters.map(c => ({ book: b.name, chapter: c.c })));
  const tokens = text => [...text.matchAll(/\S+/g)].map(m => ({ word: m[0], start: m.index, end: m.index + m[0].length }));
  const getBook = name => data.books.find(x => x.name === name) || data.books[0];
  const getChapter = (b, c) => b.chapters.find(x => x.c === Number(c)) || b.chapters[0];
  function toast(text) {
    $('toast').textContent = text; $('toast').classList.add('shown');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => $('toast').classList.remove('shown'), 3000);
  }
  function renderNav() {
    $('bookNav').innerHTML = data.books.map(b => '<button type="button" class="book-item' + (b.name === book.name ? ' active' : '') + '" data-book="' + b.name + '" aria-pressed="' + (b.name === book.name) + '"><strong>' + b.name + '</strong><small>' + b.chapters.length + ' chapters</small></button>').join('');
    $('chapterCount').textContent = book.chapters.length;
    $('chapterNav').innerHTML = book.chapters.map(c => '<button type="button" class="chapter-btn' + (c.c === chapter.c ? ' active' : '') + (state.done.includes(key(book.name,c.c)) ? ' done' : '') + '" data-chapter="' + c.c + '" aria-label="' + book.name + ' chapter ' + c.c + '" aria-pressed="' + (c.c === chapter.c) + '">' + c.c + '</button>').join('');
    updateCompleted();
  }
  function updateCompleted() {
    const all = chapterList().map(c => key(c.book, c.chapter));
    const done = all.filter(x => state.done.includes(x)).length;
    $('journeyCount').textContent = done + ' of ' + all.length + ' chapters completed';
    $('progressPercent').textContent = Math.round(done / all.length * 100) + '%';
    $('progressFill').style.width = (done / all.length * 100) + '%';
    const complete = state.done.includes(key(book.name, chapter.c));
    $('completeBtn').classList.toggle('completed', complete);
    $('completeBtn').setAttribute('aria-pressed', String(complete));
    $('completeBtnText').textContent = complete ? 'Completed' : 'Mark complete';
  }
  function readingTitle() {
    $('chapterTitle').innerHTML = escapeHTML(book.name) + ' <em>' + chapter.c + '</em>';
    $('chapterSubheading').textContent = chapter.e.length + ' sayings of Jesus · King James Version';
    $('nowTitle').textContent = book.name + ' ' + chapter.c;
    $('mobileRef').textContent = book.name + ' ' + chapter.c;
    document.title = book.name + ' ' + chapter.c + ' | The Red Letters';
    $('heroChapters').textContent = chapterList().length + ' reading chapters';
  }
  function renderVerses() {
    sayings = chapter.e.map((e, i) => ({ ...e, i, words: tokens(e.t) }));
    $('verseList').innerHTML = sayings.map(s => {
      const words = s.words.map((w, i) => '<span class="word" data-w="' + i + '">' + escapeHTML(w.word) + '</span>').join(' ');
      return '<article class="verse" id="verse-' + s.i + '" data-index="' + s.i + '"><button class="verse-number" type="button" data-start="' + s.i + '" title="Listen from ' + book.name + ' ' + chapter.c + ':' + s.v + '" aria-label="Read from verse ' + s.v + '">' + s.v + '</button><p class="verse-copy">' + words + (s.p > 1 ? '<sup class="verse-index">part ' + s.p + '</sup>' : '') + '</p></article>';
    }).join('');
    $('previousVerse').disabled = false; $('nextVerse').disabled = false;
    updateProgress();
  }
  function updateProgress() {
    const s = sayings[currentIndex];
    const ref = s ? book.name + ' ' + chapter.c + ':' + s.v : book.name + ' ' + chapter.c;
    $('nowVerse').textContent = s ? s.t : 'Press play to hear His words';
    $('mobileRef').textContent = ref;
    $('verseProgress').textContent = s ? 'SAYING ' + (currentIndex + 1) + ' OF ' + sayings.length : 'READY';
    $('listenProgressFill').style.width = (sayings.length ? Math.round((currentIndex + (playing ? .5 : 0)) / sayings.length * 100) : 0) + '%';
    $('timeHint').textContent = playing ? 'READING NOW' : 'READY';
    $('audioStatus').textContent = playing ? 'Reading aloud' : 'Ready to read aloud';
    $('mobileState').textContent = playing ? 'Reading aloud...' : 'Ready to listen';
    $('playIcon').textContent = playing ? 'Ⅱ' : '▶';
    $('mobilePlay').textContent = playing ? 'Ⅱ' : '▶';
    $('playButton').setAttribute('aria-label', playing ? 'Pause reading' : 'Play reading');
    $('mobilePlay').setAttribute('aria-label', playing ? 'Pause reading' : 'Play reading');
  }
  function clearHighlight() {
    document.querySelectorAll('.verse.current').forEach(el => el.classList.remove('current'));
    document.querySelectorAll('.word.spoken').forEach(el => el.classList.remove('spoken'));
    wordIndex = -1;
  }
  function highlight(index, indexWord = -1, shouldScroll = true) {
    if (!sayings[index]) return;
    document.querySelectorAll('.verse.current').forEach(el => el.classList.remove('current'));
    document.querySelectorAll('.word.spoken').forEach(el => el.classList.remove('spoken'));
    const node = $('verse-' + index);
    if (!node) return;
    node.classList.add('current');
    if (indexWord >= 0) {
      const word = node.querySelector('[data-w="' + Math.min(indexWord,sayings[index].words.length-1) + '"]');
      if (word) {
        word.classList.add('spoken');
        if (shouldScroll && wordIndex !== indexWord && (indexWord === 0 || indexWord % 8 === 0)) word.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (shouldScroll) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
    wordIndex = indexWord;
  }
  function stopSpeech(reset = false) {
    run++;
    clearInterval(fallback); fallback = null;
    playing = false;
    if (supportsSpeech) {
      try { window.speechSynthesis.cancel(); } catch {}
    }
    speech = null;
    if (reset) { currentIndex = 0; clearHighlight(); }
    updateProgress();
  }
  function selectVoice() {
    const chosen = voices.find(v => v.voiceURI === state.voice);
    return chosen || voices.find(v => /^en(-|_)/i.test(v.lang) && v.localService) || voices.find(v => /^en(-|_)/i.test(v.lang)) || null;
  }
  function startSpeech(index = currentIndex) {
    if (!supportsSpeech) { toast('This browser has no text-to-speech. Try Chrome, Edge, or Safari.'); return; }
    if (!sayings.length) return;
    stopSpeech();
    currentIndex = Math.max(0,Math.min(index,sayings.length-1));
    const token = run;
    playing = true;
    const s = sayings[currentIndex];
    const utter = new SpeechSynthesisUtterance(s.t);
    utter.lang = 'en-GB';
    utter.rate = Number(state.speed) || 1;
    const v = selectVoice(); if (v) { utter.voice = v; utter.lang = v.lang; }
    speech = utter;
    let hasBoundary = false;
    const markByPosition = charIndex => {
      const arr = s.words;
      if (!arr.length) return;
      let word = arr.findIndex(w => w.start <= charIndex && charIndex < w.end);
      if (word < 0) word = arr.findIndex(w => w.start > charIndex);
      if (word < 0) word = arr.length - 1;
      if (word !== wordIndex) highlight(currentIndex, word, true);
    };
    utter.onstart = () => {
      if (token !== run) return;
      utteranceStarted = performance.now();
      highlight(currentIndex,0); updateProgress();
      clearInterval(fallback);
      // Fallback is approximate and only runs for voices without boundary events.
      fallback = setInterval(() => {
        if (token !== run || !playing || hasBoundary) return;
        const elapsed = (performance.now() - utteranceStarted) / 1000;
        const estimatedWords = Math.floor(elapsed * (2.35 * utter.rate));
        highlight(currentIndex, Math.min(s.words.length - 1, estimatedWords), false);
      }, 250);
    };
    utter.onboundary = e => {
      if (token !== run) return;
      if (typeof e.charIndex === 'number') { hasBoundary = true; markByPosition(e.charIndex); }
    };
    utter.onend = () => {
      if (token !== run) return;
      clearInterval(fallback);
      if (currentIndex + 1 < sayings.length) {
        currentIndex++;
        // A short gap gives listeners a natural breath between sayings.
        setTimeout(() => { if (token === run) startSpeech(currentIndex); }, 160);
      } else {
        const all = chapterList();
        const pos = all.findIndex(x => x.book === book.name && x.chapter === chapter.c);
        stopSpeech();
        if (state.autoNext && pos >= 0 && pos < all.length - 1) {
          setTimeout(() => { if (!playing && chapter.c === all[pos].chapter && book.name === all[pos].book) navigate(all[pos+1].book, all[pos+1].chapter, true); }, 420);
        } else { highlight(currentIndex, s.words.length - 1, false); toast('Chapter finished. Well done!'); }
      }
    };
    utter.onerror = e => {
      if (token !== run) return;
      clearInterval(fallback); playing = false; updateProgress();
      if (e.error !== 'interrupted' && e.error !== 'canceled') toast('Audio could not play. Please choose a different voice or retry.');
    };
    updateProgress();
    try { window.speechSynthesis.speak(utter); }
    catch { playing = false; updateProgress(); toast('Could not start narration on this device.'); }
  }
  function toggleSpeech() {
    if (playing) { stopSpeech(); $('audioStatus').textContent = 'Paused · press play to resume this saying'; }
    else startSpeech(currentIndex);
  }
  function changeSaying(delta) {
    const next = currentIndex + delta;
    if (next >= 0 && next < sayings.length) startSpeech(next);
    else if (delta > 0) jumpChapter(1, true);
    else if (delta < 0) jumpChapter(-1, true);
  }
  function navigate(b, c, autoplay = false, anchor = null) {
    stopSpeech(true);
    book = getBook(b); chapter = getChapter(book,c);
    state.book = book.name; state.chapter = chapter.c; save();
    try { history.replaceState({}, '', '?book=' + encodeURIComponent(book.name.toLowerCase()) + '&chapter=' + chapter.c + (anchor ? '&verse=' + anchor : '')); } catch {}
    $('readingPane').hidden = false; $('resultsPane').hidden = true; $('searchInput').value = '';
    readingTitle(); renderNav(); renderVerses();
    if (anchor != null) {
      const idx = sayings.findIndex(s => s.v === Number(anchor));
      if (idx >= 0) { currentIndex = idx; highlight(idx, -1, true); }
    } else if (window.innerWidth <= 700) $('reader').scrollIntoView({ behavior:'smooth',block:'start' });
    if (autoplay) startSpeech(currentIndex);
  }
  function jumpChapter(delta, autoplay = false) {
    const all = chapterList();
    const pos = all.findIndex(x => x.book === book.name && x.chapter === chapter.c);
    const target = all[pos+delta]; if (target) navigate(target.book,target.chapter,autoplay);
  }
  function renderVoices() {
    if (!supportsSpeech) return;
    voices = window.speechSynthesis.getVoices().filter(v => /^en(-|_)/i.test(v.lang));
    const select = $('voiceSelect'); const was = state.voice;
    select.innerHTML = '<option value="">Device default voice</option>' + voices.map(v => '<option value="' + escapeHTML(v.voiceURI) + '">' + escapeHTML(v.name + ' · ' + v.lang) + '</option>').join('');
    select.value = voices.some(v => v.voiceURI === was) ? was : '';
  }
  function updateFont() {
    state.font = Math.max(16,Math.min(34,Number(state.font) || 22));
    document.documentElement.style.setProperty('--verse-size', state.font + 'px'); save();
  }
  function performSearch(query) {
    const needle = query.toLowerCase().trim();
    if (needle.length < 2) { $('resultsPane').hidden = true; $('readingPane').hidden = false; return; }
    if (playing) stopSpeech();
    const found = [];
    for (const b of data.books) for (const c of b.chapters) for (const e of c.e) if (e.t.toLowerCase().includes(needle)) found.push({ ...e, book:b.name, chapter:c.c });
    $('readingPane').hidden = true; $('resultsPane').hidden = false;
    $('searchCount').textContent = found.length + ' saying' + (found.length === 1 ? '' : 's') + ' found';
    const shown = found.slice(0,100);
    $('resultsList').innerHTML = shown.length ? shown.map(f => {
      const lower = f.t.toLowerCase(), at = lower.indexOf(needle);
      const excerpt = escapeHTML(f.t.slice(0,at)) + '<mark>' + escapeHTML(f.t.slice(at,at+needle.length)) + '</mark>' + escapeHTML(f.t.slice(at+needle.length));
      return '<button type="button" class="search-result" data-jumpbook="' + f.book + '" data-jumpchapter="' + f.chapter + '" data-jumpverse="' + f.v + '"><strong>' + f.book.toUpperCase() + ' ' + f.chapter + ':' + f.v + '</strong><p>' + excerpt + '</p></button>';
    }).join('') + (found.length > 100 ? '<p class="search-count">Showing the first 100 matches. Refine your search to see more.</p>' : '') : '<p class="results-empty">No sayings found. Try another phrase.</p>';
  }
  async function share() {
    const u = location.href.split('?')[0] + '?book=' + encodeURIComponent(book.name.toLowerCase()) + '&chapter=' + chapter.c;
    try {
      if (navigator.share) await navigator.share({title:'The Red Letters — ' + book.name + ' ' + chapter.c,url:u});
      else if (navigator.clipboard && window.isSecureContext) {await navigator.clipboard.writeText(u);toast('Chapter link copied');}
      else {toast('Share this chapter: ' + u);}
    } catch (e) { if (e.name !== 'AbortError') toast('Could not share this link.'); }
  }
  function bind() {
    $('bookNav').addEventListener('click',e => {const el=e.target.closest('[data-book]');if (el) navigate(el.dataset.book,1);});
    $('chapterNav').addEventListener('click',e => {const el=e.target.closest('[data-chapter]');if (el) navigate(book.name,Number(el.dataset.chapter));});
    $('verseList').addEventListener('click',e => {const el=e.target.closest('[data-start]');if(el) startSpeech(Number(el.dataset.start));});
    $('completeBtn').addEventListener('click',() => {
      const k = key(book.name,chapter.c), idx=state.done.indexOf(k);
      if (idx < 0) state.done.push(k); else state.done.splice(idx,1);
      save();renderNav();toast(idx < 0 ? 'Chapter marked complete' : 'Chapter marked unread');
    });
    $('playButton').addEventListener('click',toggleSpeech);
    $('mobilePlay').addEventListener('click',toggleSpeech);
    $('previousVerse').addEventListener('click',()=>changeSaying(-1));
    $('nextVerse').addEventListener('click',()=>changeSaying(1));
    $('mobilePrevious').addEventListener('click',()=>changeSaying(-1));
    $('mobileNext').addEventListener('click',()=>changeSaying(1));
    $('prevChapter').addEventListener('click',()=>jumpChapter(-1));
    $('nextChapter').addEventListener('click',()=>jumpChapter(1));
    $('decreaseFont').addEventListener('click',()=>{state.font-=2;updateFont();});
    $('increaseFont').addEventListener('click',()=>{state.font+=2;updateFont();});
    $('shareBtn').addEventListener('click',share);
    $('voiceSelect').addEventListener('change',e=>{state.voice=e.target.value;save();if(playing)startSpeech(currentIndex);});
    $('speedInput').addEventListener('input',e=>{state.speed=Number(e.target.value);$('speedValue').textContent=state.speed.toFixed(2).replace(/0$/,'')+'×';save();});
    $('speedInput').addEventListener('change',()=>{if(playing)startSpeech(currentIndex);});
    $('autoNext').addEventListener('change',e=>{state.autoNext=e.target.checked;save();});
    $('themeToggle').addEventListener('click',()=>{state.night=!state.night;document.body.classList.toggle('night',state.night);save();});
    $('searchInput').addEventListener('input',e=>{clearTimeout(searchDebounce);searchDebounce=setTimeout(()=>performSearch(e.target.value),200);});
    $('clearSearch').addEventListener('click',()=>{$('searchInput').value='';performSearch('');});
    $('resultsList').addEventListener('click',e=>{const el=e.target.closest('[data-jumpbook]');if(el)navigate(el.dataset.jumpbook,Number(el.dataset.jumpchapter),false,Number(el.dataset.jumpverse));});
    document.addEventListener('keydown',e=>{
      if(e.key==='/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){e.preventDefault();$('searchInput').focus();}
      if(e.key==='Escape'&&document.activeElement===$('searchInput')){$('searchInput').value='';performSearch('');$('searchInput').blur();}
    });
    window.addEventListener('pagehide',()=>{if(supportsSpeech)window.speechSynthesis.cancel();});
  }
  async function init() {
    bind();updateFont();
    document.body.classList.toggle('night',state.night);
    $('speedInput').value=state.speed;
    $('speedValue').textContent=Number(state.speed).toFixed(2).replace(/0$/,'')+'×';
    $('autoNext').checked=state.autoNext;
    if(supportsSpeech){renderVoices();window.speechSynthesis.onvoiceschanged=renderVoices;}
    else $('audioStatus').textContent='Audio unavailable on this browser';
    $('verseList').innerHTML='<p class="results-empty">Loading the words of Jesus…</p>';
    try {
      const response=await fetch('./data.json');if(!response.ok)throw new Error('Scripture file unavailable');
      data=await response.json();
      if(!data?.books?.length) throw new Error('Scripture file is empty');
      $('totalWords').textContent=Number(data.counts.words).toLocaleString('en-US');
      const params=new URLSearchParams(location.search);
      const requested=params.get('book')||state.book;
      const selected=data.books.find(b=>b.name.toLowerCase()===requested.toLowerCase()) || data.books[0];
      navigate(selected.name,Number(params.get('chapter'))||state.chapter,false,params.get('verse'));
      const all=chapterList(),pos=all.findIndex(x=>x.book===book.name && x.chapter===chapter.c);
      $('prevChapter').disabled=pos===0;
      $('nextChapter').disabled=pos===all.length-1;
      if(params.get('verse')){ const idx=sayings.findIndex(s=>s.v===Number(params.get('verse')));if(idx>=0)highlight(idx,-1,true); }
    } catch(err){
      $('verseList').innerHTML='<p class="results-empty">Unable to load the Scripture text. Check your connection and reload the page.</p>';
      $('audioStatus').textContent='Scripture unavailable';
      console.error('Red Letters loading error:',err);
    }
  }
  // Keep previous/next chapter states current when navigating.
  const oldNavigate=navigate;
  navigate=function(b,c,autoplay=false,anchor=null){
    oldNavigate(b,c,autoplay,anchor);
    const all=chapterList(),pos=all.findIndex(x=>x.book===book.name && x.chapter===chapter.c);
    $('prevChapter').disabled=pos<=0;$('nextChapter').disabled=pos>=all.length-1;
  };
  init();
})();
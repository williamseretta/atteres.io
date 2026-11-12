const get = id => document.getElementById(id);
const { documents } = JSON.parse(get('data').textContent);
const picker = get('document');
const page = get('page');
const query = get('query');
const heading = get('heading');
const source = get('pdf-source');
const pdf = '/me/health/health-summary.pdf';
const parts = [
  { index: 2, first: 2, label: 'Health summary · Part 1' },
  { index: 1, first: 1342, label: 'Health summary · Part 2' },
  { index: 0, first: 2360, label: 'Health summary · Part 3' },
  { index: 3, label: 'Additional MyChart records' },
];
const sectionHeadings = new Set([
  'allergies', 'medications', 'active problems', 'resolved problems', 'social history',
  'last filed vital signs', 'procedures', 'results', 'care teams', 'document information',
  'reason for visit', 'encounter details', 'advance directives', 'plan of treatment',
  'immunizations', 'family history', 'clinical notes', 'progress notes', 'discharge summary',
]);

parts.forEach(part => picker.add(new Option(part.label, part.index)));
const total = documents.reduce((sum, doc) => sum + doc.pages.length, 0);
get('summary').textContent = total.toLocaleString() + ' source pages across four documents';

function renderText(text) {
  const fragment = document.createDocumentFragment();
  let lines = [];
  const flush = () => {
    if (!lines.length) return;
    const block = document.createElement('pre');
    block.textContent = lines.join('\n');
    fragment.append(block);
    lines = [];
  };
  for (const line of text.split(/\r?\n/)) {
    const label = line.trim();
    if (sectionHeadings.has(label.toLowerCase())) {
      flush();
      const title = document.createElement('h3');
      title.textContent = label;
      fragment.append(title);
    } else {
      lines.push(line);
    }
  }
  flush();
  get('record').replaceChildren(fragment);
}

function show() {
  const index = Number(picker.value);
  const doc = documents[index];
  const part = parts.find(item => item.index === index);
  const number = Math.min(doc.pages.length, Math.max(1, Math.trunc(Number(page.value)) || 1));
  page.max = doc.pages.length;
  page.value = number;
  heading.textContent = part.label + ' · Page ' + number.toLocaleString() + ' of ' + doc.pages.length.toLocaleString();
  const pdfPage = part.first ? part.first + number - 1 : null;
  source.hidden = pdfPage === null;
  if (pdfPage !== null) {
    source.href = pdf + '#page=' + pdfPage;
    source.textContent = 'Open PDF page ' + pdfPage.toLocaleString();
  }
  else source.removeAttribute('href');
  renderText(doc.pages[number - 1].text || 'This page has no extractable text.');
  get('prev').disabled = number === 1;
  get('next').disabled = number === doc.pages.length;
}

function openPage(index, number) {
  picker.value = index;
  page.value = number;
  show();
  heading.focus();
}

for (const button of document.querySelectorAll('[data-pdf-page]')) {
  button.onclick = () => {
    const number = Number(button.dataset.pdfPage);
    const part = parts.find(item => item.first && number >= item.first &&
      number < item.first + documents[item.index].pages.length);
    if (part) openPage(part.index, number - part.first + 1);
  };
}

picker.onchange = () => { page.value = 1; show(); };
page.onchange = show;
get('prev').onclick = () => { page.stepDown(); show(); };
get('next').onclick = () => { page.stepUp(); show(); };
query.oninput = () => {
  const term = query.value.trim().toLowerCase();
  const results = get('results');
  const status = get('matches');
  results.replaceChildren();
  status.textContent = '';
  if (!term) return;

  const fragment = document.createDocumentFragment();
  let count = 0;
  for (const part of parts) {
    for (const record of documents[part.index].pages) {
      const position = record.text.toLowerCase().indexOf(term);
      if (position < 0) continue;
      count++;
      const item = document.createElement('li');
      const button = document.createElement('button');
      const title = document.createElement('strong');
      const excerpt = document.createElement('span');
      title.textContent = part.label + ' · Page ' + record.number.toLocaleString();
      excerpt.textContent = record.text.slice(Math.max(0, position - 55), position + term.length + 85).replace(/\s+/g, ' ').trim();
      button.append(title, excerpt);
      button.onclick = () => openPage(part.index, record.number);
      item.append(button);
      fragment.append(item);
    }
  }
  results.append(fragment);
  status.textContent = count.toLocaleString() + (count === 1 ? ' matching page' : ' matching pages');
};
show();

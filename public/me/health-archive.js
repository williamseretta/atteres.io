const archive = document.querySelector('#record-archive');
const search = archive.querySelector('input[type="search"]');
const range = archive.querySelector('#archive-range');
const category = archive.querySelector('#archive-category');
const categories = {
  clinical: /\b(?:progress notes?|clinical notes?|consult(?:ation)? notes?|office visit notes?|h&p notes?|history and physical)\b/i,
  meetings: /\b(?:meeting notes?|(?:family|care team|treatment team|multidisciplinary|discharge planning|team) meetings?|care coordination)\b/i,
  calls: /\b(?:telephone encounter|telephone notes?|phone notes?|telephone call|patient message)\b/i,
  discharge: /\b(?:discharge summary|discharge instructions|after visit summary|patient instructions)\b/i,
};

const status = archive.querySelector('[role="status"]');
const list = archive.querySelector('.record-results');
const more = archive.querySelector('button');
const batchSize = 30;
let pages = [];
let matches = [];
let shown = 0;
let debounce;

function appendResults() {
  const fragment = document.createDocumentFragment();
  for (const page of matches.slice(shown, shown + batchSize)) {
    const record = document.createElement('details');
    const heading = document.createElement('summary');
    heading.textContent = page.heading;
    record.append(heading);
    record.addEventListener('toggle', () => {
      if (!record.open || record.querySelector('pre')) return;
      const body = document.createElement('pre');
      body.textContent = page.text;
      record.append(body);
    });
    fragment.append(record);
    shown++;
  }
  list.append(fragment);
  more.hidden = shown >= matches.length;
  status.textContent = matches.length
    ? `Showing ${shown.toLocaleString()} of ${matches.length.toLocaleString()} pages`
    : 'No matching pages.';
}

function filterPages() {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const [first, last] = range.value.split('-').map(Number);
  matches = pages.filter(page =>
    (!category.value || categories[category.value].test(page.text)) &&
    (!range.value || (page.number >= first && page.number <= last)) &&
    terms.every(term => page.searchable.includes(term))
  );
  shown = 0;
  list.replaceChildren();
  appendResults();
}

async function loadArchive() {
  try {
    const response = await fetch('/me/health-archive.txt.gz');
    if (!response.ok || !response.body) throw new Error('Archive unavailable');
    const stream = response.body.pipeThrough(new DecompressionStream('gzip'));
    const source = await new Response(stream).text();
    pages = source.split(/(?=^=== PDF page )/m).filter(Boolean).map(text => {
      const heading = text.split('\n', 1)[0].replace(/^=== | ===$/g, '');
      const pageNumber = heading.match(/^PDF page ([\d,]+)/)?.[1];
      return { heading, number: Number(pageNumber?.replaceAll(',', '')), text, searchable: text.toLowerCase() };
    });
    search.disabled = false;
    range.disabled = false;
    category.disabled = false;
    filterPages();
  } catch {
    status.textContent = 'The archive could not load. Reload the page to try again.';
  }
}

search.addEventListener('input', () => {
  clearTimeout(debounce);
  debounce = setTimeout(filterPages, 180);
});
range.addEventListener('change', filterPages);
category.addEventListener('change', filterPages);
more.addEventListener('click', appendResults);
loadArchive();

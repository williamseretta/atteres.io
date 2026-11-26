const chartSelector = '.trace-field, #trace-distribution, #bag, #heatmap-explorer, .an-card, .performance-section, #session-visuals article';
let active = null;
let previousFocus = null;

function leave() {
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  if (!active) return;
  active.classList.remove('chart-expanded');
  active.querySelector('.chart-fullscreen')?.setAttribute('aria-expanded', 'false');
  const button = active.querySelector('.chart-fullscreen');
  if (button) button.textContent = 'Fullscreen';
  document.body.classList.remove('has-expanded-chart');
  active = null;
  previousFocus?.focus();
}

function syncFullscreen() {
  if (!document.fullscreenElement && active && !active.dataset.fullscreenFallback) leave();
}

async function toggle(target, button) {
  if (active === target) {
    leave();
    return;
  }
  if (active) leave();
  previousFocus = document.activeElement;
  active = target;
  target.classList.add('chart-expanded');
  button.textContent = 'Exit fullscreen';
  button.setAttribute('aria-expanded', 'true');
  document.body.classList.add('has-expanded-chart');
  delete target.dataset.fullscreenFallback;
  try {
    if (!target.requestFullscreen) throw new Error('Fullscreen unavailable');
    await target.requestFullscreen();
  } catch {
    target.dataset.fullscreenFallback = 'true';
  }
  button.focus();
}

function enhanceCharts() {
  for (const target of document.querySelectorAll(chartSelector)) {
    if (!target.querySelector('svg, canvas, .hm-grid, .hm-matrix, #carry-chart')) continue;
    if (target.querySelector(':scope > .chart-fullscreen')) continue;
    // A chart belongs to its nearest chart container.
    if (!target.querySelector('svg, canvas, .hm-grid, .hm-matrix, #carry-chart')?.closest(chartSelector)?.isSameNode(target)) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chart-fullscreen';
    button.textContent = 'Fullscreen';
    button.setAttribute('aria-expanded', 'false');
    button.onclick = () => toggle(target, button);
    target.prepend(button);
  }
}
document.addEventListener('fullscreenchange', syncFullscreen);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && active) leave();
});
let scheduled = false;
const observer = new MutationObserver(() => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    enhanceCharts();
  });
});
observer.observe(document.querySelector('main'), { childList: true, subtree: true });
enhanceCharts();

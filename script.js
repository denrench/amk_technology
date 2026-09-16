document.addEventListener('DOMContentLoaded', () => {
  // 1. Эффект свечения карточек по координатам мыши (Radial Glow)
  const cards = document.querySelectorAll('.bento-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 2. Интерактивный калькулятор баллов аттестата
  const slider = document.getElementById('scoreSlider');
  const display = document.getElementById('scoreDisplay');
  const result = document.getElementById('calcResult');

  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value).toFixed(2);
    display.textContent = val;

    if (val >= 4.7) {
      result.textContent = "🔥 Превосходно! Гарантированный грант на IT и дизайн.";
      result.style.borderColor = "#10b981";
      result.style.color = "#4ade80";
    } else if (val >= 4.0) {
      result.textContent = "⚡ Высокие шансы на грант по техническим направлениям и логистике.";
      result.style.borderColor = "#3b82f6";
      result.style.color = "#60a5fa";
    } else {
      result.textContent = "⚠️ Платное обучение с возможностью перевода на грант за успехи.";
      result.style.borderColor = "#f59e0b";
      result.style.color = "#fbbf24";
    }
  });

  // 3. Command Menu (Ctrl + K / Cmd + K)
  const cmdModal = document.getElementById('cmdModal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeCmdBtn = document.getElementById('closeCmdBtn');
  const cmdInput = document.getElementById('cmdInput');
  const cmdItems = document.querySelectorAll('.cmd-item');

  function openModal() {
    cmdModal.classList.add('open');
    cmdInput.focus();
  }

  function closeModal() {
    cmdModal.classList.remove('open');
  }

  openSearchBtn.addEventListener('click', openModal);
  closeCmdBtn.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdModal.classList.contains('open') ? closeModal() : openModal();
    }
    if (e.key === 'Escape') closeModal();
  });

  cmdModal.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeModal();
  });

  // Фильтрация внутри Cmd+K
  cmdInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    cmdItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(term) ? 'block' : 'none';
    });
  });

  cmdItems.forEach(item => {
    item.addEventListener('click', () => {
      closeModal();
      const target = item.getAttribute('data-url');
      if (target) location.href = target;
    });
  });
});
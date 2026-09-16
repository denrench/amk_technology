document.addEventListener('DOMContentLoaded', () => {

  // 1. Анимация появления блоков при скролле без просадки FPS (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // перестаем следить, экономим батарею и ресурсы
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));

  // 2. Интерактивное расписание
  const scheduleData = {
    is21: [
      { time: "08:30 - 10:00", subject: "Разработка мобильных приложений (Flutter)", room: "Ауд. 402" },
      { time: "10:15 - 11:45", subject: "Базы данных (PostgreSQL / Индексация)", room: "Лаб. 3" },
      { time: "12:15 - 13:45", subject: "Английский для IT-специалистов", room: "Ауд. 210" }
    ],
    ds11: [
      { time: "08:30 - 10:00", subject: "UI/UX проектирование в Figma", room: "Медиа-центр" },
      { time: "10:15 - 11:45", subject: "Основы композиции и типографики", room: "Ауд. 104" },
      { time: "12:15 - 13:45", subject: "История стилей в дизайне", room: "Ауд. 201" }
    ],
    sa31: [
      { time: "08:30 - 10:00", subject: "Администрирование серверов Linux", room: "Серверная" },
      { time: "10:15 - 11:45", subject: "Сетевые протоколы и архитектура Cisco", room: "Лаб. 1" },
      { time: "12:15 - 13:45", subject: "Информационная безопасность", room: "Ауд. 312" }
    ]
  };

  const scheduleDisplay = document.getElementById('scheduleDisplay');
  const tabs = document.querySelectorAll('.tab-btn');

  function renderSchedule(groupKey) {
    const list = scheduleData[groupKey] || [];
    scheduleDisplay.innerHTML = list.map(item => `
      <div class="schedule-item">
        <span class="sch-time">${item.time}</span>
        <span class="sch-subject">${item.subject}</span>
        <span class="sch-room">${item.room}</span>
      </div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSchedule(tab.dataset.group);
    });
  });
  renderSchedule('is21'); // По умолчанию первая группа

  // 3. Калькулятор шансов на поступление
  const slider = document.getElementById('scoreSlider');
  const display = document.getElementById('scoreDisplay');
  const result = document.getElementById('calcResult');

  slider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value).toFixed(2);
    display.textContent = val;

    if (val >= 4.6) {
      result.textContent = "🔥 Топовый результат! 100% проход на бюджет/грант (IT & Дизайн).";
      result.style.background = "#f0fdf4";
      result.style.color = "#15803d";
      result.style.borderColor = "#bbf7d0";
    } else if (val >= 4.0) {
      result.textContent = "⚡ Отличный балл! Высокие шансы на грант по техническим квотам.";
      result.style.background = "#eff6ff";
      result.style.color = "#1d4ed8";
      result.style.borderColor = "#bfdbfe";
    } else {
      result.textContent = "💡 Рекомендовано контрактное обучение с возможностью скидки.";
      result.style.background = "#fffbeb";
      result.style.color = "#b45309";
      result.style.borderColor = "#fde68a";
    }
  });

  // 4. Модалка заявки
  const applyModal = document.getElementById('applyModal');
  const openApplyBtn = document.getElementById('openApplyModal');
  const closeApplyBtn = document.getElementById('closeApplyModal');
  const applyForm = document.getElementById('applyForm');

  openApplyBtn.addEventListener('click', () => applyModal.classList.add('open'));
  closeApplyBtn.addEventListener('click', () => applyModal.classList.remove('open'));
  
  applyModal.addEventListener('click', (e) => {
    if (e.target === applyModal) applyModal.classList.remove('open');
  });

  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка принята! Куратор свяжется с вами в течение 15 минут.');
    applyModal.classList.remove('open');
    applyForm.reset();
  });

  // 5. Поиск Ctrl + K
  const cmdModal = document.getElementById('cmdModal');
  const openSearchBtn = document.getElementById('openSearchBtn');
  const cmdInput = document.getElementById('cmdInput');
  const searchItems = document.querySelectorAll('.search-item');

  function toggleSearch(show) {
    if (show) {
      cmdModal.classList.add('open');
      cmdInput.focus();
    } else {
      cmdModal.classList.remove('open');
    }
  }

  openSearchBtn.addEventListener('click', () => toggleSearch(true));

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      toggleSearch(!cmdModal.classList.contains('open'));
    }
    if (e.key === 'Escape') toggleSearch(false);
  });

  cmdModal.addEventListener('click', (e) => {
    if (e.target === cmdModal) toggleSearch(false);
  });

  searchItems.forEach(item => {
    item.addEventListener('click', () => {
      toggleSearch(false);
      location.href = item.dataset.url;
    });
  });
});

// Имитация серверного API. Функции вызываются только на сервере:
// в getServerSideProps (при каждом запросе) и в getStaticProps / getStaticPaths (во время сборки).
import projects from '../data/projects';

const TIME_ZONE = 'Europe/Minsk';

// Дата форматируется на сервере, в props уходит готовая строка —
// так HTML с сервера и разметка после гидратации совпадают.
export function formatDateTime(date) {
  return new Intl.DateTimeFormat('ru-RU', {
    timeZone: TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}

function formatDate(date) {
  return new Intl.DateTimeFormat('ru-RU', { timeZone: TIME_ZONE, day: 'numeric', month: 'long' }).format(date);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * «Актуальная информация о специалисте» для главной страницы (SSR).
 * Статус зависит от текущего времени запроса, поэтому меняется от запроса к запросу.
 */
export async function getSpecialistStatus(now = new Date()) {
  await wait(50); // имитация запроса к базе данных
  const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: TIME_ZONE, hour: '2-digit', hourCycle: 'h23' }).format(now));
  const online = hour >= 9 && hour < 21;
  const nextFree = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  return {
    name: 'Айхан Рахманкулов',
    availability: 'Open to work',
    online,
    responseTime: online ? 'Сейчас на связи — отвечу в течение часа' : 'Сейчас не в сети — отвечу утром',
    activeProjects: 2,
    freeSlots: 1,
    nextFreeDate: formatDate(nextFree),
    requestTime: formatDateTime(now),
  };
}

/** Краткие данные карточек для главной страницы. */
export async function getProjectPreviews() {
  return projects.map(({ id, title, description, image, tags, meta }) => ({ id, title, description, image, tags, meta }));
}

/** Список id для getStaticPaths. */
export async function getProjectIds() {
  return projects.map((project) => project.id);
}

/** Полные данные одного проекта для getStaticProps. */
export async function getProjectById(id) {
  return projects.find((project) => project.id === id) ?? null;
}

/** Контент страницы «Обо мне» (SSG) — меняется редко, поэтому берётся во время сборки. */
export async function getAboutContent() {
  return {
    bio: [
      'Я фриланс-разработчик из Минска. Более пяти лет делаю веб-приложения на React и Node.js для стартапов и малого бизнеса.',
      'Беру проект целиком: проектирую интерфейс в Figma, пишу фронтенд и бэкенд, настраиваю деплой и сопровождаю продукт после запуска.',
    ],
    stats: [
      { value: '5+', label: 'лет опыта' },
      { value: '40', label: 'проектов' },
      { value: '4,9', label: 'рейтинг' },
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Vue', 'PostgreSQL', 'Figma', 'Docker'],
    experience: [
      { period: '2023 — сейчас', title: 'Фриланс-разработчик', text: 'Веб-сервисы, лендинги и CRM для клиентов из 6 стран.' },
      { period: '2021 — 2023', title: 'Frontend-разработчик, веб-студия', text: 'React-приложения и дизайн-системы для e-commerce.' },
      { period: '2020 — 2021', title: 'Junior-разработчик', text: 'Вёрстка, интеграция с API, первые проекты на React.' },
    ],
    education: 'БГУИР, факультет компьютерного проектирования',
  };
}

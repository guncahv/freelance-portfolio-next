// Пункты меню. href ведёт на страницу (файловый роутинг Next.js) или на якорь главной страницы.
const navItems = [
  { id: 'home', label: 'Главная', href: '/', icon: '/assets/icon-home.svg' },
  { id: 'projects', label: 'Проекты', href: '/#projects', icon: '/assets/icon-projects.svg' },
  { id: 'about', label: 'Обо мне', href: '/about', icon: '/assets/icon-about.svg' },
  { id: 'contact', label: 'Контакты', href: '/#contact', icon: '/assets/icon-contact.svg' },
];

export default navItems;

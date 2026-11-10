import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Icon from '../Icon/Icon';
import AppButton from '../AppButton/AppButton';

/**
 * Шапка сайта (Navbar из React Bootstrap). Переходы между страницами выполняет
 * компонент <Link> из next/link — без перезагрузки страницы (клиентская навигация).
 * Активный пункт меню определяется по текущему маршруту useRouter().
 */
function activeIdFor(pathname) {
  if (pathname === '/about') return 'about';
  if (pathname.startsWith('/projects')) return 'projects';
  return 'home';
}

function Header({ navItems, status = '' }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const activeId = activeIdFor(router.pathname);

  return (
    <Navbar expand="lg" bg="white" sticky="top" className="border-bottom shadow-sm py-2" expanded={expanded} onToggle={setExpanded}>
      <Container>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center gap-2">
          <img src="/assets/logo-mark.svg" alt="" width="36" height="36" />
          <span>
            aykhan<span className="text-primary">.dev</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" aria-label="Открыть меню" />

        <Navbar.Collapse id="main-nav">
          <Nav className="mx-lg-auto gap-lg-1 my-3 my-lg-0" activeKey={activeId} onSelect={() => setExpanded(false)}>
            {navItems.map((item) => (
              <Nav.Link
                key={item.id}
                as={Link}
                href={item.href}
                eventKey={item.id}
                className={`d-flex align-items-center gap-2 px-3 rounded-3 fw-medium ${item.id === activeId ? 'bg-primary-subtle text-primary' : ''}`}
              >
                <Icon src={item.icon} size={18} />
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex flex-wrap align-items-center gap-3 pb-3 pb-lg-0">
            {status && (
              <Badge pill bg="success-subtle" text="success-emphasis" className="fw-medium py-2 px-3">
                ● {status}
              </Badge>
            )}
            <Image src="/assets/photo-specialist@1x.jpg" alt="Фото специалиста" roundedCircle width={40} height={40} className="object-fit-cover" />
            <AppButton
              label="Связаться"
              icon="/assets/icon-arrow-right.svg"
              onClick={() => {
                setExpanded(false);
                router.push('/#contact');
              }}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  status: PropTypes.string,
};

export default Header;

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Header from '../Header/Header';
import navItems from '../../data/navigation';

/** Общий макет страниц: шапка, содержимое страницы и подвал. */
function Layout({ children }) {
  return (
    <>
      <Header navItems={navItems} status="Open to work" />
      <main>{children}</main>
      <footer className="py-4 border-top bg-white">
        <Container className="d-flex flex-column flex-md-row justify-content-between gap-2 small text-secondary">
          <span>© 2026 aykhan.dev</span>
          <span>Next.js + React Bootstrap · ЛР №25</span>
        </Container>
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

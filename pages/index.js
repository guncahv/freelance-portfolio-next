import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ContactForm from '../components/ContactForm/ContactForm';
import RenderInfo from '../components/RenderInfo/RenderInfo';
import { getSpecialistStatus, getProjectPreviews } from '../lib/api';

/**
 * Главная страница «/» — Server-Side Rendering.
 * getServerSideProps выполняется на сервере при КАЖДОМ запросе: Next.js получает
 * актуальный статус специалиста, рендерит страницу в HTML и отправляет его браузеру.
 */
export async function getServerSideProps({ res }) {
  // запрещаем кэширование: каждый запрос должен получать свежие данные
  res.setHeader('Cache-Control', 'no-store');

  const [status, projects] = await Promise.all([getSpecialistStatus(new Date()), getProjectPreviews()]);

  return {
    props: { status, projects },
  };
}

export default function HomePage({ status, projects }) {
  return (
    <>
      <Head>
        <title>aykhan.dev — портфолио фриланс-разработчика</title>
        <meta name="description" content={`${status.name}: ${status.availability}. Фриланс-разработчик React и Node.js.`} />
      </Head>

      <Container className="pt-4">
        <RenderInfo mode="SSR" time={status.requestTime} />
      </Container>

      <Container as="section" id="home" className="py-5">
        <Row className="align-items-center g-4 g-lg-5 py-lg-4">
          <Col lg={7} className="order-2 order-lg-1 text-center text-lg-start">
            <Badge bg="primary-subtle" text="primary-emphasis" pill className="mb-3 py-2 px-3 fw-medium">
              Фриланс-разработчик · React · Node.js
            </Badge>
            <h1 className="display-5 fw-bold mb-3">Создаю быстрые веб-приложения под ключ</h1>
            <p className="lead text-secondary mb-4">
              Привет! Я Айхан. Помогаю стартапам и малому бизнесу запускать сайты и веб-сервисы: от прототипа в Figma до
              релиза.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Link href="#projects" className="btn btn-primary btn-lg fw-semibold">
                Смотреть проекты →
              </Link>
              <Link href="/about" className="btn btn-outline-primary btn-lg fw-semibold">
                Обо мне
              </Link>
            </div>
          </Col>
          <Col xs={8} sm={6} lg={5} className="order-1 order-lg-2 mx-auto text-center">
            <Image
              src="/assets/photo-specialist@1x.jpg"
              alt={`${status.name}, фриланс-разработчик`}
              fluid
              className="rounded-4 shadow object-fit-cover"
              style={{ maxHeight: 420, aspectRatio: '4 / 5' }}
            />
          </Col>
        </Row>
      </Container>

      {/* Актуальный статус — данные из getServerSideProps */}
      <Container as="section" id="status" className="pb-5">
        <Card className="bg-white border-0 shadow-sm rounded-4">
          <Card.Body className="p-4">
            <Row className="g-4 align-items-center">
              <Col md={5}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Badge bg="success" className="fs-6 py-2 px-3">
                    {status.availability}
                  </Badge>
                  <Badge bg={status.online ? 'success-subtle' : 'secondary-subtle'} text={status.online ? 'success-emphasis' : 'secondary-emphasis'}>
                    {status.online ? 'online' : 'offline'}
                  </Badge>
                </div>
                <h2 className="h4 mb-1">Статус: принимаю новые проекты</h2>
                <p className="text-secondary mb-0">{status.responseTime}</p>
              </Col>
              <Col md={7}>
                <ListGroup horizontal="sm" className="text-center">
                  <ListGroup.Item className="flex-fill">
                    <div className="fs-4 fw-bold text-primary">{status.activeProjects}</div>
                    <div className="small text-secondary">проекта в работе</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="flex-fill">
                    <div className="fs-4 fw-bold text-primary">{status.freeSlots}</div>
                    <div className="small text-secondary">свободный слот</div>
                  </ListGroup.Item>
                  <ListGroup.Item className="flex-fill">
                    <div className="fs-4 fw-bold text-primary">{status.nextFreeDate}</div>
                    <div className="small text-secondary">ближайший старт</div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Список проектов: 3 / 2 / 1 колонки (сетка из ЛР №23) */}
      <section id="projects" className="py-5 bg-white border-top border-bottom">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
            <h2 className="mb-0">Избранные проекты</h2>
            <span className="text-secondary">{projects.length} проектов</span>
          </div>
          <Row xs={1} md={2} lg={3} className="g-4">
            {projects.map((project) => (
              <Col key={project.id}>
                <ProjectCard {...project} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Container as="section" id="contact" className="py-5">
        <Card className="bg-white border-0 shadow-sm rounded-4 p-3 p-md-4 p-lg-5">
          <Row className="g-4 align-items-center">
            <Col lg={5}>
              <h2 className="mb-2">Обсудим ваш проект?</h2>
              <p className="text-secondary mb-0">Оставьте email — отвечу в течение рабочего дня.</p>
            </Col>
            <Col lg={7}>
              <ContactForm />
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import RenderInfo from '../../components/RenderInfo/RenderInfo';
import { getProjectIds, getProjectById, formatDateTime } from '../../lib/api';

/**
 * Динамический маршрут «/projects/[id]» — Static Site Generation.
 * getStaticPaths сообщает Next.js, какие страницы сгенерировать во время сборки,
 * getStaticProps получает данные каждого проекта (mock-данные) для его страницы.
 */
export async function getStaticPaths() {
  const ids = await getProjectIds();

  return {
    paths: ids.map((id) => ({ params: { id } })),
    fallback: false, // неизвестный id → страница 404
  };
}

export async function getStaticProps({ params }) {
  const project = await getProjectById(params.id);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
      builtAt: formatDateTime(new Date()),
    },
  };
}

export default function ProjectPage({ project, builtAt }) {
  return (
    <>
      <Head>
        <title>{`${project.title} — aykhan.dev`}</title>
        <meta name="description" content={project.description} />
      </Head>

      <Container className="pt-4">
        <RenderInfo mode="SSG" time={builtAt} />
      </Container>

      <Container as="article" className="py-5">
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} href="/">
            Главная
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} href="/#projects">
            Проекты
          </Breadcrumb.Item>
          <Breadcrumb.Item active>{project.title}</Breadcrumb.Item>
        </Breadcrumb>

        <Row className="g-4 g-lg-5 align-items-center">
          <Col lg={6}>
            <Stack direction="horizontal" gap={2} className="flex-wrap mb-3">
              {project.tags.map((tag) => (
                <Badge key={tag} bg="primary-subtle" text="primary-emphasis" className="fw-medium">
                  {tag}
                </Badge>
              ))}
            </Stack>
            <h1 className="display-6 fw-bold mb-3">{project.title}</h1>
            <p className="lead text-secondary">{project.description}</p>
            <ListGroup variant="flush" className="mt-4">
              <ListGroup.Item className="px-0 bg-transparent">
                <span className="text-secondary">Клиент:</span> {project.client}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 bg-transparent">
                <span className="text-secondary">Срок:</span> {project.duration}
              </ListGroup.Item>
              <ListGroup.Item className="px-0 bg-transparent">
                <span className="text-secondary">Роль:</span> {project.role}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col lg={6}>
            <img src={project.image} alt={`Обложка проекта «${project.title}»`} className="img-fluid rounded-4 shadow-sm w-100" />
          </Col>
        </Row>

        <h2 className="h4 mt-5 mb-3">Что сделано</h2>
        <ul className="lead text-secondary">
          {project.details.map((item) => (
            <li key={item} className="mb-2">
              {item}
            </li>
          ))}
        </ul>

        <Link href="/#projects" className="btn btn-outline-primary fw-semibold mt-3">
          ← Ко всем проектам
        </Link>
      </Container>
    </>
  );
}

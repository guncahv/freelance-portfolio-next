import Head from 'next/head';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import RenderInfo from '../components/RenderInfo/RenderInfo';
import { getAboutContent, formatDateTime } from '../lib/api';

/**
 * Страница «Обо мне» «/about» — Static Site Generation.
 * getStaticProps выполняется ОДИН раз во время сборки (npm run build).
 * Next.js сохраняет готовый HTML-файл и отдаёт его при каждом запросе без повторного рендеринга.
 */
export async function getStaticProps() {
  const about = await getAboutContent();

  return {
    props: {
      about,
      builtAt: formatDateTime(new Date()),
    },
  };
}

export default function AboutPage({ about, builtAt }) {
  return (
    <>
      <Head>
        <title>Обо мне — aykhan.dev</title>
        <meta name="description" content={about.bio[0]} />
      </Head>

      <Container className="pt-4">
        <RenderInfo mode="SSG" time={builtAt} />
      </Container>

      <Container as="section" className="py-5">
        <Row className="g-4 g-lg-5 align-items-center">
          <Col lg={7}>
            <h1 className="display-6 fw-bold mb-3">Обо мне</h1>
            {about.bio.map((text) => (
              <p key={text} className="lead text-secondary">
                {text}
              </p>
            ))}
            <Stack direction="horizontal" gap={2} className="flex-wrap mt-4">
              {about.skills.map((skill) => (
                <Badge key={skill} bg="white" text="dark" className="border fw-medium py-2 px-3">
                  {skill}
                </Badge>
              ))}
            </Stack>
          </Col>
          <Col lg={5}>
            <Row xs={1} sm={3} className="g-3">
              {about.stats.map((stat) => (
                <Col key={stat.label}>
                  <Card body className="h-100 bg-white border-0 shadow-sm rounded-4 text-center">
                    <div className="fs-2 fw-bold text-primary">{stat.value}</div>
                    <div className="small text-secondary">{stat.label}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <section className="py-5 bg-white border-top border-bottom">
        <Container>
          <h2 className="mb-4">Опыт работы</h2>
          <ListGroup variant="flush" className="rounded-4 shadow-sm">
            {about.experience.map((item) => (
              <ListGroup.Item key={item.period} className="py-3 px-4">
                <Row className="g-2">
                  <Col md={3} className="text-secondary font-monospace small pt-1">
                    {item.period}
                  </Col>
                  <Col md={9}>
                    <div className="fw-semibold">{item.title}</div>
                    <div className="text-secondary">{item.text}</div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p className="text-secondary mt-4 mb-0">Образование: {about.education}.</p>
        </Container>
      </section>

      <Container className="py-5 text-center">
        <h2 className="h3 mb-3">Есть задача?</h2>
        <Link href="/#contact" className="btn btn-primary btn-lg fw-semibold">
          Написать мне →
        </Link>
      </Container>
    </>
  );
}

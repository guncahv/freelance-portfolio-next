import { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Icon from '../Icon/Icon';

/**
 * Карточка проекта (Card из React Bootstrap). Данные приходят через props,
 * ссылка «Смотреть кейс» ведёт на статически сгенерированную страницу /projects/[id].
 */
function ProjectCard({ id, title, description, image, tags = [], meta = '' }) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="h-100 bg-white border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="position-relative">
        <Card.Img variant="top" src={image} alt={`Обложка проекта «${title}»`} />
        <Button
          variant="light"
          className={`position-absolute top-0 end-0 m-3 rounded-circle p-2 lh-1 shadow-sm ${isFavorite ? 'text-danger' : 'text-secondary'}`}
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        >
          <Icon src={isFavorite ? '/assets/icon-heart-filled.svg' : '/assets/icon-heart.svg'} size={18} />
        </Button>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        {tags.length > 0 && (
          <Stack direction="horizontal" gap={2} className="flex-wrap mb-3">
            {tags.map((tag) => (
              <Badge key={tag} bg="primary-subtle" text="primary-emphasis" className="fw-medium">
                {tag}
              </Badge>
            ))}
          </Stack>
        )}
        <Card.Title as="h3" className="fs-5 mb-2">
          {title}
        </Card.Title>
        <Card.Text className="text-secondary flex-grow-1">{description}</Card.Text>
      </Card.Body>

      <Card.Footer className="bg-white border-0 px-4 pb-4 pt-0 d-flex justify-content-between align-items-center gap-2">
        <Link href={`/projects/${id}`} className="d-inline-flex align-items-center gap-1 fw-semibold text-decoration-none text-nowrap">
          Смотреть кейс
          <Icon src="/assets/icon-arrow-right.svg" size={16} />
        </Link>
        {meta && <small className="text-secondary text-nowrap">{meta}</small>}
      </Card.Footer>
    </Card>
  );
}

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.string,
};

export default ProjectCard;

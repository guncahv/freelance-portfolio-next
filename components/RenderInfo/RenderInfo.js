import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

/**
 * Плашка со стратегией рендеринга страницы и временем генерации HTML.
 * SSR — время меняется при каждом обновлении страницы,
 * SSG — время сборки (npm run build) одинаково при всех запросах.
 */
const TEXT = {
  SSR: 'Server-Side Rendering · HTML сгенерирован на сервере при запросе',
  SSG: 'Static Site Generation · HTML сгенерирован во время сборки',
};

function RenderInfo({ mode, time }) {
  return (
    <Alert variant={mode === 'SSR' ? 'primary' : 'success'} className="d-flex flex-wrap align-items-center gap-2 py-2 px-3 mb-0 small">
      <strong className="font-monospace">{mode}</strong>
      <span>{TEXT[mode]}:</span>
      <time className="font-monospace fw-semibold" data-render-time>
        {time}
      </time>
    </Alert>
  );
}

RenderInfo.propTypes = {
  mode: PropTypes.oneOf(['SSR', 'SSG']).isRequired,
  time: PropTypes.string.isRequired,
};

export default RenderInfo;

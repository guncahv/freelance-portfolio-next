import PropTypes from 'prop-types';

/**
 * Иконка из SVG-ассета ЛР №17. Цвет берётся из currentColor родителя,
 * поэтому одна и та же иконка подходит для кнопок, меню и поля ввода.
 */
function Icon({ src, size = 20, label = '' }) {
  return (
    <span
      className="icon"
      // JSON.stringify экранирует кавычки, если SVG встроен как data-URL
      style={{ '--icon': `url(${JSON.stringify(src)})`, width: size, height: size }}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
    />
  );
}

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.number,
  label: PropTypes.string,
};

export default Icon;

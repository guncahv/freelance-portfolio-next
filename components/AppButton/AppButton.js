import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Icon from '../Icon/Icon';

/**
 * Кнопка дизайн-системы на базе <Button> из React Bootstrap.
 * Кастомная кнопка ЛР №19 заменена готовым компонентом библиотеки;
 * API (label, onClick, variant, icon, type, disabled) сохранён — данные по-прежнему приходят через props.
 */
const VARIANTS = {
  primary: 'primary',
  secondary: 'outline-primary',
};

function AppButton({ label, onClick, variant = 'primary', icon = null, type = 'button', disabled = false, size, className = '' }) {
  return (
    <Button
      type={type}
      variant={VARIANTS[variant]}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={`d-inline-flex align-items-center justify-content-center gap-2 fw-semibold ${className}`}
    >
      <span>{label}</span>
      {icon && <Icon src={icon} size={18} />}
    </Button>
  );
}

AppButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  icon: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'lg']),
  className: PropTypes.string,
};

export default AppButton;

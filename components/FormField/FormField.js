import { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Icon from '../Icon/Icon';

/**
 * Поле ввода на базе Form.Group / InputGroup / Form.Control из React Bootstrap.
 * Состояния Default / Focused / Error из ЛР №17 реализуют стили Bootstrap
 * (:focus и isInvalid + Form.Control.Feedback). Значение хранится в локальном
 * состоянии и передаётся родителю через onValueChange, как в ЛР №19.
 */
function FormField({ id, label, placeholder = '', type = 'text', icon = null, helperText = '', error = '', onValueChange }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onValueChange?.(event.target.value);
  };

  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label className="fw-semibold small">{label}</Form.Label>
      <InputGroup hasValidation size="lg">
        {icon && (
          <InputGroup.Text className="bg-white text-secondary">
            <Icon src={icon} />
          </InputGroup.Text>
        )}
        <Form.Control
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          isInvalid={Boolean(error)}
          aria-describedby={`${id}-hint`}
        />
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      </InputGroup>
      {!error && helperText && (
        <Form.Text id={`${id}-hint`} muted>
          {helperText}
        </Form.Text>
      )}
    </Form.Group>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'tel']),
  icon: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default FormField;

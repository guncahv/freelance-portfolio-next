import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import FormField from '../FormField/FormField';
import AppButton from '../AppButton/AppButton';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Форма обратной связи. HTML формы приходит с сервера, а обработчики
 * подключаются в браузере после гидратации — интерактивность из ЛР №19–23 сохранена.
 */
function ContactForm() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [sent, setSent] = useState(false);

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError('');
    setSent(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setEmailError('Введите корректный email, например name@example.com');
      return;
    }
    setSent(true);
  };

  return (
    <>
      <Form noValidate onSubmit={handleSubmit}>
        <FormField
          id="email"
          type="email"
          label="Email для связи"
          placeholder="name@example.com"
          icon="/assets/icon-contact.svg"
          helperText="Отвечу в течение рабочего дня"
          error={emailError}
          onValueChange={handleEmailChange}
        />
        <div className="d-grid d-sm-block">
          <AppButton label="Отправить" type="submit" icon="/assets/icon-arrow-right.svg" size="lg" />
        </div>
      </Form>
      {sent && (
        <Alert variant="success" className="mt-3 mb-0" dismissible onClose={() => setSent(false)}>
          Спасибо! Заявка с адреса <strong>{email}</strong> отправлена.
        </Alert>
      )}
    </>
  );
}

export default ContactForm;

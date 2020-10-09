import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

/* O getValidationErrors pinça de dentro objeto err apenas o error.message */
export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });
  return validationErrors;
}

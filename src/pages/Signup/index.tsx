import React, { useCallback, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { AuthContext } from '../../context/AuthContext';
import { Container, Content, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';
import LogoImg from '../../assets/logo.svg';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  // Não será signIn, obviamente será signUp
  const { signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      // Yup - Biblioteca de validações.
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Campo obrigatório'),
          email: Yup.string()
            .required('Campo obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Campo obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        // Não será signIn, obviamente será signUp
        signIn({
          name: data.name,
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    },
    [signIn], // Não será signIn, obviamente será signUp
  );

  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="Gobarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Link to="/">
          <FiArrowLeft />
          Voltar para o login
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;

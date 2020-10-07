import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Container, Content, Background } from './styles';
import Input from '../../components/input';
import Button from '../../components/button';
import LogoImg from '../../assets/logo.svg';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={LogoImg} alt="Gobarber" />
      <form>
        <h1>Faça seu login</h1>
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        <Link to="forgot">Esqueci minha senha</Link>
      </form>
      <Link to="/signup">
        Criar conta
        <FiLogIn />
      </Link>
    </Content>
    <Background />
  </Container>
);

export default SignIn;

import React from 'react';
import { useAuth } from '../../hooks/Auth';
import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <>
      <Container>Hello world, this is Dashboard</Container>
      <button onClick={() => signOut()} type="button">
        Voltar
      </button>
    </>
  );
};

export default Dashboard;

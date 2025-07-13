import React, { useState } from 'react';
import styled from 'styled-components';
import { login, LoginData } from '../api/auth';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a1a;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const LoginCard = styled.div`
  background: #2d2d2d;
  border-radius: 8px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
    max-width: 100%;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: #b0b0b0;
  font-size: 0.9rem;
  font-weight: 500;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #404040;
  border-radius: 4px;
  background: #1a1a1a;
  color: #ffffff;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007acc;
  }

  &::placeholder {
    color: #666666;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #007acc;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #005a9e;
  }

  &:disabled {
    background: #404040;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-top: 0.8rem;
  }
`;

const SwitchText = styled.p`
  color: #b0b0b0;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    margin-top: 1.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-top: 1rem;
  }
`;

const SwitchLink = styled.span`
  color: #007acc;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #005a9e;
  }
`;

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Limpar erro quando o usuário digita
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Entrar no Nexus</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Sua senha"
              required
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SwitchText>
          Não tem uma conta?{' '}
          <SwitchLink onClick={onSwitchToRegister}>
            Criar conta
          </SwitchLink>
        </SwitchText>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 
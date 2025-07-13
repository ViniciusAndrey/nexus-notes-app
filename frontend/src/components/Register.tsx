import React, { useState } from 'react';
import styled from 'styled-components';
import { register, RegisterData } from '../api/auth';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a1a;
  padding: 2rem;
`;

const RegisterCard = styled.div`
  background: #2d2d2d;
  border-radius: 8px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h1`
  color: #ffffff;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 1rem;
`;

const SwitchText = styled.p`
  color: #b0b0b0;
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.9rem;
`;

const SwitchLink = styled.span`
  color: #007acc;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #005a9e;
  }
`;

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
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

    // Validação básica
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
      onRegister();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Criar Conta</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Seu nome completo"
              required
            />
          </FormGroup>
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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SwitchText>
          Já tem uma conta?{' '}
          <SwitchLink onClick={onSwitchToLogin}>
            Fazer login
          </SwitchLink>
        </SwitchText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register; 
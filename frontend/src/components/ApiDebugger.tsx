import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { checkApiHealth, apiConfig } from '../config/api';

interface ApiDebuggerProps {
  isVisible?: boolean;
}

const DebugContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #2d2d2d;
  border: 1px solid #404040;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  z-index: 9999;
  display: ${props => props.isVisible ? 'block' : 'none'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    bottom: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`;

const DebugTitle = styled.h3`
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

const DebugItem = styled.div`
  color: #b0b0b0;
  font-size: 0.8rem;
  margin-bottom: 0.3rem;
  
  strong {
    color: #ffffff;
  }
`;

const StatusIndicator = styled.div<{ isHealthy: boolean }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.isHealthy ? '#4caf50' : '#f44336'};
  margin-right: 0.5rem;
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ApiDebugger: React.FC<ApiDebuggerProps> = ({ isVisible = false }) => {
  const [apiHealth, setApiHealth] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const isHealthy = await checkApiHealth();
      setApiHealth(isHealthy);
      setLastCheck(new Date());
    } catch (error) {
      setApiHealth(false);
      setLastCheck(new Date());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isVisible) {
      checkHealth();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <DebugContainer isVisible={isVisible}>
      <DebugTitle>🔧 Debug da API</DebugTitle>
      
      <DebugItem>
        <strong>Ambiente:</strong> {process.env.NODE_ENV}
      </DebugItem>
      
      <DebugItem>
        <strong>Base URL:</strong> {apiConfig.baseURL}
      </DebugItem>
      
      <DebugItem>
        <strong>Timeout:</strong> {apiConfig.timeout}ms
      </DebugItem>
      
      <DebugItem>
        <strong>Status:</strong>
        <StatusIndicator isHealthy={apiHealth === true} />
        {apiHealth === null ? 'Não verificado' : 
         apiHealth ? 'Conectado' : 'Desconectado'}
      </DebugItem>
      
      {lastCheck && (
        <DebugItem>
          <strong>Última verificação:</strong> {lastCheck.toLocaleTimeString()}
        </DebugItem>
      )}
      
      <TestButton onClick={checkHealth} disabled={isLoading}>
        {isLoading ? 'Testando...' : 'Testar Conexão'}
      </TestButton>
      
      {apiHealth === false && (
        <DebugItem style={{ color: '#ff6b6b', marginTop: '0.5rem' }}>
          <strong>Problemas detectados:</strong>
          <br />
          • Verifique se o backend está rodando
          <br />
          • Confirme a URL da API
          <br />
          • Verifique CORS e firewall
        </DebugItem>
      )}
    </DebugContainer>
  );
};

export default ApiDebugger; 
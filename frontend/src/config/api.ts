// Configuração da API para diferentes ambientes
interface ApiConfig {
  baseURL: string;
  timeout: number;
}

// Detectar o ambiente
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Configurações por ambiente
const configs: Record<string, ApiConfig> = {
  development: {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 10000,
  },
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://seu-backend-deploy.com',
    timeout: 15000,
  },
  test: {
    baseURL: 'http://localhost:3001',
    timeout: 5000,
  },
};

// Selecionar configuração baseada no ambiente
const getCurrentConfig = (): ApiConfig => {
  if (isDevelopment) return configs.development;
  if (isProduction) return configs.production;
  return configs.test;
};

export const apiConfig = getCurrentConfig();

// Log da configuração (apenas em desenvolvimento)
if (isDevelopment) {
  console.log('🔧 Configuração da API:', {
    environment: process.env.NODE_ENV,
    baseURL: apiConfig.baseURL,
    timeout: apiConfig.timeout,
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  });
}

// Função para fazer requisições com timeout
export const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout: number = apiConfig.timeout
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Timeout: A requisição demorou mais de ${timeout}ms`);
    }
    throw error;
  }
};

// Função para construir URLs da API
export const buildApiUrl = (endpoint: string): string => {
  const baseURL = apiConfig.baseURL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.replace(/^\//, ''); // Remove leading slash
  return `${baseURL}/${cleanEndpoint}`;
};

// Função para verificar se a API está acessível
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const healthUrl = buildApiUrl('/health');
    const response = await fetchWithTimeout(healthUrl, { method: 'GET' }, 5000);
    return response.ok;
  } catch (error) {
    console.error('❌ API não está acessível:', error);
    return false;
  }
}; 
import { buildApiUrl, fetchWithTimeout } from '../config/api';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Função para salvar token no localStorage
export const saveToken = (token: string) => {
  localStorage.setItem('nexus_token', token);
};

// Função para obter token do localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('nexus_token');
};

// Função para remover token do localStorage
export const removeToken = () => {
  localStorage.removeItem('nexus_token');
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// Função para obter headers com token
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const url = buildApiUrl('/users/login');

  try {
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      let errorMessage = 'Erro no login';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        console.error('❌ Erro ao parsear JSON:', e);
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    saveToken(result.token);
    return result;
  } catch (error) {
    console.error('❌ Erro no login:', error);
    throw error;
  }
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const url = buildApiUrl('/users/register');

  try {
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      let errorMessage = 'Erro no registro';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        console.error('❌ Erro ao parsear JSON:', e);
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    saveToken(result.token);
    return result;
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    throw error;
  }
};

export const logout = () => {
  removeToken();
};

export const getProfile = async (): Promise<{ user: User }> => {
  const url = buildApiUrl('/users/profile');

  try {
    const response = await fetchWithTimeout(url, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar perfil');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('❌ Erro ao buscar perfil:', error);
    throw error;
  }
}; 

export const googleLogin = async (idToken: string): Promise<AuthResponse> => {
  const url = buildApiUrl('/users/google-login');

  try {
    const response = await fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      
      let errorMessage = 'Erro no login com Google';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorMessage;
      } catch (e) {
        console.error('❌ Erro ao parsear JSON:', e);
      }
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    saveToken(result.token);
    return result;
  } catch (error) {
    console.error('❌ Erro no login com Google:', error);
    throw error;
  }
}; 
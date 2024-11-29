import axios from 'axios';

const baseUrl = 'http://localhost:3001/webmob/api/auth';

class LoginService {
  async login(email: string, password: string): Promise<string|null> {
    try {
      const response = await axios.post(`${baseUrl}/login`, { email, password });
      const token = response.data.token;

      console.log('Token :', token);
      return token
    } catch (error: any) {
      console.error('Erro ao fazer login:', error.response?.data?.message || error.message);
      return null
    }
  }
}

export default new LoginService();

import axios from 'axios';
import { API_BASE_URL } from '../config/api';

interface CalculateRequest {
  expression: string;
}

interface CalculateResponse {
  answer: string;
}

export const calculateRequest = async (
  request: CalculateRequest
): Promise<CalculateResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calculate`, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return { answer: '' };
  }
};

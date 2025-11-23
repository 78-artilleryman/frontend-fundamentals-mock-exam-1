import { http } from 'tosslib';
import { Product } from '.';

export const getProducts = async (): Promise<Product[]> => {
  const response = await http.get<Product[]>('/api/savings-products');
  return response;
};

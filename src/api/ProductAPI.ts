
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (
  token: string
) => {
  const response = await fetch(`${API_URL}/products/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const getProduct = async (token: string, productId: number) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const createProduct = async (token:string, product: any) => {
  const response = await fetch(`${API_URL}/products/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product) // categories is not implemented yet
  });
  return response.json();
}

export const updateProduct = async (token:string, product: any, productId: string) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

export const deleteProduct = async (token:string, productId: number) =>
  fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });




const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (
  page: number,
  size: number,
) => {
  const response = await fetch(`${API_URL}/products/?page=${page-1}&size=${size}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const getProduct = async (productId: number) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const createProduct = async (product: any) => {
  const response = await fetch(`${API_URL}/products/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...product, categories: [1]}) // categories is not implemented yet
  });
  return response.json();
}

export const updateProduct = async (product: any, productId: string) => {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product)
  });
  return response.json();
}

export const deleteProduct = async (productId: number) =>
  fetch(`${API_URL}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });



const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = async (token:string) => {
  const response = await fetch(`${API_URL}/categories/`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const createCategory = async (token:string, category: any) => {
  const response = await fetch(`${API_URL}/categories/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category)
  });
  return response.json();
}


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async (
  page: number,
  size: number,
) => {
  const response = await fetch(`${API_URL}/product/?page=${page-1}&size=${size}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}


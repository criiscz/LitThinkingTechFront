

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getClients = async (token: string) => {
  const response = await fetch(`${API_URL}/clients/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const createClient = async (token: string, client: any) => {
  const response = await fetch(`${API_URL}/clients/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(client),
  });
  return response.json();
}

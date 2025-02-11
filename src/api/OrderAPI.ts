const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getOrders = async (token:string) => {
  const response = await fetch(`${API_URL}/orders/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const getOrder = async (token:string, orderId: number) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const createOrder = async (token: string, order: any) => {
  console.log('order', order);
  const response = await fetch(`${API_URL}/orders/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order)
  });
  return response.json();
}

export const updateOrder = async (order: any, orderId: string) => {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',

    },
    body: JSON.stringify(order)
  });
  return response.json();
}

export const deleteOrder = async (token:string, orderId: number) =>
  fetch(`${API_URL}/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

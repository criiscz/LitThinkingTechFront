
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async (
  token: string
) => {
  const response = await fetch(`${API_URL}/company/all`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const getCompany = async (token:string, companyId: number) => {
  const response = await fetch(`${API_URL}/company/${companyId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}

export const createCompany = async (token:string, company: any) => {
  const response = await fetch(`${API_URL}/company/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(company)
  });
  return response.json();
}

export const updateCompany = async (token:string, company: any, companyId: string) => {
  const response = await fetch(`${API_URL}/company/${companyId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(company)
  });
  return response.json();
}

export const deleteCompany = async (token:string, companyId: number) =>
  fetch(`${API_URL}/company/${companyId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

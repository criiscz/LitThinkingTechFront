
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getCompanies = async (
  page: number,
  size: number,
) => {
  const response = await fetch(`${API_URL}/company/?page=${page-1}&size=${size}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const getCompany = async (companyId: number) => {
  const response = await fetch(`${API_URL}/company/${companyId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}

export const createCompany = async (company: any) => {
  const response = await fetch(`${API_URL}/company/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company)
  });
  return response.json();
}

export const updateCompany = async (company: any, companyId: string) => {
  const response = await fetch(`${API_URL}/company/${companyId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(company)
  });
  return response.json();
}

export const deleteCompany = async (companyId: number) =>
  fetch(`${API_URL}/company/${companyId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

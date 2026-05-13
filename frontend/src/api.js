const BASE_URL = 'http://localhost:8000';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  getStudents: ()            => request('/students'),
  getStudent:  (id)          => request(`/students/${id}`),
  createStudent: (data)      => request('/students', { method: 'POST', body: JSON.stringify(data) }),
  updateStudent: (id, data)  => request(`/students/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStudent: (id)        => request(`/students/${id}`, { method: 'DELETE' }),
  filterStudents: (params)   => {
    const q = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined))
    );
    return request(`/filter?${q}`);
  },
};

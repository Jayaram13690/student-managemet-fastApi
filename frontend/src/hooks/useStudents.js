import { useState, useEffect } from 'react';
import { api } from '../api';

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getStudents();
      setStudents(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const addStudent = async (data) => {
    const created = await api.createStudent(data);
    setStudents(prev => [created, ...prev]);
    return created;
  };

  const editStudent = async (id, data) => {
    const updated = await api.updateStudent(id, data);
    setStudents(prev => prev.map(s => s.id === id ? updated : s));
    return updated;
  };

  const removeStudent = async (id) => {
    await api.deleteStudent(id);
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return { students, loading, error, refetch: load, addStudent, editStudent, removeStudent };
}

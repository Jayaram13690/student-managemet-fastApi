import { useState, useMemo } from 'react';
import { useStudents }     from './hooks/useStudents';
import { useToast }        from './hooks/useToast';
import { StudentCard }     from './components/StudentCard';
import { StudentModal }    from './components/StudentModal';
import { ConfirmDialog }   from './components/ConfirmDialog';
import { SkeletonGrid }    from './components/SkeletonGrid';
import { ToastContainer }  from './components/ToastContainer';
import {
  IconSearch, IconPlus, IconRefresh, IconWarning, IconFilter,
} from './components/Icons';

export default function App() {
  const { students, loading, error, refetch, addStudent, editStudent, removeStudent } = useStudents();
  const { toasts, show: toast } = useToast();

  // ── UI State ──────────────────────────────────────────────
  const [search,     setSearch]     = useState('');
  const [courseFilter, setCourse]   = useState('');
  const [minAgeFilter, setMinAge]   = useState('');
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDelete]   = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting,   setDeleting]   = useState(false);

  // ── Derived ───────────────────────────────────────────────
  const courses = useMemo(() => [...new Set(students.map(s => s.course))].sort(), [students]);

  const visible = useMemo(() => {
    let list = students;
    if (search)      list = list.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase()));
    if (courseFilter) list = list.filter(s => s.course === courseFilter);
    if (minAgeFilter) list = list.filter(s => s.age >= +minAgeFilter);
    return list;
  }, [students, search, courseFilter, minAgeFilter]);

  const avgAge = students.length
    ? Math.round(students.reduce((a, s) => a + s.age, 0) / students.length)
    : 0;

  // ── Handlers ──────────────────────────────────────────────
  const openAdd  = ()  => { setEditTarget(null); setModalOpen(true); };
  const openEdit = (s) => { setEditTarget(s);    setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setEditTarget(null); };

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      if (editTarget) {
        await editStudent(editTarget.id, data);
        toast('Student updated successfully', 'success');
      } else {
        await addStudent(data);
        toast('Student added successfully', 'success');
      }
      closeModal();
    } catch (e) {
      toast(e.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await removeStudent(deleteTarget.id);
      toast(`${deleteTarget.name} removed`, 'success');
      setDelete(null);
    } catch (e) {
      toast(e.message, 'error');
    } finally {
      setDeleting(false);
    }
  };

  const handleRefresh = async () => {
    await refetch();
    toast('Data refreshed', 'info');
  };

  const clearFilters = () => { setSearch(''); setCourse(''); setMinAge(''); };

  // ── Render ────────────────────────────────────────────────
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-badge">🎓 FastAPI + React</div>
        <h1>Student Management</h1>
        <p>Manage your students — powered by a local FastAPI backend</p>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="stat-card">
          <span className="stat-label">Total Students</span>
          <span className="stat-value">{loading ? '—' : students.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Shown</span>
          <span className="stat-value">{loading ? '—' : visible.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Avg Age</span>
          <span className="stat-value">{loading ? '—' : avgAge || '—'}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Courses</span>
          <span className="stat-value">{loading ? '—' : courses.length}</span>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="error-banner" role="alert">
          <IconWarning />
          <span>Failed to load students: {error}</span>
          <button onClick={() => refetch()} title="Retry">↻</button>
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="search-wrap">
          <IconSearch />
          <input
            id="student-search"
            className="search-input"
            placeholder="Search by name or course…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search students"
          />
        </div>

        <select
          id="course-filter"
          className="filter-select"
          value={courseFilter}
          onChange={e => setCourse(e.target.value)}
          aria-label="Filter by course"
        >
          <option value="">All Courses</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          id="age-filter"
          className="filter-select"
          value={minAgeFilter}
          onChange={e => setMinAge(e.target.value)}
          aria-label="Filter by minimum age"
        >
          <option value="">Any Age</option>
          {[18, 20, 22, 25, 30].map(a => (
            <option key={a} value={a}>Age ≥ {a}</option>
          ))}
        </select>

        {(search || courseFilter || minAgeFilter) && (
          <button id="clear-filters-btn" className="btn btn-ghost" onClick={clearFilters}>
            <IconFilter /> Clear
          </button>
        )}

        <button id="refresh-btn" className="btn btn-ghost" onClick={handleRefresh} disabled={loading} aria-label="Refresh data">
          <IconRefresh /> Refresh
        </button>

        <button id="add-student-btn" className="btn btn-primary" onClick={openAdd}>
          <IconPlus /> Add Student
        </button>
      </div>

      {/* Student Grid */}
      <main>
        <div className="student-grid">
          {loading ? (
            <SkeletonGrid count={6} />
          ) : !error && visible.length === 0 ? (
            <div className="state-box">
              <span className="state-icon">{students.length ? '🔍' : '🎓'}</span>
              <h3>{students.length ? 'No students match your filters' : 'No students yet'}</h3>
              <p>
                {students.length
                  ? 'Try adjusting your search or filters.'
                  : 'Click "Add Student" to get started.'}
              </p>
            </div>
          ) : (
            visible.map(s => (
              <StudentCard
                key={s.id}
                student={s}
                onEdit={openEdit}
                onDelete={setDelete}
              />
            ))
          )}
        </div>
      </main>

      {/* Modals */}
      {modalOpen && (
        <StudentModal
          student={editTarget}
          onClose={closeModal}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
      {deleteTarget && (
        <ConfirmDialog
          studentName={deleteTarget.name}
          onConfirm={handleDelete}
          onCancel={() => setDelete(null)}
          loading={deleting}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} />
    </div>
  );
}

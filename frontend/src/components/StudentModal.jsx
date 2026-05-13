import { useState, useEffect } from 'react';
import { IconX } from './Icons';

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.age || isNaN(form.age) || +form.age < 1 || +form.age > 120)
    errors.age = 'Enter a valid age (1–120)';
  if (!form.course.trim()) errors.course = 'Course is required';
  return errors;
}

const EMPTY = { name: '', age: '', course: '' };

export function StudentModal({ student, onClose, onSubmit, submitting }) {
  const isEdit = !!student;
  const [form, setForm]     = useState(isEdit ? { name: student.name, age: String(student.age), course: student.course } : EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    await onSubmit({ name: form.name.trim(), age: parseInt(form.age, 10), course: form.course.trim() });
  };

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <h2>
          {isEdit ? '✏️ Edit Student' : '🎓 Add New Student'}
          <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }} onClick={onClose} aria-label="Close">
            <IconX />
          </button>
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="modal-name">Full Name</label>
            <input
              id="modal-name"
              className={`form-input${errors.name ? ' error' : ''}`}
              placeholder="e.g. Jayaram M"
              value={form.name}
              onChange={set('name')}
              autoFocus
            />
            {errors.name && <p className="form-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="modal-age">Age</label>
            <input
              id="modal-age"
              type="number"
              min="1" max="120"
              className={`form-input${errors.age ? ' error' : ''}`}
              placeholder="e.g. 21"
              value={form.age}
              onChange={set('age')}
            />
            {errors.age && <p className="form-error">{errors.age}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="modal-course">Course</label>
            <input
              id="modal-course"
              className={`form-input${errors.course ? ' error' : ''}`}
              placeholder="e.g. Computer Science"
              value={form.course}
              onChange={set('course')}
            />
            {errors.course && <p className="form-error">{errors.course}</p>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button id="modal-submit-btn" type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

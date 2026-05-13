import { IconEdit, IconTrash, IconUser, IconBook } from './Icons';

export function StudentCard({ student, onEdit, onDelete }) {
  return (
    <article className="student-card" aria-label={`Student: ${student.name}`}>
      <p className="card-id">ID #{student.id}</p>
      <h3 className="card-name">{student.name}</h3>
      <div className="card-meta">
        <span className="badge badge-course">
          <IconBook /> {student.course}
        </span>
        <span className="badge badge-age">
          <IconUser /> Age {student.age}
        </span>
      </div>
      <div className="card-actions">
        <button
          id={`edit-student-${student.id}`}
          className="btn btn-edit btn-sm"
          onClick={() => onEdit(student)}
          aria-label={`Edit ${student.name}`}
        >
          <IconEdit /> Edit
        </button>
        <button
          id={`delete-student-${student.id}`}
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(student)}
          aria-label={`Delete ${student.name}`}
        >
          <IconTrash /> Delete
        </button>
      </div>
    </article>
  );
}

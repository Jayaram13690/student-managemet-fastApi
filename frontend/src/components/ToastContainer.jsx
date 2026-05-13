import { IconCheck, IconX, IconInfo, IconWarning } from './Icons';

const icons = {
  success: <IconCheck />,
  error:   <IconX />,
  info:    <IconInfo />,
  warning: <IconWarning />,
};

export function ToastContainer({ toasts }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          {icons[t.type] || icons.info}
          {t.message}
        </div>
      ))}
    </div>
  );
}

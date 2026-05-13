export function SkeletonGrid({ count = 6 }) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="skeleton-card" style={{ animationDelay: `${i * 60}ms` }}>
          <div className="skeleton sk-line" style={{ width: '30%', marginBottom: '.8rem' }} />
          <div className="skeleton sk-line" style={{ width: '65%', height: '18px', marginBottom: '1rem' }} />
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <div className="skeleton sk-line" style={{ width: '90px', height: '26px', borderRadius: '99px' }} />
            <div className="skeleton sk-line" style={{ width: '70px', height: '26px', borderRadius: '99px' }} />
          </div>
          <div className="skeleton sk-line" style={{ width: '100%', height: '1px', margin: '.85rem 0' }} />
          <div style={{ display: 'flex', gap: '.45rem' }}>
            <div className="skeleton sk-line" style={{ width: '70px', height: '30px', borderRadius: '7px' }} />
            <div className="skeleton sk-line" style={{ width: '70px', height: '30px', borderRadius: '7px' }} />
          </div>
        </div>
      ))}
    </>
  );
}

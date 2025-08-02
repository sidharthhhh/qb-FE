import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = [
    { id: 1, name: 'Smart Switch Board' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
    { id: 4, name: 'Category 4' },
    { id: 5, name: 'Category 5' },
    { id: 6, name: 'Category 6' },
  ];

  const handleSelect = (categoryId: number) => {
    if (categoryId === 1) {
      navigate(`/categories/${categoryId}`);
    } else {
      alert("This category doesn't support Smart Switch Quotation yet.");
    }
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
        Dashboard
      </h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            onMouseEnter={() => setHoveredId(cat.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              cursor: 'pointer',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '1rem',
              boxShadow: hoveredId === cat.id
                ? '0 12px 24px rgba(0,0,0,0.15)'
                : '0 6px 12px rgba(0,0,0,0.08)',
              transform: hoveredId === cat.id ? 'translateY(-4px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              borderLeft: hoveredId === cat.id ? '6px solid #3b82f6' : '6px solid transparent'
            }}
          >
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              color: '#1f2937'
            }}>
              {cat.name}
            </h2>
            <p style={{ color: '#6b7280' }}>Click to view details</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

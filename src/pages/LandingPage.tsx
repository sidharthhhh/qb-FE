import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #4f46e5, #3b82f6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}
      >
        Welcome to Quotation Builder
      </h1>
      <p
        style={{
          fontSize: '1.25rem',
          maxWidth: '600px',
          marginBottom: '2rem',
        }}
      >
        Create customized quotations for Smart Switch Boards and more with ease.
      </p>

      <button
        onClick={handleGetStarted}
        style={{
          background: 'white',
          color: '#3b82f6',
          fontSize: '1rem',
          padding: '0.75rem 2rem',
          borderRadius: '0.5rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'transform 0.2s ease, background-color 0.3s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const userData = response.data.user;
      login(userData);
      navigate('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      padding: '1rem'
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          <div style={{
            background: 'linear-gradient(to right, #2563eb, #4f46e5)',
            padding: '1.5rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Quotation Builder</h1>
            <p style={{ marginTop: '0.5rem', color: '#bfdbfe' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            {error && (
              <div style={{
                backgroundColor: '#fef2f2',
                color: '#b91c1c',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  transition: '0.3s',
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #d1d5db',
                  outline: 'none',
                  transition: '0.3s',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px' }} />
                Remember me
              </label>
              <a href="#" style={{ fontSize: '0.875rem', color: '#2563eb', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #2563eb, #4f46e5)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                transition: '0.3s',
              }}
            >
              Sign In
            </button>
          </form>

          <div style={{
            padding: '1rem 2rem',
            backgroundColor: '#f9fafb',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Don't have an account? <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

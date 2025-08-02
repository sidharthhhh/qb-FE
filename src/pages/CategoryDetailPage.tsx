import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CategoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [materials, setMaterials] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [powerSupplies, setPowerSupplies] = useState([]);
  const [accessories, setAccessories] = useState([]);

  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPowerSupply, setSelectedPowerSupply] = useState('');
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await api.get(`/categories/${id}/options`);
        setMaterials(res.data.materials);
        setSizes(res.data.sizes);
        setPowerSupplies(res.data.power_supplies);
        setAccessories(res.data.accessories);
      } catch (err) {
        console.error('Failed to fetch options:', err);
      }
    };
    fetchOptions();
  }, [id]);

  const handleAccessoryToggle = (accId: number) => {
    setSelectedAccessories(prev =>
      prev.includes(accId) ? prev.filter(id => id !== accId) : [...prev, accId]
    );
  };

  const handlePreview = () => {
    navigate('/preview', {
      state: {
        category_id: id,
        material_id: selectedMaterial,
        size_id: selectedSize,
        power_supply_id: selectedPowerSupply,
        accessory_ids: selectedAccessories,
      }
    });
  };

  return (
    <div style={{ padding: '2rem', background: '#f9fafb', minHeight: '100vh' }}>
      <div style={{
        maxWidth: '640px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        transition: 'box-shadow 0.3s ease',
      }}>
        {id === '1' && (
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1f2937' }}>
            Smart Switch Board
          </h2>
        )}

        {/* Material */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Material:
          </label>
          <select
            value={selectedMaterial}
            onChange={e => setSelectedMaterial(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          >
            <option value="">-- Select Material --</option>
            {materials.map((m: any) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Size */}
        {id === '1' && (
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
              Size:
            </label>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '1rem'
              }}
            >
              <option value="">-- Select Size --</option>
              {sizes.map((s: any) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Power Supply */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Power Supply:
          </label>
          <select
            value={selectedPowerSupply}
            onChange={e => setSelectedPowerSupply(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          >
            <option value="">-- Select Power Supply --</option>
            {powerSupplies.map((ps: any) => (
              <option key={ps.id} value={ps.id}>{ps.name} - ₹{ps.price}</option>
            ))}
          </select>
        </div>

        {/* Accessories */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
            Accessories:
          </label>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem'
          }}>
            {accessories.map((acc: any) => (
              <label
                key={acc.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: '#f3f4f6',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedAccessories.includes(acc.id)}
                  onChange={() => handleAccessoryToggle(acc.id)}
                />
                <span>{acc.name} - ₹{acc.price}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Preview Button */}
        <button
          onClick={handlePreview}
          disabled={!selectedMaterial || !selectedPowerSupply || (id === '1' && !selectedSize)}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            opacity: (!selectedMaterial || !selectedPowerSupply || (id === '1' && !selectedSize)) ? 0.6 : 1,
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
          }}
          onMouseOver={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.3)';
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Preview Quotation
        </button>
      </div>
    </div>
  );
};

export default CategoryDetailPage;

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await api.post('/quotation/preview', {
          material_id: data.material_id,
          size_id: data.size_id,
          power_supply_id: data.power_supply_id,
          accessory_ids: data.accessory_ids || [],
        });
        setPreviewData(res.data);
      } catch (err) {
        console.error('Failed to fetch preview:', err);
      } finally {
        setLoading(false);
      }
    };

    if (data) fetchPreview();
  }, [data]);

  const handleSave = async () => {
    try {
      const payload = {
        user_id: 1,
        category_id: data.category_id,
        material_id: data.material_id,
        size_id: data.size_id,
        power_supply_id: data.power_supply_id,
        accessory_ids: data.accessory_ids || [],
        material_price: previewData.material_price,
        power_supply_price: previewData.power_supply_price,
        accessory_total: previewData.accessory_total,
        grand_total: previewData.grand_total
      };

      const res = await api.post('/quotation/save', payload);
      alert(`Quotation saved with ID: ${res.data.quotation_id}`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save quotation');
    }
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Quotation Summary', 14, 20);

    doc.setFontSize(12);
    doc.text(`Material Price: ₹${previewData.material_price}`, 14, 35);
    doc.text(`Power Supply Price: ₹${previewData.power_supply_price}`, 14, 43);
    doc.text(`Accessory Total: ₹${previewData.accessory_total}`, 14, 51);
    if (data.size_id) doc.text(`Selected Size ID: ${data.size_id}`, 14, 59);

    autoTable(doc, {
      startY: 70,
      head: [['Accessory', 'Price']],
      body: previewData.accessories.map((acc: any) => [acc.name, `₹${acc.price}`]),
    });

    doc.setFontSize(14);
    doc.text(`Grand Total: ₹${previewData.grand_total}`, 14, doc.lastAutoTable.finalY + 20);

    doc.save('quotation.pdf');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'
      }}>
        <p style={{ fontSize: '1.25rem', color: '#4B5563' }}>Loading preview...</p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#F9FAFB',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
        color: '#1F2937'
      }}>
        Quotation Preview
      </h2>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
      }}>
        <p><strong>Material Price:</strong> ₹{previewData.material_price}</p>
        <p><strong>Power Supply Price:</strong> ₹{previewData.power_supply_price}</p>
        <p><strong>Accessory Total:</strong> ₹{previewData.accessory_total}</p>
        {data.size_id && (
          <p><strong>Selected Size ID:</strong> {data.size_id}</p>
        )}

        <div style={{ marginTop: '1rem' }}>
          <strong>Accessories:</strong>
          <ul style={{ marginLeft: '1.25rem', listStyleType: 'disc', marginTop: '0.5rem' }}>
            {previewData.accessories.map((acc: any) => (
              <li key={acc.id}>{acc.name} - ₹{acc.price}</li>
            ))}
          </ul>
        </div>

        <hr style={{ margin: '1rem 0' }} />
        <p style={{ fontSize: '1.25rem', fontWeight: 600, color: '#10B981' }}>
          Grand Total: ₹{previewData.grand_total}
        </p>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => navigate(-1)}
          style={buttonStyle('#6B7280')}
        >
          Back
        </button>

        <button
          onClick={handleDownload}
          style={buttonStyle('#2563EB')}
        >
          Download PDF
        </button>

        <button
          onClick={handleSave}
          style={buttonStyle('#059669')}
        >
          Save Quotation
        </button>
      </div>
    </div>
  );
};

const buttonStyle = (bgColor: string): React.CSSProperties => ({
  padding: '0.75rem 1.5rem',
  backgroundColor: bgColor,
  color: 'white',
  borderRadius: '0.5rem',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  flexGrow: 1,
  textAlign: 'center'
});

export default PreviewPage;

import React from 'react';
import { useData } from '../data/useData';

const AlignmentMatrix = () => {
  const { data, loading } = useData();

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="page-title">Tour Alignment Matrix</h1>
      <p className="page-subtitle">Company-wide transparency on tour status</p>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Tour</th>
              <th>Travel Month</th>
              <th>Marketing</th>
              <th>Sales</th>
              <th>Operations</th>
              <th>Finance</th>
            </tr>
          </thead>
          <tbody>
            {data.tours.map(tour => (
              <tr key={tour.id}>
                <td style={{ fontWeight: 600 }}>{tour.name}</td>
                <td>{tour.travelMonth}</td>
                <td>
                  <span className={`badge ${tour.alignment.marketing === 'Promote' ? 'primary' : 'monitor'}`}>
                    {tour.alignment.marketing}
                  </span>
                </td>
                <td>
                  <span className={`badge ${tour.alignment.sales === 'Upcoming' ? 'secondary' : 'monitor'}`}>
                    {tour.alignment.sales}
                  </span>
                </td>
                <td>
                  <span className="badge secondary">{tour.alignment.operations}</span>
                </td>
                <td style={{ color: 'var(--success-text)', fontWeight: 500 }}>{tour.alignment.finance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlignmentMatrix;

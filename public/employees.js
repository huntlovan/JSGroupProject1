// pages/employees.js
import { useState } from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/data/employee.json'); // Adjust for your local dev
  const data = await res.json();

  return {
    props: { employees: data.employees },
  };
}

export default function Employees({ employees }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBy, setFilterBy] = useState('name'); // Add flexibility later

  const filteredEmployees = employees.filter((employee) =>
    employee.name.includes(searchQuery) // Case-sensitive search
  );

  return (
    <div>
      <Header />
      <div style={{ padding: '20px', textAlign: 'center' }}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="🔍 Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            marginRight: '10px',
            fontSize: '16px',
            width: '300px',
          }}
        />
        <select
          onChange={(e) => setFilterBy(e.target.value)}
          value={filterBy}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value="name">Name ▼</option>
        </select>
      </div>

      {/* Card Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {filteredEmployees.map((employee) => (
          <div
            key={employee.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              width: '300px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <Image
              src={employee.photoUrl}
              alt={employee.name}
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />
            <h2>{employee.name}</h2>
            <p style={{ fontStyle: 'italic', color: '#666' }}>{employee.role}</p>
            <p>{employee.bio}</p>
            <p>
              <a href={`mailto:${employee.email}`} style={{ color: '#0070f3' }}>
                ✉️ {employee.email}
              </a>
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
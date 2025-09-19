import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <>
      <header style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 700 }}>
          <img src="/roomus-logo-full.png" alt="Roomus Logo" style={{ marginLeft: '8px', verticalAlign: 'middle', height: '36px' }} />
        </Link>
      </header>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </>
  );
}

import { useEffect, useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard.jsx';
import { searchRooms } from '../../../api/rooms';


const BUDGETS = ['€400-600', '€600-800', '€800-1000', '€1000-1200'];
const AMENITIES = ['wifi', 'washing_machine', 'dishwasher', 'balcony'];

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);      
  const [page, setPage] = useState(1);         
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);             
 
  const state = useMemo(() => ({
    city: searchParams.get('city') || '',
    budgetRange: searchParams.get('budgetRange') || '',
    roomType: searchParams.get('roomType') || '',
    amenities: (searchParams.get('amenities') || '').split(',').filter(Boolean),
    moveInDate: searchParams.get('moveInDate') || '',
    sort: searchParams.get('sort') || 'newest',
  }), [searchParams]);

 
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [state.city, state.budgetRange, state.roomType, state.amenities.join(','), state.moveInDate, state.sort]);

 
  const loadItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const response = await searchRooms({
      city: state.city,
      budgetRange: state.budgetRange,
      roomType: state.roomType,
      amenities: state.amenities,
      moveInDate: state.moveInDate,
      page,
      pageSize: 12,
      sort: state.sort,
    });

    setItems(prev => [...prev, ...response.items]);
    setHasMore(page * 12 < response.total);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) loadItems();
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current, state, loading]);

  
  function updateParam(k, v) {
    const next = new URLSearchParams(searchParams);
    if (!v || (Array.isArray(v) && v.length === 0)) next.delete(k);
    else next.set(k, Array.isArray(v) ? v.join(',') : v);
    next.set('page', '1'); // reset pagination on filter change
    setSearchParams(next);
  }

  return (
    <div className="layout">
      <aside className="filters">
        {/* --- Filters (same as before) --- */}
        <h2 className='font-bold'>Filters</h2>
        <label>
          City / neighborhood
          <input
            value={state.city}
            onChange={e => updateParam('city', e.target.value)}
            placeholder="e.g. De Pijp"
          />
        </label>

        <label>
          Budget range
          <select value={state.budgetRange} onChange={e => updateParam('budgetRange', e.target.value)}>
            <option value="">Any</option>
            {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label>
          Room type
          <select value={state.roomType} onChange={e => updateParam('roomType', e.target.value)}>
            <option value="">Any</option>
            <option value="private">Private</option>
            <option value="shared">Shared</option>
            <option value="studio">Studio</option>
          </select>
        </label>

        <fieldset className='border-1 p-3 rounded-2xl'>
          <legend className='p-2 font-semibold'>Amenities</legend>
          {AMENITIES.map(a => (
            <label key={a} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={state.amenities.includes(a)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...state.amenities, a]
                    : state.amenities.filter(x => x !== a);
                  updateParam('amenities', next);
                }}
              />
              {a}
            </label>
          ))}
        </fieldset>

        <label>
          Move-in date
          <input type="date" value={state.moveInDate} onChange={e => updateParam('moveInDate', e.target.value)} />
        </label>

        <label>
          Sort
          <select value={state.sort} onChange={e => updateParam('sort', e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </label>
      </aside>

      <section className="results">
        {items.length === 0 && loading && <div className="loading">Loading…</div>}
        {!loading && items.length === 0 && <div className="empty">No rooms match. Try widening your budget.</div>}

        <div className="grid">
          {items.map(room =>

          <RoomCard key={room.id} room={room} />
         )}

        </div>

        
        <div ref={loaderRef} className="py-8 text-gray-500 text-center">
          {loading ? "Loading more…" : !hasMore ? "No more rooms" : ""}
        </div>
      </section>
    </div>
  );
}

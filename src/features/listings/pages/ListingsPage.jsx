import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard.jsx';
import { searchRooms } from '../../../api/rooms';

const BUDGETS = ['€400-600','€600-800','€800-1000','€1000-1200'];
const AMENITIES = ['wifi', 'washing_machine', 'dishwasher', 'balcony'];

export default function ListingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ items: [], total: 0, page: 1, pageSize: 12 });
  const [loading, setLoading] = useState(false);

  const state = useMemo(() => ({
    city: searchParams.get('city') || '',
    budgetRange: searchParams.get('budgetRange') || '',
    roomType: searchParams.get('roomType') || '',
    amenities: (searchParams.get('amenities') || '').split(',').filter(Boolean),
    moveInDate: searchParams.get('moveInDate') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    sort: searchParams.get('sort') || 'newest',
  }), [searchParams]);

  useEffect(() => {
    setLoading(true);
    searchRooms({
      city: state.city,
      budgetRange: state.budgetRange,
      roomType: state.roomType,
      amenities: state.amenities,
      moveInDate: state.moveInDate,
      page: state.page,
      pageSize: 12,
      sort: state.sort,
    }).then(setData).finally(()=>setLoading(false));
  }, [state.city, state.budgetRange, state.roomType, state.amenities.join(','), state.moveInDate, state.page, state.sort]);

  function updateParam(k, v) {
    const next = new URLSearchParams(searchParams);
    if (!v || (Array.isArray(v) && v.length===0)) next.delete(k);
    else next.set(k, Array.isArray(v) ? v.join(',') : v);
    next.set('page','1'); // reset pagination on filter change
    setSearchParams(next);
  }

  return (
    <div className="layout">
      <aside className="filters">
        <h2 className='font-bold'>Filters</h2>
        <label>
          City / neighborhood
          <input
            value={state.city}
            onChange={e=>updateParam('city', e.target.value)}
            placeholder="e.g. De Pijp"
          />
        </label>

        <label>
          Budget range
          <select value={state.budgetRange} onChange={e=>updateParam('budgetRange', e.target.value)}>
            <option value="">Any</option>
            {BUDGETS.map(b=> <option key={b} value={b}>{b}</option>)}
          </select>
        </label>

        <label>
          Room type
          <select value={state.roomType} onChange={e=>updateParam('roomType', e.target.value)}>
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
                onChange={(e)=>{
                  const next = e.target.checked
                    ? [...state.amenities, a]
                    : state.amenities.filter(x=>x!==a);
                  updateParam('amenities', next);
                }}
              />
              {a}
            </label>
          ))}
        </fieldset>

        <label>
          Move-in date
          <input type="date" value={state.moveInDate} onChange={e=>updateParam('moveInDate', e.target.value)} />
        </label>

        <label>
          Sort
          <select value={state.sort} onChange={e=>updateParam('sort', e.target.value)}>
            <option value="newest">Newest</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>
        </label>
      </aside>

      <section className="results">
        {loading && <div className="loading">Loading…</div>}
        {!loading && data.items.length === 0 && <div className="empty">No rooms match. Try widening your budget.</div>}

        <div className="grid">
          {data.items.map(room => <RoomCard key={room.id} room={room} />)}
        </div>

        <div className="pagination">
          <button
            disabled={state.page <= 1}
            onClick={()=>updateParam('page', String(state.page - 1))}
          >Prev</button>
          <span>Page {state.page} / {Math.max(1, Math.ceil(data.total / data.pageSize))}</span>
          <button
            disabled={state.page >= Math.ceil(data.total / data.pageSize)}
            onClick={()=>updateParam('page', String(state.page + 1))}
          >Next</button>
        </div>
      </section>
    </div>
  );
}

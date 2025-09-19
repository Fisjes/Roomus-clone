import { http, HttpResponse } from 'msw';
import roomsData from './fixtures/rooms.json';

// Utility: filter helpers
function includesAll(haystack = [], needles = []) {
  if (!needles.length) return true;
  return needles.every(a => haystack.includes(a));
}

export const handlers = [
  // GET /api/rooms/search?city=&budgetRange=&roomType=&amenities=a,b&moveInDate=YYYY-MM-DD&page=1&pageSize=12&sort=price_asc
  http.get('/api/rooms/search', ({ request }) => {
    const url = new URL(request.url);
    const city = url.searchParams.get('city') || '';
    const budgetRange = url.searchParams.get('budgetRange') || '';
    const roomType = url.searchParams.get('roomType') || '';
    const amenities = (url.searchParams.get('amenities') || '').split(',').filter(Boolean);
    const moveInDate = url.searchParams.get('moveInDate') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '12', 10);
    const sort = url.searchParams.get('sort') || 'newest';

    let rows = roomsData.filter(r =>
      (city ? r.city.toLowerCase().includes(city.toLowerCase()) || r.neighborhood.toLowerCase().includes(city.toLowerCase()) : true) &&
      (budgetRange ? r.budgetRange === budgetRange : true) &&
      (roomType ? r.roomType === roomType : true) &&
      (moveInDate ? r.moveInDate >= moveInDate : true) &&
      includesAll(r.amenities, amenities)
    );

    if (sort === 'price_asc') rows.sort((a,b)=>a.price-b.price);
    if (sort === 'price_desc') rows.sort((a,b)=>b.price-a.price);
    if (sort === 'newest') rows.sort((a,b)=> (b.moveInDate || '').localeCompare(a.moveInDate || ''));

    const total = rows.length;
    const start = (page - 1) * pageSize;
    const items = rows.slice(start, start + pageSize);

    return HttpResponse.json({ items, page, pageSize, total });
  }),

  // GET /api/rooms/:id
  http.get('/api/rooms/:id', ({ params }) => {
    const room = roomsData.find(r => r.id === params.id);
    if (!room) return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    return HttpResponse.json(room);
  }),

  // POST /api/rooms/:id/contact
  http.post('/api/rooms/:id/contact', async () => {
    // pretend to send a message — always OK in sandbox
    return HttpResponse.json({ ok: true });
  }),
];

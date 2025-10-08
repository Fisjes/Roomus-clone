import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoom, contactRoom } from '../../../api/rooms';

export default function RoomDetailPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getRoom(id).then(setRoom);
  }, [id]);

  if (!room) return <div>Loading…</div>;

  return (
    <article className="detail">
      <Link to=".." className="absolute top-20 left-3 border-3 border-gray-300 rounded px-5 py-3 font-[Verdana-Pro] shadow-lg hover:shadow-md hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">← Back to listings</Link>
      <h1 className=''>{room.title}</h1>
      <p><strong>€{room.price}</strong>/month · {room.neighborhood}, {room.city}</p>
      <p>Move-in: {room.moveInDate} · Type: {room.roomType}</p>
      <p>Amenities: {room.amenities.join(', ')}</p>
      <p>{room.description}</p>

      <button className="btn"
        onClick={async ()=>{
          const res = await contactRoom(room.id, { message: "I'm interested!" });
          if (res.ok) setOk(true);
        }}
      >Contact</button>
      {ok && <p className="toast">We’ll let the lister know. (Sandbox)</p>}
    </article>
  );
}

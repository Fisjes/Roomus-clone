import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <div className="card">
      <div className="card__media" aria-hidden>
        <div className="imgph" />
      </div>
      <div className="card__body flex flex-col justify-between flex-1 p-3 text-left">
        <h3 className="card__title">{room.title}</h3>
        <p className="card__meta">
          <strong>€{room.price}</strong>/month · {room.neighborhood}, {room.city}
        </p>
        <p className="card__meta">
          Type: {room.roomType} · Move-in: {room.moveInDate}
        </p>
        <p className="card__meta">
          Amenities: {room.amenities.slice(0,3).join(', ')}
          {room.amenities.length > 3 ? '…' : ''}
        </p>
        <Link className="bg-black text-white p-2 rounded-xl text-center w-30 mt-2" to={`/rooms/${room.id}`}>View details</Link>
      </div>
    </div>
  );
}
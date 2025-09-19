import { Link } from 'react-router-dom';

export default function RoomCard({ room }) {
  return (
    <div className="card">
      <div className="card__media" aria-hidden>
        <div className="imgph" />
      </div>
      <div className="card__body">
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
        <Link className="btn" to={`/rooms/${room.id}`}>View details</Link>
      </div>
    </div>
  );
}

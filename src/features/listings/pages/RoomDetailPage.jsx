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
    <div className="max-w-6xl mx-auto px-4 py-8">
      
      <div className="mb-6">
        <Link
          to=".."
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          ← Back To Listing
        </Link>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{room.title}</h1>
        <p className="text-gray-600">{room.neighborhood}, {room.city}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="col-span-2">
              <div className="aspect-video bg-gray-200 rounded-lg"></div>
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
          </div>

          <div className="space-y-6">
            <div className="border-t border-b py-4">
              <div className="flex gap-4 text-sm">
                <span>€{room.price}/month</span>
                <span>{room.roomType}</span>
                <span>Move-in: {room.moveInDate}</span>
              </div>
            </div>

            <div>
              <p>{room.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-4 border rounded-lg p-6 shadow-sm">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold">€{room.price}<span className="text-lg font-normal">/month</span></p>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={async () => {
                const res = await contactRoom(room.id, { message: "I'm interested!" });
                if (res.ok) setOk(true);
              }}
            >
              Contact
            </button>

            {ok && (
              <p className="text-green-600 text-center mt-4">
                We'll let the lister know. (Sandbox)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
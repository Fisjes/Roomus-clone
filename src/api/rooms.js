import { get, post } from './client';

export function searchRooms(params) {
  return get('/rooms/search', params);
}

export function getRoom(id) {
  return get(`/rooms/${id}`);
}

export function contactRoom(id, payload = {}) {
  return post(`/rooms/${id}/contact`, payload);
}

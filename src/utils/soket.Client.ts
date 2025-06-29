import { io } from 'socket.io-client';

const token = sessionStorage.getItem('accessToken');
console.log('📡 Token trước khi gửi:', token);

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
  auth: {
    authorization: `Bearer ${token}`,
  },
});

socket.on('connect', () => console.log('✅ WebSocket connected!', socket.id));
socket.on('disconnect', (reason) =>
  console.warn('❌ WebSocket disconnected!', reason)
);
socket.on('connect_error', (error) =>
  console.error('❌ WebSocket connect error:', error.message)
);

console.log('🔗 WebSocket URL:', import.meta.env.VITE_API_URL);
export default socket;

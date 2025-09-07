
import { render, screen } from '@testing-library/react';
import Welcome from '../pages/welcome';
import { SessionProvider } from 'next-auth/react';

const mockSession = {
  user: { name: 'Test User', email: 'test@example.com' },
  expires: '2099-01-01T00:00:00.000Z',
};

test('muestra mensaje de bienvenida', () => {
  render(
    <SessionProvider session={mockSession}>
      <Welcome />
    </SessionProvider>
  );
  expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
});

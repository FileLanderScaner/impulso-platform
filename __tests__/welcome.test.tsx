import { render, screen } from '@testing-library/react';
import Welcome from '../pages/welcome';

test('muestra mensaje de bienvenida', () => {
  render(<Welcome />);
  expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
});

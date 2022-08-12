import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import { rest } from 'msw';
import { server } from '../../../mocks/server'; 
import OrderEntry from '../OrderEntry';

test("handles error for scoops and toppings routes", async () =>{
  server.resetHandlers(
    rest.get('http://localhost:3000/scoops', (req, res, ctx) => res(ctx.status(500)))
  )

  server.resetHandlers(
    rest.get('http://localhost:3000/toppings', (req, res, ctx) => res(ctx.status(500)))
  )

  // eslint-disable-next-line react/react-in-jsx-scope
  render(<OrderEntry />);

await waitFor(async () => {

   const alerts = await screen.findAllByRole('alert');
  
    expect(alerts).toHaveLength(2);
 }) 
});
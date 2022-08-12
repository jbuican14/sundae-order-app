import { render, screen } from '../../../test-utils/testing-library-utils';
import Options from '../Options';

test("displays image for each topping option from server", async ()=> {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Options optionType="toppings" />);

  // find images
  const toppingsImages = await screen.findAllByRole("img", {name: /toppings$/i});

  expect(toppingsImages).toHaveLength(3);

  // confirm alt text of images
  const altText = toppingsImages.map(elm => elm.alt);
  expect(altText).toEqual([
    "Cherries toppings",
    "M&Ms toppings",
    "Hot fudge toppings"
  ])
})
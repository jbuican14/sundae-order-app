import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import Options from '../Options';

test("update scoop subtotal when scoop change", async () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider});

  // starting should be zero
  const scoopsSubtotal = screen.getByText("Scoops total: £", { exact: false }); 
  expect(scoopsSubtotal).toHaveTextContent('0.00');

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'});
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00"); 

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', {name: 'Chocolate'});
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00")
});

test("update toppings subtotal when topping change", async () => {

  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Options optionType="toppings"/>);

  // start should be zero
  const toppingsSubtotal = screen.getByAltText('Toppings total: £', {exact: false});
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: "Cherries",
  });

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fedge"});
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // remove one 
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.5"); 

})
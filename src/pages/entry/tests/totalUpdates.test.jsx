import React from 'react'; 
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import Options from '../Options';
import OrderEntry from '../OrderEntry'; 

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
  render(<Options optionType="toppings"/>,{wrapper: OrderDetailsProvider});

  // start should be zero
  const toppingsSubtotal = screen.getByText('Toppings total: £', {exact: false});
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole('checkbox', {
    name: "Cherries",
  });

  userEvent.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: "Hot fudge"});

  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // remove one 
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.5");
});





describe("grand total", () => {
 
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />,{wrapper: OrderDetailsProvider});
    const grandTol = screen.getByText('grand total:', {exact: false}); 

    // check grand total starting with 0.00
    expect(grandTol).toHaveTextContent("0.00");

    // update vamillaInput scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: "Vanilla"});
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTol).toHaveTextContent("4.00");

    // add cherries topping and grand total will be updated
    const cherriesCheckbox = await screen.findByRole("checkbox", {name: "Cherries"});
    userEvent.click(cherriesCheckbox);
    expect(grandTol).toHaveTextContent("5.5");
  }); 

  test("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />,{wrapper: OrderDetailsProvider});
    const hotFudgeCheckbox = await screen.findByRole("checkbox", { name: "Hot fudge"});

    userEvent.click(hotFudgeCheckbox);
    // const grandTol = screen.getByRole('heading', { name: /grand total: \$/i }); doesn't work so use below
    const grandTol = screen.getByText('grand total:', {exact: false}); 
    expect(grandTol).toHaveTextContent("1.5"); 

    // update vanilla scoops to 2 and check grand total
    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla', });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTol).toHaveTextContent("5.50");
  }); 

  test("grand total updates properly if item is removed", async() => {
    render(<OrderEntry />,{wrapper: OrderDetailsProvider});

    // add cherries
    const cherriesCheckbox = await screen.findByRole('checkbox', { name: "Cherries" });
    userEvent.click(cherriesCheckbox);
    //  grand total £1.50

    // update vanilla scoops to 2 (grand total should be £5.50)
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    // remove 1
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    // check grand total
    const grandTol = screen.getByText('grand total:', {exact: false}); 

    // remove cherries 
    userEvent.click(cherriesCheckbox);
    expect(grandTol).toHaveTextContent("2.00"); 
  });
})
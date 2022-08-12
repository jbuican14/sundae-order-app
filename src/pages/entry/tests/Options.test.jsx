import {render, screen} from "../../../test-utils/testing-library-utils";
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  // eslint-disable-next-line react/react-in-jsx-scope
  render(<Options optionType="scoops" />, {wrapper: OrderDetailsProvider});

  // find images
  const scoopImages = await screen.findAllByRole("img", {name: /scoop$/i});
  // const scoopImages = screen.getAllByRole("img", {name: /scoop$/i});
  expect(scoopImages).toHaveLength(2);

  //  confirm alt text of images
  const altText = scoopImages.map((elm) => elm.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

import {rest} from "msw";

export const handlers = [
  rest.get("http://localhost:3000/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        {name: "Chocolate", imagePath: "/img/chocolate.png"},
        {name: "Vanilla", imagePath: "/img/vanilla.png"},
      ])
    );
  }),
  rest.get("http://localhost:3000/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        {name: "Cherries", imagePath: "/img/cherries.png"},
        {name: "M&Ms", imagePath: "/img/m-and-ms.png"},
        {name: "Hot fudge", imagePath: "/img/hot-fudge.png"},
      ])
    )
  })
];

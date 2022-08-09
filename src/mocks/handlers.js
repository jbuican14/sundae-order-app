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
];

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getWishlists().map((wishlist) => {
      return db.wishlist.create({ data: wishlist });
    })
  );
}

seed();

function getWishlists() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      title: "Christmas Wishlist 2022",
      description: "This is my christmas wishlist for the year"
    },
    {
      title: "Birthday Wishlist 2022",
      description: "This is my birthday wishlist for the year"
    }
  ]
}

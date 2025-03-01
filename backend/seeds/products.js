import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Me Ghostin",
    price: 299.99,
    image:
      "https://gifsec.com/wp-content/uploads/2022/12/nft-gif-37.gif",
  },
  {
    name: "Me Laserin",
    price: 159.99,
    image:
      "https://gifsec.com/wp-content/uploads/2022/12/nft-gif-49.gif",
  },
  {
    name: "Me Closetin",
    price: 249.99,
    image:
      "https://gifsec.com/wp-content/uploads/2022/12/nft-gif-41.gif",
  },
  {
    name: "Me Smokin",
    price: 899.99,
    image:
      "https://i.giphy.com/KesFn11Rkq0aIpxoOC.webp",
  },
  {
    name: "Me Teamin",
    price: 79.99,
    image:
      "https://gifsec.com/wp-content/uploads/2022/12/nft-gif-39.gif",
  },
  {
    name: "Me Gummin",
    price: 89.99,
    image:
      "https://gifsec.com/wp-content/uploads/2022/12/nft-gif-50.gif",
  },
  {
    name: "Me Wolfin",
    price: 159.99,
    image:
      "https://creator-hub-prod.s3.us-east-2.amazonaws.com/private_foxes_pfp_1656778323935.gif",
  },
  {
    name: "Me Maskin",
    price: 449.99,
    image:
      "https://nftcalendar.io/storage/uploads/events/2021/11/JYaRySNG09uigOzASp3cVeYzNP56K1HquoG9IDgi.gif",
  },
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    // insert all products
    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();
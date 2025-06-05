export const categories = {
  PIZZA: "Pizza",
  BURGER: "Burger",
  BBQ: "BBQ",
  SUSHI: "Sushi",
  BROCCOLI: "Broccoli",
  DESSERTS: "Desserts",
};

export const categoriesImage = {
  PIZZA: "/asset/images/pizza.svg",
  BURGER: "/asset/images/burger.svg",
  BBQ: "/asset/images/meat.svg",
  SUSHI: "/asset/images/sushi.svg",
  BROCCOLI: "/asset/images/broccoli.svg",
  DESSERTS: "/asset/images/cake.svg",
};

export const categoryMap = {
  [categories.PIZZA]: {
    title: categories.PIZZA,
    image: categoriesImage.PIZZA,
  },
  [categories.BURGER]: {
    title: categories.BURGER,
    image: categoriesImage.BURGER,
  },
  [categories.BBQ]: {
    title: categories.BBQ,
    image: categoriesImage.BBQ,
  },
  [categories.SUSHI]: {
    title: categories.SUSHI,
    image: categoriesImage.SUSHI,
  },
  [categories.BROCCOLI]: {
    title: categories.BROCCOLI,
    image: categoriesImage.BROCCOLI,
  },
  [categories.DESSERTS]: {
    title: categories.DESSERTS,
    image: categoriesImage.DESSERTS,
  },
};

export const CategoryCardList = [...Object.values(categoryMap)];

import { TUser } from "../types";
import { TIngredient, TProperty } from "../types";
import { v4 as uuidv4 } from "uuid";

export const mockUserList: TUser[] = [
  {
    id: uuidv4(),
    name: "Admin",
    email: "admin@example.com",
    password: "admin",
    role: "admin",
  },
  {
    id: uuidv4(),
    name: "User",
    email: "user@example.com",
    password: "user",
    role: "user",
  },
];

export const properties: { name: string; description: string }[] = [
  {
    name: "Moisturizes",
    description:
      "Helps to hydrate and nourish the skin, leaving it feeling soft and supple.",
  },
  {
    name: "Soothes",
    description:
      "Calms and soothes irritated or inflamed skin, reducing redness and discomfort.",
  },
  {
    name: "Vegan",
    description:
      "Made without any animal-derived ingredients, making it suitable for vegans and those who prefer cruelty-free products.",
  },
  {
    name: "Cruelty-free",
    description:
      "Not tested on animals, making it a great choice for those who want to support cruelty-free brands.",
  },
  {
    name: "Hydrates",
    description:
      "Helps to retain moisture in the skin, preventing dryness and flakiness.",
  },
  {
    name: "Anti-inflammatory",
    description:
      "Reduces inflammation and swelling, helping to improve the appearance and comfort of the skin.",
  },
  {
    name: "Anti-aging",
    description:
      "Contains ingredients that can help to reduce the appearance of fine lines, wrinkles, and other signs of aging.",
  },
  {
    name: "Antioxidant",
    description:
      "Contains antioxidants that help to protect the skin from damage caused by free radicals and environmental stressors.",
  },
  {
    name: "Exfoliates",
    description:
      "Gently removes dead skin cells, leaving the skin feeling smoother and more radiant.",
  },
  {
    name: "Brightens",
    description:
      "Contains ingredients that can help to even out skin tone and improve the appearance of dark spots and discoloration.",
  },
  {
    name: "Balances",
    description:
      "Helps to restore the skin's natural balance, reducing excess oiliness or dryness.",
  },
  {
    name: "Cleanses",
    description:
      "Removes dirt, oil, and impurities from the skin, leaving it feeling clean and refreshed.",
  },
  {
    name: "Tones",
    description:
      "Helps to tighten and firm the skin, reducing the appearance of pores and improving skin texture.",
  },
  {
    name: "Nourishes",
    description:
      "Provides essential vitamins and nutrients to the skin, helping to support its overall health and vitality.",
  },
  {
    name: "Repairs",
    description:
      "Helps to repair damage to the skin barrier, restoring its ability to retain moisture and protect against external aggressors.",
  },
  {
    name: "Alcohol-free",
    description:
      "Does not contain alcohol, which can be drying and irritating to the skin.",
  },
];

export const mockPropertiesList: TProperty[] = properties.map((property) => {
  return {
    id: uuidv4(),
    name: property.name,
    description: property.description,
  };
});

const getPropertiesNames = (properties: string[]): TProperty[] => {
  return mockPropertiesList.filter((property) =>
    properties.includes(property.name)
  );
};

export const ingredientDataMock: TIngredient[] = [
  {
    id: uuidv4(),
    name: "Shea Butter",
    properties: getPropertiesNames(["Moisturizes", "Vegan"]),
  },
  {
    id: uuidv4(),
    name: "Aloe Vera",
    properties: getPropertiesNames(["Moisturizes", "Soothes", "Vegan"]),
  },
  {
    id: uuidv4(),
    name: "Coconut Oil",
    properties: getPropertiesNames(["Moisturizes", "Vegan"]),
  },
  {
    id: uuidv4(),
    name: "Jojoba Oil",
    properties: getPropertiesNames(["Moisturizes", "Vegan", "Cruelty-free"]),
  },
  {
    id: uuidv4(),
    name: "Hyaluronic Acid",
    properties: getPropertiesNames(["Hydrates", "Vegan", "Cruelty-free"]),
  },
  {
    id: uuidv4(),
    name: "Avocado Oil",
    properties: getPropertiesNames([
      "Moisturizes",
      "Anti-inflammatory",
      "Antioxidant",
    ]),
  },
  {
    id: uuidv4(),
    name: "Rosewater",
    properties: getPropertiesNames(["Hydrates", "Soothes", "Alcohol-free"]),
  },
  {
    id: uuidv4(),
    name: "Argan Oil",
    properties: getPropertiesNames([
      "Moisturizes",
      "Antioxidant",
      "Anti-aging",
    ]),
  },
  {
    id: uuidv4(),
    name: "Green Tea",
    properties: getPropertiesNames([
      "Antioxidant",
      "Anti-inflammatory",
      "Soothes",
    ]),
  },
  {
    id: uuidv4(),
    name: "Cocoa Butter",
    properties: getPropertiesNames(["Moisturizes", "Anti-aging", "Balances"]),
  },
];

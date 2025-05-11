/// <reference types="cypress" />

const mockRecipe = {
  id: 643091,
  image: "https://img.spoonacular.com/recipes/643091-556x370.jpg",
  imageType: "jpg",
  title: "Flax, Quinoa, and Almond Meal Bread",
  readyInMinutes: 45,
  servings: 10,
  sourceUrl: "https://www.foodista.com/recipe/QLDCQSZH/flax-quinoa-and-almond-meal-bread",
  vegetarian: true,
  vegan: false,
  glutenFree: true,
  dairyFree: true,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: true,
  weightWatcherSmartPoints: 6,
  gaps: "no",
  preparationMinutes: null,
  cookingMinutes: null,
  aggregateLikes: 2,
  healthScore: 4.0,
  creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
  license: "CC BY 3.0",
  sourceName: "Foodista",
  pricePerServing: 52.72,
  extendedIngredients: [
    {
      id: 12220,
      aisle: "Baking",
      image: "flax-seeds.png",
      consistency: "SOLID",
      name: "milled flax seed",
      nameClean: "milled flax seed",
      original: "1 cup Milled Flax Seed",
      originalName: "Milled Flax Seed",
      amount: 1.0,
      unit: "cup",
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: "cup",
          unitLong: "cup"
        },
        metric: {
          amount: 160.0,
          unitShort: "g",
          unitLong: "grams"
        }
      }
    }
  ],
  summary: "If you have about <b>45 minutes</b> to spend in the kitchen, Flax, Quinoa, and Almond Meal Bread might be an excellent <b>gluten free, dairy free, lacto ovo vegetarian, and fodmap friendly</b> recipe to try. This recipe serves 10. This side dish has <b>230 calories</b>, <b>8g of protein</b>, and <b>18g of fat</b> per serving. For <b>53 cents per serving</b>, this recipe <b>covers 9%</b> of your daily requirements of vitamins and minerals. This recipe is liked by 2 foodies and cooks. Head to the store and pick up water to texture desired, eggs, baking soda, and a few other things to make it today. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 37%</b>, which is not so outstanding. Try <a href=\"https://spoonacular.com/recipes/flax-quinoa-and-almond-meal-bread-1593429\">Flax, Quinoa, and Almond Meal Bread</a>, <a href=\"https://spoonacular.com/recipes/flax-quinoa-and-almond-meal-bread-1404515\">Flax, Quinoa, and Almond Meal Bread</a>, and <a href=\"https://spoonacular.com/recipes/flax-almond-meal-banana-muffins-with-dark-chocolate-gluten-free-paleo-718301\">Flax Almond Meal Banana Muffins with Dark Chocolate (gluten free, paleo!)</a> for similar recipes.",
  cuisines: [],
  dishTypes: ["side dish"],
  diets: ["gluten free", "dairy free", "lacto ovo vegetarian", "fodmap friendly"],
  occasions: [],
  instructions: "Preheat oven to 375F\nMix dry ingredients together.  Gently beat eggs together before adding to dry mixture.  Add oil.  (I had my coconut oil in a mixing cup and added the eggs to mix together but the coldness of the eggs turned the oil solid, it was difficult to mix the solid oil in the batter.\nAdd water a little at a time until you get the desired consistency to pour thickly into your loaf pan.\nI used a Pyrex bread pan with parchment paper, cooked at 375F for 40 mins.  If you use a metal pan you will have to adjust time.",
  analyzedInstructions: [
    {
      name: "",
      steps: [
        {
          number: 1,
          step: "Preheat oven to 375F",
          ingredients: [],
          equipment: [
            {
              id: 404784,
              name: "oven",
              localizedName: "oven",
              image: "https://spoonacular.com/cdn/equipment_100x100/oven.jpg",
              temperature: {
                number: 375.0,
                unit: "Fahrenheit"
              }
            }
          ]
        }
      ]
    }
  ],
  spoonacularScore: 41.99348831176758,
  spoonacularSourceUrl: "https://spoonacular.com/flax-quinoa-and-almond-meal-bread-643091"
};

describe("Individual Recipe API", () => {
  beforeEach(() => {
    // Intercept the API call and return mock data
    cy.intercept('GET', '**/api/recipes/643091', {
      statusCode: 200,
      body: mockRecipe
    }).as('getRecipe');
  });

  it("returns recipe data with correct structure", () => {
    cy.request('/api/recipes/643091').then((response) => {
      // Check status code
      expect(response.status).to.eq(200);
      
      // Check content type
      expect(response.headers['content-type']).to.include('application/json');
      
      // Check response body structure
      expect(response.body).to.have.property('id', mockRecipe.id);
      expect(response.body).to.have.property('title', mockRecipe.title);
      expect(response.body).to.have.property('image', mockRecipe.image);
      expect(response.body).to.have.property('readyInMinutes', mockRecipe.readyInMinutes);
      expect(response.body).to.have.property('servings', mockRecipe.servings);
      
      // Check that the image URL is valid
      expect(response.body.image).to.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i);
      
      // Check that required arrays exist
      expect(response.body).to.have.property('extendedIngredients').that.is.an('array');
      expect(response.body).to.have.property('diets').that.is.an('array');
    });
  });
});

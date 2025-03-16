import { assert } from "chai";
import { wanderlyService } from "./wanderly-service.js";
import { testCategory, testCategories } from "../fixtures.js";

suite("Category API Tests", () => {
    setup(async function () {
        this.timeout(5000);
        console.log("Deleting all categories...");
        await wanderlyService.deleteAllCategories();
        console.log("Categories deleted.");
      });
      
  test("Create a category", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory);
    assert.isNotNull(createdCategory._id);
    assert.equal(createdCategory.name, testCategory.name);
  });

  test("Retrieve a category by ID", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory);
    const retrievedCategory = await wanderlyService.getCategory(createdCategory._id);
    assert.equal(retrievedCategory.name, testCategory.name);
  });

  test("Get all categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wanderlyService.createCategory(testCategories[i]);
    }
    const categories = await wanderlyService.getAllCategories();
    assert.equal(categories.length, testCategories.length);
  });

  test("Delete a category", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory);
    await wanderlyService.deleteCategory(createdCategory._id);
    const categories = await wanderlyService.getAllCategories();
    assert.equal(categories.length, 0);
  });

  test("Delete all categories", async () => {
    await wanderlyService.createCategory(testCategory);
    await wanderlyService.createCategory({ name: "Parks" });
    await wanderlyService.deleteAllCategories();
    const categories = await wanderlyService.getAllCategories();
    assert.equal(categories.length, 0);
  });
});

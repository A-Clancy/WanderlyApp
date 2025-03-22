import { assert } from "chai";
import { wanderlyService } from "./wanderly-service.js";
import { testCategory, testCategories } from "../fixtures.js";

let authHeader;

suite("Category API Tests", () => {
  setup(async function () {
    this.timeout(5000);
    console.log("Authenticating test user...");

    await wanderlyService.createUser({
      email: "test@example.com",
      password: "password123",
    });

    const loginResponse = await wanderlyService.authenticateUser({
      email: "test@example.com",
      password: "password123",
    });

    authHeader = { Authorization: `Bearer ${loginResponse.token}` };
    console.log("Authentication successful, token stored.");

    console.log("Deleting all categories...");
    await wanderlyService.deleteAllCategories(authHeader);
    console.log("Categories deleted.");
  });

  test("Create a category", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory, authHeader);
    assert.isNotNull(createdCategory._id);
    assert.equal(createdCategory.name, testCategory.name);
  });

  test("Retrieve a category by ID", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory, authHeader);
    const retrievedCategory = await wanderlyService.getCategory(createdCategory._id, authHeader);
    assert.equal(retrievedCategory.name, testCategory.name);
  });

  test("Get all categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await wanderlyService.createCategory(testCategories[i], authHeader);
    }
    const categories = await wanderlyService.getAllCategories(authHeader);
    assert.equal(categories.length, testCategories.length);
  });

  test("Delete a category", async () => {
    const createdCategory = await wanderlyService.createCategory(testCategory, authHeader);
    await wanderlyService.deleteCategory(createdCategory._id, authHeader);
    const categories = await wanderlyService.getAllCategories(authHeader);
    assert.equal(categories.length, 0);
  });

  test("Delete all categories", async () => {
    await wanderlyService.createCategory(testCategory, authHeader);
    await wanderlyService.createCategory({ name: "Parks" }, authHeader);
    await wanderlyService.deleteAllCategories(authHeader);
    const categories = await wanderlyService.getAllCategories(authHeader);
    assert.equal(categories.length, 0);
  });
});
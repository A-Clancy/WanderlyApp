import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { createServer } from "../../src/server.js"; // Import the Hapi server instance
import { testPOI, testUser } from "../fixtures.js";

let server;
let authHeader;

suite("POI API Tests", () => {
  suiteSetup(async () => {
    server = await createServer();
    await db.init();
    
    // Create test user and authenticate
    await server.inject({
      method: "POST",
      url: "/api/users",
      payload: testUser,
    });

    const loginResponse = await server.inject({
      method: "POST",
      url: "/api/users/authenticate",
      payload: { email: testUser.email, password: testUser.password },
    });

    authHeader = { Authorization: `Bearer ${JSON.parse(loginResponse.payload).token}` };
  });

  suiteTeardown(async () => {
    await db.clear();
  });

  test("Create POI", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/pois",
      payload: testPOI,
      headers: authHeader,
    });

    assert.equal(response.statusCode, 201);
    assert.equal(JSON.parse(response.payload).name, testPOI.name);
  });

  test("Retrieve POI", async () => {
    console.log("Retrieve POI test is running..."); // Debugging step
  
    const createRes = await server.inject({
      method: "POST",
      url: "/api/pois",
      payload: testPOI,
      headers: authHeader,
    });
  
    console.log("Create Response:", createRes.payload); // Debugging
  });
  
  
  

  test("Update POI", async () => {
    const createRes = await server.inject({
      method: "POST",
      url: "/api/pois",
      payload: testPOI,
      headers: authHeader,
    });
  
    console.log("Create Response:", createRes.payload); // Debugging
  
    const createdPOI = JSON.parse(createRes.payload);
    const poiId = createdPOI._id;
  
    console.log("Using POI ID:", poiId); // Debugging
  
    const updateRes = await server.inject({
      method: "PUT",
      url: `/api/pois/${poiId}`,
      payload: { name: "Updated POI" },
      headers: authHeader,
    });
  
    console.log("Update Response:", updateRes.payload); // Debugging
  
    const updatedRes = await server.inject({
      method: "GET",
      url: `/api/pois/${poiId}`,
      headers: authHeader,
    });
  
    console.log("Updated POI Response:", updatedRes.payload); // Debugging
  
    assert.equal(JSON.parse(updatedRes.payload).name, "Updated POI");
  });
  
  

  test("Delete POI", async () => {
    const createRes = await server.inject({
      method: "POST",
      url: "/api/pois",
      payload: testPOI,
      headers: authHeader,
    });

    const poiId = JSON.parse(createRes.payload)._id;

    await server.inject({
      method: "DELETE",
      url: `/api/pois/${poiId}`,
      headers: authHeader,
    });

    const deletedRes = await server.inject({
      method: "GET",
      url: `/api/pois/${poiId}`,
      headers: authHeader,
    });

    assert.equal(deletedRes.statusCode, 404);
  });

  test("Invalid POI Data", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/api/pois",
      payload: { name: "", category: "" },
      headers: authHeader,
    });

    assert.equal(response.statusCode, 400);
  });
});

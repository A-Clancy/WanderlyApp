import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { poiController } from "./controllers/poi-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: { handler: dashboardController.index, auth: "session" } },
  { method: "POST", path: "/dashboard/addcategory", config: { handler: dashboardController.addCategory, auth: "session" } },
  { method: "GET", path: "/dashboard/deletecategory/{id}", config: { handler: dashboardController.deleteCategory, auth: "session" } },

  { method: "GET", path: "/category/{id}", config: { handler: poiController.index, auth: "session" } },
  { method: "POST", path: "/category/{id}/addpoi", config: { handler: poiController.addPOI, auth: "session" } },
  { method: "GET", path: "/category/{id}/deletepoi/{poiid}", config: { handler: poiController.deletePOI, auth: "session" } },
];

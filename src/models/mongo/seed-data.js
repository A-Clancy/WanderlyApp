export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret"
      }
    },
    categories: {
      _model: "Category",
      rivers: {
        name: "Rivers",
        userId: "->users.homer"
      },
      cities: {
        name: "Cities",
        userId: "->users.marge"
      }
    },
    pois: {
      _model: "POI",
      nore: {
        name: "River Nore",
        description: "Cold river in Kilkenny",
        latitude: 52.65,
        longitude: -7.25,
        categoryId: "->categories.rivers"
      },
      dublin: {
        name: "Dublin City",
        description: "Best avoided",
        latitude: 53.3498,
        longitude: -6.2603,
        categoryId: "->categories.cities"
      }
    }
  };
  
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
    },
    mountains: {
      name: "Mountains",
      userId: "->users.homer"
    },
    swimming: {
      name: "Swimming Spots",
      userId: "->users.homer"
    },
    trailheads: {
      name: "Trailheads",
      userId: "->users.homer"
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
    },
    croaghPatrick: {
      name: "Croagh Patrick",
      description: "Big mountain with sharp stones",
      latitude: 53.7636,
      longitude: -9.6686,
      categoryId: "->categories.mountains"
    },
    mountBrandon: {
      name: "Mount Brandon",
      description: "It's a mountain",
      latitude: 52.2333,
      longitude: -10.2667,
      categoryId: "->categories.mountains"
    },
    vico: {
      name: "Vico Baths",
      description: "It's the Vico don't you know.",
      latitude: 53.2633,
      longitude: -6.1111,
      categoryId: "->categories.swimming"
    },
    fortyFoot: {
      name: "Forty Foot",
      description: "Swimming spot, popular with that sort of type",
      latitude: 53.2896,
      longitude: -6.1201,
      categoryId: "->categories.swimming"
    },
    ticknock: {
      name: "Ticknock Trailhead",
      description: "Nice",
      latitude: 53.2541,
      longitude: -6.2411,
      categoryId: "->categories.trailheads"
    },
    glendalough: {
      name: "Glendalough Upper Car Park",
      description: "Mind the buses",
      latitude: 53.0106,
      longitude: -6.3276,
      categoryId: "->categories.trailheads"
    }
  }
};

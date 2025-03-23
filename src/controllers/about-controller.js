export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Wanderly",
      };
      return h.view("about-view", viewData);
    },
  },
};

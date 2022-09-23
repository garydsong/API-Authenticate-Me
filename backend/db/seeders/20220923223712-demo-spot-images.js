'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
    {
      spotId: 1,
      url: "https://i.imgur.com/9MZQ1jN.png",
      preview: true
    },
    {
      spotId: 2,
      url: "https://i.imgur.com/98VuE1a.png",
      preview: true
    },
    {
      spotId: 3,
      url: "https://i.imgur.com/y1cFKbc.png",
      preview: true
    },
    {
      spotId: 4,
      url: "https://i.imgur.com/z0ak7ra.png",
      preview: true
    },
    {
      spotId: 5,
      url: "https://i.imgur.com/8tWaYOx.png",
      preview: true
    },
    {
      spotId: 6,
      url: "https://i.imgur.com/oHcM7ka.png",
      preview: true
    },
    {
      spotId: 7,
      url: "https://i.imgur.com/RbMKNUt.png",
      preview: true
    },
    {
      spotId: 8,
      url: "https://i.imgur.com/KxuXLdR.png",
      preview: true
    },
    {
      spotId: 9,
      url: "https://i.imgur.com/xjhKviw.png",
      preview: true
    },
    {
      spotId: 10,
      url: "https://i.imgur.com/TEKIBCA.png",
      preview: true
    },
    {
      spotId: 11,
      url: "https://i.imgur.com/Q6Gvc1G.png",
      preview: true
    },
    {
      spotId: 12,
      url: "https://i.imgur.com/oFOM3vb.png",
      preview: true
    },
    {
      spotId: 13,
      url: "https://i.imgur.com/YpNxvyD.png",
      preview: true
    },
    {
      spotId: 14,
      url: "https://i.imgur.com/fPFwM3T.png",
      preview: true
    },
    {
      spotId: 15,
      url: "https://i.imgur.com/hHfZDlj.png",
      preview: true
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     const Op = Sequelize.Op;
     return queryInterface.bulkDelete('SpotImages', {
       spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15] }
     }, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots',[
      {
        ownerId: 1,
        address: "aaa123 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "Place where web developers are created",
        price: 123
      },
      {
        ownerId: 2,
        address: "321321 ButtTown USA",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 43,
        lng: 122,
        name: "Sam Suh",
        description: "Where my bb be",
        price: 100000000
      },
      {
        ownerId: 3,
        address: "95-975 Kahuamoku PL",
        city: "Honolulu",
        state: "Hawaii",
        country: "United States of America",
        lat: 33,
        lng: 242,
        name: "Zippy's",
        description: "Zip pack matta fack",
        price: 10
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
     return queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['Los Angeles', 'San Francisco', 'Honolulu']}
     }, {});
  }
};

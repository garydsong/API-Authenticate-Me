'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 2,
        address: "Outside Chef Gusteau's",
        city: "Paris",
        state: "France",
        country: "Europe",
        lat: 48.8566,
        lng: 2.3522,
        name: "Linguine's Flat",
        description: "Ratatoille with a view of the Eiffle Tower.",
        price: 1000,
      },
      {
        ownerId: 2,
        address: "100 Your Refrigerator",
        city: "Your City",
        state: "California",
        country: "United States of America",
        lat: 0,
        lng: 0,
        name: "Egg Carton",
        description: "You're an egg. Live like it.",
        price: 100000000
      },
      {
        ownerId: 2,
        address: "1 Paradise Falls",
        city: "Paradise Falls",
        state: "Venezuela",
        country: "South America",
        lat: 6.4238,
        lng: 66.5897,
        name: "Fredricksen's",
        description: "Spend a nice evening with Kevin, Carl, and Russell!",
        price: 10
      },
      {
        ownerId: 2,
        address: "Somewhere on the Hillside",
        city: "Cluny",
        state: "France",
        country: "Europe",
        lat: 46.4290,
        lng: 4.6646,
        name: "Howl's Moving Castle",
        description: "There's a war going on but it's beautiful!",
        price: 100
      },
      {
        ownerId: 2,
        address: "SE1 8SW",
        city: "London",
        state: "England",
        country: "United Kingdom",
        lat: 51.50721,
        lng: 0.1276,
        name: "Hogwarts",
        description: "Hogwarts School of Witchcraft and Wizardry",
        price: 9.34
      },
      {
        ownerId: 2,
        address: "W3 Dontalkbout Bruno Rd",
        city: "Encanto",
        state: "Colombia",
        country: "South America",
        lat: 43,
        lng: 122,
        name: "Casa Madrigal",
        description: "A house that aligns with the feelings of the family Madrigal.",
        price: 10
      },
      {
        ownerId: 2,
        address: "123 Santa Monica Blvd",
        city: "Los Angeles",
        state: "California",
        country: "United States of America",
        lat: 2,
        lng: 2,
        name: "Sky Cruise",
        description: "Cruise the world in a nuclear-powered sky hotel above the clouds.",
        price: 999999999
      },
      {
        ownerId: 2,
        address: "1 Blackwater Bay",
        city: "The Crownlands",
        state: "Dubrovnik",
        country: "Westoros",
        lat: 43,
        lng: 122,
        name: "King's Landing",
        description: "Long live ",
        price: 5000
      },
      {
        ownerId: 2,
        address: "999 Bread Throwers Ln",
        city: "Port Saint Lucy",
        state: "Florida",
        country: "United States of America",
        lat: 43,
        lng: 122,
        name: "Duck House",
        description: "A house of duck... or so it seems.",
        price: 20
      },
      {
        ownerId: 2,
        address: "33 5th Street",
        city: "New York",
        state: "New York",
        country: "United States of America",
        lat: 43,
        lng: 122,
        name: "Dumpling House",
        description: "Want some dumplings? Look no further.",
        price: 5.99
      },
      {
        ownerId: 2,
        address: "1770 James Street",
        city: "Minneapolis",
        state: "Minnesota",
        country: "United States of America",
        lat: 43,
        lng: 122,
        name: "Snoopy's House",
        description: "Chill with Snoop.",
        price: 1
      },
      {
        ownerId: 2,
        address: "1375 E Buena Vista Dr",
        city: "Orlando",
        state: "Florida",
        country: "United States of America",
        lat: 43,
        lng: 122,
        name: "Cinderella's Castle",
        description: "Be home before midnight!",
        price: 9999
      },
      {
        ownerId: 2,
        address: "Santa's House",
        city: "Jolly Place",
        state: "North Pole",
        country: "Arctic Ocean",
        lat: 90,
        lng: 135,
        name: "North Pole",
        description: "Santa is not here.",
        price: 399
      },
      {
        ownerId: 2,
        address: "1 Pikachu Rd",
        city: "Pallet Town",
        state: "Kanto",
        country: "Pokeworld",
        lat: 43,
        lng: 122,
        name: "Ash's House",
        description: "Shocking.",
        price: 100
      },
      {
        ownerId: 2,
        address: "1",
        city: "Tress",
        state: "Na'vi",
        country: "Pandora",
        lat: 43,
        lng: 122,
        name: "Cyrogenic",
        description: "Wake up in Pandora.",
        price: 100000000
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      city: { [Op.in]: ['Los Angeles', 'San Francisco', 'Honolulu'] }
    }, {});
  }
};

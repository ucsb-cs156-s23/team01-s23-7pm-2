const storeFixtures = {
    //  sales, location, price
    oneStore:
    [
      {
        "id": 1,
        "nameStore": "IV Market",
        "streetLocation": "939 Embarcadero del Mar",
        "priceInDollars": "$$",
        "salesAmount": "Low"

      }
    ],

    threeStores:
    [
        {
             "id": 2,
             "name": "Target",
             "location": "6865 Hollister Ave",
             "price": "$$",
             "sales": "High"
        },

        {
            "id": 3,
             "name": "Home Depot",
             "location": "6975 Market Pl Dr",
             "price":  "$$$",
             "sales": "High"
        },

        {
            "id": 4,
             "name": "Trader Joe's",
             "location": "5767 Calle Real",
             "price":  "$$",
             "sales": "Medium"  
        },
        
    ]
};

export { storeFixtures };
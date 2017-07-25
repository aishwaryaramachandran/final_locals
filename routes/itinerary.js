"use strict";

const express = require('express');
const router = express.Router();
const queries = require("../library/itinerary_queries.js")

module.exports = (knex) => {

  const {
    favCards,
    getItinerary
  } = queries(knex);

  router.get("/", (req, res) => {
      const user_id = req.session.userId;

    getItinerary(user_id)
      .then(data => {
        let cards = data.map((card) => {
          return {
            id: card.id,
            card_id: card.card_id,
            user_id: card.user_id,
            title: card.title,
            location: card.location,
            description: card.description,
            duration: card.duration,
            category_id: card.category_id,
          }
        });
        res.json(cards);

      })
      .catch(err => {
        res.status(400).send("ERROR");
      })
  });


  router.get("/favorites", (req, res) => {
    const user_id = req.session.userId;

    favCards(user_id)
      .then(data => {
        console.log(data)
        let cards = data.map((card) => {
          return {
            id: card.card_id,
            title: card.title,
            location: [card.location.x, card.location.y],
            description: card.description,
            duration: card.duration,
            address: card.address,
            category: card.category_name,
            photos: card.photos
          }
        });
        console.log(cards)
        res.json(cards);

      })
      .catch(err => {
        res.status(400).send("ERROR");
      })
  });

  router.post('/', (req, res) => {});

  router.get("/map", (req, res) => {
    // function initMap() {
    // var places = [
    //   {lat: -25.0264017, lng: 115.1772893},
    //   {lat: -25.363, lng: 131.044},
    //   {lat: -33.8470219, lng: 150.3715133},
    //   {lat:-37.971237, lng: 144.4926879}
    //   ]

    //   var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 4,
    //     center: places[0]
    //   })

    //   places.forEach(function(geolocation){
    //     var marker = new google.maps.Marker({
    //       position: places.geolocation,
    //       map: map
    //     })
    //   })
    // return map;
    // }


    res.render("maps")
  });

  router.post("/:id", (req, res) => {
    // Save itinerary to DB
    // Form will include favorite.card_id, itinerary-card.start_time, itinerary.date
    // Delete each card used from favorite
  });


  return router;
}

// {
//  "kind": "calendar#calendarList",
//  "etag": "\"p33c9bvcotv7d60g\"",
//  "nextSyncToken": "CNiV_ZjvztMCEiFzaGF1bmEuaGVubmVzc3kuZ3JpZmZpbkBnbWFpbC5jb20=",
//  "items": [
//   {
//    "kind": "calendar#calendarListEntry",
//    "etag": "\"1489359467472000\"",
//    "id": "shauna.hennessy.griffin@gmail.com",
//    "summary": "shauna.hennessy.griffin@gmail.com",
//    "timeZone": "UTC",
//    "colorId": "14",
//    "backgroundColor": "#9fe1e7",
//    "foregroundColor": "#000000",
//    "selected": true,
//    "accessRole": "owner",
//    "defaultReminders": [
//     {
//      "method": "popup",
//      "minutes": 30
//     }
//    ],
//    "notificationSettings": {
//     "notifications": [
//      {
//       "type": "eventCreation",
//       "method": "email"
//      },
//      {
//       "type": "eventChange",
//       "method": "email"
//      },
//      {
//       "type": "eventCancellation",
//       "method": "email"
//      },
//      {
//       "type": "eventResponse",
//       "method": "email"
//      }
//     ]
//    },
//    "primary": true
//   }
//  ]
// }
// RFC3339
// 2008-09-08T22:47:31-07:00

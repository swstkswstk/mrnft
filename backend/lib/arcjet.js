import arcjet, { tokenBucket, shield, detectBot } from '@arcjet/node';
import "dotenv/config"
//init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // shield protects our web app from common attacks like sql injections,xrs,csrf attacks,
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE"
        //FULL LIST @ https://www.arcjet.com/bot-list
      ]
    }),
    //RATE LIMITING
    tokenBucket({
      mode: "LIVE",
      refillRate: 15,
      capacity: 10,
      interval: 10,
    })
  ]
})
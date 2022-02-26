import fastfood from "./images/fastfood.jpg";
import React from "react";
import { GiChickenLeg } from "react-icons/gi";
import { FaPizzaSlice } from "react-icons/fa";
import { GiCarrot } from "react-icons/gi";
import pizza from "./images/pizza.jpg";
import mainPizza from "./images/pizza-hero.webp";
import mainFastfood from "./images/ajjemen.jpg";
import vegan from "./images/Vegan-Buddha-bowl.jpg";
export const restaurants = [
  {
    id: 1001,
    name: "Fast Food Paje",
    menu: ["prod_NXELwjdM2r53A4", "prod_L1vOoZdOLWlRa8"],
    location: "Paje",
    image: fastfood,
    mainImage: mainFastfood,
    icon: <GiChickenLeg />,
    deliverfee: 0,
    category: ["Fast Food", "Sausage", "Chicken"],
    query: [
      "fast food",
      "fastfood",
      "sausage",
      "chips",
      "french fries",
      "chicken",
      "beef",
      "michkaki",
      "meat",
      "potator chips",
      "potato",
      "barbeque",
      "bbq",
      "grilled",
    ],

    number: "+255 000 000",
    type: "Fast Food",
    email: "mzeemm1982@gmail.com",
    open: 10,
    close: 1,
  },
  {
    id: 1002,
    name: "Pizza Delight",
    type: "Pizza / Italian",
    deliverfee: 2.5,
    icon: <FaPizzaSlice />,
    menu: ["prod_mOVKl4GAKN5prR", "prod_gvRjwOVO2Zl4mN", "prod_31q0o3e0VBlDdj"],
    location: "Paje",
    category: ["Pizza", "Vegan", "Chicken", "Pasta", "Veg", "Burgers", "BBQ"],
    image: pizza,
    mainImage: mainPizza,
    featured: true,
    query: [
      "pizza",
      "pizza margherita",
      "chicken pizza",
      "salami pizza",
      "cheeseburger",
      "hamburger",
      "chicken burger",
    ],
    number: "+255 000 000",
    open: 11,
    close: 23,
    email: "louiealsaffar@gmail.com",
  },
  {
    id: 1003,
    name: "Mr Bowl",
    type: "Veg / Vegan",
    deliverfee: 2.5,
    icon: <GiCarrot />,
    menu: ["prod_7ZAMo1LEWxwNJ4"],
    location: "Paje",
    address: "test adress 1",
    zip: "",
    category: ["Veg", "Vegan", "Bowl"],
    image: vegan,
    mainImage: vegan,
    featured: true,
    query: ["vegan", "veg", "vegetarian", "bowl"],
    number: "+255 000 000",
    open: 11,
    close: 23,
    loid: "auth0|6123a867b540dd006b2d2a2b",
    active: true,
    days: "All",
    offer: "10%",
    offerdate: "30",
    email: "louiestokk@gmail.com",
  },
];

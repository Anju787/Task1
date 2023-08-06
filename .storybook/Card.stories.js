import React from "react";
import { storiesOf } from "@storybook/react";
import Card from "../component/card/Card";

const cardData = {
  "Order ID": "SE|20221104|179|9:1:NEWO",
  "Buy/Sell Indicator": "Buy",
  "Order Status": "New",
  // Add other key-value pairs for additional order details to showcase in the story
};

storiesOf("Card", module)
  .add("Default", () => <Card cardData={cardData} title="Card Title" />);

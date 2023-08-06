import React, { useState, useEffect } from "react";
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("EUR");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});
  const [filteredOrders, setFilteredOrders] = useState([]); // Define the setFilteredOrders function here

  // Currency conversion rates to USD (sample values, replace with actual rates)
  const currencyConversionRates = {
    USD: 1,    // USD to USD conversion rate (1 USD = 1 USD)
    EUR: 0.85, // EUR to USD conversion rate (1 EUR ≈ 0.85 USD)
    GBP: 0.72, // GBP to USD conversion rate (1 GBP ≈ 0.72 USD)
    JPY: 110.5 // JPY to USD conversion rate (1 JPY ≈ 110.5 USD)
  };

  // Combine orders data with timestamps and convert order volume to selected currency
  const orderWithTimestamps = mockData.results.map(order => {
    return {
      ...order,
      submittedDate: timestamps[order.id] || "Unknown",
      orderVolumeCurrency: order.bestExecutionData.orderVolume.USD * currencyConversionRates[currency],
    };
  });

  // Function to filter the orders based on the search input and update currency conversion
  const getFilteredOrders = () => {
    return orderWithTimestamps.filter(order =>
      order["&id"].toString().includes(searchText)
    );
  };

  // useEffect hook to update filteredOrders when currency or searchText changes
  useEffect(() => {
    const newFilteredOrders = getFilteredOrders();
    setFilteredOrders(newFilteredOrders);
  }, [currency, searchText]);

  // Calculate the total number of orders
  const totalOrders = mockData.results.length;

  // Function to handle order selection
  const handleOrderSelect = (orderId) => {
    // Find the selected order from the filteredOrders list
    const selectedOrder = filteredOrders.find((order) => order["&id"].toString() === orderId);
    
    // Retrieve the timestamps for the selected order
    const selectedOrderTimestamps = timestamps[orderId] || {};

    // Set the selected order ID and details in the state
    setSelectedOrderId(orderId);
    setSelectedOrderDetails(selectedOrder);
    setSelectedOrderTimeStamps(selectedOrderTimestamps);
  };

  // Function to prepare the data for the Card component
  const prepareCardData = () => {
    // Check if there is any selected order
    if (!selectedOrderDetails || Object.keys(selectedOrderDetails).length === 0) {
      return null;
    }

    // Format the data as key-value pairs for the Card component
    const cardData = {
      "Order ID": selectedOrderId,
      "Buy/Sell Indicator": selectedOrderDetails.executionDetails.buySellIndicator,
      "Order Status": selectedOrderDetails.executionDetails.orderStatus,
      // Add other key-value pairs for additional order details
    };

    return cardData;
  };

  return (
    <div>
      <div className={styles.header}>
        {/* Use the calculated totalOrders for the secondaryTitle */}
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          {/* Use the search input value and onChange event */}
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          {/* Render the Card components with the prepared card data */}
          <Card cardData={prepareCardData()} title="Selected Order Details" />
          <Card cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" />
        </div>
        {/* Pass the filteredOrders data and the handleOrderSelect function to the List component */}
        <List rows={filteredOrders} currency={currency} onSelectOrder={handleOrderSelect} />
      </div>
    </div>

  );
};

export default Dashboard;

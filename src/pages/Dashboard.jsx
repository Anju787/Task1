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
  const [filteredOrders, setFilteredOrders] = useState([]); 

 
  const currencyConversionRates = {
    USD: 1,    
    EUR: 0.85, 
    GBP: 0.72, 
    JPY: 110.5 
  };

  
  const orderWithTimestamps = mockData.results.map(order => {
    return {
      ...order,
      submittedDate: timestamps[order.id] || "Unknown",
      orderVolumeCurrency: order.bestExecutionData.orderVolume.USD * currencyConversionRates[currency],
    };
  });

  
  const getFilteredOrders = () => {
    return orderWithTimestamps.filter(order =>
      order["&id"].toString().includes(searchText)
    );
  };

  
  useEffect(() => {
    const newFilteredOrders = getFilteredOrders();
    setFilteredOrders(newFilteredOrders);
  }, [currency, searchText]);


  const totalOrders = mockData.results.length;

 
  const handleOrderSelect = (orderId) => {
    
    const selectedOrder = filteredOrders.find((order) => order["&id"].toString() === orderId);
    
    
    const selectedOrderTimestamps = timestamps[orderId] || {};

    
    setSelectedOrderId(orderId);
    setSelectedOrderDetails(selectedOrder);
    setSelectedOrderTimeStamps(selectedOrderTimestamps);
  };

 
  const prepareCardData = () => {
    
    if (!selectedOrderDetails || Object.keys(selectedOrderDetails).length === 0) {
      return null;
    }

   
    const cardData = {
      "Order ID": selectedOrderId,
      "Buy/Sell Indicator": selectedOrderDetails.executionDetails.buySellIndicator,
      "Order Status": selectedOrderDetails.executionDetails.orderStatus,
     
    };

    return cardData;
  };

  return (
    <div>
      <div className={styles.header}>
        {}
        <HeaderTitle primaryTitle="Orders" secondaryTitle={`${totalOrders} orders`} />
        <div className={styles.actionBox}>
          {}
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
          {}
          <Card cardData={prepareCardData()} title="Selected Order Details" />
          <Card cardData={selectedOrderTimeStamps} title="Selected Order Timestamps" />
        </div>
        {}
        <List rows={filteredOrders} currency={currency} onSelectOrder={handleOrderSelect} />
      </div>
    </div>

  );
};

export default Dashboard;

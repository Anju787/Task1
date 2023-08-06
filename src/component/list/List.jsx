import React, { useState } from "react";
import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";
import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";
import styles from "./List.module.css";

const List = ({ rows, currency, onSelectOrder }) => {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  if (!rows || rows.length === 0) {
    return <p>No orders available.</p>;
  }

  const handleRowClick = (orderId) => {
    setSelectedOrderId(orderId);
   
    onSelectOrder(orderId);
  };

  return (
    <table className={styles.container}>
      <thead>
        <ListHeader>
          <ListHeaderCell>Order ID</ListHeaderCell>
          <ListHeaderCell>Buy/Sell</ListHeaderCell>
          <ListHeaderCell>Country</ListHeaderCell>
          {}
          <ListHeaderCell>Order Submitted</ListHeaderCell>
          {}
          <ListHeaderCell>Order Volume / {currency}</ListHeaderCell>
        </ListHeader>
      </thead>
      <tbody>
        {rows.map((row) => (
          <ListRow
            key={row["&id"]}
            onClick={() => handleRowClick(row["&id"])}
            selected={row["&id"] === selectedOrderId}
          >
            {}
            <ListRowCell>{row["&id"]}</ListRowCell>
            <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
            <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
            <ListRowCell>{row.submittedDate}</ListRowCell>
            {}
            <ListRowCell>{row.orderVolumeCurrency.toFixed(2)}</ListRowCell>
          </ListRow>
        ))}
      </tbody>
    </table>
  );
};

export default List;

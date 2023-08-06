import React from "react";
import styles from "./ListRow.module.css";

const ListRow = ({ children, onClick, selected }) => {
  return (
    <tr className={selected ? styles.selected : null} onClick={onClick}>
      {children}
    </tr>
  );
};

export default ListRow;

import React from "react";

import "./styles.css";

export default function FilterList() {
  return (
    <ul className="filters-list">
      <li>Inbox</li>
      <li>Today</li>
      <li>Next 7 days</li>
    </ul>
  );
}

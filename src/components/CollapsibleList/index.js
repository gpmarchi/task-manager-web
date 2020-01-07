import React from "react";

import "./styles.css";

export default function CollapsibleList({
  listName,
  listItems,
  addNewItem,
  listItemsActions,
  setSelectedItem
}) {
  function handleItemClick(event, itemId, itemName) {
    const projects = document.querySelectorAll("div.item-list header");
    for (let index = 0; index < projects.length; index++) {
      projects[index].className = "list-item";
    }
    event.target.parentNode.className = "list-item current-selected-item";
    setSelectedItem({ id: itemId, name: itemName });
  }

  function handleCollapsibleElement() {
    const collapsible = document.querySelector("div .collapsible-list");
    const nextSibling = collapsible.nextElementSibling;
    collapsible.classList.toggle("active");
    if (nextSibling.style.display === "block") {
      nextSibling.style.display = "none";
    } else {
      nextSibling.style.display = "block";
    }
  }

  return (
    <>
      <header className="collapsible-list">
        <button onClick={handleCollapsibleElement}>{listName}</button>
        {addNewItem}
      </header>
      <div className="item-list">
        {listItems.map((item, index) => {
          return (
            <header className="list-item" key={item._id}>
              <button
                onClick={event => handleItemClick(event, item._id, item.name)}
              >
                {item.name}
              </button>
              {listItemsActions[index]}
            </header>
          );
        })}
      </div>
    </>
  );
}

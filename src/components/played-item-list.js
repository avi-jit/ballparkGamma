import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
//import { Item } from "../types/item";
import ItemCard from "./Item-card";
import styles from "../styles/played-item-list.module.scss";



export default function PlayedItemList(props) {
  const { badlyPlacedIndex, isDragging, items } = props;

  const [flippedId, setFlippedId] = useState(null);

  useEffect(() => {
    if (isDragging && flippedId !== null) {
      setFlippedId(null);
    }
  }, [flippedId, isDragging]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.listContainer}>
        <Droppable droppableId="played" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.list}
            >
              <div className={styles.timelineContainer}>
                <div className={styles.timeline}></div>
              </div>
              <div className={styles.items}>
                {items.map((item, index) => (
                  <ItemCard
                    draggable={badlyPlacedIndex !== null}
                    flippedId={flippedId}
                    index={index}
                    item={item}
                    key={item.id}
                    setFlippedId={setFlippedId}
                  />
                ))}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}

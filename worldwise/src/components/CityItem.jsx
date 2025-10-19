import React from "react";
import { Link } from "react-router";
import styles from "./CityItem.module.css";
import { formatDate } from "../utils";

const CityItem = ({ city }) => {
  const {
    cityName,
    country,
    emoji,
    date,
    notes,
    id,
    position: { lat, lng },
  } = city;

  return (
    <li>
      <Link className={styles.cityItem} to={`${id}?lat=${lat}&lng=${lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
};

export default CityItem;

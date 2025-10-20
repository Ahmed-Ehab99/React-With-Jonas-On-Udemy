import React from "react";
import { useCities } from "../hooks/useCities";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  
  if (isLoading) return <Spinner />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;

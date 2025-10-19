import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import styles from "./Map.module.css";

const Map = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <h1>Map</h1>
      <button onClick={() => setSearchParams({ lat: 23, lng: 15 })}>
        Change POS
      </button>
    </div>
  );
};

export default Map;

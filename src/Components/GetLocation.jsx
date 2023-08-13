"use client";
import React, { useEffect, useState } from "react";

const Location = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  console.log(latitude);

  useEffect(() => {
   
  }, []);

  return (
    <div>
      <h1>Current Location:</h1>
      {latitude && <p>Latitude: {latitude}</p>}
      {longitude && <p>Longitude: {longitude}</p>}
    </div>
  );
};

export default Location;

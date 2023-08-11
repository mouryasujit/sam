import React, { useEffect, useState } from "react";

const IPAddress = () => {
  const [ipAddress, setIPAddress] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => setIPAddress(data.ip))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>Your IP Address is: {ipAddress}</h1>
    </div>
  );
};
export default IPAddress;

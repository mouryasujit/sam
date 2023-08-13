import React, { useEffect, useState } from "react";

const IPAddress = () => {
  const [ipAddress, setIPAddress] = useState("");

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <h1>Your IP Address is: {ipAddress}</h1>
    </div>
  );
};
export default IPAddress;

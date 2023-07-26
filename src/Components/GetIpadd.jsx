import React, { useState } from "react";

const App = () => {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const ip = getRemoteAddr();
    setIpAddress(ip);
  }, []);

  return (
    <div>
      <h1>Your IP address is {ipAddress}</h1>
    </div>
  );
};

export default App;

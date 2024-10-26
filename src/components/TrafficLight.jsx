// import React from "react";

function TrafficLight({ direction, state }) {
  return (
    <div className={`traffic-light ${state}`}>
      <p>{direction}</p>
    </div>
  );
}

export default TrafficLight;

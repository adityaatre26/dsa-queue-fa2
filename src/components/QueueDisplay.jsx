// import React from "react";
import Car from "./Car.jsx";

function QueueDisplay({ queue }) {
  return (
    <div className="queue">
      {queue.length === 0 ? (
        <p>No cars in queue</p>
      ) : (
        queue.map((car, index) => <Car key={index} id={car} />)
      )}
    </div>
  );
}

export default QueueDisplay;

import { useState, useEffect } from "react";
import TrafficLight from "./components/TrafficLight.jsx";
import QueueDisplay from "./components/QueueDisplay.jsx";

const directions = ["North", "East", "South", "West"];

function App() {
  const [queues, setQueues] = useState({
    North: [],
    East: [],
    South: [],
    West: [],
  });
  const [currentLight, setCurrentLight] = useState("North");
  const [lightState, setLightState] = useState("green");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleLights();
    }, 10000); // Change light every 10 seconds

    return () => clearInterval(interval);
  }, [currentLight]);

  useEffect(() => {
    const dequeueInterval = setInterval(() => {
      dequeueCar(currentLight); // Dequeue from the current light's queue
    }, 2000); // Dequeue a car every 2 seconds

    return () => clearInterval(dequeueInterval);
  }, [currentLight]);

  const cycleLights = () => {
    // Logic to cycle lights
    // This is called the round robin logic, it basically circles through the lights in a loop
    const nextIndex =
      (directions.indexOf(currentLight) + 1) % directions.length;
    // This finds the direction of the current light in the directions array and then loads the next direction in nextIndex
    setCurrentLight(directions[nextIndex]);
    // Sets the current light to the next direction
    setLightState("green");
  };

  // This function adds the cars to the particular direction queue
  const addCarToQueue = (direction) => {
    setQueues((prev) => ({
      // This setQueues functions queues for all the directions
      ...prev, // Spreads the data of other directions which aren't in the parameter
      [direction]: [...prev[direction], `Car ${prev[direction].length + 1}`],
      // Takes the direction which was given in the parameter, fills the previously added cars in the array and then adds a new one
    }));
  };

  // This function removes the car from the array
  const dequeueCar = (direction) => {
    setQueues((prev) => ({
      // Same as addCar part
      ...prev,
      [direction]:
        prev[direction].length > 0 ? prev[direction].slice(1) : prev[direction],
      // So this checks the length of the length of the current queue and then creates a copy of the queue starting from the 1st index so that it removes the top car
    }));
  };

  return (
    // Returns the html to the website
    <div className="App">
      <h1>Traffic Light Simulation</h1>
      <hr />
      <div className="intersection">
        {/* Creates the queue for each direction */}
        {directions.map((direction) => (
          // Key allows each division to be identified by the direction
          <div key={direction} className="lane">
            <button
              onClick={() => addCarToQueue(direction)} // Adds cars to queue after cicked on the button
              className="add-car-button"
            >
              Add Car to {direction}
            </button>
            <TrafficLight
              direction={direction}
              state={currentLight === direction ? lightState : "red"}
              // Passes the current direction and state as parameters to the component
            />

            <QueueDisplay queue={queues[direction]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

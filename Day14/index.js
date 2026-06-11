const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("start", () => {
  console.log("started");
});

eventEmitter.on("nemRevise", () => {
  console.log("This is EDA for nem");
});
eventEmitter.emit("start");

setInterval(() => {
  eventEmitter.emit("nemRevise");
}, 2000);

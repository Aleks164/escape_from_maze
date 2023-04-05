function resultReceiver(event) {
  postMessage(event);
}
const worker = new Worker("fibonacci.js");
worker.onmessage = resultReceiver;

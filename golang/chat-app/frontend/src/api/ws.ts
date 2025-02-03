const socket = new WebSocket("ws://localhost:8080/ws");

function connect(c: (message: MessageEvent) => void) {
  console.info("Attempting to connect to WebSocket");

  socket.onopen = () => {
    console.info("Successfully connected to WebSocket");
  };

  socket.onmessage = (message) => {
    console.info(message);
    c(message);
  };

  socket.onclose = (event) => {
    console.info("WebSocket connection closed: ", event);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error: ", error);
  };
}

function sendMessage(message: string) {
  console.info("Sending message: ", message);

  socket.send(message);
}

export { connect, sendMessage };

let socket = null;
const form = document.querySelector("#form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = form.querySelector("input");

  if (input.value) {
    socket = new WebSocket(`ws://${location.hostname}:3000`);
    socket.onopen = function (event) {
      console.log("WebSocket connected!");
      if (socket.readyState === 1) {
        const notConnected = document.querySelector("#notConnected");
        notConnected.remove();
        form.remove();
        const root = document.querySelector("#root");
        root.insertAdjacentHTML(
          "beforeend",
          `<form id="message">
        <label>Message from ${input.value}: <input type="text" id="text"></label>
        <button>Send</button>
        </form>`
        );
        handleSubmit(input.value);

      }
    };
            socket.onmessage = function (event) {
                console.log(1);
            console.log("Received message:", event);
            displayMessage(JSON.parse(event.data));
          };
  }
});
function handleSubmit(name) {
  const newForm = document.querySelector("#message");
  newForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = newForm.querySelector("#text");

    if (input.value) {
      sendMessage(JSON.stringify({name, msg: input.value}));
      input.value = "";
    }
  });
}

function sendMessage(message) {
  socket.send(message);
}

function displayMessage(message) {
  const messagesDiv = document.getElementById("root");
  const messageParagraph = document.createElement("p");
  const today = new Date().toLocaleTimeString();
  console.log(today);
  messageParagraph.textContent = `[${today}]${message.name} : ${message.msg}`;
  messagesDiv.appendChild(messageParagraph);
}
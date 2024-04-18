document.addEventListener("DOMContentLoaded", function () {
  const producerConsumerForm = document.getElementById(
    "producer-consumer-form"
  );

  producerConsumerForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission

    // Get user input
    const bufferSize = Number.parseInt(
      document.getElementById("buffer-size").value
    );
    const numProducers = Number.parseInt(
      document.getElementById("num-producers").value
    );
    const numConsumers = Number.parseInt(
      document.getElementById("num-consumers").value
    );

    // Validate input
    if (
      Number.isNaN(bufferSize) ||
      Number.isNaN(numProducers) ||
      Number.isNaN(numConsumers) ||
      bufferSize <= 0 ||
      numProducers <= 0 ||
      numConsumers <= 0
    ) {
      alert(
        "Please enter valid positive numbers for buffer size, number of producers, and number of consumers."
      );
      return;
    }

    // Initialize buffer
    const buffer = [];
    const producerIndex = 0;
    let consumerIndex = 0;

    // Producer function
    // function produce() {
    //   if (buffer.length < bufferSize) {
    //     buffer.push(`Item ${producerIndex}`);
    //   } else {
    //     alert("Buffer is full. Producer cannot produce.");
    //     return;
    //   }
    // }

    // Consumer function
    // function consume() {
    //   if (buffer.length > 0) {
    //     buffer.shift();
    //     consumerIndex++;
    //   } else {
    //     alert("Buffer is empty. Consumer cannot consume.");
    //   }
    // }

    // Execute producer functions
    for (let i = 0; i < numProducers; i++) {
      if (buffer.length < bufferSize) {
        buffer.push(`Item ${producerIndex + 1}`);
      } else {
        alert("Buffer is full. Producer cannot produce.");
        break;
      }
    }

    // Execute consumer functions
    for (let i = 0; i < numConsumers; i++) {
      if (buffer.length > 0) {
        buffer.shift();
        consumerIndex++;
      } else {
        alert("Buffer is empty. Consumer cannot consume.");
        break;
      }
    }

    // Display output
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = `<p>Buffer: [${buffer.join(", ")}]</p>`;
  });
});

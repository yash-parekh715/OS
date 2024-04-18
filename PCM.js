document.addEventListener("DOMContentLoaded", function() {
    const producerConsumerForm = document.getElementById("producer-consumer-form");

    producerConsumerForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Get user input
        const bufferSize = parseInt(document.getElementById("buffer-size").value);
        const numProducers = parseInt(document.getElementById("num-producers").value);
        const numConsumers = parseInt(document.getElementById("num-consumers").value);

        // Validate input
        if (isNaN(bufferSize) || isNaN(numProducers) || isNaN(numConsumers) || bufferSize <= 0 || numProducers <= 0 || numConsumers <= 0) {
            alert("Please enter valid positive numbers for buffer size, number of producers, and number of consumers.");
            return;
        }

        // Simulate producer-consumer problem
        const buffer = [];
        let producerIndex = 0;
        let consumerIndex = 0;

        // Producer function
        function produce() {
            if (buffer.length < bufferSize) {
                buffer.push(`Item ${producerIndex}`);
                producerIndex++;
            }
        }

        // Consumer function
        function consume() {
            if (buffer.length > 0) {
                buffer.shift();
                consumerIndex++;
            }
        }

        // Execute producer and consumer functions
        for (let i = 0; i < numProducers; i++) {
            produce();
        }

        for (let i = 0; i < numConsumers; i++) {
            consume();
        }

        // Display output
        const outputContainer = document.getElementById("output-container");
        outputContainer.innerHTML = `<p>Buffer: [${buffer.join(", ")}]</p>`;
    });
});

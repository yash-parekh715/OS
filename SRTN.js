function addProcesses() {
  const numProcesses = Number.parseInt(
    document.getElementById("num-processes").value
  );
  let html =
    "<table><tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th></tr>";
  for (let i = 1; i <= numProcesses; i++) {
    html += `<tr>
                    <td>Process ${i}</td>
                    <td><input type="number" id="arrival-time-${i}"></td>
                    <td><input type="number" id="burst-time-${i}"></td>
                </tr>`;
  }
  html +=
    '</table><button onclick="calculate()" class="calculate">Calculate</button>';
  document.getElementById("process-input").innerHTML = html;
}
function calculate() {
  const numProcesses = Number.parseInt(
    document.getElementById("num-processes").value
  );
  let arrivalTime = [];
  let burstTime = [];
  let finishTime = new Array(numProcesses + 1).fill(0);
  let waitingTime = new Array(numProcesses + 1).fill(0);
  let turnaroundTime = new Array(numProcesses + 1).fill(0);
  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;

  for (let i = 1; i <= numProcesses; i++) {
    arrivalTime[i] = Number.parseInt(
      document.getElementById(`arrival-time-${i}`).value
    );
    burstTime[i] = Number.parseInt(
      document.getElementById(`burst-time-${i}`).value
    );
  }

  let currentTime = 0;
  let completed = 0;
  while (completed !== numProcesses) {
    let minBurst = Infinity;
    let minIndex = -1;

    for (let i = 1; i <= numProcesses; i++) {
      if (
        burstTime[i] > 0 &&
        burstTime[i] < minBurst &&
        arrivalTime[i] <= currentTime
      ) {
        minBurst = burstTime[i];
        minIndex = i;
      }
    }

    if (minIndex === -1) {
      currentTime++;
      continue;
    }

    burstTime[minIndex]--;
    currentTime++;

    if (burstTime[minIndex] === 0) {
      finishTime[minIndex] = currentTime;
      turnaroundTime[minIndex] = finishTime[minIndex] - arrivalTime[minIndex];
      waitingTime[minIndex] =
        turnaroundTime[minIndex] -
        Number.parseInt(
          document.getElementById(`burst-time-${minIndex}`).value
        );
      totalWaitingTime += waitingTime[minIndex];
      totalTurnaroundTime += turnaroundTime[minIndex];
      completed++;
    }
  }

  const avgWaitingTime = totalWaitingTime / numProcesses;
  const avgTurnaroundTime = totalTurnaroundTime / numProcesses;

  let outputTable =
    "<tr><th>Process ID</th><th>Arrival Time</th><th>Burst Time</th><th>Finish Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";
  for (let i = 1; i <= numProcesses; i++) {
    outputTable += `<tr>
                              <td>Process ${i}</td>
                              <td>${arrivalTime[i]}</td>
                              <td>${Number.parseInt(
                                document.getElementById(`burst-time-${i}`).value
                              )}</td>
                              <td>${finishTime[i]}</td>
                              <td>${waitingTime[i]}</td>
                              <td>${turnaroundTime[i]}</td>
                          </tr>`;
  }
  outputTable += `<tr><td colspan="4">Average</td><td>${avgWaitingTime.toFixed(
    2
  )}</td><td>${avgTurnaroundTime.toFixed(2)}</td></tr>`;

  document.getElementById("output-table").innerHTML = outputTable;
}

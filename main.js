let toggleStatus = 0;
let toggleStatusIcon = document.querySelector('#openNclose i');
function toggleMenu() {
    if (toggleStatus == 1) {
        document.querySelector('.form-container').style.display = 'none';
        document.getElementById('deletePoll').style.display = 'flex';
        document.querySelector('.container').style.display = 'block';
        toggleStatusIcon.classList.remove('fa-xmark');
        toggleStatusIcon.classList.add('fa-list');
        toggleStatus = 0;
    }
    else if (toggleStatus == 0) {
        document.querySelector('.form-container').style.display = 'flex';
        document.getElementById('deletePoll').style.display = 'none';
        document.querySelector('.container').style.display = 'none';
        toggleStatusIcon.classList.remove('fa-list');
        toggleStatusIcon.classList.add('fa-xmark');
        toggleStatus = 1;
    }
}

// Check if polls exist in localStorage
let polls = localStorage.getItem('polls');
if (polls) {
    polls = JSON.parse(polls);
} else {
    // Define an array of poll objects if not found in localStorage
    polls = [
        {
            name: "Poll 1",
            options: [
                { text: "Option 1", votes: 0 },
                { text: "Option 2", votes: 0 },
                { text: "Option 3", votes: 0 }
            ]
        },
        {
            name: "Poll 2",
            options: [
                { text: "Option 4", votes: 0 },
                { text: "Option 5", votes: 0 },
                { text: "Option 6", votes: 0 }
            ]
        }
        // Add more poll objects as needed
    ];
}

// Function to create polls from the array
function createPolls() {
  const pollsContainer = document.getElementById("pollsContainer");

  polls.forEach(function(poll, pollIndex) {
      const pollElement = document.createElement("div");
      pollElement.className = "poll";
      pollElement.innerHTML = "<h2>" + poll.name + "</h2>";

      const optionsElement = document.createElement("div");
      optionsElement.className = "options";
      poll.options.forEach(function(option, optionIndex) {
          const optionButton = document.createElement("button");
          optionButton.className = "optionButton";
          optionButton.textContent = option.text;

          const voteCount = document.createElement("span");
          voteCount.className = "voteCount";
          voteCount.textContent = option.votes;

          const optionContainer = document.createElement("div");
          optionContainer.className = "option";
          optionContainer.appendChild(optionButton);
          optionContainer.appendChild(voteCount);

          optionsElement.appendChild(optionContainer);
      });

      pollElement.appendChild(optionsElement);
      pollsContainer.appendChild(pollElement);
  });
}


// Function to handle the vote
function vote(pollIndex, optionIndex) {
    polls[pollIndex].options[optionIndex].votes++; // Increment the vote count for the selected option
    console.log("Selected option for Poll " + (pollIndex + 1) + ":", polls[pollIndex].options[optionIndex].text);
    console.log("Votes for Poll " + (pollIndex + 1) + ":", polls[pollIndex].options[optionIndex].votes);

    // Update the vote count displayed on the page
    const voteCountElements = document.getElementsByClassName("voteCount");
    voteCountElements[pollIndex * polls[pollIndex].options.length + optionIndex].textContent = polls[pollIndex].options[optionIndex].votes;

    // Save polls in localStorage
    localStorage.setItem('polls', JSON.stringify(polls));

    // Perform AJAX request or any other necessary action here
}

// Event listener for voting
document.getElementById("pollsContainer").addEventListener("click", function(event) {
  if (event.target.classList.contains("optionButton")) {
      const pollElement = event.target.closest(".poll");
      const pollIndex = Array.from(pollElement.parentElement.children).indexOf(pollElement);

      const optionContainer = event.target.parentElement;
      const optionIndex = Array.from(optionContainer.parentElement.children).indexOf(optionContainer);

      // Update the vote count for the selected option
      polls[pollIndex].options[optionIndex].votes += 1;

      // Update the vote count element
      const voteCountElement = optionContainer.querySelector(".voteCount");
      voteCountElement.textContent = polls[pollIndex].options[optionIndex].votes;

      // Save the updated polls array to localStorage
      localStorage.setItem("polls", JSON.stringify(polls));
  }
});


// Call the createPolls function to generate the polls from the array
createPolls();
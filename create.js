document.getElementById("addOptionButton").addEventListener("click", function(event) {
    event.preventDefault();
  
    const optionsContainer = document.getElementById("optionsContainer");
    const optionInputCount = optionsContainer.querySelectorAll(".option-input").length;
  
    const newOptionInput = document.createElement("div");
    newOptionInput.className = "option-input";
    newOptionInput.innerHTML = `<label for="option${optionInputCount + 1}">Option ${optionInputCount + 1}:</label>
                                <input type="text" id="option${optionInputCount + 1}" name="option${optionInputCount + 1}" required>`;
  
    optionsContainer.appendChild(newOptionInput);
  });
  
  document.getElementById("createPollForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Get form values
    const pollName = document.getElementById("pollName").value;
    const options = [];
  
    // Loop through option inputs
    const optionInputs = document.querySelectorAll('input[name^="option"]');
    optionInputs.forEach(function(input) {
        const optionText = input.value.trim();
        if (optionText !== "") {
            options.push({ text: optionText, votes: 0 });
        }
    });
  
    // Create poll object
    const newPoll = {
        name: pollName,
        options: options
    };
  
    // Check if polls exist in localStorage
    let polls = localStorage.getItem('polls');
    if (polls) {
        polls = JSON.parse(polls);
    } else {
        polls = [];
    }
  
    // Add new poll to the polls array
    polls.push(newPoll);
  
    // Save polls in localStorage
    localStorage.setItem('polls', JSON.stringify(polls));
  
    // Redirect to the main voting page
    window.location.href = "index.html";
  });
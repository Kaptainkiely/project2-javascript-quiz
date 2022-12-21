function checkAnswer() {
    var result = document.getElementById("result");
    var answer = document.querySelector('input[name="answer"]:checked').value;
    if (answer === "a") {
      result.innerHTML = "Correct!";
    } else {
      result.innerHTML = "Incorrect. The correct answer is Asia.";
    }
  }
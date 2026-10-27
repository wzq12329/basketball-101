// Basketball 101 — Quiz logic
(function () {
  var quiz = document.getElementById("quiz");
  if (!quiz) return;

  var questions = [
    {
      q: "How tall are you compared to your friends?",
      options: [
        { text: "Short — I'm usually the shortest", score: { PG: 3 } },
        { text: "Average — around middle", score: { SG: 2, SF: 1 } },
        { text: "Tall — I stand out", score: { PF: 2, C: 2 } }
      ]
    },
    {
      q: "What do you love doing most on court?",
      options: [
        { text: "Passing and setting up teammates", score: { PG: 3 } },
        { text: "Shooting from outside", score: { SG: 3 } },
        { text: "Driving to the basket", score: { SF: 2, PF: 1 } },
        { text: "Rebounding and defending the paint", score: { C: 3 } }
      ]
    },
    {
      q: "Which player type do you admire most?",
      options: [
        { text: "Playmakers like Chris Paul", score: { PG: 3 } },
        { text: "Clutch shooters like Klay Thompson", score: { SG: 3 } },
        { text: "All-round stars like LeBron James", score: { SF: 3 } },
        { text: "Dominant centers like Shaq", score: { C: 3 } }
      ]
    },
    {
      q: "What is your biggest strength?",
      options: [
        { text: "Vision and court awareness", score: { PG: 3 } },
        { text: "Shooting touch", score: { SG: 3 } },
        { text: "All-around versatility", score: { SF: 2, PF: 1 } },
        { text: "Size and physical presence", score: { C: 2, PF: 1 } }
      ]
    },
    {
      q: "Defense, you prefer to...",
      options: [
        { text: "Stick to the opposing point guard", score: { PG: 2, SG: 1 } },
        { text: "Chase the opposing shooter", score: { SG: 2, SF: 1 } },
        { text: "Guard the paint and protect the rim", score: { C: 3, PF: 1 } }
      ]
    }
  ];

  var positions = {
    PG: "Point Guard (PG) — The Floor General",
    SG: "Shooting Guard (SG) — The Scorer",
    SF: "Small Forward (SF) — The All-Rounder",
    PF: "Power Forward (PF) — The Workhorse",
    C:  "Center (C) — The Paint Protector"
  };

  var current = 0;
  var scores = { PG: 0, SG: 0, SF: 0, PF: 0, C: 0 };

  var questionEl = quiz.querySelector(".quiz-question");
  var optionsEl  = quiz.querySelector(".quiz-options");
  var resultEl   = quiz.querySelector(".quiz-result");
  var progressEl = quiz.querySelector(".quiz-progress-bar");

  function showQuestion() {
    var item = questions[current];
    progressEl.style.width = (current / questions.length * 100) + "%";
    questionEl.textContent = "Q" + (current + 1) + ": " + item.q;
    optionsEl.innerHTML = "";
    resultEl.hidden = true;

    item.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = opt.text;
      btn.addEventListener("click", function () {
        Object.keys(opt.score).forEach(function (pos) {
          scores[pos] += opt.score[pos];
        });
        current++;
        if (current < questions.length) {
          showQuestion();
        } else {
          showResult();
        }
      });
      optionsEl.appendChild(btn);
    });
  }

  function showResult() {
    progressEl.style.width = "100%";
    questionEl.textContent = "Your result";
    optionsEl.innerHTML = "";

    var best = "PG", bestScore = -1;
    Object.keys(scores).forEach(function (pos) {
      if (scores[pos] > bestScore) {
        best = pos;
        bestScore = scores[pos];
      }
    });

    resultEl.innerHTML =
      "<p>You are most like</p>" +
      "<p class='big'>" + positions[best] + "</p>" +
      "<button class='quiz-restart'>Try again</button>";
    resultEl.hidden = false;

    resultEl.querySelector(".quiz-restart").addEventListener("click", function () {
      current = 0;
      scores = { PG: 0, SG: 0, SF: 0, PF: 0, C: 0 };
      showQuestion();
    });
  }

  showQuestion();
})();
const questionEl = document.getElementById("mathText");
const announcer = document.getElementById("announcer");
const scoreVal = document.getElementById("scoreValue");
const buttons = document.querySelectorAll(".choice-btn");

// Audio elements
const correctSfx = document.getElementById("correctSound");
const wrongSfx = document.getElementById("wrongSound");

let correctAnswer;
let score = 0;

function generateQuestion() {
    announcer.textContent = "";
    
    let n1 = Math.floor(Math.random() * 20) + 1;
    let n2 = Math.floor(Math.random() * 20) + 1;
    correctAnswer = n1 + n2;
    
    questionEl.textContent = `${n1} + ${n2}`;

    let options = [correctAnswer];
    while (options.length < 4) {
        let wrong = correctAnswer + (Math.floor(Math.random() * 11) - 5);
        if (!options.includes(wrong) && wrong >= 0) {
            options.push(wrong);
        }
    }

    options.sort(() => Math.random() - 0.5);

    buttons.forEach((btn, index) => {
        btn.textContent = options[index];
        btn.style.pointerEvents = "auto"; 
        btn.onclick = () => checkAnswer(parseInt(btn.textContent));
    });
}

function checkAnswer(selected) {
    buttons.forEach(btn => btn.style.pointerEvents = "none");

    if (selected === correctAnswer) {
        // Success Logic
        announcer.textContent = "Correct";
        announcer.style.color = "#00f2fe";
        score++;
        correctSfx.currentTime = 0; // Restart sound if clicked fast
        correctSfx.play().catch(e => {}); // Catch block prevents error if browser blocks audio
    } else {
        // Failure Logic
        announcer.textContent = "Wrong";
        announcer.style.color = "#ff7675";
        score = Math.max(0, score - 1);
        wrongSfx.currentTime = 0;
        wrongSfx.play().catch(e => {});
    }

    scoreVal.textContent = score;
    setTimeout(generateQuestion, 1000);
}

// Initial Call
generateQuestion();
document.addEventListener("DOMContentLoaded", function () {
    // 時間選択処理
    const timeButtons = document.querySelectorAll(".time-select");
    if (timeButtons.length > 0) {
        timeButtons.forEach(button => {
            button.addEventListener("click", function () {
                const selectedTime = this.getAttribute("data-time");
                localStorage.setItem("gameTime", selectedTime);
                window.location.href = "game.html"; // ゲーム画面に遷移
            });
        });
    }

    // ゲーム画面の処理
    if (document.getElementById("clickButton")) {
        let score = 0;
        let timeLeft = parseInt(localStorage.getItem("gameTime")) || 30;

        document.getElementById("timer").textContent = timeLeft;

        document.getElementById("clickButton").addEventListener("click", function () {
            score++;
            document.getElementById("score").textContent = score;
        });

        let timer = setInterval(() => {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                localStorage.setItem("score", score);
                window.location.href = "result.html"; // 結果画面に遷移
            }
        }, 1000);
    }

    // 結果画面の処理
    if (document.getElementById("finalScore")) {
        document.getElementById("finalScore").textContent = localStorage.getItem("score");
    }
});

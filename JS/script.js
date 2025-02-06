document.addEventListener("DOMContentLoaded", function () {
    const timeButtons = document.querySelectorAll(".time-select");

    // 時間選択画面の処理
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
        let bestScore = parseInt(localStorage.getItem("bestScore")) || 0;
        const totalTime = timeLeft;

        const timerElement = document.getElementById("timer");
        const scoreElement = document.getElementById("score");
        const bestScoreElement = document.getElementById("bestScore");
        const clickButton = document.getElementById("clickButton");

        // 初期値表示
        timerElement.textContent = timeLeft;
        scoreElement.textContent = score;
        bestScoreElement.textContent = bestScore;

        let isBlinking = false;

        // サウンドのロード
        const clickSound = new Audio("sound/sound1.mp3");

        clickButton.addEventListener("click", function () {
            score++;
            scoreElement.textContent = score;

            // サウンドを再生
            clickSound.currentTime = 0; // 再生位置をリセット
            clickSound.play();

            // ベストスコアを超えたら更新中を点滅
            if (score > bestScore && !isBlinking) {
                isBlinking = true;
                bestScoreElement.textContent = "ベストスコア更新中!";
                bestScoreElement.classList.add("blinking");
            }
        });

        let timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);

                // スコアがベストスコアを超えていたら保存
                if (score > bestScore) {
                    localStorage.setItem("bestScore", score);
                }

                // 1秒あたりの連打数を計算して保存
                const tapsPerSecond = (score / totalTime).toFixed(2);
                localStorage.setItem("tapsPerSecond", tapsPerSecond);

                localStorage.setItem("score", score);
                window.location.href = "result.html"; // 結果画面に遷移
            }
        }, 1000);
    }

    // 結果画面の処理
    if (document.getElementById("finalScore")) {
        const score = localStorage.getItem("score");
        const bestScore = localStorage.getItem("bestScore");
        const tapsPerSecond = localStorage.getItem("tapsPerSecond");
        
        document.getElementById("finalScore").textContent = score;
        document.getElementById("bestScoreResult").textContent = bestScore;
        document.getElementById("tapsPerSecond").textContent = tapsPerSecond;

        // サウンド再生
        const scoreSound = new Audio("sound/score.mp3");
        const bestSound = new Audio("sound/best_score.mp3");

        // スコア音を再生し、その後に条件に応じてベストスコア音を再生
        scoreSound.play();
        scoreSound.onended = function () {
            if (parseInt(score) === parseInt(bestScore)) {
                bestSound.play();
            }
        };
    }
});

//シークレットパワーcss改改
document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const imageElement = document.querySelector(".fit-picture");
    const clickButton = document.getElementById("clickButton");

    clickButton.addEventListener("click", function () {
        score++;
        scoreElement.textContent = score;
        
        let scale = 1 + score * 0.1; // 10%ずつ大きくなる
        
        if (score < 20) {
            // 右下にずれる（例: 2pxずつ右下へ移動）
            imageElement.style.left = `${10 + score * 2}px`;
            imageElement.style.top = `${10 + score * 2}px`;
            imageElement.style.transform = `scale(${scale})`;
            imageElement.style.transform = `scaleY(0.2)`;  // 縦方向に縮小（0.2倍）
            // 0.02秒後に元の縦のスケールに戻す
            setTimeout(() => {
                imageElement.style.transform = `scale(${scale})`;  // 元のスケールに戻す
            }, 50);  // 20ms後に実行
        } else {
            // 中央に固定し、拡大を続ける
            imageElement.style.left = "50%";
            imageElement.style.top = "50%";
            imageElement.style.transformOrigin = "center";
            imageElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const clickButton = document.getElementById("clickButton");

    clickButton.addEventListener("click", function () {
        score++;
        scoreElement.textContent = score;
        
        // スコアが200を超えたらボタンを光らせる
        if (score > 100) {
            clickButton.classList.add("glow-effect");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    let score = 0;
    const scoreElement = document.getElementById("score");
    const clickButton = document.getElementById("clickButton");
    const powerMessage = document.getElementById("powerMessage");

    clickButton.addEventListener("click", function () {
        score++;
        scoreElement.textContent = score;
        
        // スコアが200を超えたらPOWER文字を表示する
        if (score > 200) {
            powerMessage.classList.remove("hidden"); // 表示する
            powerMessage.classList.add("glow-effect-background"); // 背景光るエフェクト
            togglePowerMessage(); // 文字の表示/非表示を切り替え
        }
    });

    function togglePowerMessage() {
        setInterval(function() {
            if (powerMessage.style.opacity == 0 || powerMessage.style.opacity == '') {
                powerMessage.style.opacity = 1;
            } else {
                powerMessage.style.opacity = 0;
            }
        }, 1500); // 0.5秒ごとに切り替え
    }
});

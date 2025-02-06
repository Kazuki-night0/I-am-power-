document.addEventListener("DOMContentLoaded", function () {
    let finalScore = localStorage.getItem("finalScore") || 0;
    let bestScore = localStorage.getItem("bestScore") || 0;
    let tapsPerSecond = (finalScore / 10).toFixed(2); // 例: 10秒のゲーム時間

    animateScore("finalScore", finalScore);
    animateScore("bestScoreResult", bestScore);
    animateScore("tapsPerSecond", tapsPerSecond);

    function animateScore(elementId, targetValue) {
        let element = document.getElementById(elementId);
        let startValue = 0;
        let duration = 1000; // 1秒
        let stepTime = 10; // 10msごとに更新
        let steps = duration / stepTime;
        let increment = targetValue / steps;
        
        let counter = setInterval(() => {
            startValue += increment;
            if (startValue >= targetValue) {
                startValue = targetValue;
                clearInterval(counter);
            }
            element.textContent = Math.round(startValue);
        }, stepTime);
    }
});

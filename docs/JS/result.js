document.addEventListener("DOMContentLoaded", function () {
    // ローカルストレージからスコアを取得
    let finalScore = localStorage.getItem("finalScore") || 0;
    let bestScore = localStorage.getItem("bestScore") || 0;
    let tapsPerSecond = (finalScore / 10).toFixed(2); // 例: 10秒のゲーム時間

    // スコアをアニメーションで表示
    animateScore("finalScore", finalScore);
    animateScore("bestScoreResult", bestScore);
    animateScore("tapsPerSecond", tapsPerSecond);

    // ベストスコアを更新したら画像を変更
    const stalker = document.getElementById("stalker");
    const stalkerImg = stalker.querySelector("img");

    if (finalScore > bestScore) {
        localStorage.setItem("bestScore", finalScore);
        stalkerImg.src = "./media/gold.PNG"; // 画像をgold.pngに変更
    }

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

    // マウスストーキング処理
    let mouseX = 0, mouseY = 0;
    let imgX = 0, imgY = 0;

    document.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function moveImage() {
        imgX += (mouseX - imgX) * 0.2;
        imgY += (mouseY - imgY) * 0.2;
        stalker.style.transform = `translate(${imgX}px, ${imgY}px)`;
        requestAnimationFrame(moveImage);
    }

    moveImage();

    // ダンス用のアニメーションを追加
    function createDanceAnimation() {
        const style = document.createElement("style");
        style.textContent = `
            @keyframes dance {
                0% { transform: rotate(0deg) scale(1); }
                100% { transform: rotate(10deg) scale(1.2); }
            }
            .dancing {
                animation: dance 0.5s infinite alternate;
            }
        `;
        document.head.appendChild(style);
    }
    createDanceAnimation();

    function makeItDance(element) {
        element.classList.add("dancing");
        setTimeout(() => {
            element.classList.remove("dancing");
        }, 3000); // 3秒間踊らせる
    }

    function cloneImage() {
        const clone = stalker.cloneNode(true);
        document.body.appendChild(clone);

        clone.style.position = "absolute";
        clone.style.left = `${Math.random() * window.innerWidth}px`;
        clone.style.top = `${Math.random() * window.innerHeight}px`;

        clone.addEventListener("click", function () {
            makeItDance(clone);
            cloneImage();
        });

        makeItDance(clone);
    }

    stalker.addEventListener("click", function () {
        makeItDance(stalker);
        cloneImage();
    });
});

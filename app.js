document.addEventListener('DOMContentLoaded', () => {
    //variables 
    const bird = document.querySelector('.bird')
    const space = document.querySelector('.space')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    const gameoverimage = document.querySelector('.game-over')
    const scorey = document.querySelector('score')

    let birdLeft = 220
    let birdBottom = 220
    let gravity = 4
    let isGameOver = false
    let gap = 470
    let birddegree = 0
    let score = 0
    var coin = new Audio('coin.mp3')
    var wtf = new Audio('wtf.mp3')
    wtf.volume = 0.3;
    var au21 = new Audio('21.mp3')

    var hes21 = false



    //gravity
    function startGame() {

        console.log(birdBottom)
        birdBottom -= gravity
        bird.style.bottom = birdBottom + "px"

    }
    let gametimerID = setInterval(startGame, 20)




    function rotateBird() {
        birddegree += 1



        if (birddegree < 90 && !isGameOver) {
            let finedegree = birddegree + 3

            bird.style.transform = `rotate(${finedegree}deg)`;

        }


    }
    setInterval(rotateBird, 10)



    function changeOutfit() {

        if (!isGameOver) setTimeout(function () { bird.style.backgroundImage = "url(1.png)" }, 100)
        if (!isGameOver) setTimeout(function () { bird.style.backgroundImage = "url(2.png)" }, 200)

        if (!isGameOver) setTimeout(function () { bird.style.backgroundImage = "url(3.png)" }, 300)
        if (!isGameOver) setTimeout(function () { bird.style.backgroundImage = "url(2.png)" }, 400)



    }
    changeOutfit()
    let changeoutfitID = setInterval(changeOutfit, 500)













    function jumpy() {

        for (let i = 0; i < 10; i++) {


            setTimeout(() => {
                if (birdBottom <= 560) {
                    birdBottom += 10;
                    bird.style.bottom = birdBottom
                    birddegree = -45
                }

            }, 16 * i)


        }


    }














    //jump when spacebar clicked
    function jump(click) {
        if (click.keyCode === 32) {

            jumpy()




        }
    }
    document.addEventListener('keyup', jump)

    //generate obstacle every 3 seconds 
    function genrateObstacles() {
        score = score + 1;


        let obstacleLeft = 500
        let randomHeight = Math.random() * 158
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topobstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add("obstacle")
            topobstacle.classList.add("top-obstacle")
            obstacle.style.left = obstacleLeft + "px"
            obstacle.style.bottom = obstacleBottom + "px"
            topobstacle.style.left = obstacleLeft + "px"
            topobstacle.style.bottom = obstacleBottom + gap + "px"
            gameDisplay.appendChild(obstacle)
            gameDisplay.appendChild(topobstacle)
            function moveObstacle() {
                if (!isGameOver) {
                    obstacleLeft -= 2
                    obstacle.style.left = obstacleLeft + "px"
                    topobstacle.style.left = obstacleLeft + "px"
                }
                if (obstacleLeft <= -60) {
                    clearInterval(timerId)
                    gameDisplay.removeChild(obstacle)
                    gameDisplay.removeChild(topobstacle)
                }
                //collision detection 
                if (obstacleLeft > 200 && obstacleLeft < 280) {



                    document.getElementById("score").innerText = "     ";
                    document.getElementById("score").innerText += score;

                    if (score == 21 && !hes21) {

                        au21.play()
                        hes21 = true;
                    }
                    else {

                        coin.play()
                    }

                    if ((birdBottom < obstacleBottom + 150 || birdBottom > obstacleBottom + gap - 200)
                        || birdBottom === 0) {
                        gameover()

                        gravity = 10
                        clearInterval(timerId)

                    }
                }
            }


        }
        let timerId = setInterval(moveObstacle, 20)
        setTimeout(genrateObstacles, 3500)





    }
    genrateObstacles()






















    //game over
    function gameover() {

        wtf.play()
        //clearInterval(gametimerID)
        isGameOver = true
        gameoverimage.style.display = "block"
        document.removeEventListener('keyup', jump)
    }




















})


function myFunction() {

    location.reload();
}









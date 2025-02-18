const score = JSON.parse(localStorage.getItem('score')) || {
    wins : 0,
    losses : 0,
    ties : 0
};


updateScoreElement();

/*
if (!score) {
    score = {
        wins : 0,
        losses : 0,
        ties : 0
    }
}
    */

let isAutoPlaying = false;
let intervalId;

/*
const autoPlay = () => {

}
    */
function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        console.log(intervalId);
    }
}

document.querySelector('.js_rock_button')
    .addEventListener('click', () => {
        playGame('Rock');
    });

document.querySelector('.js_paper_button')
    .addEventListener('click', () => {
        playGame('Paper');
    });

document.querySelector('.js_scissors_button')
    .addEventListener('click', () => {
        playGame('Scissors');
    });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('Rock');
    }else if (event.key === 'p') {
        playGame('Paper');
    }else if (event.key === 's') {
        playGame('Scissors');
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';
    if (playerMove === 'Scissors') { 
        if (computerMove === 'Rock') {
            result = 'You Lose';
        } else if (computerMove === 'Paper') {
            result = 'You Win'; 
        } else if (computerMove === 'Scissors') {
            result = 'Tie'; 
        }

    } else if (playerMove === 'Paper') {
        if (computerMove === 'Rock') {
            result = 'You Win';
        } else if (computerMove === 'Paper') {
            result = 'Tie'; 
        } else if (computerMove === 'Scissors') {
            result = 'You Lose';
        }

    } else if (playerMove === 'Rock') {
        if (computerMove === 'Rock') {
            result = 'Tie';
        } else if (computerMove === 'Paper') {
            result = 'You Lose'; 
        } else if (computerMove === 'Scissors') {
            result = 'You Win';
        }
    }


    if (result === 'You Win') {
        score.wins += 1;
    } else if (result === 'You Lose') {
        score.losses += 1;
    } else if (result === 'Tie') {
        score.ties +=1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js_result')
        .innerHTML = result;

    document.querySelector('.js_moves')
        .innerHTML = `You
        <img src="jpg/${playerMove}-emoji.png" class="move_icon">
        <img src="jpg/${computerMove}-emoji.png" class="move_icon">
        computer`;

    if (document.querySelector('.js_result') === 0) {
            result = null;
        }

    
    /*
    alert(`You picked ${playerMove}, computer picked ${computerMove}, ${result} Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    */
}

function updateScoreElement() {
    document.querySelector('.js_score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    let computerMove = '';
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    }else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
    }else if (randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;
}
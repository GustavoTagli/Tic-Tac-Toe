const tic_tac_toe = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['X', 'O'],
        idx: 0,
        change: function () {
            this.idx = (this.idx === 0 ? 1 : 0);
        }
    },
    container_element: null,
    score: {
        playerX: null,
        playerO: null
    },
    clear: null,
    winner: null,
    game_mode: 'solo',
    gameover: false,
    winning_sequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    init: function (container, score) {
        this.container_element = container;
        this.score.playerX = score[0];
        this.score.playerO = score[1];
    },
    
    start: function () {
        this.board.fill('');
        this.draw();
        this.gameover = false;
        end_game_screen = document.querySelector('#gameOverScreen');
        end_game_screen.className = 'empity';
    },

    validationGameMode: function (mode1, mode2) {
        this.simbols.idx = 0;
        if (mode1.classList[0] !== 'selected') {
            tic_tac_toe.start();
        }
        if (mode1["id"] === 'solo') {
            this.game_mode = 'solo';
            mode1.classList.add('selected');
            mode2.classList.remove('selected');
        } else {
            this.game_mode = 'multiplayer';
            mode1.classList.add('selected');
            mode2.classList.remove('selected');
        }
    },

    makePlay: function (position) {
        if (this.gameover) return false;
        if (this.board[position] === '') {
            this.board[position] = this.simbols.options[this.simbols.idx];
            this.draw();
            let boardFull = !this.board.includes('');
            let winning_sequence_index = this.checkWinningSequence(this.simbols.options[this.simbols.idx]);
            if (winning_sequence_index >= 0 || boardFull) {
                this.gameIsOver(boardFull);
            } else {
                if (this.game_mode === 'solo') {
                    setTimeout(() => {
                        this.makePcPlay(boardFull)
                    }, 1000);
                    this.container_element.closest('main').classList.add('disabled_cursor');
                }
                this.simbols.change();
            }
            return true
        } else {
            return false
        }

    },

    makePcPlay: function (boardFull) {
        let ramdomNum = Math.floor(Math.random() * 9);
        
        if (!this.gameover) {
            while (this.board[ramdomNum] !== '') {
                ramdomNum = Math.floor(Math.random() * 9);
            }
            this.board[ramdomNum] = this.simbols.options[this.simbols.idx];
            this.draw();
            this.container_element.closest('main').classList.remove('disabled_cursor');
        }
        
        let winning_sequence_index = this.checkWinningSequence(this.simbols.options[this.simbols.idx]);
        if (winning_sequence_index >= 0 || boardFull){
            this.gameIsOver(boardFull);
        }else{
            this.simbols.change();
        }
    },

    draw: function () {
        let content_game = '';

        for (i in this.board) {
            content_game += '<div onclick="tic_tac_toe.makePlay(' + i + ')">' + this.board[i] + '</div>'
        }

        this.container_element.innerHTML = content_game + '<span id="line" class="empity"></span>';
    },

    clearScore: function(){
        this.score.playerX.innerHTML = '-';
        this.score.playerO.innerHTML = '-';
        this.score.playerX.closest('div').classList.remove('winningPlayer');
        this.score.playerO.closest('div').classList.remove('winningPlayer');
    },

    checkWinningSequence: function (simbol) {
        for (i in this.winning_sequences) {
            if (this.board[this.winning_sequences[i][0]] == simbol &&
                this.board[this.winning_sequences[i][1]] == simbol &&
                this.board[this.winning_sequences[i][2]] == simbol) {
                this.winner = simbol;
                this.drawingLine(this.winning_sequences[i]);
                return i;
            }
        }
        return -1;
    },

    gameIsOver: function (tie) {
        this.gameover = true;
        
        if(!tie){
            this.counterScore();
        }
    },

    counterScore: function(){
        let winner = (this.winner === 'X' ? this.score.playerX : this.score.playerO);
        let loser = (this.winner === 'X' ? this.score.playerO : this.score.playerX);
        let val = parseInt(winner.innerHTML.replace('-', '0'));
        val += 1;

        winner.innerHTML = val;
        winner.closest('div').classList.add('winningPlayer');
        loser.closest('div').classList.remove('winningPlayer');
    },

    drawingLine: function(winning_sequence){
        let line = document.querySelector('#line');
        
        if(winning_sequence[0] == 0 &
           winning_sequence[1] == 3 &
           winning_sequence[2] == 6){
            line.className = 'lineV1';
        }
        if(winning_sequence[0] == 1 &
           winning_sequence[1] == 4 &
           winning_sequence[2] == 7){
            line.className = 'lineV2';
        }
        if(winning_sequence[0] == 2 &
           winning_sequence[1] == 5 &
           winning_sequence[2] == 8){
            line.className = 'lineV3';
        }
        if(winning_sequence[0] == 0 &
           winning_sequence[1] == 1 &
           winning_sequence[2] == 2){
            line.className = 'lineH1';
        }
        if(winning_sequence[0] == 3 &
           winning_sequence[1] == 4 &
           winning_sequence[2] == 5){
            line.className = 'lineH2';
        }
        if(winning_sequence[0] == 6 &
           winning_sequence[1] == 7 &
           winning_sequence[2] == 8){
            line.className = 'lineH3';
        }
        if(winning_sequence[0] == 0 &
           winning_sequence[1] == 4 &
           winning_sequence[2] == 8){
            line.className = 'diagonal1';
        }
        if(winning_sequence[0] == 2 &
        winning_sequence[1] == 4 &
        winning_sequence[2] == 6){
           line.className = 'diagonal2';
        }
        setTimeout(() => {
            this.screenGameOver();
        }, 700);
    },

    screenGameOver: function(){
        end_game_screen = document.getElementById('gameOverScreen');
        end_game_screen.children[0].className = (this.winner === 'X' ? 'xis bigger' : 'circle');
        end_game_screen.className = 'endGame';
        end_game_screen.style.cursor = 'pointer'
    }
};
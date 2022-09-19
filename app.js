const menu = (function () {
	const mainMenu = document.querySelector("main");
	const startGame = document.querySelector(".start-game");
	const game = document.querySelector(".game-container");
	const homeButton = document.querySelector(".home");
	const inputOne = document.querySelector("#input1");
	const inputTwo = document.querySelector("#input2");
	const playerOneInfo = document.querySelector(".playerOneInfo");
	const playerTwoInfo = document.querySelector(".playerTwoInfo");
	homeButton.addEventListener("click", () => window.location.reload());

	let playerOneMode = "Player";
	let playerTwoMode = "Player";
	let players = [];

	function showGameboard() {
		if (!inputOne.value) inputOne.value = "Player 1";
		if (!inputTwo.value) inputTwo.value = "Player 2";
		playerOneInfo.textContent = inputOne.value;
		playerTwoInfo.textContent = inputTwo.value;
		mainMenu.classList.toggle("hide");
		game.classList.toggle("hide");
		pushPlayer();
	}

	function pushPlayer() {
		const playerOne = createPlayer(inputOne.value, "X", playerOneMode);
		const playerTwo = createPlayer(inputTwo.value, "O", playerTwoMode);
		players.push(playerOne, playerTwo);
	}

	startGame.addEventListener("click", showGameboard);

	return { players };
})();

const gameBoardModule = (function () {
	let gameBoard = ["", "", "", "", "", "", "", "", ""];

	const playerOne = "X";
	const playerTwo = "O";
	const winnerTitle = document.querySelector(".winner-title");
	const winner = document.querySelector(".winner");
	const rounds = document.querySelector(".rounds");
	const playAgain = document.querySelector(".play");
	const playerOneWins = document.querySelector(".playerOneWinCount");
	const playerTwoWins = document.querySelector(".playerTwoWinCount");
	const board = document.querySelector(".board");
	let unit = document.querySelectorAll(".unit");
	let round = 1;
	let turn;
	function playerStartsFirst() {
		turn = round;
		if (turn % 2 !== 0) turn = playerOne;
		else turn = playerTwo;
	}
	playerStartsFirst();

	for (const square of board.children) {
		square.classList.toggle("pointerEvents");
		square.addEventListener("click", () => {
			if (!gameBoard[square.dataset.board]) {
				if (turn === playerOne) {
					square.textContent = turn;
					gameBoard[square.dataset.board] = turn;
					turn = playerTwo;
				} else {
					square.textContent = turn;
					gameBoard[square.dataset.board] = turn;
					turn = playerOne;
				}
			}
			boardValidity();
		});
	}

	playAgain.addEventListener("click", resetBoard);

	function resetBoard() {
		rounds.textContent = `Round ${(round += 1)}`;
		winnerTitle.textContent = "ㅤ";
		winner.textContent = "ㅤ";
		playerStartsFirst();
		gameBoard = ["", "", "", "", "", "", "", "", ""];
		for (let i = 0; i < unit.length; i++) {
			unit[i].textContent = "";
		}
		if (unit[0].classList.contains("pointerEvents")) toggleEvent();
	}

	let playerOneWinCount = 0;
	let playerTwoWinCount = 0;

	function boardValidity() {
		if (playerOneWin()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = menu.players[0].name;

			playerOneWins.textContent = `Win Count: ${(playerOneWinCount += 1)}`;
			toggleEvent();
		} else if (playerTwoWin()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = menu.players[1].name;
			playerTwoWins.textContent = `Win Count: ${(playerTwoWinCount += 1)}`;
			toggleEvent();
		} else if (noWinners()) {
			winnerTitle.textContent = "It's a draw";
			toggleEvent();
		}
	}

	function noWinners() {
		let isBoardPositionTaken = 0;
		for (let i = 0; i < gameBoard.length; i++) {
			if (gameBoard[i]) isBoardPositionTaken++;
		}
		if (isBoardPositionTaken === 9) return true;
	}

	function toggleEvent() {
		for (let i = 0; i < unit.length; i++) {
			unit[i].classList.toggle("pointerEvents");
		}
	}

	const playerOneWin = () => checkWin(playerOne);
	const playerTwoWin = () => checkWin(playerTwo);

	function checkWin(player) {
		if (
			// check row
			(player === gameBoard[0] &&
				player === gameBoard[1] &&
				player === gameBoard[2]) ||
			(player === gameBoard[3] &&
				player === gameBoard[4] &&
				player === gameBoard[5]) ||
			(player === gameBoard[6] &&
				player === gameBoard[7] &&
				player === gameBoard[8]) ||
			// check column
			(player === gameBoard[0] &&
				player === gameBoard[3] &&
				player === gameBoard[6]) ||
			(player === gameBoard[1] &&
				player === gameBoard[4] &&
				player === gameBoard[7]) ||
			(player === gameBoard[2] &&
				player === gameBoard[5] &&
				player === gameBoard[8]) ||
			// check diagonal
			(player === gameBoard[0] &&
				player === gameBoard[4] &&
				player === gameBoard[8]) ||
			(player === gameBoard[2] &&
				player === gameBoard[4] &&
				player === gameBoard[6])
		)
			return true;
	}
})();

function createPlayer(name, symbol, mode) {
	return { name, symbol, mode };
}

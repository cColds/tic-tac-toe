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
		console.log(playerOne, playerTwo);
	}

	startGame.addEventListener("click", showGameboard);

	return { players };
})();

const Gameboard = (function () {
	let gameBoard = ["", "", "", "", "", "", "", "", ""];
	return { gameBoard };
})();

const playGame = (function () {
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
			if (!Gameboard.gameBoard[square.dataset.board]) {
				if (turn === playerOne) {
					square.textContent = turn;
					Gameboard.gameBoard[square.dataset.board] = turn;
					turn = playerTwo;
				} else {
					square.textContent = turn;
					Gameboard.gameBoard[square.dataset.board] = turn;
					turn = playerOne;
				}
			}
			checkWinner();
		});
	}

	playAgain.addEventListener("click", resetBoard);

	function resetBoard() {
		rounds.textContent = `Round ${(round += 1)}`;
		winnerTitle.textContent = "ㅤ";
		winner.textContent = "ㅤ";
		playerStartsFirst();
		Gameboard.gameBoard = ["", "", "", "", "", "", "", "", ""];
		unit.forEach((item) => (item.textContent = ""));
		if (unit[0].classList.contains("pointerEvents")) toggleUnitEvents();
	}

	let playerOneWinCount = 0;
	let playerTwoWinCount = 0;

	function checkWinner() {
		if (playerOneWin()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = menu.players[0].name;
			playerOneWins.textContent = `Win Count: ${(playerOneWinCount += 1)}`;
			toggleUnitEvents();
		} else if (playerTwoWin()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = menu.players[1].name;
			playerTwoWins.textContent = `Win Count: ${(playerTwoWinCount += 1)}`;
			toggleUnitEvents();
		} else if (noWinners()) {
			winnerTitle.textContent = "It's a draw";
			toggleUnitEvents();
		}
	}

	function noWinners() {
		let isBoardPositionTaken = 0;
		Gameboard.gameBoard.forEach((position) => {
			if (position) isBoardPositionTaken++;
		});
		if (isBoardPositionTaken === 9) return true;
	}

	function toggleUnitEvents() {
		unit.forEach((item) => item.classList.toggle("pointerEvents"));
	}

	const playerOneWin = () => checkPlayerWon(playerOne);
	const playerTwoWin = () => checkPlayerWon(playerTwo);

	function checkPlayerWon(player) {
		if (
			// check row
			(player === Gameboard.gameBoard[0] &&
				player === Gameboard.gameBoard[1] &&
				player === Gameboard.gameBoard[2]) ||
			(player === Gameboard.gameBoard[3] &&
				player === Gameboard.gameBoard[4] &&
				player === Gameboard.gameBoard[5]) ||
			(player === Gameboard.gameBoard[6] &&
				player === Gameboard.gameBoard[7] &&
				player === Gameboard.gameBoard[8]) ||
			// check column
			(player === Gameboard.gameBoard[0] &&
				player === Gameboard.gameBoard[3] &&
				player === Gameboard.gameBoard[6]) ||
			(player === Gameboard.gameBoard[1] &&
				player === Gameboard.gameBoard[4] &&
				player === Gameboard.gameBoard[7]) ||
			(player === Gameboard.gameBoard[2] &&
				player === Gameboard.gameBoard[5] &&
				player === Gameboard.gameBoard[8]) ||
			// check diagonal
			(player === Gameboard.gameBoard[0] &&
				player === Gameboard.gameBoard[4] &&
				player === Gameboard.gameBoard[8]) ||
			(player === Gameboard.gameBoard[2] &&
				player === Gameboard.gameBoard[4] &&
				player === Gameboard.gameBoard[6])
		)
			return true;
	}
})();

function createPlayer(name, symbol, mode) {
	return { name, symbol, mode };
}

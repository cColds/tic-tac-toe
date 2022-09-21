const menu = (function () {
	const mainMenu = document.querySelector("main");
	const startGame = document.querySelector(".start-game");
	const game = document.querySelector(".game-container");
	const homeButton = document.querySelector(".home");
	const inputOne = document.querySelector("#input1");
	const inputTwo = document.querySelector("#input2");
	const playerOneInfo = document.querySelector(".playerOneInfo");
	const playerTwoInfo = document.querySelector(".playerTwoInfo");
	const aiDifficultyOne = document.querySelector(".ai-difficulty-1");
	const aiDifficultyTwo = document.querySelector(".ai-difficulty-2");
	homeButton.addEventListener("click", () => window.location.reload());

	let playerOneSelected = "Player";
	let playerTwoSelected = "Player";
	let players = [];
	const playerOneMode = document.querySelector(".player-select-1");
	const aiOneMode = document.querySelector(".ai-select-1");
	const playerTwoMode = document.querySelector(".player-select-2");
	const aiTwoMode = document.querySelector(".ai-select-2");

	let aiDifficultyOneStored = ["Easy"];

	for (const diff1 of aiDifficultyOne.children) {
		diff1.addEventListener("click", () => {
			unselectDifficultyOne();
			diff1.classList.add("selected");
			aiDifficultyOneStored.length = 0;
			aiDifficultyOneStored.push(diff1.textContent);
		});
	}

	function unselectDifficultyOne() {
		for (const selectedItem of aiDifficultyOne.children) {
			selectedItem.classList.remove("selected");
		}
	}

	let aiDifficultyTwoStored = ["Easy"];

	for (const diff2 of aiDifficultyTwo.children) {
		diff2.addEventListener("click", () => {
			unselectDifficultyTwo();
			diff2.classList.add("selected");
			aiDifficultyTwoStored.length = 0;
			aiDifficultyTwoStored.push(diff2.textContent);
		});
	}

	function unselectDifficultyTwo() {
		for (const selectedItemTwo of aiDifficultyTwo.children) {
			selectedItemTwo.classList.remove("selected");
		}
	}

	playerOneMode.addEventListener("click", () => {
		playerOneMode.setAttribute("id", "selectedOne");
		aiOneMode.setAttribute("id", "");
		playerOneSelected = "Player";
		aiDifficultyOne.classList.add("hide");
		unselectDifficultyOne();
		aiDifficultyOne.children[0].classList.add("selected");
	});

	playerTwoMode.addEventListener("click", () => {
		playerTwoMode.setAttribute("id", "selectedOne");
		aiTwoMode.setAttribute("id", "");
		playerTwoSelected = "Player";
		aiDifficultyTwo.classList.add("hide");
		unselectDifficultyTwo();
		aiDifficultyTwo.children[0].classList.add("selected");
	});

	aiOneMode.addEventListener("click", () => {
		aiOneMode.setAttribute("id", "selectedOne");
		playerOneMode.setAttribute("id", "");
		playerOneSelected = "AI";
		aiDifficultyOne.classList.remove("hide");
	});

	aiTwoMode.addEventListener("click", () => {
		aiTwoMode.setAttribute("id", "selectedOne");
		playerTwoMode.setAttribute("id", "");
		playerTwoSelected = "AI";
		aiDifficultyTwo.classList.remove("hide");
	});

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
		if (playerOneSelected === "AI") {
			const aiOne = createPlayer(
				inputOne.value,
				"X",
				playerOneSelected,
				aiDifficultyOneStored[0]
			);
			playGame.getRandomAiMove("X");
			players.push(aiOne);
		} else {
			const playerOne = createPlayer(
				inputOne.value,
				"X",
				playerOneSelected
			);

			players.push(playerOne);
		}

		if (playerTwoSelected === "AI") {
			const aiTwo = createPlayer(
				inputTwo.value,
				"O",
				playerTwoSelected,
				aiDifficultyTwoStored[0]
			);

			players.push(aiTwo);
		} else {
			const playerTwo = createPlayer(
				inputTwo.value,
				"O",
				playerTwoSelected
			);
			players.push(playerTwo);
		}
		console.log(players);
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
		if (turn === playerTwo) {
			getRandomAiMove("O");
		}
	}
	playerStartsFirst();

	for (const square of board.children) {
		square.classList.toggle("pointerEvents");
		square.addEventListener("click", () => {
			const squarePosition = square.dataset.board;
			if (!Gameboard.gameBoard[squarePosition]) {
				if (
					menu.players[0].mode === "Player" &&
					menu.players[1].mode === "Player"
				) {
					if (turn === playerOne) {
						square.textContent = turn;
						Gameboard.gameBoard[squarePosition] = turn;
						turn = playerTwo;
					} else {
						square.textContent = turn;
						Gameboard.gameBoard[squarePosition] = turn;
						turn = playerOne;
					}
				} else if (
					menu.players[0].mode === "Player" &&
					menu.players[1].mode === "AI"
				) {
					square.textContent = "X";
					Gameboard.gameBoard[squarePosition] = "X";
					if (checkWinner(playerOne)) return;
					getRandomAiMove("O");
				}
				console.log(Gameboard.gameBoard);
				checkWinner();
			}
		});
	}

	function getRandomAiMove(squareMarker) {
		let filtered = [];
		for (let i = 0; i < Gameboard.gameBoard.length; i++) {
			if (!Gameboard.gameBoard[i]) filtered.push(i);
		}
		let randomSpot = filtered[Math.floor(Math.random() * filtered.length)];

		Gameboard.gameBoard[randomSpot] = squareMarker;
		aiMove(randomSpot, squareMarker);
		return squareMarker;
	}

	function aiMove(movePosition, marker) {
		const units = document.querySelectorAll(".unit");
		setTimeout(() => {
			return (units[movePosition].textContent = marker);
		}, 250);
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
			return true;
		} else if (playerTwoWin()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = menu.players[1].name;
			playerTwoWins.textContent = `Win Count: ${(playerTwoWinCount += 1)}`;
			toggleUnitEvents();
			return true;
		} else if (noWinners()) {
			winnerTitle.textContent = "It's a draw";
			toggleUnitEvents();
			return true;
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
	return { getRandomAiMove };
})();

const ai = (function () {})();

function createPlayer(name, marker, mode, difficulty) {
	if (difficulty) return { name, marker, mode, difficulty };
	else return { name, marker, mode };
}

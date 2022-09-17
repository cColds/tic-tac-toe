const ModuleOne = (function () {
	const mainMenu = document.querySelector("main");
	const playerSelectedOne = document.querySelector(".player-select-1");
	const aiSelectedOne = document.querySelector(".ai-select-1");
	const playerSelectedTwo = document.querySelector(".player-select-2");
	const aiSelectedTwo = document.querySelector(".ai-select-2");
	const errorOne = document.querySelector(".error1");
	const errorTwo = document.querySelector(".error2");
	const startGame = document.querySelector(".start-game");
	const game = document.querySelector(".game-container");
	const playerOneInfo = document.querySelector(".playerOneInfo");
	const playerTwoInfo = document.querySelector(".playerTwoInfo");
	const homeButton = document.querySelector(".home");
	const inputOne = document.querySelector("#input1");
	const inputTwo = document.querySelector("#input2");
	let clickedOne = false;
	let clickedTwo = false;
	playerSelectedOne.addEventListener("click", (e) => {
		if (aiSelectedOne.id) aiSelectedOne.setAttribute("id", "");
		e.target.setAttribute("id", "selectedOne");
		clickedOne = true;
	});

	aiSelectedOne.disabled = true;
	aiSelectedTwo.disabled = true;

	aiSelectedOne.addEventListener("click", (e) => {
		if (playerSelectedOne.id) playerSelectedOne.setAttribute("id", "");
		e.target.setAttribute("id", "selectedOne");
		clickedOne = true;
	});

	playerSelectedTwo.addEventListener("click", (e) => {
		if (aiSelectedTwo.id) aiSelectedTwo.setAttribute("id", "");
		e.target.setAttribute("id", "selectedTwo");
		clickedTwo = true;
	});

	aiSelectedTwo.addEventListener("click", (e) => {
		if (playerSelectedTwo.id) playerSelectedTwo.setAttribute("id", "");
		e.target.setAttribute("id", "selectedTwo");
		clickedTwo = true;
	});

	homeButton.addEventListener("click", () => {
		window.location.reload();
	});

	function validateInputs() {
		if (inputOne.value && inputTwo.value && clickedOne && clickedTwo) {
			mainMenu.classList.toggle("hide");
			game.classList.toggle("hide");
			playerOneInfo.textContent = inputOne.value;
			playerTwoInfo.textContent = inputTwo.value;
		} else {
			errorOne.textContent = "*Fill out a name and choose a mode";
			errorTwo.textContent = "*Fill out a name and choose a mode";
		}
	}

	startGame.addEventListener("click", validateInputs);

	return { inputOne, inputTwo };
})();

const gameBoardModule = (function () {
	let gameBoard = ["", "", "", "", "", "", "", "", ""];
	const playerOne = "X";
	const playerTwo = "O";
	const winnerTitle = document.querySelector(".winner-title");
	const winner = document.querySelector(".winner");
	const rounds = document.querySelector(".rounds");
	const playAgain = document.querySelector(".play");
	let round = 1;
	const playerOneWins = document.querySelector(".playerOneWinCount");
	const playerTwoWins = document.querySelector(".playerTwoWinCount");
	let playerOneWinCount = 0;
	let playerTwoWinCount = 0;

	let turn = "";
	const board = document.querySelector(".board");
	let children = board.children;
	const pointerEvents = document.querySelectorAll(".pointerEvents");
	let unit = document.querySelectorAll(".unit");
	for (const node of children) {
		node.classList.toggle("pointerEvents");
		node.addEventListener("click", (e) => {
			if (!gameBoard[e.target.dataset.board]) {
				if (!turn) {
					turn = playerOne;
					e.target.textContent = turn;
					gameBoard[e.target.dataset.board] = turn;
				} else if (turn === playerOne) {
					turn = playerTwo;
					e.target.textContent = turn;
					gameBoard[e.target.dataset.board] = turn;
				} else {
					turn = playerOne;
					e.target.textContent = turn;
					gameBoard[e.target.dataset.board] = turn;
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
		gameBoard = ["", "", "", "", "", "", "", "", ""];
		console.log(unit.length);
		for (let i = 0; i < unit.length; i++) {
			unit[i].textContent = "";
		}
		toggleEvent();
	}

	function boardValidity() {
		if (playerOneBoard()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = ModuleOne.inputOne.value;
			playerOneWins.textContent = `Win Count: ${(playerOneWinCount += 1)}`;
			toggleEvent();
		} else if (playerTwoBoard()) {
			winnerTitle.textContent = "The winner is";
			winner.textContent = ModuleOne.inputTwo.value;
			playerTwoWins.textContent = `Win Count: ${(playerTwoWinCount += 1)}`;
			toggleEvent();
		} else {
			if (arrayBoard()) {
				winnerTitle.textContent = "It's a draw";
				toggleEvent();
			}
		}
	}

	function arrayBoard() {
		let validBoardLength = 0;
		for (let i = 0; i < gameBoard.length; i++) {
			if (gameBoard[i]) validBoardLength++;
		}
		if (validBoardLength == 9) return true;
	}

	function toggleEvent() {
		for (let i = 0; i < pointerEvents.length; i++) {
			pointerEvents[i].classList.toggle("pointerEvents");
		}
	}

	function playerOneBoard() {
		if (checkWin(playerOne)) return true;
	}
	function playerTwoBoard() {
		if (checkWin(playerTwo)) return true;
	}
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

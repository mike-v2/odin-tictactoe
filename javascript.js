const Player = (index) => {
  const mark = index === 0 ? 'X' : 'O';
  const getMark = () => mark;
  const getIndex = () => index;
  return { getMark, getIndex };
}

const gameManager = (() => {
  const xButton = document.querySelector('#x-button');
  const oButton = document.querySelector('#o-button');
  const boardSlots = document.querySelectorAll('.board-slot');
  boardSlots.forEach((slot) => {
    slot.addEventListener('click', boardSlotClick);
  });

  const setActivePlayer = (index) => {
    activePlayer = index === 0 ? player1 : player2;

    if (index === 0) {
      oButton.classList.remove('selected');
      xButton.classList.add('selected');
    } else {
      xButton.classList.remove('selected');
      oButton.classList.add('selected');
    }
  }

  const makeMove = (slot) => {
    if (gameboard.getWinner()) return;

    if (gameboard.isSlotOpen(slot)) {
      gameboard.markMove(slot, activePlayer.getMark());
      
      if (gameboard.getWinner()) {
        let winText = document.querySelector('#win-text');
        winText.textContent = gameboard.getWinner() + " Won!";
      }

      if (activePlayer.getIndex() === 0) setActivePlayer(1);
      else setActivePlayer(0);
    }
  }

  function boardSlotClick(event) {
    let index = parseInt(event.target.id.slice(-1));
    makeMove(index);
  }

  const player1 = Player(0);
  const player2 = Player(1);

  let activePlayer = player1;
  setActivePlayer(0);

  return { makeMove };
})();

const gameboard = (() => {
  const board = [];
  for (let i=0; i<9; i++) {
    board.push('');
  }

  const markMove = (slot, mark) => {
    board[slot] = mark;
    let slotElement = getSlotElement(slot);
    slotElement.textContent = mark;
  }

  const isSlotOpen = (index) => {
    return board[index] === '';
  }

  const getSlotElement = (slot) => {
    return document.querySelector('#board-slot-' + slot.toString());
  }

  const checkWinner = () => {
    if (winner) return;

    const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (let i=0; i<winningCombos.length; i++) {
      let values = [];
      for (let j=0; j<winningCombos[i].length; j++) {
        values.push(board[winningCombos[i][j]]);
      }

      if (values[0] !== '' && values[0] === values[1] && values[0] === values[2]) {
        winner = values[0];
      }
    }
  }

  let winner = undefined;
  const getWinner = () => {
    checkWinner();
    return winner;
  }

  return { markMove, isSlotOpen, getWinner };
})();


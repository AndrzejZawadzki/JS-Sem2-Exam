import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

const INITIAL_BOARD = [
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '1', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', 'X', 'X', 'X', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', 'Y', '0', 'X'],
  ['X', '0', '0', 'X', 'X', 'X', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', 'X', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', 'Y', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'X'],
  ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
];

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  board: string[][] = JSON.parse(JSON.stringify(INITIAL_BOARD));
  ballPosition: { x: number; y: number } = { x: 1, y: 1 };
  ballDirection: { x: number; y: number } = { x: 1, y: 1 };
  intervalId: any = null;

  constructor() {}

  ngOnInit(): void {
    this.initializeBall();
  }

  initializeBall() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === '1') {
          this.ballPosition = { x: i, y: j };
          this.ballDirection = { x: 1, y: 1 }; // Initial direction: bottom right
          return;
        }
      }
    }
  }

  moveBall() {
    const changeDirectionRegular = () => {
      console.log('dx: ', dx, 'dy: ', dy);
      if (
        // Coming from top left and hits corner
        dx === 1 &&
        dy === 1 &&
        this.board[newX][newY - 1] === 'X' &&
        this.board[newX - 1][newY] === 'X'
      ) {
        dx = -1;
        dy = -1;
      } else if (
        // Coming from top left and hits bottom
        dx === 1 &&
        dy === 1 &&
        this.board[newX][newY + 1] === 'X'
      ) {
        dx = -1;
        dy = 1;
      } else if (
        // Coming from top left and hits right
        dx === 1 &&
        dy === 1
        // &&
        // this.board[newX - 1][newY] === 'X'
      ) {
        dx = 1;
        dy = -1;
      } else if (
        // Coming from bottom right and hits corner
        dx === -1 &&
        dy === -1 &&
        this.board[newX][newY + 1] === 'X' &&
        this.board[newX + 1][newY] === 'X'
      ) {
        dx = 1;
        dy = 1;
      } else if (
        // Coming from bottom right and hits top
        dx === -1 &&
        dy === -1 &&
        this.board[newX][newY + 1] === 'X'
      ) {
        dx = 1;
        dy = -1;
      } else if (
        // Coming from bottom right and hits left
        dx === -1 &&
        dy === -1
      ) {
        dx = -1;
        dy = 1;
      } else if (
        // Coming from top right hits corner
        dx === 1 &&
        dy === -1 &&
        this.board[newX - 1][newY] === 'X' &&
        this.board[newX][newY + 1] === 'X'
      ) {
        dx = -1;
        dy = 1;
      } else if (
        // Coming from top right and hits left
        dx === 1 &&
        dy === -1 &&
        this.board[newX - 1][newY] === 'X'
      ) {
        dx = 1;
        dy = 1;
      } else if (
        // Coming from top right and hits bottom
        dx === 1 &&
        dy === -1
      ) {
        console.log('Coming from top right and hits bottom');
        dx = -1;
        dy = -1;
      } else if (
        // Coming from bottom left hits corner
        dx === -1 &&
        dy === 1 &&
        this.board[newX + 1][newY] === 'X' &&
        this.board[newX][newY - 1] === 'X'
      ) {
        dx = 1;
        dy = -1;
      } else if (
        // Coming from bottom left hits right
        dx === -1 &&
        dy === 1 &&
        this.board[newX - 1][newY] === 'X'
      ) {
        dx = -1;
        dy = -1;
      } else if (
        // Coming from bottom left hits top
        dx === -1 &&
        dy === 1
      ) {
        dx = 1;
        dy = 1;
      }
      console.log('dx: ', dx, 'dy: ', dy);
      newX = x + dx;
      newY = y + dy;
    };
    let { x, y } = this.ballPosition;
    let { x: dx, y: dy } = this.ballDirection;

    let newX = x + dx;
    let newY = y + dy;

    // Check for collisions with boundaries and reverse direction if necessary

    const isAboutToChangeDirectionRegular = this.board[newX][newY] === 'X';
    const isAboutToChangeDirectionRandom = this.board[newX][newY] === 'Y';
    const isOutTheBoard =
      newX < 0 ||
      newX > this.board.length ||
      newY < 0 ||
      newY > this.board[0].length;

    if (isOutTheBoard) {
      throw new Error('Outside the board');
    } else if (isAboutToChangeDirectionRegular) {
      changeDirectionRegular();
    } else if (isAboutToChangeDirectionRandom) {
      // Randomize direction
      dx = Math.random() > 0.5 ? 1 : -1;
      dy = Math.random() > 0.5 ? 1 : -1;
      this.board[newX][newY] = '0'; // Change 'Y' to '0'
    }

    // Update ball position and direction
    this.ballPosition = { x: newX, y: newY };
    this.ballDirection = { x: dx, y: dy };
    this.board[newX][newY] = '1'; // Set new position
    this.board[x][y] = '0'; // Clear current position
  }

  start() {
    this.stop(); // Ensure any existing interval is cleared
    this.intervalId = setInterval(() => this.moveBall(), 100);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.board = JSON.parse(JSON.stringify(INITIAL_BOARD));
    this.initializeBall();
  }
}

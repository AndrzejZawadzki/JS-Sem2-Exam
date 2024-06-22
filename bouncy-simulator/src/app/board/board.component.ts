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
  ballPosition: { x: number; y: number } = { x: 0, y: 0 };
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
    let { x, y } = this.ballPosition;
    let { x: dx, y: dy } = this.ballDirection;

    this.board[x][y] = '0'; // Clear current position

    let newX = x + dx;
    let newY = y + dy;

    // Check for collisions with boundaries and reverse direction if necessary
    if (this.board[newX][newY] === 'X') {
      // Reverse direction
      dx *= -1;
      dy *= -1;
      newX = x + dx;
      newY = y + dy;
    } else if (this.board[newX][newY] === 'Y') {
      // Randomize direction
      dx = Math.random() > 0.5 ? 1 : -1;
      dy = Math.random() > 0.5 ? 1 : -1;
      this.board[newX][newY] = '0'; // Change 'Y' to '0'
    }

    // Update ball position and direction
    this.ballPosition = { x: newX, y: newY };
    this.ballDirection = { x: dx, y: dy };
    this.board[newX][newY] = '1'; // Set new position
  }

  start() {
    this.stop(); // Ensure any existing interval is cleared
    this.intervalId = setInterval(() => this.moveBall(), 500);
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

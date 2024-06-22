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
  ballDirection: { x: number; y: number } = { x: 2, y: 2 };

  constructor() {}

  ngOnInit(): void {
    this.initializeBall();
  }

  initializeBall() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === '1') {
          this.ballPosition = { x: i, y: j };
          this.ballDirection = { x: 2, y: 2 }; // Initial direction: bottom right
          return;
        }
      }
    }
  }

  moveBall() {
    let { x, y } = this.ballPosition;
    let { x: dx, y: dy } = this.ballDirection;

    this.board[x][y] = '0'; // Clear current position

    x += dx;
    y += dy;

    // Check for collisions
    if (this.board[x][y] === 'X') {
      // Reverse direction
      dx *= -1;
      dy *= -1;
    } else if (this.board[x][y] === 'Y') {
      // Randomize direction
      dx = Math.random() > 0.5 ? 1 : -1;
      dy = Math.random() > 0.5 ? 1 : -1;
      this.board[x][y] = '0'; // Change 'Y' to '0'
    }

    // Update ball position and direction
    this.ballPosition = { x, y };
    this.ballDirection = { x: dx, y: dy };
    this.board[x][y] = '1'; // Set new position
  }
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const boxSize = 20;
const canvasSize = canvas.width / boxSize;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
let score = 0;

// Draw snake
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(part => {
    ctx.fillRect(part.x * boxSize, part.y * boxSize, boxSize, boxSize);
  });
}

// Draw food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

// Move snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  // Check if snake eats food
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * canvasSize), y: Math.floor(Math.random() * canvasSize) };
  } else {
    snake.pop();
  }
}

// Check collision
function checkCollision() {
  const head = snake[0];
  // Wall collision
  if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
    return true;
  }
  // Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}

// Update game
function updateGame() {
  if (checkCollision()) {
    alert(`Game Over! Your score: ${score}`);
    document.location.reload();
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  moveSnake();
  drawSnake();
}

// Change direction
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && direction.y === 0) {
    direction = { x: 0, y: -1 };
  } else if (event.key === 'ArrowDown' && direction.y === 0) {
    direction = { x: 0, y: 1 };
  } else if (event.key === 'ArrowLeft' && direction.x === 0) {
    direction = { x: -1, y: 0 };
  } else if (event.key === 'ArrowRight' && direction.x === 0) {
    direction = { x: 1, y: 0 };
  }
});

// Game loop
setInterval(updateGame, 100);

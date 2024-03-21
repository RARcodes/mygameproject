document.addEventListener('DOMContentLoaded', function() {
    let width = 21;
    let height = 21;
    let maze = generateMaze(width, height);
    let playerX = 1;
    let playerY = 1;

    function generateMaze(width, height) {
        const maze = new Array(height).fill().map(() => new Array(width).fill('#'));

        function dfs(x, y) {
            maze[y][x] = ' ';
            const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
            directions.sort(() => Math.random() - 0.5);
            for (const [dx, dy] of directions) {
                const nx = x + dx * 2;
                const ny = y + dy * 2;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height && maze[ny][nx] === '#') {
                    maze[y + dy][x + dx] = ' ';
                    dfs(nx, ny);
                }
            }
        }

        dfs(1, 1);
        maze[height - 2][width - 2] = 'E';
        return maze;
    }

    function displayMaze() {
        const mazeElement = document.getElementById('maze');
        mazeElement.innerHTML = '';
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                if (maze[y][x] === '#') {
                    cell.classList.add('wall');
                } else if (maze[y][x] === 'E') {
                    cell.classList.add('end');
                    cell.textContent = '';
                } else if (playerX === x && playerY === y) {
                    cell.classList.add('player');
                }
                mazeElement.appendChild(cell);
            }
        }
    }         

    function isGameOver() {
        return maze[playerY][playerX] === 'E';
    }

    function movePlayer(key) {
        let dx = 0, dy = 0;
        if (key === 'w') dy = -1;
        else if (key === 's') dy = 1;
        else if (key === 'a') dx = -1;
        else if (key === 'd') dx = 1;
        if (maze[playerY + dy][playerX + dx] !== '#') {
            playerX += dx;
            playerY += dy;
        }

        if (isGameOver()) {
            console.log("Congratulations! You've reached the end of the maze!");
            maze = generateMaze(width, height);
            playerX = 1;
            playerY = 1;
            displayMaze();
        }
    }

    document.getElementById('medium').addEventListener('click', function() {
        setDifficulty('medium');
    });
    
    function setDifficulty(difficulty) {
        document.getElementById('maze').className = difficulty;
    
        switch (difficulty) {
            case 'medium':
                width = 21;
                height = 21;
                break;
            default:
                width = 21;
                height = 21;
                break;
        }
        maze = generateMaze(width, height);
        playerX = 1;
        playerY = 1;
        displayMaze();
    }

    document.getElementById('medium').addEventListener('click', function() {
        setDifficulty('medium');
    });

    displayMaze();

    document.addEventListener('keydown', function(event) {
        const key = event.key.toLowerCase();
        if (['w', 'a', 's', 'd'].includes(key)) {
            movePlayer(key);
            displayMaze();
        }
    });
});
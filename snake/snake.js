const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

const btnMod1 = document.getElementById('btnMod1')
const btnMod2 = document.getElementById('btnMod2')

let grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông
let snake = {
    x: 160, //vị trí của snake theo hướng x,y
    y: 160,
    dx: grid, //hướng di chuyển theo phương x hoặc y
    dy: 0,
    cells: [],
    maxCells: 0

};

let mod2 = true

let count = 0;

let apple = {
    x: 320,
    y: 320

};


function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

btnMod1.addEventListener('click', () => {
    mod2 = false
    reset()
})

btnMod2.addEventListener('click', () => {
    mod2 = true
    reset()
})

// loop

function loop() {

    requestAnimationFrame(loop);

    if (++count < 10) {
        return;
    }

    count = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị
    snake.y += snake.dy;

    // khi snake đụng tường sẽ chạy lại từ edge đối diện
    if (snake.x < 0) {
        if (mod2) {
            snake.x = canvas.width - grid
        } else {
            reset()
        }
    }
    else if (snake.x >= canvas.width) {
        if (mod2) {
            snake.x = 0;
        } else {
            reset()
        }
    }

    if (snake.y < 0) {
        if (mod2) {
            snake.y = canvas.height - grid;
        } else {
            reset()
        }
    }
    else if (snake.y >= canvas.height) {
        if (mod2) {
            snake.y = 0;
        } else {
            reset()
        }
    }

    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.
    if (snake.cells.length > snake.maxCells) {
        snake.cells.pop();
    }
    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng
    snake.cells.unshift({ x: snake.x, y: snake.y });



    // draw apple
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

    // draw snake
    context.fillStyle = 'blue';

    snake.cells.forEach(function (cell, index) {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);
        // snake ate 
        if (cell.x === apple.x && cell.y === apple.y) {
            snake.maxCells++;
            apple.x = random(0, 25) * grid;
            apple.y = random(0, 25) * grid;
        }

        // check va chạm khi rắn đụng đuôi
        for (let i = index + 1; i < snake.cells.length; i++) {
            // va chạm thì reset game
            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
                reset()
            }
        }

    });

}

function reset() {
    snake.x = 160;
    snake.y = 160;
    snake.cells = [];
    snake.maxCells = 0;
    snake.dx = grid;
    snake.dy = 0;
    apple.x = random(0, 25) * grid;
    apple.y = random(0, 25) * grid;
}
//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function (e) {

    // lọc sự kiện keydown để rắn không di ngược lại

    if (e.which === 37 && snake.dx === 0) {
        snake.dx = -grid;
        snake.dy = 0;
    }

    else if (e.which === 38 && snake.dy === 0) {
        snake.dy = -grid;
        snake.dx = 0;
    }

    else if (e.which === 39 && snake.dx === 0) {
        snake.dx = grid;
        snake.dy = 0;
    }

    else if (e.which === 40 && snake.dy === 0) {
        snake.dy = grid;
        snake.dx = 0;
    }
});


requestAnimationFrame(loop);
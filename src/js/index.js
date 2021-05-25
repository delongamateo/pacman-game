'use strict';

const width = 8;
const height = 8;


fetch(`http://bootcamp.podlomar.org/api/pacman?width=${width}&height=${height}`)
    .then((resp) => resp.json())
    .then((json) => {
        const data = json
        const container = document.querySelector(".container");

        const stage = new Stage(width, height);
        stage.mount(container);

        const stageElement = document.querySelector(".stage")

        const entities = { walls: [], apples: [], bombs: []};
        for (const bomb of data.bombs) {
            const tmpBomb = new Entity(bomb.x, bomb.y, "bomb", stage)
            tmpBomb.mount(stageElement);
            entities.bombs.push(tmpBomb);
        };
        for (const apple of data.apples) {
            const tmpApple = new Entity(apple.x, apple.y, "apple", stage)
            tmpApple.mount(stageElement);
            entities.apples.push(tmpApple);
        }
        for (const wall of data.walls) {
            const tmpWall = new Entity(wall.x, wall.y, "wall", stage)
            tmpWall.mount(stageElement);
            entities.walls.push(tmpWall);
        }
        const pacman = new Pacman(stage, 0, 0, true, entities, stageElement);
        pacman.mount(stageElement);
    })










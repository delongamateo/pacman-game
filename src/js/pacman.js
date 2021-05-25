class Pacman {

    constructor(stage, xpos, ypos, mouthOpen, entities, stageElement) {
        this.stage = stage;
        this.xpos = xpos;
        this.ypos = ypos;
        this.mouthOpen = mouthOpen;
        this.entities = entities;
        this.stageElement = stageElement;
        this.alive = true;
    }

    render() {
        const pac = document.createElement("div");
        pac.className = "entity pacboy-active-light";

        document.addEventListener('keydown', (event) => {
            if(event.code === 'ArrowRight') {
            this.moveRight();
        } else if (event.code === "ArrowLeft") { 
            this.moveLeft();
        } else if (event.code === "ArrowUp") {
            this.moveUp();
        } else {
                if (event.code === "ArrowDown") {
                    this.moveDown();
                }
            }

            
        });

        return pac;
    };

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);

        this.update();
    };

    moveRight = () => {
        if (this.isWall(this.xpos + 1, this.ypos)) 
            return;
        
        if(this.xpos < this.stage.width - 1 && this.alive) {
        this.xpos++;
        }
        this.handleApple(this.xpos, this.ypos);
        this.handleBomb(this.xpos, this.ypos);
        if (this.mouthOpen) {
            this.element.style.backgroundPositionX = "0px";
            this.element.style.backgroundPositionY = "0px";
        } else {
            this.element.style.backgroundPositionX = "90px";
            this.element.style.backgroundPositionY = "0px";
            
        }

        this.update();
    }


    moveLeft = () => {
         if (this.isWall(this.xpos - 1, this.ypos)) 
            return;
       
        if(this.xpos > 0 && this.alive) {
            this.xpos -= 1;
        }
         this.handleApple(this.xpos, this.ypos);
        this.handleBomb(this.xpos, this.ypos);
        if (this.mouthOpen) {
            this.element.style.backgroundPositionX = "0px";
            this.element.style.backgroundPositionY = "-80px";
        } else {
            this.element.style.backgroundPositionX = "90px";
            this.element.style.backgroundPositionY = "-80px";
        }

        this.update();
    }

    moveUp = () => {
         if (this.isWall(this.xpos, this.ypos - 1)) 
            return;
        
        
        

        if(this.ypos > 0 && this.alive) {
            this.ypos--;
        }
        this.handleApple(this.xpos, this.ypos);
        this.handleBomb(this.xpos, this.ypos);
        if (this.mouthOpen) {
            this.element.style.backgroundPositionX = "0px";
            this.element.style.backgroundPositionY = "100px";
        } else {
            this.element.style.backgroundPositionX = "90px";
            this.element.style.backgroundPositionY = "100px";
        }

        this.update();
        
    }

    moveDown = () => {
            if (this.isWall(this.xpos, this.ypos + 1)) 
            return;

        
        
         if(this.ypos < this.stage.height - 1 && this.alive) {
              this.ypos++;
         }
         this.handleApple(this.xpos, this.ypos);
         this.handleBomb(this.xpos, this.ypos);
        if (this.mouthOpen) {
            this.element.style.backgroundPositionX = "90px";
            this.element.style.backgroundPositionY = "-150px"
        } else {
            this.element.style.backgroundPositionX = "0px";
            this.element.style.backgroundPositionY = "-150px"
        }

        this.update();
        
        
    }

    update() {
        this.element.style.left = this.xpos * TILE_SIZE + "px";
        this.element.style.top = this.ypos * TILE_SIZE + "px";
        this.mouthOpen = !this.mouthOpen;

    
    }
    isWall(x, y) {
        let isWall = false;
        for (const wall of this.entities.walls) {
            if (wall.xpos == x && wall.ypos == y) isWall = true;
        }
        return isWall;
    }

    getApple(x, y) {
        let targetApple = null;
        for (let i=0; i<this.entities.apples.length; i++) {
            if (this.entities.apples[i].xpos == x && this.entities.apples[i].ypos == y) targetApple = { apple: this.entities.apples[i], index: i};
        }

        return targetApple;
    }

    handleApple(x, y) {
        const search = this.getApple(x, y);
        if(search != null) {
            search.apple.unmount(this.stageElement);
            this.entities.apples.splice(search.index, 1)
        }
    }

    getBomb(x, y) {
        let targetBomb = null;
        for (let i=0; i<this.entities.bombs.length; i++) {
            if (this.entities.bombs[i].xpos == x && this.entities.bombs[i].ypos == y) targetBomb = { bomb: this.entities.bombs[i], index: i};
        }

        return targetBomb;
    }

    handleBomb(x, y) {
        const search = this.getBomb(x, y);
        if(search != null) {
            search.bomb.unmount(this.stageElement);
            this.entities.bombs.splice(search.index, 1)
            if (Math.random() < 0.5) {
                this.element.classList.replace("pacboy-active-light", "entity--tomb");
                this.alive = false;
            } 
        }
    }

    

}


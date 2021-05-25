class Entity {
    constructor(xpos, ypos, type, stage) {
        this.xpos = xpos;
        this.ypos = ypos;
        this.type = type;
        this.stage = stage;
    };

    render () {
        const entity = document.createElement("div");
        if(this.type === "bomb") {
            entity.className = "entity entity--bomb"
        } else if (this.type === "apple") {
            entity.className = "entity entity--apple"
        } else if (this.type === "wall") {
            entity.className = "entity entity--wall"
        };

        entity.style.left = this.xpos  * TILE_SIZE + "px";
        entity.style.top = this.ypos * TILE_SIZE + "px";

        return entity;
    };

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);
    };
    unmount(parent) {
        parent.removeChild(this.element)
    }
}
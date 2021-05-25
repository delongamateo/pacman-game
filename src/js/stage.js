class Stage {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }

    render() {
        const stage = document.createElement("div");
        stage.className = "stage";
        stage.style.width = this.width * TILE_SIZE + "px";
        stage.style.height = this.height * TILE_SIZE + "px";

        return stage;

    };

    mount(parent) {
        this.element = this.render();
        parent.appendChild(this.element);
    };
}
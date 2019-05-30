function Enemy() {

    this.display = function() {
        fill(200, 255, 200);
        ellipse(this.x, this.y, 5, 5);
    };

}
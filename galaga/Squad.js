function Squad(_number, _children) {

    var number = _number + 1;
    var children = _children;
    var startPositions = [];
    startPositions[0] = children[0].pos;
    startPositions[1] = children[1].pos;
    startPositions[2] = children[2].pos;

    // this.color = [];
    // this.color[0] = random(180, 230);
    // this.color[1] = random(200, 255);
    // this.color[2] = random(190, 230);
    // for (let c of children) {
    //     c.color[0] = this.color[0];
    //     c.color[1] = this.color[1];
    //     c.color[2] = this.color[2];
    // }

    this.moveToHorizontal = function(_x, _y) {

        children[0].moveTo(_x - ENEMYSIZE * 2, _y);
        children[1].moveTo(_x, _y);
        children[2].moveTo(_x + ENEMYSIZE * 2, _y);

    };

    this.moveToVertical = function(_x, _y) {

        children[0].moveTo(_x, _y - ENEMYSIZE * 2);
        children[1].moveTo(_x, _y);
        children[2].moveTo(_x, _y + ENEMYSIZE * 2);

    };

    this.backToPositions = function() {

        children[0].moveTo(30 + (number * enemyScaleX), 1 * enemyScaleY);
        children[1].moveTo(30 + (number * enemyScaleX), 2 * enemyScaleY);
        children[2].moveTo(30 + (number * enemyScaleX), 3 * enemyScaleY);

    };

}
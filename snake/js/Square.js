function Square(type) {

    this.squareType = type;


    this.getColor = function () {
        switch (this.squareType) {
            case BLANK:
                fill(15, 10, 30);
                break;
            case FOOD:
                fill(255,100,100);
                break;
            case SNAKE:
                fill(255, 255, 255);
                break;
            default:
                fill(0, 0, 0);
        }
    }

}
class Tile {
    constructor (position_x, position_y, size, index) {
        this.position_x = position_x * size;
        this.position_y = position_y * size;
        this.size = size;
        this.index = index;
    }

    makeCurve() {
        arc(this.size / 2, -this.size / 2, this.size, this.size, PI * 0.5, PI);
        arc(-this.size / 2, this.size / 2, this.size, this.size, -PI * 0.5, 0);
    }

    makePoints(){
        point(0,-this.size/2);
        point(0,this.size/2);
        point(this.size/2,0);
        point(-this.size/2,0); 
    }
}
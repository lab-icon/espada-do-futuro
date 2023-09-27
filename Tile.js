class Tile {
    constructor (position_x, position_y, size, index) {
        this.position_x = position_x * size;
        this.position_y = position_y * size;
        this.size = size;
        this.index = index;

        this.rotation = floor(random(2) * PI / 2);
    }

    display_point() {
        push();
        translate(this.position_x, this.position_y);
        rotate(this.rotation);
        strokeWeight(max(1, this.size / 1.8));
        stroke(0);
        this.makePoints();
        strokeWeight(max(1, this.size / 3.2));
        stroke(100);
        this.makePoints();
        strokeWeight(max(1, this.size / 10));
        stroke(175);
        this.makePoints();
        pop();
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

    log () {
        console.log(this.position_x, this.position_y, this.size);
    }
}
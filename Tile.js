class Tile {
    constructor (position_x, position_y, size, index) {
        this.position_x = position_x * size;
        this.position_y = position_y * size;
        this.size = size;
        this.index = index;
        this.color1 = color(0, 0, 0);
        this.color2 = color(0, 0, 0);
        this.color3 = color(0, 0, 0);

        this.rotation = floor(random(2)) * HALF_PI;
        this.next_rotation = this.rotation;
        this.nextColors = { color1: this.color1, color2: this.color2, color3: this.color3 }
    }

    display_point(pGraphics) {
        pGraphics.push();
        pGraphics.strokeCap(ROUND)
        pGraphics.translate(this.position_x, this.position_y);
        pGraphics.strokeWeight(max(1, this.size / 1.8));
        pGraphics.stroke(this.color1);
        this.makePoints(pGraphics);
        pGraphics.strokeWeight(max(1, this.size / 3.2));
        pGraphics.stroke(this.color2);
        this.makePoints(pGraphics);
        pGraphics.strokeWeight(max(1, this.size / 10));
        pGraphics.stroke(this.color3);
        this.makePoints();
        pGraphics.pop();
    }

    display_curve(pGraphics) {
        pGraphics.push();
        pGraphics.strokeCap(SQUARE)
        pGraphics.translate(this.position_x, this.position_y);
        pGraphics.rotate(this.rotation);
        pGraphics.strokeWeight(max(1, (this.size / 1.8) * strokeMultiplier));
        pGraphics.stroke(this.color1);
        this.makeCurve(pGraphics);
        pGraphics.strokeWeight(max(1, (this.size / 3.2) * strokeMultiplier));
        pGraphics.stroke(this.color2);
        this.makeCurve(pGraphics);
        pGraphics.strokeWeight(max(1, (this.size / 10) * strokeMultiplier));
        pGraphics.stroke(this.color3);
        this.makeCurve(pGraphics);
        pGraphics.pop();
        this.rotation += (this.next_rotation-this.rotation)*0.2;
        this.color1 = lerpColor(this.color1, this.nextColors.color1, this.lerpColorIndex);
        this.color2 = lerpColor(this.color2, this.nextColors.color2, this.lerpColorIndex);
        this.color3 = lerpColor(this.color3, this.nextColors.color3, this.lerpColorIndex);
        this.lerpColorIndex += 0.01;
        this.lerpColorIndex = constrain(this.lerpColorIndex, 0, 1);
    }

    // choose a new color palette
    palette_update(color1, color2, color3) {
        this.lerpColorIndex = 0
        this.nextColors = { color1, color2, color3 }
    }

    makeCurve(pGraphics) {
        pGraphics.arc(this.size / 2, -this.size / 2, this.size, this.size, PI * 0.5, PI);
        pGraphics.arc(-this.size / 2, this.size / 2, this.size, this.size, -PI * 0.5, 0);
    }

    makePoints(pGraphics){
        pGraphics.point(0,-this.size/2);
        pGraphics.point(0,this.size/2);
        pGraphics.point(this.size/2,0);
        pGraphics.point(-this.size/2,0); 
    }

    random_rotation () {
        this.next_rotation = floor(random(2)) * HALF_PI;
    }

    control_rotation (value) {
        this.next_rotation = floor(value) * HALF_PI;
        // console.log(this.rotation);
    }

    log () {
        console.log(this.position_x, this.position_y, this.size);
    }
}
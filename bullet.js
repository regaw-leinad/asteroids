function Bullet(shipPos, shipHeading) {
    this.position = shipPos.copy();
    this.heading = shipHeading;
    this.velocity = p5.Vector.fromAngle(radians(this.heading)).mult(8);

    this.draw = function () {
        this.update();
        this.render();
    }

    this.update = function () {
        this.position.add(this.velocity);

        // Make sure the bullet is within bounds
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    }

    this.render = function () {
        push();

        translate(this.position.x, this.position.y);
        rotate(this.heading);

        noFill();
        stroke(255);
        strokeWeight(4);

        point(0, 0);

        pop();
    }
}

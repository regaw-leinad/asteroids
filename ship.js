function Ship() {
    this.position = createVector(width / 2, height / 2);
    this.radius = 10;
    this.velocity = createVector();
    this.rotation = 5;
    this.heading = 0;
    this.isThrusting = false;
    this.isRetro = false;

    this.draw = function () {
        this.update();
        this.render();
    }

    this.update = function () {
        if (keyIsDown(RIGHT_ARROW)) {
            this.rotate(this.rotation);
        } else if (keyIsDown(LEFT_ARROW)) {
            this.rotate(-this.rotation);
        }

        if (keyIsDown(UP_ARROW)) {
            this.isThrusting = true;
            this.thrust();
        } else {
            this.isThrusting = false;
        }

        if (keyIsDown(DOWN_ARROW)) {
            this.isRetro = true;
            this.thrust(true);
        } else {
            this.isRetro = false;
        }

        // Update position with the velocity
        this.position.add(this.velocity);

        // Make sure the ship is within bounds
        if (this.position.x > width + this.radius) {
            this.position.x = -this.radius;
        } else if (this.position.x < -this.radius) {
            this.position.x = width + this.radius;
        }

        if (this.position.y > height + this.radius) {
            this.position.y = -this.radius;
        } else if (this.position.y < -this.radius) {
            this.position.y = height + this.radius;
        }
    }

    this.getShotPosition = function () {
        var x = (this.radius + 5) * cos(this.heading);
        var y = this.radius * sin(this.heading);

        return createVector(x, y).add(this.position);
    }

    this.rotate = function (angle) {
        this.heading += angle;

        if (this.heading >= 360) {
            this.heading -= 360;
        } else if (this.heading <= -360) {
            this.heading += 360;
        }
    }

    this.thrust = function (retro) {
        var force = p5.Vector.fromAngle(radians(this.heading)).mult(0.1);

        if (retro) {
            this.velocity.sub(force);
        } else {
            this.velocity.add(force);
        }

        // Limit top speed
        this.velocity.limit(6);
    }

    this.render = function () {
        push();
        noFill();
        translate(this.position.x, this.position.y);
        rotate(this.heading);

        // Draw the fire if we're thrusting
        if (this.isThrusting) {
            strokeWeight(2);

            stroke(255, 153, 0);
            line(-this.radius * 1.05, 0, -this.radius - 6, -3);
            line(-this.radius * 1.05, 0, -this.radius - 6, 3);

            stroke(255, 0, 0);
            line(-this.radius * 1.05, 0, -this.radius - 8, 0);
        }

        if (this.isRetro) {
            strokeWeight(2);

            stroke(200);
            line(this.radius * 0.48, this.radius * 0.48, this.radius * 0.48 + this.radius / 5, this.radius * 0.48);
            line(this.radius * 0.48, -this.radius * 0.48, this.radius * 0.48 + this.radius / 5, -this.radius * 0.48);
        }

        // Draw the ship
        strokeWeight(1);
        stroke(255);
        fill(0);
        triangle(this.radius + 5, 0, -this.radius, -this.radius, -this.radius, this.radius);

        if (DEBUG_RENDER) {
            noFill();
            stroke(255, 0, 0);
            ellipse(0, 0, this.radius * 2);
        }

        pop();
    }
}

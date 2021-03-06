const scale = 10, particles = [], maxSpeed = 5;

let cols, rows, flowfield, time = 0, hue = 0;

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);

    this.velocity = createVector(0, 0);

    this.acceleration = createVector(0, 0);
  }

  frame(width, height) {
    const { position, velocity, acceleration } = this;

    const previousPosition = position.copy();

    velocity.add(acceleration).limit(maxSpeed);

    position.add(velocity);

    if (position.x > width)
      previousPosition.x = position.x = 0;
    else if (position.x < 0)
      previousPosition.x = position.x = width;

    if (position.y > height)
      previousPosition.y = position.y = 0;
    else if (position.y < 0)
      previousPosition.y = position.y = height;

    line(position.x, position.y, previousPosition.x, previousPosition.y);
  }
}

function setup() {
  cols = floor(windowWidth / scale);

  rows = floor(windowHeight / scale);

  flowfield = new Array(cols * rows);

  createCanvas(cols * scale, rows * scale).style('margin', 'auto').style('display', 'block');

  colorMode(HSB, 1);

  background(0);

  let count = Math.max(windowWidth, windowHeight) * 2;

  for (let i = 0; i < count; i++)
    particles[i] = new Particle(random(width), random(height));
}

function draw() {
  background(0, 0.05);

  stroke(hue, 1, 1, 0.2);

  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      let angle = noise(x / 10, y / 10, time) * TWO_PI * 2;

      flowfield[x + y * cols] = p5.Vector.fromAngle(angle).setMag(0.2);
    }

  for (let i = 0; i < particles.length; i++) {
    const { x, y } = particles[i].position;

    particles[i].acceleration = flowfield[floor(x / scale) + floor(y / scale) * cols];

    particles[i].frame(width, height);
  }

  time += 0.001;

  hue = hue >= 1 ? 0 : hue + 0.001;
}

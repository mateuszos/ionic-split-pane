import { PointerCoordinates } from '../util/dom';

interface Point {
  coord: PointerCoordinates;
  duration: number;
}

export class Simulate {
  private index = 0;
  private points: Point[] = [];
  public timedelta: number = 1 / 60;

  public static from(x: any, y?: number): Simulate {
    const s = new Simulate();
    return s.start(x, y);
  }

  reset(): Simulate {
    this.index = 0;
    return this;
  }

  start(x: any, y?: number): Simulate {
    this.points = [];
    return this.to(x, y);
  }

  to(x: any, y?: number): Simulate {
    this.newPoint(parseCoordinates(x, y), 1);
    return this;
  }

  delta(x: any, y?: number): Simulate {
    const newPoint = parseCoordinates(x, y);
    const prevCoord = this.getLastPoint().coord;
    newPoint.x += prevCoord.x;
    newPoint.y += prevCoord.y;

    this.newPoint(newPoint, 1);
    return this;
  }

  deltaPolar(angle: number, distance: number): Simulate {
    angle *= Math.PI / 180;
    const prevCoord = this.getLastPoint().coord;
    const coord = {
      x: prevCoord.x + (Math.cos(angle) * distance),
      y: prevCoord.y + (Math.sin(angle) * distance),
    };
    this.newPoint(coord, 1);
    return this;
  }

  toPolar(angle: number, distance: number): Simulate {
    angle *= Math.PI / 180;
    const coord = {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
    this.newPoint(coord, 1);
    return this;
  }

  duration(duration: number): Simulate {
    this.getLastPoint().duration = duration;
    return this;
  }

  velocity(vel: number): Simulate {
    const p1 = this.getLastPoint();
    const p2 = this.getPreviousPoint();
    const d = distance(p1.coord, p2.coord);
    return this.duration(d / vel);
  }

  swipeRight(maxAngle: number, distance: number): Simulate {
    // x------>
    const angle = randomAngle(maxAngle);
    return this.deltaPolar(angle, distance);
  }

  swipeLeft(maxAngle: number, distance: number): Simulate {
    // <------x
    const angle = randomAngle(maxAngle) + 180;
    return this.deltaPolar(angle, distance);
  }

  swipeTop(maxAngle: number, distance: number): Simulate {
    const angle = randomAngle(maxAngle) + 90;
    return this.deltaPolar(angle, distance);
  }

  swipeBottom(maxAngle: number, distance: number): Simulate {
    const angle = randomAngle(maxAngle) - 90;
    return this.deltaPolar(angle, distance);
  }

  run(callback: Function) {
    const points = this.points;
    const len = points.length - 1;
    let i = 0;
    for (; i < len; i++) {
      const p1 = points[i].coord;
      const p2 = points[i + 1].coord;
      const duration = points[i + 1].duration;
      let vectorX = p2.x - p1.x;
      let vectorY = p2.y - p1.y;
      const nuSteps = Math.ceil(duration / this.timedelta);
      vectorX /= nuSteps;
      vectorY /= nuSteps;
      for (let j = 0; j < nuSteps; j++) {
        callback({
          x: p1.x + vectorX * j,
          y: p1.y + vectorY * j,
        });
      }
    }
    this.index = i;

    return this;
  }


  private newPoint(coord: PointerCoordinates, duration: number) {
    this.points.push({
      coord: coord,
      duration: duration,
    });
  }

  private getLastPoint(): Point {
    const len = this.points.length;
    if (len > 0) {
      return this.points[len - 1];
    }
    throw new Error('can not call point');
  }

  private getPreviousPoint(): Point {
    const len = this.points.length;
    if (len > 1) {
      return this.points[len - 2];
    }
    throw new Error('can not call point');
  }
}

function randomAngle(maxAngle: number): number {
  return (Math.random() * maxAngle * 2) - maxAngle;
}

function distance(a: PointerCoordinates, b: PointerCoordinates): number {
  const deltaX = a.x - b.x;
  const deltaY = a.y - a.y;
  return Math.hypot(deltaX, deltaY);
}

function parseCoordinates(coord: PointerCoordinates | number, y?: number): PointerCoordinates {
  if (typeof coord === 'number') {
    return { x: coord, y: y };
  }
  return coord;
}

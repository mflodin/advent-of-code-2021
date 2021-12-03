export type Position = {
  depth: number;
  horizontal: number;
};

export type CourseChange = {
  direction: "up" | "down" | "forward";
  distance: number;
};

type Course = Array<CourseChange>;

export function navigate(course: Course): Position {
  let depth = 0;
  let horizontal = 0;
  course.forEach(({ direction, distance }) => {
    if (direction === "up") {
      depth -= distance;
    } else if (direction === "down") {
      depth += distance;
    } else if (direction === "forward") {
      horizontal += distance;
    }
  });
  return { depth, horizontal };
}

export function navigateWithAim(course: Course): Position {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;
  course.forEach(({ direction, distance }) => {
    if (direction === "up") {
      aim -= distance;
    } else if (direction === "down") {
      aim += distance;
    } else if (direction === "forward") {
      horizontal += distance;
      depth += distance * aim;
    }
  });
  return { depth, horizontal };
}

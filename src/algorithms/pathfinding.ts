import { Point, Node, AlgorithmResult } from '@/types/pathfinding';

const GRID_SIZE = 15;
const START = { x: 0, y: 0 };
const GOAL = { x: 14, y: 14 };

// Directions: up, right, down, left
const DIRECTIONS = [
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 }
];

function isValidPosition(x: number, y: number): boolean {
  return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE;
}

function isObstacle(grid: string[][], x: number, y: number): boolean {
  return grid[y][x] === '#';
}

function manhattanDistance(a: Point, b: Point): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function reconstructPath(node: Node): Point[] {
  const path: Point[] = [];
  let current: Node | null = node;
  
  while (current) {
    path.unshift({ x: current.x, y: current.y });
    current = current.parent;
  }
  
  return path;
}

export function bfs(grid: string[][]): AlgorithmResult {
  const startTime = performance.now();
  const queue: Node[] = [];
  const visited = new Set<string>();
  const exploredNodes: Point[] = [];
  
  const startNode: Node = {
    x: START.x,
    y: START.y,
    f: 0,
    g: 0,
    h: 0,
    parent: null
  };
  
  queue.push(startNode);
  visited.add(`${START.x},${START.y}`);
  
  while (queue.length > 0) {
    const current = queue.shift()!;
    exploredNodes.push({ x: current.x, y: current.y });
    
    // Check if we reached the goal
    if (current.x === GOAL.x && current.y === GOAL.y) {
      const path = reconstructPath(current);
      const endTime = performance.now();
      
      return {
        path,
        exploredNodes,
        pathLength: path.length - 1, // Subtract 1 because we count steps, not positions
        nodesExplored: exploredNodes.length,
        found: true,
        executionTime: endTime - startTime
      };
    }
    
    // Explore neighbors
    for (const direction of DIRECTIONS) {
      const newX = current.x + direction.x;
      const newY = current.y + direction.y;
      const key = `${newX},${newY}`;
      
      if (
        isValidPosition(newX, newY) &&
        !isObstacle(grid, newX, newY) &&
        !visited.has(key)
      ) {
        const neighbor: Node = {
          x: newX,
          y: newY,
          f: 0,
          g: current.g + 1,
          h: 0,
          parent: current
        };
        
        queue.push(neighbor);
        visited.add(key);
      }
    }
  }
  
  const endTime = performance.now();
  
  return {
    path: [],
    exploredNodes,
    pathLength: 0,
    nodesExplored: exploredNodes.length,
    found: false,
    executionTime: endTime - startTime
  };
}

export function aStar(grid: string[][]): AlgorithmResult {
  const startTime = performance.now();
  const openList: Node[] = [];
  const closedList = new Set<string>();
  const exploredNodes: Point[] = [];
  
  const startNode: Node = {
    x: START.x,
    y: START.y,
    f: 0,
    g: 0,
    h: manhattanDistance(START, GOAL),
    parent: null
  };
  
  startNode.f = startNode.g + startNode.h;
  openList.push(startNode);
  
  while (openList.length > 0) {
    // Find node with lowest f value
    let currentIndex = 0;
    for (let i = 1; i < openList.length; i++) {
      if (openList[i].f < openList[currentIndex].f) {
        currentIndex = i;
      }
    }
    
    const current = openList.splice(currentIndex, 1)[0];
    const currentKey = `${current.x},${current.y}`;
    closedList.add(currentKey);
    exploredNodes.push({ x: current.x, y: current.y });
    
    // Check if we reached the goal
    if (current.x === GOAL.x && current.y === GOAL.y) {
      const path = reconstructPath(current);
      const endTime = performance.now();
      
      return {
        path,
        exploredNodes,
        pathLength: path.length - 1,
        nodesExplored: exploredNodes.length,
        found: true,
        executionTime: endTime - startTime
      };
    }
    
    // Explore neighbors
    for (const direction of DIRECTIONS) {
      const newX = current.x + direction.x;
      const newY = current.y + direction.y;
      const neighborKey = `${newX},${newY}`;
      
      if (
        !isValidPosition(newX, newY) ||
        isObstacle(grid, newX, newY) ||
        closedList.has(neighborKey)
      ) {
        continue;
      }
      
      const tentativeG = current.g + 1;
      
      // Check if this neighbor is already in open list
      const existingIndex = openList.findIndex(
        node => node.x === newX && node.y === newY
      );
      
      if (existingIndex === -1) {
        // New node
        const neighbor: Node = {
          x: newX,
          y: newY,
          g: tentativeG,
          h: manhattanDistance({ x: newX, y: newY }, GOAL),
          f: 0,
          parent: current
        };
        neighbor.f = neighbor.g + neighbor.h;
        openList.push(neighbor);
      } else if (tentativeG < openList[existingIndex].g) {
        // Better path found
        openList[existingIndex].g = tentativeG;
        openList[existingIndex].f = tentativeG + openList[existingIndex].h;
        openList[existingIndex].parent = current;
      }
    }
  }
  
  const endTime = performance.now();
  
  return {
    path: [],
    exploredNodes,
    pathLength: 0,
    nodesExplored: exploredNodes.length,
    found: false,
    executionTime: endTime - startTime
  };
}

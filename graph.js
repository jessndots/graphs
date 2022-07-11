class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vert of vertexArray) {
      this.nodes.add(vert);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);
    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();
      seen.add(currNode);
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor) && !toVisitStack.includes(neighbor)) {
          toVisitStack.push(neighbor);
        }
      }
    }
    let vals = [];
    for (let node of seen) {
      vals.push(node.value);
    }
    return vals;
  }


  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set(toVisitQueue);
    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    let vals = []
    for (let node of seen) {
      vals.push(node.value);
    }
    return vals;
  }
}
module.exports = {Graph, Node}
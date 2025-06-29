// A company called GoodCorp has a data network that can be visualized as a graph of nodes connected by cables where each node can transfer data to other nodes.
// A malicious hacker company, MaliciousCorp has managed to hack and corrupt one of these nodes which stops the transfer of data going through it.

// Given this network and what node was corrupted, GoodCorp wants to know whether it is possible to transfer data between two nodes (a source and destination node). Can you write a function for this?
// Sample Input:
// 1 - 2 - 3       8 - 10 - 12
//     |           |\      /
//     4 - 5 - 6 - 7 9 - 11

// Sample output for Part #1:

// Source Node: 2
// Destination Node: 9
// Corrupted Node: 7
// Output: FALSE
// Explanation: We cannot reach Node 9 from Node 2

function canReachNode(nodes, source, dest, corrupted) {

    const visited = new Set()
    function dfs(node) {
        if (!node || node == corrupted || visited.has(node)) return false;
        if (node == dest) return true;

        const edges = nodes.get(node) // return all edges
        visited.add(node)
        for (const n of edges) {
            if (dfs(n)) return true
        }

        return false
    }

    return dfs(source)
}
// MY NOTES:
// get starting node from input hashmap
// iterate through it's neighbors
// for each neighbor see if i can reach dest
// if on the way to the destination node i encounter a corrupted return false;
// if we do reach the dest return true

// Now, GoodCorp wants to know the minimal cost or the distance between the source node and all other reachable (non-corrupted) nodes for record keeping, which can be represented as a map of node to distance. Can you update the func to provide for this?
// Sample output for Part #2:

// Source Node: 2
// Corrupted Node: 7
// Output:

// Node	Distance from source
// 1	1
// 3	1
// 4	1
// 5	2
// 6	3
// hashmap to store distances key: node, value: currDistance
// iterate through each neighbors 
// {
// 1:[2], 2: [1,2,3],3: [2], 4: [2, 5], 5: [4,6], 6: [5,7],7:[6,8], 8:[7, 9, 10], 9: [8, 11], 10: [8, 12], 11: [9, 12], 12:[10,11]
// }
function failedAttemptAtPart2(network, source, corrupted) {
    const q = [source];
    let distance = 0;
    const result = new Map();
    while (q.length) {
        let len = q.length;
        for (let n = 0; n < len; n++) {
            let curr = q.shift()
            if (source != curr) result.set(curr, distance);
            let neighbors = network.get('' + curr);
            for (const neighbor of neighbors) {
                if (!result.has(neighbor) && corrupted != neighbor) {
                    q.push(neighbor);
                }
            }
        }
        distance++;
    }
    return result;
}
(() => {
    let map = new Map([
        [1, [2]], [2, [1, 3, 4]], [3, [2]], [4, [2, 5]], [5, [4, 6]], [6, [5, 7]], [7, [6, 8]], [8, [7, 9, 10]], [9, [8, 11]], [10, [8, 12]], [11, [9, 12]], [12, [10, 11]]
    ]);

    console.log(map.get(2))
    // console.log(failedAttemptAtPart2(map, 2, 7))
    console.log(canReachNode(map, 2, 7, 9))
})()
// function failedAttemptAtPart2(network: Map, source: Node, corrupted: Node) {
//     const q = [source];
//     let distance = 0;
//     const result = new Map();
//     while (q.length) {
//         let len = q.length;
//         for (let n = 0; n < len; n++) {
//             let curr = q.shift()
//             result.set(curr, distance);
//             let neighbors = network.get(curr);
//             for (let neighbor of neighbors) {
//                 if (!result.has(neighbor) && corrupted != neighbor) {
//                     q.push(neighbor);
//                 }
//             }
//         }
//         distance++;
//     }
//     return result;
// }
// q [2] d=0 res[]
// res[2: 0] neighs[1,3,4]
// q [1,3,4]

// Given this network and what node was corrupted, GoodCorp wants to know whether it is possible to transfer data between two nodes (a source and destination node). Can you write a function for this?
// Sample Input:
// 1 - 2 - 3       8 - 10 - 12
//     |           |\      /
//     4 - 5 - 6 - 7 9 - 11

// Sample output for Part #1:

// Source Node: 2
// Destination Node: 9
// Corrupted Node: 7
// Output: FALSE
// Explanation: We cannot reach Node 9 from Node 2
// function canReachNode(network, source, dest, corrupted) {
//     let visited = new Set();

//     function rec(node) {
//         if (node == corrupted) {
//             return false;
//         }
//         if (node == dest) {
//             return true;
//         }
//         visited.add(node)
//         //
//         let ns = network.get('' + node)
//         for (const n of ns) {
//             if (!visited.has(n)) {
//                 return rec(n)
//             }
//         }
//         return false;
//     }

//     return rec(source)
// }
// function canReachNode(network: Map, source: Node, dest: Node, corrupted: Node) {
//     let visited = new Set();

//     function rec(node: Node) {
//         if (node === corrupted) {
//             return false;
//         }
//         if (node === dest) {
//             return true;
//         }
//         visited.add(node)
//         //
//         let ns = network.get(node)
//         for (const n of ns) {
//             if (!visited.has(n)) {
//                 return rec(n)
//             }
//         }
//         return false;
//     }

//     return rec(source)
// }
import './App.css';

function App() {

  const graph = {
    A: [
      { node: "B", weight: 4 },
      { node: "C", weight: 2 }
    ],
    B: [
      { node: "A", weight: 4 },
      { node: "C", weight: 1 },
      { node: "D", weight: 5 },
    ],
    C: [
      { node: "A", weight: 2 },
      { node: "B", weight: 1 },
      { node: "D", weight: 8 },
      { node: "E", weight: 10}
    ],
    D: [
      { node: "B", weight: 5 },
      { node: "C", weight: 8 },
      { node: "E", weight: 2 },
      { node: "F", weight: 6}
    ],
    E: [
      { node: "C", weight: 10 },
      { node: "D", weight: 2 },
      { node: "F", weight: 2 }
    ],
    F: [
      { node: "D", weight: 6 },
      { node: "E", weight: 2 }
    ]
  };
  
  const target = "B";
  const vertexArray = [target, ...Object.keys(graph).filter(node => node !== target)];
  
  
  
  const table = {};
  
  Object.keys(graph).forEach(vertex => {
    table[vertex] = {lessDistance: null, currentPath: null};
  });
  
  
  
  for(let i = 0; i < vertexArray.length; i++) {
    const currentVertex = vertexArray[i];
    
    const edges = graph[currentVertex];  
    
    if(currentVertex === target) {
      for(let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
        const currentEdge = edges[edgeIndex]; 
        
        table[currentEdge.node] = { lessDistance: currentEdge.weight, currentPath: null};
      }
      continue;
    }
    
    for(let edgeIndex = 0; edgeIndex < edges.length; edgeIndex++) {
        const currentEdge = edges[edgeIndex];
        
        const currentEdgeValueTable = table[currentEdge.node];
        
        const currentVertexValueTable = table[currentVertex]; 
        
        if(currentEdgeValueTable.lessDistance === null || currentEdgeValueTable.currentPath === currentEdge.node) continue;
        
        const totalValue = currentEdge.weight + currentEdgeValueTable.lessDistance;
        
        if(currentVertexValueTable.lessDistance === null || totalValue < currentVertexValueTable.lessDistance) {
          table[currentVertex] = { currentPath: currentEdge.node, lessDistance: totalValue };
          
          continue;
        }      
    }
  }
  
  console.log(table);
  

  return (
    <div className="App">
      <div id="table-container">
        <div className='row-table' style={{borderBottom: "1px solid #DCDCDC"}}>
          <div className='cell'style={{flexBasis: "33%"}}>{"Vertex"}</div>
          <div className='cell'style={{flexBasis: "33%"}}>{`Distance from Target: ${target}`}</div>
          <div className='cell'style={{flexBasis: "33%"}}>{"Best way to move"}</div>
        </div>
        {Object.entries(table).map(([keyTable, value], index) => (
          <div className='row-table' key={index}>
            <div className='cell' style={{flexBasis: "33%"}}>{keyTable}</div>
            <div className='cell' style={{flexBasis: "33%"}}>{value.lessDistance === null ? "-" : value.lessDistance}</div>
            <div className='cell' style={{flexBasis: "33%"}}>{value.currentPath === null ? value.currentPath : "-"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

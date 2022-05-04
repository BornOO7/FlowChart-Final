import React, { useState, useRef, useCallback, useContext, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from 'react-flow-renderer';
import { NavLink, useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';


import Sidebar from './Sidebar';

import './dndflow.css';

import TextUpdaterNode from './TextUpdaterNode.js';
import './textupdaternode.css';
//import Regex from './Regex';
const crypto = require('crypto')

const regexNodes = []
const nodeIDS = []
let count = 2324342

const {deets} = './TextUpdaterNode.js'

const nodeTypes = { textUpdater: TextUpdaterNode };

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;
const graphStyles = { width: "100%", height: "500px" };

const DnDFlow = () => {
 
  const [name, setName] = useState("")
  const [regexVariable, setRegexName] = useState("")
  const [nodeID, setNodeID] = useState("")

  const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

  const hello = () => 'hello'
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const [nodeName, setNodeName] = useState('Node 1');
  const [nodeBg, setNodeBg] = useState('#eee');
  const [nodeHidden, setNodeHidden] = useState(false);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: nodeName,
          };
        }

        return node;
      })
    );
  }, [nodeName, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // it's important that you create a new object here
          // in order to notify react flow about the change
          node.style = { ...node.style, backgroundColor: nodeBg };
        }

        return node;
      })
    );
  }, [nodeBg, setNodes]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === '1') {
          // when you update a simple type you can just update the value
          node.hidden = nodeHidden;
        }

        return node;
      })
    );
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === 'e1-2') {
          edge.hidden = nodeHidden;
        }

        return edge;
      })
    );
  }, [nodeHidden, setNodes, setEdges]);

  const addinpdata = async (e) => {
    e.preventDefault();
    const flowKey = reactFlowInstance.toObject()
    //console.log('flowkey', flowKey)

    console.log(deets)

    const { name, email } = inpval;

    const res = await fetch("http://localhost:8003/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, flowKey
        })
    });

    const data = await res.json();
    //console.log('hello');

    if (res.status === 422 || !data) {
        console.log("error ");
        alert("error");

    } else {
        history.push("/")
        setUdata(data)
        console.log("data added");

    }
}

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  const addDeviceNode = () => {
    const reg = /^\d+$/
    if (!reg.test(name)) {
      alert('Invalid Device ID')
      return
    }
    setNodes(e => e.concat({
        id: (e.length+1).toString(),
        data: {label: `${name}`},
        position: {x: Math.random() * window.innerWidth/8, y: Math.random() * window.innerHeight/8}
    }));
};
const addIPNode = () => {
  if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(name))) {  
      alert('Invalid IP Address')
      return
  }  
  setNodes(e => e.concat({
      id: (e.length+1).toString(),
      data: {label: `${name}`},
      position: {x: Math.random() * window.innerWidth/8, y: Math.random() * window.innerHeight/8}
  }));
};

const addNode = (nodeID) => {
  console.log(regexVariable)
  let l = new RegExp(regexNodes[0])
  console.log(l)
  if (!l.test(regexVariable)) {  
    alert('RegEx not accepted')
    return
}  

setNodes(e => e.concat({
    id: (e.length+1).toString(),
    data: {label: `${regexVariable}`},
    position: {x: Math.random() * window.innerWidth/8, y: Math.random() * window.innerHeight/8}
}));
};

const addRegexNode = () => {
  regexNodes.push(name) 
}

const addNodeIDS = (nodeID) => {
  if (nodeIDS.indexOf(nodeID) === -1) {
    nodeIDS.push(nodeID)
  }
}

  

  return (
    <div className="dndflow">
      <NavLink to="/">home</NavLink>
    
    <div className="row">
        <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputEmail1" class="form-label">Cisco ID</label>
            <input type="text" value={inpval.name} onChange={setdata} name="name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3 col-lg-6 col-md-6 col-12">
            <label for="exampleInputPassword1" class="form-label">Flowchart Name</label>
            <input type="email" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
        </div>

        
    </div>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            style={graphStyles}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <div className="save__controls">
        <button onClick={addinpdata}>save</button>
      </div>
            <Controls />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
      <div class="abc">
        <div class="customs">
      <input type="text" class="b"
                onChange={e => setName(e.target.value)}
                name="title"/>
                <button class="b" 
                type="button"
                onClick={addDeviceNode}
                >Device Node</button>
        </div>
        <div class="customs">      
        <input type="text" class="b"
                onChange={e => setName(e.target.value)}
                name="title"/>
                <button class="b" 
                type="button"
                onClick={addIPNode}
                >IP Node</button>
              </div>
        <div class="customs">
        <input type="text" class="b"
                onChange={e => setName(e.target.value)}
                name="title"/>
                <button class="b" 
                type="button"
                onClick={addRegexNode}
                >Custom Node</button>
        </div>
        <div>
        {regexNodes.map((item) => {
          count = count+1
          return(
          <div>
          <input type="text" class="b"
              onChange={e => setRegexName(e.target.value)}
              name="title"/>
              <button class="b"
              id={count}
              onClick = {addNode}
              type="button"
              >{item} Node</button>
          </div>
          )
        })}
        </div>
        

      </div>
    </div>
  );
};

export default DnDFlow;
// import React, { useState } from 'react'




// const Regex = (props) => {

//     const [name, setName] = useState("")

//     const addNode = () => {
//         if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(name))) {  
//             alert('Invalid IP Address')
//             return
//         }  
//         setNodes(e => e.concat({
//             id: (e.length+1).toString(),
//             data: {label: `${name}`},
//             position: {x: Math.random() * window.innerWidth/8, y: Math.random() * window.innerHeight/8}
//         }));
//       };

//     return (
//         <div>
//         <input type="text" class="b"
//               onChange={e => setName(e.target.value)} name="title"/>
//               <button class="b" 
//                 type="button"
//                 onClick={addNode}
//                 >{`${name} Node`}</button>
//         </div>
//     )
// }

// export default Regex;
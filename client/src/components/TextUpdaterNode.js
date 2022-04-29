import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };
let d = 'abcd'

function TextUpdaterNode({ data }) {
  var numberRegex = /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/
  const onChange = useCallback((evt) => {
    // if(numberRegex.test(evt.target.value)) {
    //   console.log('true')
    // }
    d = evt.target.value
    localStorage.setItem(d, JSON.stringify(d))
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

const deets = () => {
  return d
}

export default TextUpdaterNode;
export {deets}

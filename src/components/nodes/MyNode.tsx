import { Handle, Position } from "reactflow";
import { addNode, changeValue } from "../../store/slices/nodeSlice";
import { Node, Edge, MarkerType } from "reactflow";
import _ from "lodash";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useState } from "react";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

function MyNode({ data }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const current = useAppSelector((state) => state.nodes);
  let displayValues = current.nodesArray.map((e) => e.data.value);
  displayValues.length = data.id + 1;
  let displayValuesString = displayValues.join("-");
  const self = current.nodesArray[data.id];
  const nextNode: Node = {
    id: `${Number(self.id) + 1}`,
    type: "myNode",
    position: {
      x: _.ceil(_.add(self.position.x, 250), 2),
      y: _.ceil(_.add(self.position.y, 250), 2),
    },
    data: {
      id: data.id + 1,
    },
  };
  const nextEdge: Edge = {
    id: `${data.id}-${data.id + 1}`,
    source: `${data.id}`,
    target: `${data.id + 1}`,
    type: "step",
    markerEnd: { type: MarkerType.Arrow },
  };
  const dispatch = useAppDispatch();
  function addNextNode(value: number) {
    console.log(displayValues);
    setDropdownOpen(false);
    dispatch(
      addNode({
        nextNode: nextNode,
        nextEdge: nextEdge,
        nextId: `${data.id + 1}`,
      }),
    );
    dispatch(changeValue({ id: data.id, value: value }));
  }
  return (
    <>
      <div className="myNode">
        <div className="myNode__placeholder"></div>
        <div className={`node-options-container ${!dropdownOpen && "hidden"}`}>
          <div
            className={`node-options-title nodrag`}
            onClick={() => setDropdownOpen((k) => !k)}
          >
            {current.nodesArray[data.id].data.value ? (
              <span>Варіант {displayValuesString}</span>
            ) : (
              <span>Виберіть варіант</span>
            )}
            {dropdownOpen ? (
              <ExpandLessOutlinedIcon sx={{ color: "#2C7DFA" }} />
            ) : (
              <ExpandMoreOutlinedIcon sx={{ color: "#2C7DFA" }} />
            )}
          </div>
          <div className="node-options__options-container nodrag">
            {new Array(6).fill(1).map((_, i) => {
              return (
                <div onClick={() => addNextNode(i + 1)} key={i}>
                  {self.data.value === i + 1 ? (
                    <CheckBoxIcon sx={{ color: "#2C7DFA" }} />
                  ) : (
                    <CheckBoxOutlineBlankIcon sx={{ color: "#2C7DFA" }} />
                  )}

                  {data.id === 0 ? (
                    <span>{`Варіант ${i + 1}`}</span>
                  ) : self.data.value ? (
                    <span>{`Варіант ${displayValuesString.slice(0, -1)}${
                      i + 1
                    }`}</span>
                  ) : (
                    <span>{`Варіант ${displayValuesString}${i + 1}`}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Handle type="target" position={Position.Top} style={{ opacity: "0" }} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
}

export default MyNode;

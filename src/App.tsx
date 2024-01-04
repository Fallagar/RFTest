import ReactFlow, { Controls, Background } from "reactflow";
import { useCallback, useMemo } from "react";
import "reactflow/dist/style.css";
import "./components/nodes/styles.scss";
import MyNode from "./components/nodes/MyNode";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { changePosition } from "./store/slices/nodeSlice";
import { reset } from "./store/slices/nodeSlice";

function App() {
  const nodeTypes = useMemo(() => ({ myNode: MyNode }), []);
  const nodeData = useAppSelector((state) => state.nodes.nodesArray);
  const edgeData = useAppSelector((state) => state.nodes.edgesArray);
  const dispatch = useAppDispatch();

  const onNodesChange = useCallback((changes) => {
    if (changes[0].dragging === true) {
      dispatch(
        changePosition({
          x: changes[0].position.x,
          y: changes[0].position.y,
          id: changes[0].id,
        }),
      );
    }
  }, []);
  return (
    <div style={{ height: "100vh", width: "100vw", backgroundColor: "white" }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodeData}
        edges={edgeData}
        onNodesChange={onNodesChange}
        onInit={(instance) => instance.zoomTo(0.8)}
        fitView
        onResize={(e) => console.log(e)}
      >
        <Background />
        <Controls />
      </ReactFlow>
      <button
        className="reset-state__button"
        onClick={() => {
          dispatch(reset());
          window.location.reload();
        }}
      >
        RESET REDUX
      </button>
    </div>
  );
}

export default App;

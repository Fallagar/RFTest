import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Node, Edge } from "reactflow";
import { MarkerType } from "reactflow";

interface INodesSlice {
  nodesArray: Node[];
  edgesArray: Edge[];
}

const initialState: INodesSlice = {
  nodesArray: [
    {
      id: "0",
      type: "myNode",
      position: { x: 0, y: 0 },
      data: { id: 0 },
    },
  ],
  edgesArray: [],
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (
      state,
      action: PayloadAction<{ nextNode: Node; nextEdge: Edge; nextId: string }>,
    ) => {
      if (!state.nodesArray.some((e) => e.id === action.payload.nextId)) {
        state.nodesArray.push(action.payload.nextNode);
        state.edgesArray.push(action.payload.nextEdge);
      }
    },
    changePosition: (
      state,
      action: PayloadAction<{ x: any; y: any; id: any }>,
    ) => {
      state.nodesArray[Number(action.payload.id)].position.x = action.payload.x;
      state.nodesArray[Number(action.payload.id)].position.y = action.payload.y;
    },
    changeValue: (
      state,
      action: PayloadAction<{ id: number; value: number }>,
    ) => {
      const index = state.nodesArray.findIndex(
        (e) => e.id === String(action.payload.id),
      );
      if (index !== -1) {
        state.nodesArray[index].data.value = action.payload.value;
      }
    },
    reset: () => initialState,
  },
});

export const { addNode, changePosition, changeValue, reset } =
  nodesSlice.actions;
export const nodesState = (state: RootState) => state.nodes;
export default nodesSlice.reducer;

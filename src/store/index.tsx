import { create } from "zustand";
import { authSlice, IAuthSlice } from "./auth";
import { systemSlice, ISystem } from "./system";
import { commentSlice, IComment } from "./comment";

const useBoundStore = create<IAuthSlice & ISystem & IComment>()((...a) => ({
  ...authSlice(...a),
  ...systemSlice(...a),
  ...commentSlice(...a),
}));

export default useBoundStore;

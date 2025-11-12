const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isVideoHidden:false,
}

const homeSlice = createSlice({
  name:"home",
  initialState,
  reducers:{
    hideVideo:(state)=>{
      state.isVideoHidden = true;
    }
  }
});

export const {hideVideo} = homeSlice.actions;
export default homeSlice.reducer;
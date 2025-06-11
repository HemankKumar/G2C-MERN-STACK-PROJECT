import {createSlice} from "@reduxjs/toolkit";

const listSlice=createSlice(
    {
        name:'todolist',

        initialState:{items:[]},

        reducers:{

            addItem(state,action)
            {
                state.items.push(action.payload);
                console.log("***")
            },

            deleteItem(state,action)
            {
                state.items.splice(action.payload,1)
            },

            clearAllItems(state,action)
            {
                state.items=[]
            }


        }
    }
)

export const {addItem,deleteItem,clearAllItems}=listSlice.actions;

export default listSlice.reducer;
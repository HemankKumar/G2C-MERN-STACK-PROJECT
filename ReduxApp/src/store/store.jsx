import {configureStore} from '@reduxjs/toolkit';

import listReducer from '../slice/Listslice';

const store=configureStore(
    {
        reducer:{
            todolist:listReducer,
        }
    }
)

export default store;
import {
    LOAD_DATA,
} from "../constants/ActionTypes";

const initialState = {
    data: null
};

export default function data(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA:
            return { data: action.payload };

        default:
            return state;
    }
}

import { types } from "../../types/types"

export const chatReducer = (state, action) => {
  console.log("action", action)
  switch (action.type) {
    case types.loadedUsers:
      return {
        ...state, // the spread operator is used to copy the state
        users: [...action.payload],
      }
    default:
      return state // state cannot be mutated
  }
}

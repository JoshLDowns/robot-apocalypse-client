import { createSlice } from "@reduxjs/toolkit";
import { getRooms, buildRooms } from "../../api/gameApi";

let initialState = {
  initialRoomsLoading: false,
  roomLoading: false,
  rooms: [],
  currentRoomDetail: {
    id: null,
    name: null,
    info: null,
    inventory: null,
    enemy: null,
    north: null,
    south: null,
    east: null,
    west: null,
    up: null,
    down: null,
    keycard: null,
    map: null,
    intobject: null,
    intobjectInventory: null,
    secret: null,
    randomEnemy: null,
    entered: null,
    roomId: null,
  },
  error: null,
};

const startInitialLoading = (state) => {
  state.initialRoomsLoading = true;
};

const startRoomLoading = (state) => {
  state.roomLoading = true;
};

const loadingFailed = (state, action) => {
  const { error } = action.payload;
  state.initialRoomsLoading = false;
  state.roomLoading = false;
  state.error = error;
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setInitialLoading: startInitialLoading,
    setRoomLoading: startRoomLoading,
    getRoomsSuccess(state, action) {
      const { rooms, currentRoom } = action.payload;
      state.rooms = [...rooms];
      state.currentRoomDetail.id = currentRoom.id;
      state.currentRoomDetail.name = currentRoom.name;
      state.currentRoomDetail.info = currentRoom.info;
      state.currentRoomDetail.inventory = currentRoom.inventory;
      state.currentRoomDetail.enemy = currentRoom.enemy;
      state.currentRoomDetail.north = currentRoom.north;
      state.currentRoomDetail.south = currentRoom.south;
      state.currentRoomDetail.east = currentRoom.east;
      state.currentRoomDetail.west = currentRoom.west;
      state.currentRoomDetail.up = currentRoom.up;
      state.currentRoomDetail.down = currentRoom.down;
      state.currentRoomDetail.keycard = currentRoom.keycard;
      state.currentRoomDetail.map = currentRoom.map;
      state.currentRoomDetail.intobject = currentRoom.intobject;
      state.currentRoomDetail.intobjectInventory = currentRoom["intobject_inventory"];
      state.currentRoomDetail.secret = currentRoom.secret;
      state.currentRoomDetail.randomEnemy = currentRoom["random_enemy"];
      state.currentRoomDetail.entered = currentRoom.entered;
      state.currentRoomDetail.roomId = currentRoom["room_id"];
      state.initialRoomsLoading = false;
      state.roomLoading = false;
      state.error = null;
    },
    updateRoomInfo(state, action) {
      const { room, attribute, value } = action.payload;
      let currentRooms = state.rooms.map((rm) => {
        if (rm.name === room) {
          return {
            ...rm,
            [`${attribute}`]: value,
          };
        } else return rm;
      });
      state.rooms = currentRooms;
      state.currentRoomDetail[attribute] = value;
    },
    changeRoom(state, action) {
      const { room } = action.payload;
      const newRoom = state.rooms.find((rm) => rm.name === room);
      state.currentRoomDetail = { ...newRoom };
    },
    setFailure: loadingFailed
  },
});

export const {
  setInitialLoading,
  setRoomLoading,
  getRoomsSuccess,
  updateRoomInfo,
  changeRoom,
  setFailure,
} = roomSlice.actions;

export default roomSlice.reducer;

export const buildNewGameRooms = (userId, gameId, difficulty) => async (dispatch) => {
  dispatch(setInitialLoading());
  const rooms = await (buildRooms(userId, gameId, difficulty))
  if (rooms.status === "ok") {
    let currentRoom = rooms.data.find((rm) => rm["room_id"] === "falloutBunker")
    dispatch(getRoomsSuccess({rooms: rooms.data, currentRoom: currentRoom}))
  } else {
    dispatch(setFailure({ error: rooms.error }))
  }
}

export const getCurrentRooms = (gameId, currentRoom) => async (dispatch) => {
  dispatch(setInitialLoading());
  const rooms = await getRooms(gameId)
  if (rooms.status === "ok") {
    let room = rooms.data.find((rm) => rm.room_id === currentRoom)
    dispatch(getRoomsSuccess({rooms: rooms.data, currentRoom: room}))
  } else {
    dispatch(setFailure({ error: rooms.error }))
  }
}
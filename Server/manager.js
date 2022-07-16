const userAndRoomInformation = [];

const addUserToRoom = ({ userId, userName, roomName }, callback) => {
  userName = userName.trim();
  roomName = roomName.trim();

  if (userName.length < 4 || roomName.length < 4) {
    return { error: "Username and roomname should have atleast 4 characters" };
  }

  let alreadyExistingUser = false;

  userAndRoomInformation.forEach((element) => {
    if (element.userName === userName && element.roomName === roomName) {
      alreadyExistingUser = true;
    }
  });

  if (alreadyExistingUser) {
    return { error: "Sorry! This username is already taken in this room!" };
  }

  const newUser = { id: userId, userName: userName, roomName: roomName };
  userAndRoomInformation.push(newUser);

  return { newUser };
};

const deleteUserFromRoom = (userId) => {
  let index = -1;

  for (let i = 0; i < userAndRoomInformation.length; i++) {
    if (userId === userAndRoomInformation[i].id) {
      index = i;
    }
  }

  if (index !== -1) {
    return userAndRoomInformation.splice(index, 1)[0];
  }
};

const getUsersOfRoom = (room) =>
  userAndRoomInformation.filter((newUser) => newUser.roomName === room);

const getUser = (userName) => {
  let user;

  for (let i = 0; i < userAndRoomInformation.length; i++) {
    if (userAndRoomInformation[i].userName === userName) {
      user = userAndRoomInformation[i];
    }
  }

  return user;
};

module.exports = {
  addUserToRoom,
  deleteUserFromRoom,
  getUser,
  getUsersOfRoom,
};

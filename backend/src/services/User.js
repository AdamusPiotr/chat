class UserService {
  users;

  constructor(users = []) {
    this.users = users;
  }

  addUser(newUser) {
    const existingUser = this.users.find(
      (user) => user.username === newUser.username
    );

    if (existingUser) {
      console.error("", existingUser, newUser);
      return {
        error: "User already exists !",
      };
    }

    this.users.push(newUser);

    return { user: newUser };
  }

  removeUser(id) {
    const existingUser = this.getUser(id);

    if (!existingUser) {
      return {
        error: "User not exists !",
      };
    }

    this.users = this.users.filter((user) => user.id !== id);

    return {
      user: existingUser,
    };
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  getUserInRoom(roomName) {
    return this.users.filter((user) => user.room === roomName);
  }
}

const userService = new UserService();

module.exports = {
  userService,
};

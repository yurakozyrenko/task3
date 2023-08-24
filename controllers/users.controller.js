const UsersService = require('../services/users.services');

class UsersControllers {
    async getUsers() {
        let users = await UsersService.getUsers();
        return users;
    }
    async getUsersById(id) {
        let users = await UsersService.getUsers();
        return users.find((item) => item.id == id);
    }

    async getUsersByGender(gender) {
        let users = await UsersService.getUsers();
        if (gender === 'M') {
            return users.filter((item) => item.isMan);
        }
        if (gender === 'F') {
            return users.filter((item) => !item.isMan);
        }
    }

    async getUsersByAge(obj) {
        let users = await UsersService.getUsers();
        return users.filter((item) => item.age > obj.min && item.age < obj.max);
    }

    async postUser(user) {
        let users = await UsersService.getUsers();
        users.length === 0 ? (user.id = 1) : (user.id = users.at(-1).id + 1);
        users.push(user);
        UsersService.setUsers(users);
        return user;
    }

    async putUserById(user, id) {
        let users = await UsersService.getUsers();
        const i = users.findIndex((item) => item.id == id);
        user.id = id;
        if (i === -1) {
            users.push(user);
        } else {
            const updatedUsers = users.map((item) =>
                item.id == id ? Object.assign(item, user) : item
            );
        }
        UsersService.setUsers(users);
        return user;
    }

    async patchUserById(user, id) {
        let users = await UsersService.getUsers();
        if (!users.find((item) => item.id === id)) {
            return 'no find user by id';
        }
        const updatedUsers = users.map((item) =>
            item.id == id ? Object.assign(item, user) : item
        );
        users.splice(0, users.length, ...updatedUsers);
        UsersService.setUsers(users);
        return updatedUsers.find((item) => item.id === id);
    }

    async deleteUserById(id) {
        let users = await UsersService.getUsers();
        const i = users.findIndex((item) => item.id == id);
        users = users.filter((item) => item.id != id);
        UsersService.setUsers(users);
        return i !== -1;
    }
}

module.exports = new UsersControllers();

const fs = require('fs');

class UsersService {
    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) throw err;
                res(JSON.parse(data));
            });
        });
    }
    setUsers(users) {
        fs.writeFile(
            'data.json',
            JSON.stringify(users, null, 4),
            function (err) {}
        );
    }
}

module.exports = new UsersService();

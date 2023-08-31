const fs = require('fs');

class UsersService {
    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) throw err('Do not read');
                res(JSON.parse(data));
            });
        });
    }
    setUsers(users) {
        new Promise((res, rej) => {
        fs.writeFile('data.json', JSON.stringify(users, null, 4), (err) => {
            if (err) throw err('Do not read');
                else res()
        });
    })
  }
}
module.exports = new UsersService();

const expect = require('expect');

const { Users } = require('./../utils/users');

describe('Users', () => {
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'B'
        },
        {
            id: '2',
            name: 'Jen',
            room: 'A'
        },
        {
            id: '3',
            name: 'Julie',
            room: 'B'
        }]
    });
    it('should add a new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Brennan',
            room: 'B'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });
    it('should return names for room A', () => {
        var userList = users.getUserList('A');
        expect(userList).toEqual(['Jen']);
    });
    it('should return names for room B', () => {
        var userList = users.getUserList('B');
        expect(userList).toEqual(['Mike', 'Julie']);
    });
    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe('2');
    });
    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toNotExist();
    });
});
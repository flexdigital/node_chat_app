const expect = require('expect');

var {generateMessage} = require('./../utils/message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Test Admin';
        var text = 'Test message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});
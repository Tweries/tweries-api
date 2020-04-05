const uploadMedia = require('./uploadMedia');

test('uploadMedia', async () => {
  const mockPost = jest.fn(() => ({ data: { media_id_string: '0x123' } }));

  const options = {
    file: { buffer: Buffer.from('HELLO'), originalname: 'hello.jpg' },
    T: { post: mockPost }
  };

  const result = await uploadMedia(options);

  expect(mockPost.mock.calls[0][1]).toMatchSnapshot();
  expect(mockPost.mock.calls[1][1]).toMatchSnapshot();
  expect(result).toMatchSnapshot();
});

import bcrypt from 'bcrypt';
import hashPassword from './hashPassword';

test('test the hashing function', async () => {
  const password = 'okibe';
  const passwordHash = await hashPassword(password, 10);
  expect(await bcrypt.compare(password, passwordHash)).toBeTruthy();
})


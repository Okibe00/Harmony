/**
 * @description Test suit for user class
 */

import Users from "./user";
import { storage } from "./engine/db";
describe('user class', () => {
  test('should contain id, username and password field', async () => {
    const newUser = {
      username: "okibe007",
      password: "okibe007",
      email: "okibe@somemail"
    }
    const okibe = new Users(newUser);
    console.log(okibe);
    expect(okibe.id).toBeTruthy();
    expect(okibe.username).toBe('okibe007');
    expect(okibe.password).toBe("okibe007");
  });
});

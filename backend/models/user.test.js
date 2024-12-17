/**
 * @description Test suit for user class
 */

import Users from "./user";

describe('user class', () => {
  test('should contain id, username and password field', () => {
    const newUser = {
      username: "okibe007",
      password: "okibe007",
    }
    const okibe = new Users(newUser);
    expect(okibe.id).toBeTruthy();
    expect(okibe.username).toBe('okibe007');
    expect(okibe.password).toBe("okibe007");
  });
});

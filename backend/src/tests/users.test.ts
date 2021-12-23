import App from '@/app';
import UserService from '@services/users.service';

const app = new App();
beforeAll(async () => {
  app.listen();
});
afterAll(async () => {
  await new Promise<void>(resolve => {
    app.close();
    setTimeout(() => resolve(), 500);
  });
});

describe('Testing Users Service', () => {
  const userService = new UserService();
  describe('Create User', () => {
    it('throw error on invalid body', async () => {
      try {
        await userService.createUser({
          name: '',
        });
      } catch (error) {
        expect(error.message).toMatch('User validation failed: name: Path `name` is required.');
      }
    });
    it('creates a user', async () => {
      const user = await userService.createUser({
        name: 'User 1',
      });
      expect(user.name).toEqual('User 1');
    });
  });
});

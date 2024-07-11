import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  updateEmail,
  updatePassword,
} from './database';

describe('Firebase Functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('updateEmail should show notification if emails do not match', async () => {
    const data = {
      userID: '12345',
      currentEmail: 'old@example.com',
      email: 'new@example.com',
      emailConfirm: 'different@example.com',
      password: 'password',
      showNotification: vi.fn(),
    };

    await updateEmail(data);
    expect(data.showNotification).toHaveBeenCalledWith('Emails dont match.', 'error');
  });


  it('updatePassword should show notification if passwords do not match', async () => {
    const data = {
      userID: '12345',
      currentPassword: 'oldPassword',
      newPassword: 'newPassword',
      newPasswordConfirm: 'differentPassword',
      showNotification: vi.fn(),
    };

    await updatePassword(data);
    expect(data.showNotification).toHaveBeenCalledWith('Passwords dont match.', 'error');
  });
});

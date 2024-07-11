import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  readData,
  updateEmail,
  updatePassword,
} from './database';
import { get } from '../mocks/firebase';

// Setup Vitest mocks
vi.mock('../mock/firebase');

describe('Firebase Functions', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('readData should return 0 if snapshot does not exist', async () => {
    const mockSnapshot = { exists: () => false };
    get.mockResolvedValue(mockSnapshot);

    const result = await readData('some/path');
    expect(result).toBe(0);
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

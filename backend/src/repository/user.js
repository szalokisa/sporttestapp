import {
  WAT_USER_REGISTER,
  WAT_USER_GET_BY_ID,
  WAT_USER_GET_BY_EMAIL,
  WAT_USER_DELETE_BY_EMAIL,
  WAT_USER_DELETE_BY_ID,
  WAT_USER_UPDATE,
} from '../db/storedProcedures';

export const user = {
  async getByEmail(email) {
    return await WAT_USER_GET_BY_EMAIL(email);
  },

  async getById(id) {
    return await WAT_USER_GET_BY_ID(id);
  },

  async deleteByEmail(email) {
    return await WAT_USER_DELETE_BY_EMAIL(email);
  },

  async deleteById(verified, id) {
    return await WAT_USER_DELETE_BY_ID(verified, id);
  },

  async register(verified, user) {
    return await WAT_USER_REGISTER(verified, user);
  },

  async update(verified, user) {
    return await WAT_USER_UPDATE(verified, user);
  }
}

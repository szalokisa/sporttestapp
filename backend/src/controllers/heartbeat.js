import { PING as sqlPing } from '../db/storedProcedures';

export const heartbeat = async (req, res) => {
  const result = {
    heartbeat: true,
    version: '2023.11.28 15:09',
    dbConnection: false,
  }
  try {
    await sqlPing();
    result.dbConnection = true
  } catch (error) {
    //Nothing to do
  }

  res.json(result);
};

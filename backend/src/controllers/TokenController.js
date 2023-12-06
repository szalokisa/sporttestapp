import TokenService from "../services/TokenService";

export default class TokenController {
  static async login(req, res, next) {
    try {
      if (!req.headers.email || !req.headers.password) {
        throw new Error("Missing parameter!");
      }
      const result = await TokenService.login({
        email: req.headers.email,
        password: req.headers.password,
      });
      res.status(200).json({
        token: result,
      });
    } catch (error) {
      console.log('TokenController.js (line: 20)',error);
      error.status = 400;
      next(error);
    }
  }

  static async extendToken(req, res, next) {
    try {
      const token = await TokenService.extendToken(
        req.verified.id
      );
      res.status(200).json({
        token,
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
}

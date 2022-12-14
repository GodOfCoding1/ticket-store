import express, { Request, Response } from "express";
import { body } from "express-validator";

import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@madhavtickets/common";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage(" password btw 4 and 20"),
    validateRequest,
  ],

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      throw new BadRequestError("email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

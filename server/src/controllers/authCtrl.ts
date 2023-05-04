import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import bcrypt from 'bcrypt';
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "../utils/generateToken";
import { BASE_URL } from "../utils/globals";
import sendMail from "../utils/sendMail";
import { validEmail } from "../utils/valid";
import { verify } from "jsonwebtoken";
import { IToken } from "../utils/interface";

const CLIENT_URL = BASE_URL;

const authCtrl = {
    register: async (req: Request, res: Response) => {
        try {

            const { fullname, username, email, password, gender } = req.body;

            const newUserName = username.toLowerCase().replace(/ /g, '');


            const user_name = await User.findOne({ username: newUserName });
            if (user_name) return res.status(400).json({ msg: "This user name already exists." });

            const user_email = await User.findOne({ email });
            if (user_email) return res.status(400).json({ msg: "This user email already exists." });

            if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 chars." });

            const passwordHash = bcrypt.hashSync(password, 10);

            const newUser = new User({ fullname, username: newUserName, email, password: passwordHash, gender });

            console.log(newUser);

            //    const access_token = 

            const active_token = generateActiveToken({ newUser });

            const url = `${CLIENT_URL}/active/${active_token}`;
            const SENDER_MAIL = `${process.env.SENDER_EMAIL}`;
            const txt = "Verify Your Email Address";
            const mailOptions = {
                from: `"V-NETWORK Email verification" <${SENDER_MAIL}>`,
                to: email,
                subject: "V-NETWORK",
                html: `<div style="max-width: 700px; margin:auto; border-top: 3px solid #d4dadf;border-bottom: 3px solid #d4dadf; padding: 50px 20px; font-size: 110%;font-family:'Cairo', sans-serif;border-radius:20px;">
            <!--  Font  -->
              <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900;1000&display=swap" rel="stylesheet">
            <!--  Font  -->
              
                          <h2 style="text-align: center; text-transform: uppercase;color: #1C99E8;">Welcome to the V-NETWORK Website.</h2>
              <p>Congratulations! You're almost set to start using <a href="${CLIENT_URL}" target="_blank" rel="noopener noreferrer">V-NETWORK.</a>
                              Just click the button below to activate your email address!
                          </p>
                          
                          <a href=${url} style="background: #CC0605;border-radius:10px; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: block;width: fit-content;margin-left: auto;margin-right: auto;">${txt}</a>
                      
                          <p>If the button doesn't work for any reason, you can also click on the link below:</p>
                      
                          <div>${url}</div>
                          </div>`,
            };

            if (!validEmail(email)) return res.status(400).json({ msg: "Invalid Email" });
            await sendMail(mailOptions);

            return res.status(200).json({
                msg: "Register success. Please Check Your Email To Activate Your Account",
                data: newUser,
                active_token,
            });


        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).populate("followers following");
            // .populate("followers following")
            if (!user) return res.status(404).json({ msg: "This Username doesn't exists." });

            if (!bcrypt.compareSync(password, user.password)) return res.status(404).json({ msg: "Incorrect password" });

            user.password = "";


            const access_token = generateAccessToken({ id: user._id });
            const refresh_token = generateRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: 'api/auth',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });

            res.json({ msg: "Register Success!", access_token, user });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    active: async (req: Request, res: Response) => {
        try {
            const { active_token } = req.body;
            if (!active_token)
                return res.status(403).json({ msg: "Please add your token!" });
            const decoded = <IToken>(
                verify(active_token, `${process.env.ACTIVE_TOKEN_SECRET}`)
            );
            const { newUser } = decoded;
            if (!newUser)
                return res.status(400).json({ msg: "Invalid authentication" });

            const user = new User(newUser);
            await user.save();

            return res.status(201).json({ msg: "Account has been activated!" });
        } catch (error: any) {
            if (error.code === 11000)
                return res.status(403).json({ msg: "Account is already exist!" });
            if (error.name === "TokenExpiredError")
                return res
                    .status(403)
                    .json({ msg: "Token is expired please try again!" });
        }
    },
    logout: async (req: Request, res: Response) => {
        try {

            res.clearCookie("refreshtoken", { path: 'api/auth' });

            return res.json({ msg: "Logged out!" });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
    generateAccessToken: async (req: Request, res: Response) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) return res.status(400).json({ msg: "Please Login Now!" });

            const { id } = <IToken>(verify(rf_token, `${process.env.REFRESH_TOKEN_SECRET}`));
            if (!id) return res.status(400).json({ msg: "Please Login Now!" });
            const user = await User.findById(id).select("-password").populate("followers following", '-password');
            if (!user) return res.status(400).json({ msg: "Please Login Now!" });
            const access_token = generateAccessToken({ id });

            return res.json({ user, access_token });
        } catch (error: any) {
            return res.status(400).json({ msg: error.message });
        }
    },
};

export default authCtrl;
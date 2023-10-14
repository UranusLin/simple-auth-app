import express, {Request, Response} from 'express';
import {AppDataSource} from "./data-source"
import {User} from "./entity/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from "cors";

const app = express();
const PORT = 3000;
const JWT_SECRET = 'KLFGHE-6LKJFGHW-5FDSHD-JGFDVZA';
// Cors
app.use(cors());
app.use(express.json());
const userRepository = AppDataSource.getRepository(User)

interface CustomRequest extends Request {
    user: any;
}

AppDataSource.initialize().then(async () => {
    const result = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .getMany()
    console.log(result)
}).catch(error => console.log(error))

// Define a middleware function to verify the token
const verifyToken = (req: CustomRequest, res: Response, next: any) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        req.user = jwt.verify(token, JWT_SECRET) as any;
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


// Sign Up API
app.post('/api/signup', async (req: Request, res: Response) => {
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    try {
        // check if the user already exists
        let existUser = await userRepository.findOneBy({ email: req.body.email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // create a new user
        let user = new User();
        user.email = req.body.email;
        user.password = hashedPassword;
        user.name = req.body.name || '';

        // save the user
        await userRepository.save(user);
        res.json({ message: "User registered successfully", user: {name: user.name, email: user.email, id: user.id} });
    } catch (err) {
        res.status(500).json({ message: "Error registering the user" });
    }
});

// Email Verification API
app.get('/api/verify-email/:token', (req: Request, res: Response) => {
    // TODO: Implement email verification logic using the provided token

    res.json({ message: "Email verified successfully" });
});

// Login API
app.post('/api/login', async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({email: req.body.email});
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).json({message: "Invalid email or password"});
    }

    user.loginCount++;
    user.lastLoginTimestamp = new Date();
    await AppDataSource.getRepository(User).save(user);

    const tokenPayload = { userId: user.id, email: user.email };
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });

    res.json({name: user.name, email: user.email, token: token});
});

// User Profile API
// @ts-ignore
app.get('/api/profile', verifyToken, async (req: CustomRequest, res: Response) => {
    const user = await userRepository.findOneBy({email: req.user.email});
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    res.json({ id: user.id, email: user.email, name: user.name, loginCount: user.loginCount, lastLoginTimestamp: user.lastLoginTimestamp, emailVerified: user.emailVerified});
});

// Reset Password API
// @ts-ignore
app.post('/api/reset-password', verifyToken, async (req: CustomRequest, res: Response) => {
    const user = await userRepository.findOneBy({email: req.user.email});
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    // change password
    user.password = await bcrypt.hash(req.body.password, 10);
    await userRepository.save(user);
    res.json({ message: "Password reset successfully" });
});

// User Dashboard API
app.get('/api/dashboard', (req: Request, res: Response) => {
    // TODO: Implement user dashboard retrieval logic
    res.json({ message: "User dashboard retrieved successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



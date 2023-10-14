import express, { Request, Response } from 'express';
import { AppDataSource } from "./data-source"
import { User } from "./entity/User";

const app = express();
const PORT = 3000;

app.use(express.json());

AppDataSource.initialize().then(async () => {
    const result = await AppDataSource.getRepository(User)
        .createQueryBuilder('user')
        .getMany()
    console.log(result)
}).catch(error => console.log(error))

// Sign Up API
app.post('/api/signup', (req: Request, res: Response) => {
    // TODO: Implement signup logic
    res.json({ message: "User registered successfully" });
});

// Email Verification API
app.get('/api/verify-email/:token', (req: Request, res: Response) => {
    // TODO: Implement email verification logic using the provided token
    res.json({ message: "Email verified successfully" });
});

// Login API
app.post('/api/login', (req: Request, res: Response) => {
    // TODO: Implement login logic
    res.json({ message: "User logged in successfully" });
});

// User Profile API
app.get('/api/profile', (req: Request, res: Response) => {
    // TODO: Implement user profile retrieval logic
    res.json({ message: "User profile retrieved successfully" });
});

// Reset Password API
app.post('/api/reset-password', (req: Request, res: Response) => {
    // TODO: Implement password reset logic
    res.json({ message: "Password reset successfully" });
});

// Logout API
app.post('/api/logout', (req: Request, res: Response) => {
    // TODO: Implement logout logic
    res.json({ message: "User logged out successfully" });
});

// User Dashboard API
app.get('/api/dashboard', (req: Request, res: Response) => {
    // TODO: Implement user dashboard retrieval logic
    res.json({ message: "User dashboard retrieved successfully" });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

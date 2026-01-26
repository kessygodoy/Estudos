import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../config/database';
import { UserRepository } from '../repositories/UserRepository';
import { WalletRepository } from '../repositories/WalletRepository';

export class AuthService {
    constructor(
        private userRepo: UserRepository,
        private walletRepo: WalletRepository
    ) { }

    async register(name: string, email: string, password: string) {
        // 1. Check if user exists
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new Error('User already exists');
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Transaction: Create User + Create Wallet
        return db.transaction(async (trx) => {
            const user = await this.userRepo.create({
                name,
                email,
                password_hash: hashedPassword
            }, trx);

            await this.walletRepo.create(user.id, trx);

            return user;
        });
    }

    async login(email: string, password: string) {
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'default_secret',
            { expiresIn: '1d' }
        );

        return { token, user: { id: user.id, name: user.name, email: user.email } };
    }
}

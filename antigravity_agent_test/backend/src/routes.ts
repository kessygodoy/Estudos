import { Router } from 'express';
import { UserRepository } from './repositories/UserRepository';
import { WalletRepository } from './repositories/WalletRepository';
import { TransactionRepository } from './repositories/TransactionRepository';
import { LotteryRepository } from './repositories/LotteryRepository';
import { BetRepository } from './repositories/BetRepository';

import { AuthService } from './services/AuthService';
import { WalletService } from './services/WalletService';
import { LotteryService } from './services/LotteryService';

import { AuthController } from './controllers/AuthController';
import { WalletController } from './controllers/WalletController';
import { LotteryController } from './controllers/LotteryController';

import { authMiddleware } from './middlewares/authMiddleware';

const routes = Router();

// --- Instantiation (Dependency Injection) ---
const userRepo = new UserRepository();
const walletRepo = new WalletRepository();
const txRepo = new TransactionRepository();
const lotteryRepo = new LotteryRepository();
const betRepo = new BetRepository();

const authService = new AuthService(userRepo, walletRepo);
const walletService = new WalletService(walletRepo, txRepo);
const lotteryService = new LotteryService(lotteryRepo, betRepo, walletRepo, txRepo);

const authController = new AuthController(authService);
const walletController = new WalletController(walletService);
const lotteryController = new LotteryController(lotteryService);

// --- Routes ---

// Auth
routes.post('/auth/register', (req, res) => authController.register(req, res));
routes.post('/auth/login', (req, res) => authController.login(req, res));

// Wallet
routes.get('/wallet/balance', authMiddleware, (req, res) => walletController.getBalance(req as any, res));
routes.post('/wallet/deposit', authMiddleware, (req, res) => walletController.deposit(req as any, res));
routes.post('/wallet/withdraw', authMiddleware, (req, res) => walletController.withdraw(req as any, res));
routes.post('/webhook/pix', (req, res) => walletController.webhook(req, res));

// Lottery
routes.get('/lottery/current', (req, res) => lotteryController.getActive(req, res));
routes.post('/lottery/bet', authMiddleware, (req, res) => lotteryController.placeBet(req as any, res));

export { routes };

import { Request, Response } from 'express';
import { WalletService } from '../services/WalletService';
import { AuthRequest } from '../middlewares/authMiddleware';

export class WalletController {
    constructor(private walletService: WalletService) { }

    async getBalance(req: AuthRequest, res: Response) {
        try {
            const userId = req.user!.id;
            const balance = await this.walletService.getBalance(userId);
            return res.json({ balance });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async deposit(req: AuthRequest, res: Response) {
        try {
            const { amount } = req.body;
            const userId = req.user!.id;
            const result = await this.walletService.createDepositIntent(userId, Number(amount));
            return res.json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async withdraw(req: AuthRequest, res: Response) {
        try {
            const { amount, pixKey } = req.body;
            const userId = req.user!.id;
            await this.walletService.requestWithdraw(userId, Number(amount), pixKey);
            return res.json({ message: 'Withdrawal requested' });
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }

    async webhook(req: Request, res: Response) {
        try {
            // In a real scenario, validate signature from Pix provider logic here
            const { txId } = req.body;
            // Assuming gateway sends our internal txId or we mapped it.

            await this.walletService.processDepositWebhook(txId);
            return res.json({ received: true });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}

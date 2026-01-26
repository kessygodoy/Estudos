import { Request, Response } from 'express';
import { LotteryService } from '../services/LotteryService';
import { AuthRequest } from '../middlewares/authMiddleware';

export class LotteryController {
    constructor(private lotteryService: LotteryService) { }

    async getActive(req: Request, res: Response) {
        try {
            const lottery = await this.lotteryService.getCurrentLottery();
            return res.json(lottery || { message: "No active lottery" });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    async placeBet(req: AuthRequest, res: Response) {
        try {
            const { numbers } = req.body;
            const userId = req.user!.id;

            const result = await this.lotteryService.placeBet(userId, numbers);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

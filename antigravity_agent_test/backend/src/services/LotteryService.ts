import { db } from '../config/database';
import { LotteryRepository } from '../repositories/LotteryRepository';
import { BetRepository } from '../repositories/BetRepository';
import { WalletRepository } from '../repositories/WalletRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class LotteryService {
    constructor(
        private lotteryRepo: LotteryRepository,
        private betRepo: BetRepository,
        private walletRepo: WalletRepository,
        private txRepo: TransactionRepository
    ) { }

    async placeBet(userId: string, numbers: number[]) {
        return db.transaction(async (trx) => {
            // 1. Ensure Active Lottery
            let lottery = await this.lotteryRepo.getActiveLottery(trx);

            if (!lottery) {
                // Create new lottery
                const drawDate = new Date();
                drawDate.setDate(drawDate.getDate() + 3); // 3 days from now
                lottery = await this.lotteryRepo.create({
                    status: 'OPEN',
                    draw_date: drawDate,
                    prize_pool: 0
                }, trx);
            }

            if (lottery.draw_date < new Date()) {
                throw new Error("Lottery is closed for betting");
            }

            // 2. Validate Bet
            if (numbers.length !== 5) throw new Error("Must choose exactly 5 numbers");
            if (new Set(numbers).size !== 5) throw new Error("Numbers must be unique");
            if (numbers.some(n => n < 1 || n > 10)) throw new Error("Numbers must be between 1 and 10");

            const BET_PRICE = 0.10;

            // 3. Lock Wallet & Check Balance
            const wallet = await this.walletRepo.lockWallet(userId, trx);
            if (Number(wallet.balance) < BET_PRICE) {
                throw new Error("Insufficient funds");
            }

            // 4. Execut Bet
            await this.walletRepo.decrementBalance(userId, BET_PRICE, trx);

            // Record Bet
            await this.betRepo.create({
                lottery_id: lottery.id,
                user_id: userId,
                numbers: numbers,
                amount: BET_PRICE
            }, trx);

            // Record Transaction
            await this.txRepo.create({
                wallet_id: wallet.id,
                type: 'BET',
                amount: BET_PRICE,
                status: 'COMPLETED'
            }, trx);

            // 5. Update Prize Pool
            await this.lotteryRepo.incrementPrizePool(lottery.id, BET_PRICE, trx);

            return { message: "Bet placed", lotteryId: lottery.id };
        });
    }

    async getCurrentLottery() {
        return this.lotteryRepo.getActiveLottery();
    }
}

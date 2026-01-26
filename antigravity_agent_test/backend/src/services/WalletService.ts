import { db } from '../config/database';
import { WalletRepository } from '../repositories/WalletRepository';
import { TransactionRepository } from '../repositories/TransactionRepository';

export class WalletService {
    constructor(
        private walletRepo: WalletRepository,
        private txRepo: TransactionRepository
    ) { }

    async getBalance(userId: string) {
        const wallet = await this.walletRepo.findByUserId(userId);
        if (!wallet) throw new Error('Wallet not found');
        return wallet.balance;
    }

    // Step 1: User requests deposit -> Create Pending Transaction & Generate Pix Code (Mocked)
    async createDepositIntent(userId: string, amount: number) {
        if (amount <= 0) throw new Error('Invalid amount');

        const wallet = await this.walletRepo.findByUserId(userId);
        if (!wallet) throw new Error('Wallet not found');

        const tx = await this.txRepo.create({
            wallet_id: wallet.id,
            type: 'DEPOSIT',
            amount,
            status: 'PENDING'
        });

        // Mock Pix integration: Return a fake copy-paste code and the txID
        return {
            transactionId: tx.id,
            pixCopyPaste: `00020126580014br.gov.bcb.pix0114+551199999999520400005303986540${amount.toFixed(2)}5802BR5913Lottery System6008Brasilia62070503***6304`
        };
    }

    // Step 2: Webhook receives payment confirmation -> Process Deposit
    async processDepositWebhook(txId: string) {
        return db.transaction(async (trx) => {
            const tx = await this.txRepo.findById(txId);
            if (!tx) throw new Error('Transaction not found');
            if (tx.status !== 'PENDING') return; // Idempotency check

            await this.txRepo.updateStatus(tx.id, 'COMPLETED', trx);

            // Need to find wallet to get user_id owner, but repo methods take user_id usually.
            // Let's optimize: WalletRepo has incrementBalance by user_id. 
            // But we have wallet_id in transaction.
            // Basic approach: Get wallet first.
            const wallet = await db('wallets').where('id', tx.wallet_id).first().transacting(trx);
            // Direct DB call to avoid circular dependency or extra method, or add findById to WalletRepo.
            // I'll stick to direct for brevity or add findById to repo if needed. 
            // Actually WalletRepository should have findById. I'll use raw db for now or update repo.

            if (wallet) {
                await this.walletRepo.incrementBalance(wallet.user_id, Number(tx.amount), trx);
            }
        });
    }

    async requestWithdraw(userId: string, amount: number, pixKey: string) {
        return db.transaction(async (trx) => {
            const wallet = await this.walletRepo.lockWallet(userId, trx);

            if (Number(wallet.balance) < amount) {
                throw new Error('Insufficient funds');
            }

            await this.walletRepo.decrementBalance(userId, amount, trx);

            await this.txRepo.create({
                wallet_id: wallet.id,
                type: 'WITHDRAW',
                amount,
                status: 'PENDING', // Will be processed by a background job or immediately mocked
                external_id: pixKey // Saving pix key here for simplicity or separate field
            }, trx);

            // In a real app, call Pix Gateway Payout API here.
        });
    }
}

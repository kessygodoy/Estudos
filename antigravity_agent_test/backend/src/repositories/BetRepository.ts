import { Knex } from 'knex';
import { db } from '../config/database';

export interface Bet {
    id: string;
    lottery_id: string;
    user_id: string;
    numbers: number[]; // stored as integer[] in PG, mapped to number[] here
    amount: number;
    created_at: Date;
}

export class BetRepository {
    async create(data: Partial<Bet>, trx?: Knex.Transaction): Promise<Bet> {
        const builder = trx ? trx('bets') : db('bets');
        const [bet] = await builder.insert(data).returning('*');
        return bet;
    }

    async findByLotteryId(lotteryId: string, trx?: Knex.Transaction): Promise<Bet[]> {
        const builder = trx ? trx('bets') : db('bets');
        return builder.where('lottery_id', lotteryId);
    }
}

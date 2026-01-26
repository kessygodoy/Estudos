import { Knex } from 'knex';
import { db } from '../config/database';

export interface Lottery {
    id: string;
    status: 'OPEN' | 'PROCESSING' | 'COMPLETED';
    draw_date: Date;
    prize_pool: number;
    created_at: Date;
}

export class LotteryRepository {
    async getActiveLottery(trx?: Knex.Transaction): Promise<Lottery | undefined> {
        const builder = trx ? trx('lotteries') : db('lotteries');
        return builder.where('status', 'OPEN').first();
    }

    async create(data: Partial<Lottery>, trx?: Knex.Transaction): Promise<Lottery> {
        const builder = trx ? trx('lotteries') : db('lotteries');
        const [lottery] = await builder.insert(data).returning('*');
        return lottery;
    }

    async incrementPrizePool(id: string, amount: number, trx: Knex.Transaction): Promise<void> {
        await trx('lotteries')
            .where('id', id)
            .increment('prize_pool', amount);
    }

    async getLotteriesToClose(trx?: Knex.Transaction): Promise<Lottery[]> {
        const builder = trx ? trx('lotteries') : db('lotteries');
        return builder
            .where('status', 'OPEN')
            .andWhere('draw_date', '<', new Date());
    }

    async updateStatus(id: string, status: 'OPEN' | 'PROCESSING' | 'COMPLETED', trx?: Knex.Transaction): Promise<void> {
        const builder = trx ? trx('lotteries') : db('lotteries');
        await builder.where('id', id).update({ status });
    }
}

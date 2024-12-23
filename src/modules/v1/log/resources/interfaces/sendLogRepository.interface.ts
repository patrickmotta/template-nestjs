import { SendLogEntity } from '../../entities/send.entity'

export type IStoreSendLogInput = Partial<SendLogEntity>

export interface ISendLogRepository {
	store(input: IStoreSendLogInput): Promise<void>
}

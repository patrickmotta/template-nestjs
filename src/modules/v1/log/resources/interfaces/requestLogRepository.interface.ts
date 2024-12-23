import { RequestLogEntity } from '../../entities/request.entity'

export type IStoreRequestLogInput = Partial<RequestLogEntity>

export interface IRequestLogRepository {
	store(input: IStoreRequestLogInput): Promise<void>
}

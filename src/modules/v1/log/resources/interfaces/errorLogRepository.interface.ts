import { ErrorLogEntity } from '../../entities/error.entity'

export type IStoreErrorLogInput = Partial<ErrorLogEntity>

export interface IErrorLogRepository {
	store(input: IStoreErrorLogInput): Promise<void>
}

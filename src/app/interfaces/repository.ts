export interface IRepository {
	id: number,
	name: string,
	language: string,
	lastPush: string,
	isArchived: boolean,
	repositoryUrl: string
}
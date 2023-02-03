export interface IUser extends IOwner {
  name?: string;
  createdAt?: string;
}
export interface IOwner {
  email: string;
  id: string;
}

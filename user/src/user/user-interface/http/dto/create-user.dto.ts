export class CreateUserDto {
  // we should add validation here

  firstname: string;
  lastname: string;
  username: string;
  email: string;
  role: string;
  activationState: string;
}
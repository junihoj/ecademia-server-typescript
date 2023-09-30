export class CreateUserInput {
  email: string;
  password: string;
  name: string;
  salt?: string;
}

export class SignInInput {
  email?: string;
  username?: string;
  password: string;
}

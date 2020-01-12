export class SignupDTO {
  constructor(
    public name: string,
    public username: string,
    public email: string,
    public phone: number[],
    public password: string
  ) {}
}

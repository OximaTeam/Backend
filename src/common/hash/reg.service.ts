import * as bcrypt from "bcrypt";

export async function hashPass(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function validatePass(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

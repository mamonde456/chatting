const emailRegex =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
const passwordRegex = /^[A-Za-z0-9]{8,20}$/;

export function emailMatch(email: string) {
  return emailRegex.test(email);
}

export function passwordMatch(password: string) {
  return passwordRegex.test(password);
}

import { Encrypter } from "../../protocols/encrypter";
import { DbAddAccount } from "./db-add-account";

type SutTypes = {
  sut: DbAddAccount;
  encrypterStub: Encrypter;
};

const makeEncrypter = (): Encrypter => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterStub();
};

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe("DbAddaccount Usecase", () => {
  test("Should call encrypter with correct password", async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  // describe("DbAddaccount Usecase", () => {
  //   test("Should call encrypter with correct password", async () => {
  //     const { sut, encrypterStub } = makeSut();
  //     const encryptSpy = jest.spyOn(encrypterStub, "encrypt");
  //     const accountData = {
  //       name: "valid_name",
  //       email: "valid_email",
  //       password: "valid_password",
  //     };
  //     await sut.add(accountData);
  //     expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  //   });
});
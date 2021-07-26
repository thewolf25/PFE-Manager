import { render, fireEvent } from "@testing-library/react";
import Login from "./Components/Login";
import { expect, it } from "@jest/globals";

describe("form Login ", () => {
  it("form should be", () => {
    const { getByLabelText } = render(<Login />);

    const email = getByLabelText(/email/i);
    //Debug(input)
    expect(email).toBeTruthy();
    expect(email).toHaveAttribute("type", "email");

    const password = getByLabelText(/password/i);
    //Debug(input)
    expect(password).toBeTruthy();
    expect(password).toHaveAttribute("type", "password");
  });
  it("should fire event", () => {
    const login = jest.fn();
    const { debug, getByLabelText, getByText } = render(<Login />);

    //Email

    const inputEmail = getByLabelText(/email/i);
    const email = "wiembengamra@gmail.com"; //input
    fireEvent.change(inputEmail, { target: { value: email } }); //"azerty"
    expect(inputEmail.value).toContain(email);

    //Password
    const inputPassword = getByLabelText(/password/i);
    const password = "123456789";
    fireEvent.change(inputPassword, { target: { value: password } });
    expect(inputPassword.value).toContain(password);
    //Expect(login).toHaveBeenCalled()
    //Expect(login).toHaveBeenCalledTimes(1)
  });
});
/*
Describe("Ajout Etudiant Form", () => {
  it("Form should be", () => {
    const test = jest.fn();
    const { debug, getByLabelText, getByTestId, getByText } = render(<AjouterEtudiant />);

    const name = getByLabelText(/name/i);
    const prename = getByLabelText(/prename/i);
    //debug(input)
    expect(name).toBeTruthy();
    expect(name).toHaveAttribute("type", "text");
    expect(prename).toBeTruthy();
    expect(prename).toHaveAttribute("type", "text");
   
    const password = getByLabelText(/Password/i);
    //debug(input)
    expect(password).toBeTruthy();
    expect(password).toHaveAttribute("type", "password");

    const email = getByLabelText(/Email/i);
    //debug(input)
    expect(email).toBeTruthy();
    expect(email).toHaveAttribute("type", "email");

  
  });
});*/

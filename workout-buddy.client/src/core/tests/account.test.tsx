import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import Login from "../pages/account/Login";
import Register from "../pages/account/Register";
import { Provider } from "react-redux";
import store from "../../store";

test("renders login with initial state", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  const emailInput = screen.getByTestId("email-login-input");
  const passwordInput = screen.getByTestId("password-login-input");
  const rememberCheckbox = screen.getByTestId(
    "remember-login-checkbox"
  ) as HTMLInputElement;
  expect(emailInput.textContent).toBe("");
  expect(passwordInput.textContent).toBe("");
  expect(rememberCheckbox.checked).toBe(false);
});

test("renders register with initial state", () => {
  render(
    <Provider store={store}>
      <Register />
    </Provider>
  );
  const name = screen.getByTestId("register-name");
  const username = screen.getByTestId("register-username");
  const email = screen.getByTestId("register-email");
  const password = screen.getByTestId("register-password");
  const birthdate = screen.getByTestId("register-birthdate");
  const weight = screen.getByTestId("register-weight") as HTMLInputElement;
  expect(name.textContent).toBe("");
  expect(username.textContent).toBe("");
  expect(email.textContent).toBe("");
  expect(password.textContent).toBe("");
  expect(birthdate.textContent).toBe("");
  expect(weight.value).toBe("7");
});

test("check login snapshot", () => {
  const component = render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});

test("check register snapshot", () => {
  const component = render(
    <Provider store={store}>
      <Register />
    </Provider>
  );

  expect(component).toMatchSnapshot();
});

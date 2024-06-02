// src/components/LoginForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router } from "react-router-dom";

test("renders login form and handles validation", () => {
  render(
    <Router>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </Router>
  );

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(usernameInput, { target: { value: "user" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  expect(
    screen.queryByText(/please enter both username and password/i)
  ).toBeNull();
});

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("renders login form and handles validation", async () => {
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

  // Test case: Submit with empty fields
  fireEvent.click(submitButton);
  expect(
    screen.getByText(/please enter both username and password/i)
  ).toBeInTheDocument();

  // Test case: Enter only username
  fireEvent.change(usernameInput, { target: { value: "user" } });
  fireEvent.click(submitButton);
  expect(
    screen.getByText(/please enter both username and password/i)
  ).toBeInTheDocument();

  // Test case: Enter only password
  fireEvent.change(usernameInput, { target: { value: "" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);
  expect(
    screen.getByText(/please enter both username and password/i)
  ).toBeInTheDocument();

  // Test case: Enter both username and password
  fireEvent.change(usernameInput, { target: { value: "user" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(submitButton);

  // Since the LoginForm component is assumed to make an async request for login,
  // we use waitFor to wait for the potential side effects of a successful login
  await waitFor(() => {
    expect(
      screen.queryByText(/please enter both username and password/i)
    ).toBeNull();
  });

  // Further checks can be added here if there are more specific success actions,
  // like redirection or showing a success message.
});

// You can add more test cases to cover different aspects of the login functionality,
// like handling server errors, etc. For example:

test("handles server error on login attempt", async () => {
  // Mocking fetch or axios call to simulate a server error response
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ error: "Invalid credentials" }),
      ok: false,
    })
  );

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
  fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
  fireEvent.click(submitButton);

  // Wait for the async error message to appear
  await waitFor(() => {
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  // Clean up the mock
  global.fetch.mockRestore();
});

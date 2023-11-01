import { describe, it, vi, expect } from "vitest";
import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import LoginFormMobileContainer from "./LoginFormMobileContainer";
import { axe } from "jest-axe";

const showMessage = vi.fn();
const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormMobileContainer", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormMobileContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      <LoginFormMobileContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <LoginFormMobileContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
    expect(container).toBeTruthy();
  });

  it("handles submit", async () => {
    render(
      <LoginFormMobileContainer
        showMessage={(string: { username: string }) => {
          showMessage(string.username);
        }}
        onFinishFailed={onFinishFailed}
        saveUser={(string: { username: string }) => saveUser(string.username)}
      />
    );

    act(() => {
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "test" },
      });
      screen.getByRole("button").click();
    });

    await waitFor(() => {
      expect(showMessage).toHaveBeenCalledTimes(1);
      expect(showMessage).toHaveBeenCalledWith("test");
      expect(saveUser).toHaveBeenCalledTimes(1);
      expect(saveUser).toHaveBeenCalledWith("test");
    });
  });
});
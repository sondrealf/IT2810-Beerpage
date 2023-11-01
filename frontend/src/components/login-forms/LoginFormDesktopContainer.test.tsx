import { describe, it, vi, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginFormDesktopContainer from "./LoginFormDesktopContainer";
import { axe } from "jest-axe";
import { act } from "react-dom/test-utils";

const showMessage = vi.fn();
const onFinishFailed = vi.fn();
const saveUser = vi.fn();

describe("LoginFormDesktopContainer", () => {
  it("is accessible", async () => {
    const { container } = render(
      <LoginFormDesktopContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );

    expect(await axe(container)).toHaveNoViolations();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      <LoginFormDesktopContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const { container } = render(
      <LoginFormDesktopContainer
        showMessage={showMessage}
        onFinishFailed={onFinishFailed}
        saveUser={saveUser}
      />
    );
    expect(container).toBeTruthy();
  });

  it("handles submit", async () => {
    render(
      <LoginFormDesktopContainer
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
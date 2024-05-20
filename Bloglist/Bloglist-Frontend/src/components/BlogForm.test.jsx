import React from "react";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();

  render(<BlogForm createBlog={createBlog} user="Test User" />);

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");
  const createButton = screen.getByText("create");

  await userEvent.type(titleInput, "Testing a form...");
  await userEvent.type(authorInput, "Test Author");
  await userEvent.type(urlInput, "https://example.com");

  await userEvent.click(createButton);

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "Testing a form...",
    author: "Test Author",
    url: "https://example.com",
    user: "Test User",
  });

  expect(titleInput).toHaveValue("");
  expect(authorInput).toHaveValue("");
  expect(urlInput).toHaveValue("");
});

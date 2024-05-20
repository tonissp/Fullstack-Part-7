import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "another",
    author: "one",
    url: "andmore",
    likes: 0,
    user: {
      name: "hi",
    },
  };

  render(<Blog blog={blog} />);

  const titleExist = screen.getByText(/another/);
  expect(titleExist).toBeDefined();

  const authorExist = screen.getByText(/one/);
  expect(authorExist).toBeDefined();

  const urlExist = screen.queryByText(/andmore/);
  expect(urlExist).toBeNull();
});

test("details are shown after clicking button", () => {
  const blog = {
    title: "another",
    author: "one",
    url: "andmore",
    likes: 0,
    user: {
      name: "hi",
    },
  };

  render(<Blog blog={blog} />);

  const viewButton = screen.getByText("view");
  fireEvent.click(viewButton);

  const urlExist = screen.getByText("andmore");
  expect(urlExist).toBeInTheDocument();

  const likeExist = screen.getByText("Likes 0");
  expect(likeExist).toBeInTheDocument();
});

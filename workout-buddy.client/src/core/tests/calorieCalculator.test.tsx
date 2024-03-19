import { render, fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import CaloriesCalculator from "../pages/calorieCalculator/CalorieCalculator";

const { ResizeObserver } = window;

beforeEach(() => {
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;
  jest.restoreAllMocks();
});

test("renders calculator with no calories(empty) for first render", () => {
  render(<CaloriesCalculator />);
  const calorieText = screen.getByTestId("calorie-text");

  expect(calorieText.textContent).toBe("Recommendation calories ");
});

test("renders calculator with 0 value for no input", () => {
  render(<CaloriesCalculator />);
  const calorieText = screen.getByTestId("calorie-text");
  const calorieButton = screen.getByTestId("calorie-button");

  fireEvent.click(calorieButton);

  expect(calorieText.textContent).toBe("Recommendation calories 0");
});

test("check calorie calculator snapshot", () => {
  const component = render(<CaloriesCalculator />);

  expect(component).toMatchSnapshot();
});

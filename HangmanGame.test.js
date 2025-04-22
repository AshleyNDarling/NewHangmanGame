import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HangmanGame from './HangmanGame'; // Adjust the import based on your component structure

// Test 1: Check if the Hangman game renders the title
test('renders Hangman game title', () => {
  render(<HangmanGame />);
  const titleElement = screen.getByText(/hangman game/i); // Match the text "Hangman Game" (case-insensitive)
  expect(titleElement).toBeInTheDocument();
});

// Test 2: Check if the word display area is rendered
test('renders word display', () => {
  render(<HangmanGame />);
  const wordDisplay = screen.getByTestId('word-display'); // Adjust the test ID based on your implementation
  expect(wordDisplay).toBeInTheDocument();
});

// Test 3: Check if the input field for guessing a letter is rendered
test('renders input field for letter guess', () => {
  render(<HangmanGame />);
  const inputElement = screen.getByRole('textbox'); // Matches the input field
  expect(inputElement).toBeInTheDocument();
});

// Test 4: Check if the "New Game" button is rendered
test('renders New Game button', () => {
  render(<HangmanGame />);
  const buttonElement = screen.getByText(/new game/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test 5: Simulate a letter guess and check if it updates the display
test('guesses a letter correctly and updates the word display', () => {
  render(<HangmanGame />);

  // Assuming the word to guess is "React", and the first letter is "R"
  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'R' } });

  const submitButton = screen.getByText(/search/i); // Adjust based on your button's text or role
  fireEvent.click(submitButton);

  const letterElement = screen.getByText('R');
  expect(letterElement).toBeInTheDocument();
});

// Test 6: Check if the used letters list is updated after a guess
test('updates used letters list after guess', () => {
  render(<HangmanGame />);

  const inputElement = screen.getByRole('textbox');
  fireEvent.change(inputElement, { target: { value: 'R' } });

  const submitButton = screen.getByText(/search/i);
  fireEvent.click(submitButton);

  const usedLetters = screen.getByText(/used letters:/i);
  expect(usedLetters).toHaveTextContent('R');
});

// Test 7: Simulate starting a new game
test('starts a new game when the "New Game" button is clicked', () => {
  render(<HangmanGame />);

  const newGameButton = screen.getByText(/new game/i);
  fireEvent.click(newGameButton);

  // Assuming the state or some part of the UI resets after starting a new game
  const wordDisplay = screen.getByTestId('word-display');
  expect(wordDisplay).toHaveTextContent('_');
});

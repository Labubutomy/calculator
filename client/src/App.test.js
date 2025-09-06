import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Мокаем fetch
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('renders calculator interface', () => {
  render(<App />);
  
  expect(screen.getByText('AC')).toBeInTheDocument();
  expect(screen.getByText('=')).toBeInTheDocument();
  expect(screen.getByText('0')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('6')).toBeInTheDocument();
  expect(screen.getByText('7')).toBeInTheDocument();
  expect(screen.getByText('8')).toBeInTheDocument();
  expect(screen.getByText('9')).toBeInTheDocument();
  expect(screen.getByText('+')).toBeInTheDocument();
  expect(screen.getByText('-')).toBeInTheDocument();
  expect(screen.getByText('x')).toBeInTheDocument();
  expect(screen.getByText('/')).toBeInTheDocument();
  expect(screen.getByText('.')).toBeInTheDocument();
});

test('AC button clears the input', () => {
  render(<App />);
  
  const acButton = screen.getByText('AC');
  const inputString = document.querySelector('.input-string');
  
  expect(inputString).toHaveTextContent('');
  
  fireEvent.click(acButton);
  expect(inputString).toHaveTextContent('');
});

test('delete button handles empty input', () => {
  render(<App />);
  
  const deleteButton = document.querySelector('.btn.light-gray svg').parentElement;
  const inputString = document.querySelector('.input-string');
  
  expect(inputString).toHaveTextContent('');
  
  fireEvent.click(deleteButton);
  expect(inputString).toHaveTextContent('');
});

test('history clear button exists', () => {
  render(<App />);
  
  expect(screen.getByText('Clear history')).toBeInTheDocument();
});

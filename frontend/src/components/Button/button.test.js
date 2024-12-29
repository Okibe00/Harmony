/**
 * @description test the button component
 */

import Button from './button';
import { fireEvent, render, screen } from '@testing-library/react';
describe('button component', () => {
  const config = {
    type: 'submit',
    label: 'Submit',
  };
  const func = () => {};
  test('should have the correct type', () => {
    render(<Button config={config} handleSubmit={func} />);
    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button.hasAttribute('type')).toBe(true);
    expect(button.getAttribute('type')).toBe('submit');
  });

  test('should have the correct label', () => {
    render(<Button config={config} handleSubmit={func} />);
    const btn = screen.getByText('Submit') 
    expect(btn.getAttribute('type')).toBe('submit');
  });

  test('should click event is triggered', () => {
    const mock = jest.fn();
    render(<Button config={config} handleSubmit={mock} />);
    const element = screen.getByText('Submit');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    fireEvent(element, event);
    expect(mock).toHaveBeenCalled();
  });
});

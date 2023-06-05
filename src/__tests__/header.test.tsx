import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header';

describe('Header Component', () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it('logo should be defined', async () => {
    const user = userEvent.setup();

    const logo = screen.getByTitle('Funny Movies Logo');
    expect(logo).toBeDefined();
    expect(logo).toHaveAttribute('href', '/');

    const spyAnchorTag = vi.spyOn(user, 'click');
    await user.click(logo);
    expect(spyAnchorTag).toHaveBeenCalledOnce();
  });

  it('rendering and submitting a login form', async () => {
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const loginBtn = screen.getByRole('button', {
      name: /login-btn/i,
    });

    //  email, password fields and login button
    //  expected they are existing
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();

    //  email and password are empty
    //  expected return error message
    await user.click(loginBtn);
    await waitFor(() => {
      expect(
        screen.getByText('Please enter your email address')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter your password')
      ).toBeInTheDocument();
    });

    //  email is not format correctly and password is less than 8 characters
    //  expected return error message
    await user.type(emailInput, 'johndeesomeemail.com');
    await user.type(passwordInput, 'johnd');
    await user.click(loginBtn);
    await waitFor(() => {
      expect(
        screen.getByText('Please enter a valid email address')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Password must be at least 8 characters')
      ).toBeInTheDocument();
    });

    /* await user.type(emailInput, 'john.dee@someemail.com');
    await user.type(passwordInput, 'JohnJohn');
    await user.click(loginBtn); */
    /* await waitFor(() => {
      expect(screen.findByText('User not found')).toBeInTheDocument();
    }); */
  });

  it('should be a link that have href value to "/register"', () => {
    const link = screen.getByRole('link', { name: /register/i });
    expect(link.getAttribute('href')).toBe('/register');
  });
});

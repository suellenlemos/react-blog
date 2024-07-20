import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { useRegisterController } from './useRegisterController';
import { cn } from '../../../app/utils';

interface FormData {
  username: string;
  password: string;
}

export const Register = () => {
  const { handleSubmit } = useForm<FormData>();
  const {
    name,
    setName,
    hasNameError,
    setHasNameError,
    username,
    nameErrorMessage,
    setUsername,
    hasUsernameError,
    setHasUsernameError,
    usernameErrorMessage,
    password,
    setPassword,
    hasPasswordError,
    setHasPasswordError,
    passwordErrorMessage,
    confirmedPassword,
    setConfirmedPassword,
    hasConfirmedPasswordError,
    setHasConfirmedPasswordError,
    confirmedPasswordErrorMessage,
    isSubmitting,
    checkName,
    checkUsername,
    checkPassword,
    checkConfirmedPassword,
    disableSubmit,
    onSubmit,
  } = useRegisterController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
          Sign Up
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Already have an account?
          </span>

          <Link
            to="/login"
            aria-label="Log in"
            className="tracking-[-0.5px] font-medium text-teal-900">
            Log in
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[60px] flex flex-col gap-4">
        <div className="relative">
          <input
            id="name"
            placeholder=""
            autoComplete="off"
            aria-label="Full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setHasNameError(false);
            }}
            onBlur={(e) => {
              setName(e.target.value);
              checkName();
            }}
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
              nameErrorMessage && '!border-red-900'
            )}
          />
          <label
            htmlFor="name"
            className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
            Full name
          </label>
          {hasNameError && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{nameErrorMessage}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            id="username"
            placeholder=""
            autoComplete="off"
            aria-label="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value.toLowerCase().trim());
              setHasUsernameError(false);
            }}
            onBlur={(e) => {
              setUsername(e.target.value.toLowerCase());
              checkUsername();
            }}
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
              usernameErrorMessage && '!border-red-900'
            )}
          />
          <label
            htmlFor="username"
            className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
            Username
          </label>
          {hasUsernameError && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{usernameErrorMessage}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            id="password"
            type="password"
            placeholder=""
            autoComplete="off"
            aria-label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.replace(/\s+/g, ''));
              setHasPasswordError(false);
            }}
            onBlur={(e) => {
              setPassword(e.target.value);
              checkPassword();
            }}
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
              passwordErrorMessage && '!border-red-900'
            )}
          />
          <label
            htmlFor="password"
            className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
            Password
          </label>
          {hasPasswordError && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{passwordErrorMessage}</span>
            </div>
          )}
        </div>

        <div className="relative">
          <input
            id="confirmedPassword"
            type="password"
            placeholder=""
            autoComplete="off"
            aria-label="Confirm password"
            value={confirmedPassword}
            onChange={(e) => {
              setConfirmedPassword(e.target.value.replace(/\s+/g, ''));
              setHasConfirmedPasswordError(false);
            }}
            onBlur={(e) => {
              setConfirmedPassword(e.target.value);
              checkConfirmedPassword();
            }}
            className={cn(
              'bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none',
              confirmedPasswordErrorMessage && '!border-red-900'
            )}
          />
          <label
            htmlFor="confirmedPassword"
            className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
            Confirm your password
          </label>
          {hasConfirmedPasswordError && (
            <div className="flex gap-2 items-center mt-2 text-red-900">
              <CrossCircledIcon />
              <span className="text-xs">{confirmedPasswordErrorMessage}</span>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="mt-2"
          aria-label="Sign up"
          isLoading={isSubmitting}
          disabled={disableSubmit}>
          Sign up
        </Button>
      </form>
    </>
  );
};

import { CrossCircledIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Button';
import { useLoginController } from './useLoginController';
import { cn } from '../../../app/utils';

interface FormData {
  username: string;
  password: string;
}

export const Login = () => {
  const { handleSubmit } = useForm<FormData>();
  const {
    username,
    setUsername,
    hasUsernameError,
    setHasUsernameError,
    usernameErrorMessage,
    password,
    setPassword,
    hasPasswordError,
    setHasPasswordError,
    passwordErrorMessage,
    isSubmitting,
    checkUsername,
    checkPassword,
    disableSubmit,
    onSubmit,
  } = useLoginController();

  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
          Welcome
        </h1>

        <p className="space-x-2">
          <span className="text-gray-700 tracking-[-0.5px]">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="tracking-[-0.5px] font-medium text-teal-900">
            Sign Up
          </Link>
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[60px] flex flex-col gap-4">
        <div className="relative">
          <input
            id="username"
            placeholder=""
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
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim());
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

        <Button
          type="submit"
          className="mt-2"
          isLoading={isSubmitting}
          disabled={disableSubmit}>
          Log in
        </Button>
      </form>
    </>
  );
};

import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface FormData {
  username: string;
  password: string;
}

export const useLoginController = () => {
  const [username, setUsername] = useState<string>('');

  const [hasUsernameError, setHasUsernameError] = useState(false);

  const usernameErrorMessage = 'Please enter a valid username';

  const [password, setPassword] = useState<string>('');

  const [hasPasswordError, setHasPasswordError] = useState(false);

  const passwordErrorMessage = 'Please enter your password';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkUsername = () => {
    setHasUsernameError(username.trim().length < 1);
    setUsername(username);
  };

  const checkPassword = () => {
    setHasPasswordError(password.trim().length < 8);
    setPassword(password);
  };

  const disableSubmit =
    !username ||
    !password ||
    hasUsernameError ||
    hasPasswordError ||
    isSubmitting;

  const onSubmit: SubmitHandler<FormData> = useCallback(async () => {
    const payload = { username: username.trim(), password: password.trim() };
    console.log('payload', payload);
    toast.error('Username or password is incorrect');
  }, [username, password]);

  return {
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
    setIsSubmitting,
    checkUsername,
    checkPassword,
    disableSubmit,
    onSubmit,
  };
};

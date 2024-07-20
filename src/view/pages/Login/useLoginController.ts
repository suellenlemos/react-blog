import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../../app/hooks';

interface FormData {
  username: string;
  password: string;
}

export const useLoginController = () => {
  const { login } = useAuth();

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

  const errorMessageMap = useMemo(() => {
    return [
      {
        backendErrorMessage: 'Usuário não encontrado',
        parsedErrorMessage: 'User not found',
      },

      {
        backendErrorMessage: 'Usuário ou senha divergentes',
        parsedErrorMessage: 'Username or password is incorrect',
      },
    ];
  }, []);

  const parseErrorMessage = useCallback(
    (attr: string) => {
      let errorMessage = attr;
      errorMessageMap.forEach((item) => {
        errorMessage = errorMessage.replace(
          item.backendErrorMessage,
          item.parsedErrorMessage
        );
      });
      return errorMessage;
    },
    [errorMessageMap]
  );

  const onSubmit: SubmitHandler<FormData> = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const params = {
        username: username.trim(),
        password: password.trim(),
      };
      await login(params);
      setIsSubmitting(false);
    } catch (error: any) {
      setIsSubmitting(false);
      const errorMessage = parseErrorMessage(error.message);
      toast.error(errorMessage);
    }
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

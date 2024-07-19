import { useCallback, useMemo, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { authService } from '../../../app/services/authService';

interface FormData {
  username: string;
  password: string;
}

export const useRegisterController = () => {
  const [name, setName] = useState<string>('');

  const [hasNameError, setHasNameError] = useState(false);

  const nameErrorMessage = 'Please enter a valid name';

  const [username, setUsername] = useState<string>('');

  const [hasUsernameError, setHasUsernameError] = useState(false);

  const usernameErrorMessage = 'Username must contain at least 6 characters';

  const [password, setPassword] = useState<string>('');

  const [hasPasswordError, setHasPasswordError] = useState(false);

  const passwordErrorMessage = 'Password must contain at least 8 characters';

  const [confirmedPassword, setConfirmedPassword] = useState<string>('');

  const confirmedPasswordErrorMessage = 'Both passwords must match';

  const [hasConfirmedPasswordError, setHasConfirmedPasswordError] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkName = () => {
    setHasNameError(name.trim().length < 4);
    setName(name);
  };

  const checkUsername = () => {
    setHasUsernameError(username.trim().length < 6);
    setUsername(username);
  };

  const checkPassword = () => {
    setHasPasswordError(password.trim().length < 8);
    setPassword(password);
  };

  const checkConfirmedPassword = () => {
    setHasConfirmedPasswordError(password !== confirmedPassword);
    setConfirmedPassword(confirmedPassword);
  };

  const resetFormFields = () => {
    setName('');
    setUsername('');
    setPassword('');
    setConfirmedPassword('');
  };

  const disableSubmit =
    !name ||
    !username ||
    !password ||
    !confirmedPassword ||
    hasNameError ||
    hasUsernameError ||
    hasPasswordError ||
    hasConfirmedPasswordError ||
    isSubmitting;

  const responseMessageMap = useMemo(() => {
    return [
      {
        backendMessage: 'Dados inválidos',
        parsedMessage: 'Full name, username and password fields must be sent',
      },
      {
        backendMessage: 'Usuário já cadastrado',
        parsedMessage: 'The username you entered is already in use',
      },
      {
        backendMessage: 'Usuário cadastrado',
        parsedMessage: 'User successfully registered!',
      },
    ];
  }, []);

  const parseResponseMessage = useCallback(
    (attr: string) => {
      let message = attr;
      responseMessageMap.forEach((item) => {
        message = message.replace(item.backendMessage, item.parsedMessage);
      });
      return message;
    },
    [responseMessageMap]
  );

  const onSubmit: SubmitHandler<FormData> = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const params = {
        name: name.trim(),
        username: username.trim(),
        password: password.trim(),
      };

      const result: any = await authService.register(params);
      setIsSubmitting(false);
      toast.success(parseResponseMessage(result.message));
      resetFormFields();
    } catch (error: any) {
      setIsSubmitting(false);
      const errorMessage = parseResponseMessage(error.message);
      toast.error(errorMessage);
    }
  }, [name, username, password]);

  return {
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
    setIsSubmitting,
    checkName,
    checkUsername,
    checkPassword,
    checkConfirmedPassword,
    disableSubmit,
    onSubmit,
  };
};

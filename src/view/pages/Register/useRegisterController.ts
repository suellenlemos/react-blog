import { useCallback, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';

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

  const onSubmit: SubmitHandler<FormData> = useCallback(async () => {
    const payload = {
      name: name.trim(),
      username: username.trim(),
      password: password.trim(),
    };
    console.log('payload', payload);
    toast.success('Usuário cadastrado com sucesso');
  }, [username, password]);

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

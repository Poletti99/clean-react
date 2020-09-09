import React from 'react';
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory';
import { SignUp } from '@/presentation/pages';
import { makeRemoteAddAccount } from '../../usecases/add-account/remote-add-account-factory';
import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};

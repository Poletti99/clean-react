import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Footer,
  FormStatus,
  Input,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
  // authentication: Authentication;
  // saveAccessToken: SaveAccessToken;
};

const SignUp: React.FC<Props> = ({
  validation,
}: // authentication,
// saveAccessToken,
Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      nameError: validation.validate('name', state.name),
    }));
  }, [state.name, validation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu email" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>

          <Link to="/login" className={Styles.link}>
            Voltar para login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;

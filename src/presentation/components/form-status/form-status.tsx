import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import { Spinner } from '@/presentation/components';
import Styles from './form-status-styles.scss';

const FormStatus: React.FC = () => {
  const {
    state: { isLoading, mainError },
  } = useContext(Context);
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;

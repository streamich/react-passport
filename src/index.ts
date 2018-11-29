import * as React from 'react';
import {IAuthenticator, User} from 'client-passport/lib/types';

const h = React.createElement;

export interface AuthenticatorProviderProps {
  children;
}

export interface AuthenticatorProviderState {
  loading: boolean; // `true` while Authenticator itself is loading.
  auth: IAuthenticator;
  user: User | null;
}

export interface IProvider extends React.Component<AuthenticatorProviderProps, AuthenticatorProviderState> {
}

export interface AuthenticatorConsumerProps {
  children: (state: AuthenticatorProviderState) => React.ReactNode;
}

const createAuthenticatorContext = (authenticator: IAuthenticator) => {
  const defaultState = {
    loading: true,
    auth: authenticator,
    user: null,
  };
  const context = React.createContext<AuthenticatorProviderState>(defaultState);
  const loadingPromise = authenticator.load();

  class Provider extends React.Component<AuthenticatorProviderProps, AuthenticatorProviderState> implements IProvider {
    state: AuthenticatorProviderState = defaultState;
    mounted = false;

    async componentDidMount () {
      this.mounted = true;
      authenticator.subscribe(this.onUser);

      await loadingPromise;
      if (!this.mounted) return;

      this.setState({loading: false});
    }

    componentWillUnmount () {
      this.mounted = false;
    }

    onUser = (user: User | null) => this.setState({user});

    render () {
      return h(context.Provider, {value: this.state}, this.props.children);
    }
  }

  const useAuth = () => React.useContext(context);

  return {
    Provider: Provider as React.ComponentClass<AuthenticatorProviderProps, AuthenticatorProviderState>,
    Consumer: context.Consumer as React.SFC<AuthenticatorConsumerProps>,
    context,
    useAuth,
  };
};

export default createAuthenticatorContext;

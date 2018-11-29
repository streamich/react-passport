import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {passport} from 'client-passport';
import {loader as googleLoader} from 'client-passport/lib/providers/google';
import {loader as facebookLoader} from 'client-passport/lib/providers/facebook';
import createAuthenticatorContext from '..';

const authenticator = passport({
  providers: {
    google: async () => ({
      loader: googleLoader,
      options: {
        client_id: '305188012168-htfit0k0u4vegn0f6hn10rcqoj1m77ca.apps.googleusercontent.com',
      },
    }),
    facebook: () => ({
      loader: facebookLoader,
      options: {
        appId: '253302651812049',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v3.2',
      }
    }),
  }
});

const context = createAuthenticatorContext(authenticator);

storiesOf('React Passport|Demo', module)
  .add('Default', () => {
    return (
      <context.Provider>
        <context.Consumer>{({loading, user, auth}) => {
          if (loading) {
            return <div>Loading...</div>;
          }

          return (
            <div>
              {user
                ? 'Authenticated'
                : 'not authenticated'
              }
              <button onClick={() => auth.signIn('google')}>SignIn with Google</button>
            </div>
          );
        }}
        </context.Consumer>
      </context.Provider>
    );
  });

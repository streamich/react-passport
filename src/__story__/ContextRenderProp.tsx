import * as React from 'react';
import {passport} from 'client-passport';
import {loader as googleLoader} from 'client-passport/lib/providers/google';
import {loader as facebookLoader} from 'client-passport/lib/providers/facebook';
import createAuthenticatorContext from '..';
import {Avatar} from 'p4-ui/lib/atoms/Avatar';
import {Button} from 'p4-ui/lib/molecules/Button';
import ButtonGoogle from 'p4-ui/lib/molecules/ButtonGoogle';
import ButtonFacebook from 'p4-ui/lib/molecules/ButtonFacebook';

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

const ContextRenderProp = () => {
  return (
    <context.Provider>
      <context.Consumer>{({loading, user, auth}) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        return (
          <div style={{
            margin: '40px auto',
            maxWidth: 400,
            textAlign: 'center',
          }}>
            {user &&
              <div>
                <Avatar src={user.avatar} size={4}/>
                <br />
                <br />
                <Button onClick={auth.signOut} ghost block>Logout</Button>
                <br />
                <br />
              </div>
            }
            <br />
            {!user &&
              <div>
                <ButtonGoogle onClick={() => auth.signIn('google')} />
                <br />
                <br />
                <ButtonFacebook onClick={() => auth.signIn('facebook')} />
              </div>
            }
          </div>
        );
      }}
      </context.Consumer>
    </context.Provider>
  );
};

export default ContextRenderProp;

# react-passport

- Client-side authentication for React
- React context for [`client-passport`](https://github.com/streamich/client-passport)
- Provides Hooks API


## Installation

Instal `react-passport` and `client-passport` packages.

```shell
yarn add client-passport react-passport
```


## Usage

First create an `authenticator` instance.

```js
import {passport} from 'client-passport';
import {loader as googleLoader} from 'client-passport/lib/providers/google';
import {loader as facebookLoader} from 'client-passport/lib/providers/facebook';

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
```

Now use `react-passport` to create React context.

```js
import createAuthenticatorContext from 'react-passport';
const {Provider, Consumer, context, useAuth} = createAuthenticatorContext(authenticator);
```

Now you can use it as React context.

```jsx
<Provider>
  <Consumer>{({loading, user, auth}) => {
    // ...
  }}</Consumer>
</Provider>
```

Where

- `loading` &mdash; is a boolean indicating whether `authenticator` itself is loading.
- `auth` &mdash; is the instance of `authenticator`, you can use it for signing in/out `auth.signIn('google')` and `auth.signOut()`.
- `user` &mdash; is `null` if user is not authenticated or an instance of `User` object if user is authenticated. You can use it as `user.name`, `user.avatar`, `user.token` etc.

You can also use this library with React hooks.

```js
const MyComponent = () => {
  const {loading, user, auth} = useAuth();
  // ...
};
```


## License

[Unlicense](LICENSE) &mdash; public domain.

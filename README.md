<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-intl&background=tiles&project=%20" alt="solid-intl">
</p>

# Solid Intl

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

A universal internationalization (i18n) for Solid inspired by React Intl & FormatJS.

## Quick start

Install it:

```bash
npm i @cookbook/solid-intl
# or
yarn add @cookbook/solid-intl
# or
pnpm add @cookbook/solid-intl
```

Wrap your application with an i18n Context

```tsx
import { IntlProvider } from '@cookbook/solid-intl'

render(() =>
  <IntlProvider locale={usersLocale} messages={translationsForUsersLocale}>
    <App />
  </IntlProvider>,
  document.getElementById("root")!);
```

Using

````tsx
import { useIntl } from '@cookbook/solid-intl';

function Component(props) {
  const { intl } = useIntl();

  return intl.formatMessage({
    // The whole `intl.formatMessage` is required so we can extract
    id: 'foo',
    defaultMessage: 'foo',
  })
}
````

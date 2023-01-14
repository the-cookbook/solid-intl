<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=solid-intl&background=tiles&project=%20" alt="solid-intl">
</p>

# Solid Intl

[![pnpm][pnpm-image]][pnpm-url]
[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![GitHub stars][stars-image]][stars-url]
[![Known Vulnerabilities][vulnerabilities-image]][vulnerabilities-url]
[![GitHub issues][issues-image]][issues-url]
[![Awesome][awesome-image]][awesome-url]

A universal internationalization (i18n) for Solid inspired by React Intl & FormatJS.

## Quick start

### Install it:

```bash
npm i @cookbook/solid-intl
# or
yarn add @cookbook/solid-intl
# or
pnpm add @cookbook/solid-intl
```

### Wrap your application with `<IntlProvider />`

```tsx
import { IntlProvider } from '@cookbook/solid-intl'

// usersLocale = 'en', 'en-US', 'pt-BR', so on...
// translationsForUsersLocale = translations for selected locale
render(() =>
  <IntlProvider locale={usersLocale} messages={translationsForUsersLocale}>
    <App />
  </IntlProvider>,
  document.getElementById("root")!);
```

###  Create your message and use it with `intl.formatMessage`

```tsx
import { defineMessages, useIntl } from '@cookbook/solid-intl';

const messages = defineMessages({
  greeting: {
    id: "app.greeting",
    defaultMessage: "Hello world!",
  },
});

function Component(props) {
  const { intl } = useIntl();

  return intl.formatMessage(messages.greeting) // outputs: Hello world!
}
````

______
# Table of contents

- [API](#api)
  - [`<IntlProvider />`](#intlprovider-)
    - [locale, formats, and messages](#locale-formats-and-messages)
    - [defaultLocale and defaultFormats](#defaultlocale-and-defaultformats)
    - [defaultRichTextElements](#defaultrichtextelements)
    - [onError](#onerror)
    - [onWarn](#onwarn)
  - [`useIntl()` hook](#useintl-hook)
    - [formatDate](#formatdate)
    - [formatTime](#formattime)
    - [formatRelativeTime](#formatrelativetime)
    - [formatNumber](#formatnumber)
    - [formatPlural](#formatplural)
    - [formatList](#formatlist)
    - [formatDisplayName](#formatdisplayname)
    - [formatMessage](#formatmessage)
    - [defineMessages/defineMessage](#definemessagesdefinemessage)
- [Message Extraction](#message-extraction)
  - [Extraction](#extraction)
- [Basic Internationalization Principles](#basic-internationalization-principles)
  - [What Is Internationalization and Why Does It Matter?](#what-is-internationalization-and-why-does-it-matter)
  - [Locales: Language and Region](#locales-language-and-region)
  - [Translating Strings](#translating-strings)
- [Message Syntax](#message-syntax)
  - [Message Descriptor](#message-descriptor)
  - [Message Formatting Fallbacks](#message-formatting-fallbacks)
  - [Formatting Message Argument](#formatting-message-argument)
    - [`number` formatting](#number-formatting)
    - [`date` formatting](#date-formatting)
    - [`time` formatting](#time-formatting)
    - [Supported DateTime Skeleton](#supported-datetime-skeleton)
    - [`{select}` Format](#select-format)
    - [`{plural}` Format](#plural-format)
    - [`{selectordinal}` Format](#selectordinal-format)
    - [Rich Text Formatting](#rich-text-formatting)
    - [Quoting / Escaping](#quoting--escaping)

______

# API

## `<IntlProvider />`

Solid Intl uses the provider pattern to scope an i18n context to a tree of components.
This allows configuration like the current locale and set of translated strings/messages to be provided at the root of a component tree and made available to the 'useIntl()' hook methods.
This component is used to setup the i18n context for a tree.
Usually, this component will wrap an app's root component so that the entire app will be within the configured i18n context.
The following are the i18n configuration props that can be set:

```tsx
interface IntlConfig {
  locale: Locale;
  timeZone?: string;
  fallbackOnEmptyString?: boolean;
  formats?: CustomFormats;
  messages: Record<MessageIds, string> | Record<MessageIds, MessageFormatElement[]>;
  defaultLocale?: string;
  defaultFormats?: CustomFormats;
  defaultRichTextElements?: Record<string, FormatXMLElementFn<JSXElement>>;
  onError(err: MissingTranslationError | MessageFormatError | MissingDataError | InvalidConfigError | UnsupportedFormatterError | FormatError)?: void;
  onWarn(warning: string)?: void;
}
```

### locale, formats, and messages

The user's current locale and what the app should be rendered in.
While `defaultLocale` and `defaultFormats` are for fallbacks or during development and represent the app's default.
Notice how there is no `defaultMessages`, that's because each Message Descriptor provides a defaultMessage.

### defaultLocale and defaultFormats

Default locale & formats for when a message is not translated (missing from `messages`).
`defaultLocale` should be the locale that `defaultMessages` are declared in so that a sentence is coherent in a single locale. Without `defaultLocale` and/or if it's set incorrectly, you might run into scenario where a sentence is in English but embedded date/time is in Spanish.

### defaultRichTextElements
A map of tag to rich text formatting function. This is meant to provide a centralized way to format common tags such as `<b>`, `<p>`... or enforcing certain Design System in the codebase (e.g standardized `<a>` or `<button>`...).

See [https://github.com/formatjs/formatjs/issues/1752](https://github.com/formatjs/formatjs/issues/1752) for more context.

### onError
Allows the user to provide a custom error handler.
By default, error messages are logged using `console.error` if `NODE_ENV` is not set to `production`.

### onWarn
Allows the user to provide a custom warning handler.
By default, warning messages are logged using `console.warning` if `NODE_ENV` is not set to `production`.


## `useIntl()` hook

### formatDate
```ts
function formatDate(
  value: number | Date,
  options?: Intl.DateTimeFormatOptions & {format?: string}
): string
```

This function will return a formatted date string.
It expects a `value` which can be parsed as a date (i.e., `isFinite(new Date(value))`), and accepts `options` that conform to `DateTimeFormatOptions`.

```ts
intl.formatDate(Date.now(), {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})

// outputs: 04/01/2023
```


### formatTime

```ts
function formatTime(
  value: number | Date,
  options?: Intl.DateTimeFormatOptions & {format?: string}
): string
```

This function will return a formatted date string, but it differs from [`formatDate`](#formatDate) by having the following default options:

```ts
{
    hour: 'numeric',
    minute: 'numeric',
}
```

It expects a `value` which can be parsed as a date (i.e., `isFinite(new Date(value))`), and accepts options that conform to `DateTimeFormatOptions`.


```ts
intl.formatTime(Date.now())
// outputs: "4:03 PM"
```

### formatRelativeTime

> **BROWSER SUPPORT**:
>
> This requires [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat) which has limited browser support.
> Please use our [polyfill](https://formatjs.io/docs/polyfills/intl-relativetimeformat) if you plan to support them.


```ts
type Unit =
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year'

type RelativeTimeFormatOptions = {
  numeric?: 'always' | 'auto'
  style?: 'long' | 'short' | 'narrow'
}

function formatRelativeTime(
  value: number,
  unit: Unit,
  options?: Intl.RelativeTimeFormatOptions & {
    format?: string
  }
): string
```

This function will return a formatted relative time string (e.g., "1 hour ago"). It expects a `value` which is a number, a `unit` and `options` that conform to `Intl.RelativeTimeFormatOptions`.

```ts
intl.formatRelativeTime(0)
// outputs: in 0 seconds
```

```ts
intl.formatRelativeTime(-24, 'hour', {style: 'narrow'})
// outputs: 24 hr ago
```


### formatNumber

This function uses [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat) options.

```ts
function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions & {format?: string}
): string
```

This function will return a formatted number string.
It expects a `value` which can be parsed as a number, and accepts `options` that conform to `NumberFormatOptions`.

```ts
intl.formatNumber(1000, {style: 'currency', currency: 'USD'})
// outputs: US$1,000.00
```

**Formatting Number using unit**

Currently this is part of ES2020 [NumberFormat](https://tc39.es/ecma402/#numberformat-objects).
We've provided a [polyfill](https://formatjs.io/docs/polyfills/intl-numberformat) here and `@formatjs/intl` types allow users to pass in a [sanctioned unit](https://formatjs.io/docs/polyfills/intl-numberformat#SupportedUnits):

```ts
intl.formatNumber(1000, {
  style: 'unit',
  unit: 'kilobyte',
  unitDisplay: 'narrow',
})
// outputs: 1,000kB
```


```ts
intl.formatNumber(1000, {
  unit: 'fahrenheit',
  unitDisplay: 'long',
  style: 'unit',
})
// outputs: 1,000 degrees Fahrenheit
```

### formatPlural

```ts
type PluralFormatOptions = {
  type?: 'cardinal' | 'ordinal' = 'cardinal'
}

function formatPlural(
  value: number,
  options?: Intl.PluralFormatOptions
): 'zero' | 'one' | 'two' | 'few' | 'many' | 'other'
```

This function will return a plural category string: `"zero"`, `"one"`, `"two"`, `"few"`, `"many"`, or `"other"`.
It expects a `value` which can be parsed as a number, and accepts `options` that conform to `PluralFormatOptions`.

This is a low-level utility whose output could be provided to a `switch` statement to select a particular string to display.

```ts
intl.formatPlural(1)
// outputs: one
```

```ts
intl.formatPlural(3, {style: 'ordinal'})
// outputs: one
```

> **MULTIPLE LANGUAGE SUPPORT**
>
> This function should only be used in apps that only need to support one language. If your app supports multiple languages use formatMessage instead.

### formatList

> **BROWSER SUPPORT**
>
> This requires [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) which has limited browser support. Please use our [polyfill](https://formatjs.io/docs/polyfills/intl-listformat) if you plan to support them.


This function allows you to join list of things together in an i18n-safe way. For example, when the locale is `en`:

```ts
intl.formatList(['Me', 'myself', 'I'], {type: 'conjunction'})
// outputs: Me, myself and I
```

```ts
intl.formatList(['5 hours', '3 minutes'], {type: 'unit'})
// outputs: 5 hours, 3 minutes
```


### formatDisplayName

> **BROWSER SUPPORT**
>
> This requires [Intl.DisplayNames](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DisplayNames) which has limited browser support. Please use our [polyfill](https://formatjs.io/docs/polyfills/intl-displaynames) if you plan to support them.

```ts
type FormatDisplayNameOptions = {
  style?: 'narrow' | 'short' | 'long'
  type?: 'language' | 'region' | 'script' | 'currency'
  fallback?: 'code' | 'none'
}

function formatDisplayName(
  value: string | number | Record<string, unknown>,
  options: FormatDisplayNameOptions
): string | undefined
```

Usage examples:

```ts
intl.formatDisplayName('zh-Hans-SG', {type: 'language'})
// outputs: Simplified Chinese (Singapore)
```

```ts
// ISO-15924 four letters script code to localized display name
intl.formatDisplayName('Deva', {type: 'script'})
// outputs: Devanagari
```

```ts
// ISO-4217 currency code to localized display name
intl.formatDisplayName('CNY', {type: 'currency'})
// outputs: Chinese Yuan
```

```ts
// ISO-3166 two letters region code to localized display name
intl.formatDisplayName('UN', {type: 'region'})
// outputs: United Nations
```

### formatMessage

```ts
type MessageFormatPrimitiveValue = string | number | boolean | null | undefined

function formatMessage(
  descriptor: MessageDescriptor,
  values?: Record<string, MessageFormatPrimitiveValue>
): string

function formatMessage(
  descriptor: MessageDescriptor,
  values?: Record<
    string,
    MessageFormatPrimitiveValue | JSX.Element | FormatXMLElementFn
  >
): string | JSX.Element[]
```

This function will return a formatted message string.
It expects a `MessageDescriptor` with at least an id property, and accepts a shallow `values` object which are used to fill placeholders in the message.

If a translated message with the `id` has been passed to the `<IntlProvider>` via its `messages` prop it will be formatted, otherwise it will fallback to formatting `defaultMessage`.

> **See**: [Message Formatting Fallbacks](#message-formatting-fallbacks) for more details.

```tsx
function () {
  const messages = defineMessages({
    greeting: {
      id: 'app.greeting',
      defaultMessage: 'Hello, {name}!',
    },
  })

  return intl.formatMessage(messages.greeting, {name: 'Eric'})
  // outputs: Hello, Eric!
}
```

With `JSX.Element`


```tsx
function () {
  const messages = defineMessages({
    greeting: {
      id: 'app.greeting',
      defaultMessage: 'Hello, {name}!',
    },
  })

  return intl.formatMessage(messages.greeting, {name: <b>Eric</b>})
  // outputs: Hello, <b>Eric</b>!
}
```

With rich text formatting


```tsx
function () {
  const messages = defineMessages({
    greeting: {
      id: 'app.greeting',
      defaultMessage: 'Hello, {name}!',
    },
  })

  return intl.formatMessage(messages.greeting, {
    name: 'Eric',
    bold: str => <b>{str}</b>,
  })
  // outputs: Hello, <b>Eric</b>!
}
```

### defineMessages/defineMessage

```ts
interface MessageDescriptor {
  id?: string
  description?: string | object
  defaultMessage?: string
}

function defineMessages(
  messageDescriptors: Record<string, MessageDescriptor>
): Record<string, MessageDescriptor>

function defineMessage(messageDescriptor: MessageDescriptor): MessageDescriptor
```

These functions are re-exported from the `@formatjs/intl` package and are simply a hook for our CLI & babel/TS plugin to use when compiling default messages defined in JavaScript source files.
This function simply returns the Message Descriptor map object that's passed-in.

```ts
import {defineMessages, defineMessage} from '@cookbook/solid-intl'

const messages = defineMessages({
  greeting: {
    id: 'app.home.greeting',
    defaultMessage: 'Hello, {name}!',
  },
})

const msg = defineMessage({
  id: 'single',
  description: 'header',
})
```

______


# Message Extraction

Now that you've declared some messages, it's time to extract them.

```bash
npm i @formatjs/cli
# or
yarn add @formatjs/cli
# or
pnpm add @formatjs/cli
```

### Extraction

Add the following command to your `package.json` `scripts`:

```bash
{
  "scripts": {
    "extract": "formatjs extract"
  }
}
```

And execute it:

```
npm run extract -- 'src/**/*.ts*' --ignore='**/*.d.ts' --out-file lang/en.json'
```

Given a file that has the following messages:


```tsx
import { useIntl } from '@cookbook/solid-intl'

export function List(props) {
  const intl = useIntl();

  return (
    <section>
      <header>
        {intl.formatMessage({
          id: 'settings.list.header',
          defaultMessage: 'Control Panel',
        })}
      </header>
      <ul>
        <li>
          <button>
            {intl.formatMessage({
              id: 'settings.list.button.delete',
              defaultMessage: 'Delete user {name}',
            }, {
              name: props.name,
            })}
          </button>
        </li>
        <PasswordChange />
      </ul>
    </section>
  )
}
```

running the above command will create a file called `lang/en.json:

```json
{
  "settings.list.header": "Control Panel",
  "settings.list.button.delete": "Delete user {name}"
}
```

______


# Basic Internationalization Principles

## What Is Internationalization and Why Does It Matter?

Internationalized software supports the languages and cultural customs of people throughout the world. The Web reaches all parts of the world. Internationalized web apps provide a great user experience for people everywhere.

Localized software adapts to a specific language and culture by translating text into the user's language and formatting data in accordance with the user's expectations. An app is typically localized for a small set of locales.

The [ECMA-402 JavaScript internationalization specification](https://github.com/tc39/ecma402) has an excellent overview.

## Locales: Language and Region

A "locale" refers to the lingual and cultural expectations for a region. It is represented using a "locale code" defined in [UTS LDML](https://www.unicode.org/reports/tr35/tr35.html#Identifiers).

This code is comprised of several parts separated by hyphens (-). The first part is a short string representing the language. The second, optional, part is a short string representing the region. Additionally, various extensions and variants can be specified.

Typically, web apps are localized to just the language or language-region combination. Examples of such locale codes are:

1. `en` for English
2. `en-US` for English as spoken in the United States
3. `en-GB` for English as spoken in the United Kingdom
4. `es-AR` for Spanish as spoken in Argentina
5. `ar-001` for Arabic as spoken throughout the world
6. `ar-AE` for Arabic as spoken in United Arab Emirates

7. Most internationalized apps only support a small list of locales.


## Translating Strings

You likely have some text in your application that is in a natural language such as English or Japanese. In order to support other locales, you will need to translate these strings.

FormatJS provides a mechanism to let you write the core "software" of your application without special code for different translations. The considerations for each locale are encapsulated in your translated strings and our libraries.

```ts
const messages = {
  en: {
    GREETING: 'Hello {name}',
  },
  fr: {
    GREETING: 'Bonjour {name}',
  },
}
```

We use the [ICU Message syntax](https://unicode-org.github.io/icu/userguide/format_parse/messages) which is also used in Java, C, PHP and various other platforms.

______


# Message Syntax

String/Message formatting is a paramount feature of Solid Intl and it builds on [ICU Message Formatting](https://unicode-org.github.io/icu/userguide/format_parse/messages) by using the [ICU Message Syntax](https://formatjs.io/docs/core-concepts/icu-syntax).
This message syntax allows for simple to complex messages to be defined, translated, and then formatted at runtime.

**Simple Message:**

```ts
Hello everyone
```

**Simple Argument**

You can use a `{key}` argument for placing a value into the message.
The key is looked up in the input data, and the string is interpolated with its value.

```ts
Hello, {name}
```

**Complex Message:**

```ts
Hello, {name}, you have {itemCount, plural,
  =0 {no items}
  one {# item}
  other {# items}
}.
```

## Message Descriptor

Solid Intl has a Message Descriptor concept which is used to define your app's default messages/strings.
The Message Descriptors work very well for providing the data necessary for having the strings/messages translated, and they contain the following properties:


- `id`: A unique, stable identifier for the message
- `description`: Context for the translator about how it's used in the UI
- `defaultMessage`: The default message (probably in English)

```ts
interface MessageDescriptor {
  id?: MessageIds;
  description?: string | object;
  defaultMessage?: string | MessageFormatElement[];
}
```

## Message Formatting Fallbacks
The message formatting APIs go the extra mile to provide fallbacks for the common situations where formatting fails;
at the very least a non-empty string should always be returned.

Here's the message formatting fallback algorithm:

1. Lookup and format the translated message at id, passed to <IntlProvider>.
2. Fallback to formatting the defaultMessage.
3. Fallback to translated message at id's source.
4. Fallback to defaultMessage source.
5. Fallback to the literal message id.


## Formatting Message Argument

Values can also be formatted based on their type. You use a `{key, type, format}` argument to do that.

The elements of the argument are:

- `key` is where in the input data to find the data
- `type` is how to interpret the value (see below)
- `format` is optional, and is a further refinement on how to display that type of data

```bash
I have {numCats, number} cats.
```

### `number` formatting

This type is used to format numbers in a way that is sensitive to the locale.
It understands the following values for the optional `format` element of the argument:

```bash
I have {numCats, number} cats.
Almost {pctBlack, number, ::percent} of them are black.
```

Internally it uses the Intl.NumberFormat API. You can define custom values for the format element, which are passed to the Intl.NumberFormat constructor.

Sometimes embedding how the number will be formatted provides great context to translators. We also support ICU Number Skeletons using the same syntax:

```bash
The price of this bagel is {num, number, ::sign-always compact-short currency/GBP}
```

You can read more about this [here](https://unicode-org.github.io/icu/userguide/format_parse/numbers/skeletons.html).


### `date` formatting

This type is used to format dates in a way that is sensitive to the locale.
It understands the following values for the optional format element of the argument:

- `short` is used to format dates in the shortest possible way
- `medium` is used to format dates with short textual representation of the month
- `long` is used to format dates with long textual representation of the month
- `full` is used to format dates with the most detail

```bash
Sale begins {start, date, medium}
```

Internally it uses the `Intl.DateTimeFormat` API. You can define custom values for the format element, which are passed to the `Intl.DateTimeFormat` constructor.

### `time` formatting

This type is used to format times in a way that is sensitive to the locale.
It understands the following values for the optional format element of the argument:

- `short` is used to format times with hours and minutes
- `medium` is used to format times with hours, minutes, and seconds
- `long` is used to format times with hours, minutes, seconds, and timezone
- `full` is the same as long

```bash
Coupon expires at {expires, time, short}
```
Internally it uses the `Intl.DateTimeFormat` API. You can define custom values for the format element, which are passed to the `Intl.DateTimeFormat` constructor.

### Supported DateTime Skeleton

Similar to `number` type, we also support ICU DateTime skeleton.
ICU provides a [wide array of pattern](https://unicode-org.github.io/icu/userguide/format_parse/datetime/#date-field-symbol-table) to customize date time format.
However, not all of them are available via ECMA402's Intl API.
Therefore, we only support the following patterns

|  Symbol |  Meaning |  Notes |
|---|---|---|
| G |	Era designator | |
| y |	year | |
| M |	month in year | |
| L |	stand-alone month in year | |
| d |	day in month | |
| E |	day of week | |
| e |	local day of week |	e..eee is not supported |
| c |	stand-alone local day of week	 |c..ccc is not supported |
| a |	AM/PM marker | |
| h |	Hour [1-12] | |
| H |	Hour [0-23] | |
| K |	Hour [0-11] | |
| k |	Hour [1-24] | |
| m |	Minute | |
| s |	Second | |
| z |	Time Zone | |


### `{select}` Format

The `{key, select, matches}` is used to choose output by matching a value to one of many choices.
(It is similar to the `switch` statement available in some programming languages.)
The key is looked up in the input data.
The corresponding value is matched to one of matches and the corresponding output is returned.
The key argument must follow [Unicode Pattern_Syntax](https://www.unicode.org/reports/tr31/tr31-9.html#Pattern_Syntax).
The `matches` is a space-separated list of `matches`.

The format of a match is match `{output}`.
(A match is similar to the case statement of the switch found in some programming languages.)
The `match` is a literal value.
If it is the same as the value for `key` then the corresponding `output` will be used.

output is itself a message, so it can be a literal string or also have more arguments nested inside of it.

The `other` match is special and is used if nothing else matches. (This is similar to the default case of the switch found in some programming languages.)

> **DANGER**
>
> `other` is required as per `icu4j` implementation. We will throw an error if `select` is used without `other`.

```bash
{gender, select,
    male {He}
    female {She}
    other {They}
} will respond shortly.
```

Here's an example of nested arguments.

```bash
{taxableArea, select,
    yes {An additional {taxRate, number, percent} tax will be collected.}
    other {No taxes apply.}
}
```

### `{plural}` Format

The `{key, plural, matches}` is used to choose output based on the pluralization rules of the current locale. It is very similar to the `{select}` format above except that the value is expected to be a number and is mapped to a plural category.

The match is a literal value and is matched to one of these plural categories. Not all languages use all plural categories.

- `zero`: This category is used for languages that have grammar specialized specifically for zero number of items. (Examples are Arabic and Latvian.)
- `one`: This category is used for languages that have grammar specialized specifically for one item. Many languages, but not all, use this plural category. (Many popular Asian languages, such as Chinese and Japanese, do not use this category.)
- `two`: This category is used for languages that have grammar specialized specifically for two items. (Examples are Arabic and Welsh.)
- `few`: This category is used for languages that have grammar specialized specifically for a small number of items. For some languages this is used for 2-4 items, for some 3-10 items, and other languages have even more complex rules.
- `many`: This category is used for languages that have grammar specialized specifically for a larger number of items. (Examples are Arabic, Polish, and Russian.)
- `other`: This category is used if the value doesn't match one of the other plural categories. Note that this is used for "plural" for languages (such as English) that have a simple "singular" versus "plural" dichotomy.
- `=value`: This is used to match a specific value regardless of the plural categories of the current locale.

> **DANGER**
>
> `other` is required as per `icu4j` implementation. We will throw an error if `select` is used without `other`.

```bash
Cart: {itemCount} {itemCount, plural,
    one {item}
    other {items}
}
```

```bash
You have {itemCount, plural,
    =0 {no items}
    one {1 item}
    other {{itemCount} items}
}.
```
In the `output` of the match, the `#` special token can be used as a placeholder for the numeric value and will be formatted as if it were `{key, number}`.


### `{selectordinal}` Format

The `{key, selectordinal, matches}` is used to choose output based on the ordinal pluralization rules (1st, 2nd, 3rd, etc.) of the current locale. It is very similar to the {plural} format above except that the value is mapped to an ordinal plural category.

The match is a literal value and is matched to one of these plural categories. Not all languages use all plural categories.

- `zero`: This category is used for languages that have grammar specialized specifically for zero number of items. (Examples are Arabic and Latvian.)
- `one`: This category is used for languages that have grammar specialized specifically for one item. Many languages, but not all, use this plural category. (Many popular Asian languages, such as Chinese and Japanese, do not use this category.)
- `two`: This category is used for languages that have grammar specialized specifically for two items. (Examples are Arabic and Welsh.)
- `few`: This category is used for languages that have grammar specialized specifically for a small number of items. For some languages this is used for 2-4 items, for some 3-10 items, and other languages have even more complex rules.
- `many`: This category is used for languages that have grammar specialized specifically for a larger number of items. (Examples are Arabic, Polish, and Russian.)
- `other`: This category is used if the value doesn't match one of the other plural categories. Note that this is used for "plural" for languages (such as English) that have a simple "singular" versus "plural" dichotomy.
- `=value`: This is used to match a specific value regardless of the plural categories of the current locale.

> **DANGER**
>
> `other` is required as per `icu4j` implementation. We will throw an error if `select` is used without `other`.

In the output of the `match`, the `#` special token can be used as a placeholder for the numeric value and will be formatted as if it were `{key, number}`.

```bash
It's my cat's {year, selectordinal,
    one {#st}
    two {#nd}
    few {#rd}
    other {#th}
} birthday!
```

### Rich Text Formatting

We also support embedded rich text formatting in our message using tags.
This allows developers to embed as much text as possible so sentences don't have to be broken up into chunks

**NOTE: This is not XML/HTML tag**


```bash
Our price is <boldThis>{price, number, ::currency/USD precision-integer}</boldThis>
with <link>{pct, number, ::percent} discount</link>
```

### Quoting / Escaping

The ASCII apostrophe `'` (U+0027) can be used to escape syntax characters in the text portion of the message. A single apostrophe escapes one syntax character immediately following it; a pair of apostrophes escape every syntax characters wrapped between them:

```ts
"This is not an interpolation: '{word}"
//→ "This is not an interpolation: {word}"
"These are not interpolations: '{word1} {word2}'"
//→ "These are not interpolations: {word1} {word2}"
"'<notATag>"
//→ "<notATag>"
"'<notATag>hello</notATag>'"
//→ "<notATag>hello</notATag>"
```

Two consecutive ASCII apostrophes represents one ASCII apostrophe, similar to `%%` in `printf` represents one `%`. However, we recommend using curly apostrophe `’` (U+2019) for human-readable strings and only use ASCII apostrophe `'` (U+0027) in ICU message syntax.

```ts
"This '{isn''t}' obvious."
//→ "This {isn't} obvious."
```

[pnpm-image]: https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm
[pnpm-url]: https://pnpm.io/
[npm-image]: https://img.shields.io/npm/v/@cookbook/solid-intl.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@cookbook/solid-intl
[npm-downloads]: https://img.shields.io/npm/dm/@cookbook/solid-intl.svg?style=flat-square
[stars-image]: https://img.shields.io/github/stars/the-cookbook/solid-intl.svg
[stars-url]: https://github.com/the-cookbook/solid-intl/stargazers
[vulnerabilities-image]: https://snyk.io/test/github/the-cookbook/solid-intl/badge.svg
[vulnerabilities-url]: https://snyk.io/test/github/the-cookbook/solid-intl
[issues-image]: https://img.shields.io/github/issues/the-cookbook/solid-intl.svg
[issues-url]: https://github.com/the-cookbook/solid-intl/issues
[awesome-image]: https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg
[awesome-url]: https://github.com/the-cookbook/solid-intl

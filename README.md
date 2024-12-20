# Jean Test Mobile

JeanTest is a React Native invoicing mobile application. It is used by business owners to create & manage invoices with their customers.

This repository contains the skeleton of JeanTest & instructions for this React Native hiring test.

## Mission

Your goal is to build a feature-rich prototype of JeanTest that allows to:

- List & quickly find invoices
- Create new invoices
- Manage existing invoices
  - Move them from drafts to finalized invoices
  - Mark them as paid
  - Update them
  - Delete them

You'll be leveraging an existing REST HTTP API hosted at `https://jean-test-api.herokuapp.com/`.

The API is documented with [OpenAPI](https://www.openapis.org/) & has a documentation available [here](https://jean-test-api.herokuapp.com/api-docs/index.html). Each API call must be authenticated using a `X-SESSION` header with the provided token.

### What's expected

JeanTest should contain essential features listed above & be coded in a way that makes it intuitive, performant & maintainable.

We expect you to adopt standard coding practices, including testing, as if you were working on a real-world application with other coworkers.

We want you to **build JeanTest from existing UI components provided in `src/ui`** by [Tamagui](https://tamagui.dev/ui/intro?subpath=intro) in order to focus on composing screens & features. Feel free to add new ones but keep in mind that it won't be taken into account.

We encourage you to use pre-installed dependencies or add new ones if you have a legitimate use of them.

### The interview

In order to prepare the interview, please take the time to identify advanced features that could be added in the future (even if the API currently does not support it!).

For each feature/tech improvement, we want to understand:

- What led you to think about this
- Why it would be useful
- What might be missing for you to implement it (API limitations, technical constraints)

### Submit your application

In order to send your code, please create a private GitHub repository containing the source code of your application.

Invite the following GitHub users to it: `@julienpinquie` `@soyoh` `@LucaGaspa` `@greeeg`

## Getting started

In order to get started, clone this repository & run the `bin/setup` bash script which will install dependencies & take care of autogenerated files.

```sh
git clone git@github.com:pennylane-hq/jean_test_mobile.git

cd jean_test_mobile

bin/setup

yarn start

yarn ios
```

Make sure to add your `API_TOKEN` in `src/App.tsx` to send authenticated requests to the API.

### Data model

The REST API contains 4 resources: customers, products, invoices & invoice lines.

Side notes:

- Invoices contain multiple invoice lines.
- Invoice lines are accessed via their invoice. To update them, use the relevant invoice API endpoints.
- Once the `finalized` field is set to `true` for invoices, no field may be modified except for `paid`.

### API client

An API client based on `openapi-client-axios` is available through a React Context set up in `src/api/index.tsx`. The provider is mounted in `src/App.tsx` & the context can be consumed using the `useApi` hook from `src/api/index.tsx`.

```tsx
const MyComponent = () => {
  const apiClient = useApi();

  useEffect(() => {
    /**
     * Get the first 50 invoices of customer 3
     */
    api
      .getInvoices({
        page: 1,
        per_page: 50,
        filter: JSON.stringify([
          {field: 'customer_id', operator: 'eq', value: 3},
        ]),
      })
      .then(res => {
        // Do something...
      });
  }, [apiClient]);

  return null;
};
```

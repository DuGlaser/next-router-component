# next-router-component

Component-based routing with `Next.js`.

## Why?

If I want to animate only between specific pages (e.g. onboarding page), I cannot do it well with next/route.
Therefore, I created this library because I wanted to create a file like `[[...slug]].jsx` and use components in it for routing.

## Install

```bash
npm install next-router-component
```

## Example

```tsx
const Sample = () => {
  return (
    <div>
      {/* The following two are just different ways of writing */}
      <Route<{ id: string | string[] }>
        path={'/catch-all/[id]'}
        render={({ id }) => <h1>This page is {`/catch-all/${id}`}</h1>}
      />
      <Route<{ id: string | string[] }> path={'/catch-all/[id]'}>
        {({ id }) => <h1>This page is {`/catch-all/${id}`}</h1>}
      </Route>
    </div>
  );
};
```

## LICENSE

[MIT](https://github.com/DuGlaser/next-router-component/blob/master/LICENSE)

import { isRouteErrorResponse, useLocation, useRouteError } from 'react-router-dom';
import { Page } from './Page';

export const ErrorPage = () => {
  const error = useRouteError();
  const location = useLocation();

  console.log('Error Page');
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      // ...
    } else if (error.status === 404) {
      // ...
    }

    return (
      <Page className="h-[384px]">
        <h1>Oops! {error.status}</h1>
        <h1>location {location.pathname}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && (
          <p>
            <i>{error.data.message}</i>
          </p>
        )}
      </Page>
    );
  }

  if (error instanceof Error) {
    return (
      <Page className="h-[384px]">
        <h1>Oops! Unexpected Error</h1>
        <h1>location {location.pathname}</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </Page>
    );
  }

  return (
    <Page className="h-[384px]">
      <h1>Oops! Unexpected Error</h1>
      <h1>location {location.pathname}</h1>
      <p>Something went wrong.</p>
    </Page>
  );
};

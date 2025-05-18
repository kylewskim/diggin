import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { urls } from './utils/constants/url';
import { HomePage } from './pages/home/HomePage';
import { SignInPage } from './pages/sign_in/SignInPage';
import { CreateGemPage } from './pages/create_gem/CreateGemPage';
import { ResultPage } from './pages/result/ResultPage';
import { SessionResolver } from './SessionResolver';
import { SignInRequestPage } from './pages/SignInRequestPage';
import { SignInFailurePage } from './pages/SignInFailurePage';
import { SignOutRequestPage } from './pages/SignOutRequestPage';
import { EmptyPage } from './pages/EmptyPage';
import { Resolver } from './Resolver';
import { AuthenticationResolver } from './AuthenticationResolver';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={
        <Resolver>
          <AuthenticationResolver>
            <Outlet />
          </AuthenticationResolver>
        </Resolver>
      }
      errorElement={<ErrorPage />}
    >
      <Route path={urls.sign_in} element={<SignInPage />} errorElement={<ErrorPage />} />
      <Route path={urls.sign_in_fail} element={<SignInFailurePage />} />
      <Route path={urls.sign_in_request} element={<SignInRequestPage />} />
      <Route
        element={
          <SessionResolver>
            <Outlet />
          </SessionResolver>
        }
        errorElement={<ErrorPage />}
      >
        <Route path={urls.home} element={<HomePage />} />
        <Route path={urls.create_gem} element={<CreateGemPage />} />
        <Route path={urls.sign_out_request} element={<SignOutRequestPage />} />
        <Route path={urls.result} element={<ResultPage />} />
      </Route>
      <Route path="*" element={<EmptyPage />} />
    </Route>
  ),
  {
    basename: urls.basename,
  }
);

export const Router = () => {
  return <RouterProvider router={router} />;
};

import { useGetUserQuery } from "@services/authApi";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component,
}: TProtectedProps): React.JSX.Element => {
  const { data: userData, isLoading, isError } = useGetUserQuery();
  const location = useLocation();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  const isAuthed = Boolean(userData?.user) && !isError;

  if (onlyUnAuth && isAuthed) {
    const { from } = location.state ?? { from: { pathname: "/ " } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isAuthed) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({
  component,
}: {
  component: React.JSX.Element;
}): React.JSX.Element => <Protected onlyUnAuth={true} component={component} />;

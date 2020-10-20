import { useEffect } from "react";
import { useAuth } from "services/AuthContext";
import Router from "next/router";

const withAuth = (Component) => {
  const Wrapper = (props) => {
    const { isAuthenticated, loading, user, checkout, token } = useAuth();

    useEffect(() => {
      if (!isAuthenticated && !loading) {
        Router.prefetch("/sign-in");
      }
    }, [loading, isAuthenticated]);

    return (
      <Component {...props} user={user} checkout={checkout} token={token} />
    );
  };

  if (Component.getServerSideProps) {
    Wrapper.getServerSideProps = Component.getServerSideProps;
  }

  if (Component.getInitialProps) {
    Wrapper.getInitialProps = Component.getInitialProps;
  }

  return Wrapper;
};

export default withAuth;

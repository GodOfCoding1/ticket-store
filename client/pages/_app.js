import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  let infodata = { currentUser: null };
  try {
    const { data } = await client.get("/api/users/currentuser");
    infodata = data;
  } catch (error) {
    console.log(error.message);
  }

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      infodata.currentUser
    );
  }

  return {
    pageProps,
    ...infodata,
  };
};

export default AppComponent;

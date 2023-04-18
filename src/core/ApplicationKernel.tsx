import React from "react";
import {
  FakePageLoadingProgressBar,
  useFakePageLoadingProgressBar,
} from "~/guidelines/FakePageLoadingProgressBar";

const GlobalStyles = () => (
  <style jsx global>{`
    html,
    body {
      margin: 0;
      padding: 0;
      height: 100%;
    }

    #__next {
      height: 100%;
    }

    * {
      box-sizing: border-box;
    }

    *:focus {
      outline: none;
    }
  `}</style>
);

const ApplicationKernel = ({ children }: { children: React.ReactNode }) => {
  const { isRouteChanging, loadingKey } = useFakePageLoadingProgressBar();

  return (
    <>
      {process.env.NODE_ENV !== "test" ? <GlobalStyles /> : null}

      <FakePageLoadingProgressBar
        isRouteChanging={isRouteChanging}
        loadingKey={loadingKey}
      />
      {children}
    </>
  );
};

export default ApplicationKernel;

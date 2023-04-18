import { NProgress } from "@tanem/react-nprogress";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useReducer } from "react";
import { randomShortId } from "~/core/random";

export interface FakePageLoadingProgressBarProps {
  isRouteChanging: boolean;
  loadingKey: string;
}

export const FakePageLoadingProgressBar = ({
  isRouteChanging,
  loadingKey,
}: FakePageLoadingProgressBarProps) => {
  const PROGRESS_BAR_COLOR = "#0000FF";

  return (
    <NProgress isAnimating={isRouteChanging} key={loadingKey}>
      {({ isFinished, progress, animationDuration }) => (
        <div
          style={{
            opacity: isFinished ? 0 : 1,
            pointerEvents: "none",
            transition: `opacity ${animationDuration}ms linear`,
          }}
        >
          <div
            style={{
              background: PROGRESS_BAR_COLOR,
              height: 2,
              left: 0,
              marginLeft: `${(-1 + progress) * 100}%`,
              position: "fixed",
              top: 0,
              transition: `margin-left ${animationDuration}ms linear`,
              width: "100%",
              zIndex: 1031,
            }}
          >
            <div
              style={{
                boxShadow: `0 0 10px ${PROGRESS_BAR_COLOR}, 0 0 5px ${PROGRESS_BAR_COLOR}`,
                display: "block",
                height: "100%",
                opacity: 1,
                position: "absolute",
                right: 0,
                transform: "rotate(3deg) translate(0px, -4px)",
                width: 100,
              }}
            />
          </div>
        </div>
      )}
    </NProgress>
  );
};

type LoadingProgressAction =
  | {
      type: "loading-start";
      uuid: string;
    }
  | { type: "loading-end" };

type LoadingProgressState = {
  isRouteChanging: boolean;
  loadingKey: string;
};

const loadingProgressReducer = (
  state: LoadingProgressState,
  action: LoadingProgressAction,
) => {
  switch (action.type) {
    case "loading-start":
      return {
        isRouteChanging: true,
        loadingKey: action.uuid,
      };

    case "loading-end":
      return { ...state, isRouteChanging: false };

    default:
      throw new Error(`Invalid action "${JSON.stringify(action)}"`);
  }
};

export const useFakePageLoadingProgressBar = (): LoadingProgressState => {
  const router = useRouter();

  const [state, dispatch] = useReducer(loadingProgressReducer, {
    isRouteChanging: false,
    loadingKey: "",
  });

  const routeChangeStartHandler = useCallback(
    (path: unknown, transitionOptions: { shallow: boolean }) => {
      if (transitionOptions && transitionOptions.shallow) {
        return;
      }

      dispatch({
        type: "loading-start",
        uuid: randomShortId(),
      });
    },
    [],
  );

  const routeChangeEndHandler = useCallback(() => {
    dispatch({
      type: "loading-end",
    });
  }, []);

  useEffect(() => {
    if (!router) {
      return;
    }

    router.events.on("routeChangeStart", routeChangeStartHandler);
    router.events.on("routeChangeComplete", routeChangeEndHandler);
    router.events.on("routeChangeError", routeChangeEndHandler);

    return () => {
      if (!router) {
        return;
      }

      router.events.off("routeChangeStart", routeChangeStartHandler);
      router.events.off("routeChangeComplete", routeChangeEndHandler);
      router.events.off("routeChangeError", routeChangeEndHandler);
    };
  }, [routeChangeEndHandler, routeChangeStartHandler, router, router?.events]);

  return state;
};

import {Middleware} from "redux";
import {IWsActions} from "../reducers/websocket";

export const socketMiddleware = (wsActions: IWsActions):Middleware => {
  return store => {
    let socket: WebSocket | null = null;
    const {wsInit, startConnection, endConnection, getOrders} = wsActions;

    return next => action => {

      const { dispatch } = store;
      const { payload } = action;

      if (wsInit.match(action)) {
        const wsUrl = payload.url;
        socket = new WebSocket(wsUrl);

      }
      if (socket) {
        socket.onopen = event => {
          dispatch(startConnection());
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;
          dispatch(getOrders(restParsedData));
        };

        socket.onerror = event => {
          dispatch(endConnection());
        };

        socket.onclose = event => {
          dispatch(endConnection());
        };

        if (endConnection.match(action)) {
          socket.close(1000, 'Connection is closed');
        }

      }

      next(action);
    };
  };
};

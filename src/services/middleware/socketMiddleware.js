import { wsInit, startConnection, endConnection, getOrders} from "../reducers/websocket";


export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
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
          dispatch(endConnection(event.code));
        };

        socket.onclose = event => {
          dispatch(endConnection(event.code));
        };

        if (endConnection.match(action)) {
          socket.close(1000, 'Connection is closed');
        }

      }

      next(action);
    };
  };
};

import {getCookie} from "../../utils/cookies";
import { wsInit, startConnection, closeConnection, getOrders} from "../reducers/websocket";


export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    return next => action => {

      const token = getCookie("accessToken");
      const { dispatch } = store;
      const { payload } = action;


      if (wsInit.match(action)) {
        const wsUrl = payload.userIsAuthenticated ? payload.url + `?token=${token}` : payload.url;
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
          dispatch(closeConnection());
        };

        socket.onclose = event => {
          socket.close('1000', 'socket close');
          dispatch(closeConnection());
        };

      }

      next(action);
    };
  };
};

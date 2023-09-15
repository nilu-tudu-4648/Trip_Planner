import { NAVIGATION } from "../../constants/routes";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";
import axios from "axios";
const api =
  ({ dispatch, getState }) =>
    (next) =>
      async (action) => {
        if (action.type !== apiCallBegan.type) {
          return next(action);
        }
        const { url, method, data, onSuccess, onStart, onError, headers } = action.payload;

        if (onStart) {
          dispatch({ type: onStart });
        }

        next(action);

        try {
          const response = await axios.request({
            baseURL: NAVIGATION.prod.url,
            url,
            method,
            data,
            headers
          });
          // general success action
          dispatch(apiCallSuccess(response.data));
          //specific
          if (onSuccess) {
            dispatch({ type: onSuccess, payload: response.data });
          }
        } catch (err) {
          //General error action
          dispatch(apiCallFailed(err.response?.data || err.message));

          //specific
          if (onError) {
            dispatch({ type: onError, payload: err.response?.data || err.message });
          }
        }
      };

export default api;

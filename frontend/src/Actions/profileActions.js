import axios from "axios";
import {
  PROFILES_DELETE_FAIL,
  PROFILES_DELETE_REQUEST,
  PROFILES_DELETE_SUCCESS,
  PROFILES_LIST_FAIL,
  PROFILES_LIST_REQUEST,
  PROFILES_LIST_SUCCESS,
  PROFILES_UPDATE_FAIL,
  PROFILES_UPDATE_REQUEST,
  PROFILES_UPDATE_SUCCESS,
  PROFILE_CREATE_FAIL,
  PROFILE_CREATE_REQUEST,
  PROFILE_CREATE_SUCCESS,
} from "../Constants/profileConstant";

export const listProfiles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILES_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/profile`);

    dispatch({
      type: PROFILES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILES_LIST_FAIL,
      payload: message,
    });
  }
};

export const createProfileAction =
  (title, content) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/profile/create`,
        { title, content },
        config
      );

      dispatch({
        type: PROFILE_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROFILE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateProfileAction =
  (id, title, content) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/profile/${id}`,
        { title, content },
        config
      );

      dispatch({
        type: PROFILES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROFILES_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteProfileAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/profile/${id}`, config);

    dispatch({
      type: PROFILES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROFILES_DELETE_FAIL,
      payload: message,
    });
  }
};

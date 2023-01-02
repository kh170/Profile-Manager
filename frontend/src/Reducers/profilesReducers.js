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

export const profileListReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case PROFILES_LIST_REQUEST:
      return { loading: true };
    case PROFILES_LIST_SUCCESS:
      return { loading: false, profiles: action.payload };
    case PROFILES_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const profileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CREATE_REQUEST:
      return { loading: true };
    case PROFILE_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILES_UPDATE_REQUEST:
      return { loading: true };
    case PROFILES_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROFILES_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const profileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILES_DELETE_REQUEST:
      return { loading: true };
    case PROFILES_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROFILES_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

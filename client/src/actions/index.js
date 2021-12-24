import axios from "axios";
import {
  GET_IDEAS_BY_TADER_ID,
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  UPDATE_PASSWORD,
  CREATE_BLOG,
  CREATE_BROKER,
  CREATE_REPORT,
  GET_BROKERS,
  GET_REPORTS,
  GET_BLOGS,
  GET_BLOG,
  GET_BLOGS_BY_TAGS,
  GET_TRADERS,
  GET_IDEA,
  GET_TRADER,
  GET_BROKER,
  GET_REPORT,
  GET_PRICES,
} from "./types";

export const signUp = (data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/user/signUp',  data);
            const user = res.data.user;
            delete user.password;

            user.location = window.location.origin;
            await axios.post('/api/user/confirmationMail', user);
            return true;
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Something wrong'
            })
            return false;
        }
    }
  };

export const signIn = (data) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/user/signIn',  data);
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data
            });

            localStorage.setItem('USER', res.data.user.name);
            localStorage.setItem('USER_ID', res.data.user._id);
            localStorage.setItem('JWT', res.data.token);
            localStorage.setItem('ADMIN', res.data.admin);

            return {
                status: true,
            };
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data.error
            });

            return {
                status: false,
                errorMessage: err.response.data.error,
            };
        }
    }
  };


export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT");
    localStorage.removeItem("ADMIN");
    localStorage.removeItem('USER');
    localStorage.removeItem('USER_ID');

    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};

export const createBlog = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/blog/", data);

      dispatch({
        type: CREATE_BLOG,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createBroker = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/broker/", data);

      dispatch({
        type: CREATE_BROKER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const createReport = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/report/", data);

      dispatch({
        type: CREATE_REPORT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getBrokers = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/broker/");

      dispatch({
        type: GET_BROKERS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getReports = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/report/");

      dispatch({
        type: GET_REPORTS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/blog/");

      dispatch({
        type: GET_BLOGS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getBlog = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/blog/${id}`);

      dispatch({
        type: GET_BLOG,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getBlogsByTags = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/blog/tag", data);

      dispatch({
        type: GET_BLOGS_BY_TAGS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getTraders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/trader/");

      dispatch({
        type: GET_TRADERS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getIdeas = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/idea/");

      dispatch({
        type: GET_IDEA,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getTrader = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/trader/${id}`);

      dispatch({
        type: GET_TRADER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const getIdea = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/idea/${id}`);

      dispatch({
        type: GET_IDEA,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteBlog = (id) => {
  return async () => {
    try {
      await axios.delete(`/api/blog/${id}`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getIdeasByTraderId = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/idea/trader/${id}`);

      dispatch({
        type: GET_IDEAS_BY_TADER_ID,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateBlog = (id, data) => {
  return async () => {
    try {
      await axios.put("/api/blog/" + id, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const updateBroker = (id, data) => {
  return async () => {
    try {
      await axios.put("/api/broker/" + id, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const getBroker = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/broker/${id}`);

      dispatch({
        type: GET_BROKER,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteBroker = (id) => {
  return async () => {
    try {
      await axios.delete(`/api/broker/${id}`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteReport = (id) => {
  return async () => {
    try {
      await axios.delete(`/api/report/${id}`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const getReport = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/report/${id}`);

      dispatch({
        type: GET_REPORT,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export const isValidJWT = (token) => {
  return async () => {
    try {
      await axios.post("/api/token/", { token });

    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const authCheck = () => {
  return async () => {
    try {
      await axios.get("/api/user/authCheck");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const adminAuthCheck = () => {
  return async () => {
    try {
      await axios.get("/api/admin/authCheck");
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const emailConfirmation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/user/confirmation/${id}`);

      localStorage.setItem('JWT', res.data.token);
      localStorage.setItem('USER', res.data.user.name);
      localStorage.setItem('USER_ID', res.data.user._id);

      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const changePasswordViaEmail = (id) => {
  return async () => {
    try {
      const res = await axios.get(`/api/user/changePassword/${id}`);

      return res.data.id;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const changePassword = (data, id) => {
  return async () => {
    try {
      await axios.put(`/api/user/changePassword/${id}`, data);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};


export const createTransaction = (data) => {
  return async () => {
    try {
      await axios.post("/api/transaction/", data);

      return true;
    } catch (err) {
      console.error(err);
      return false

    }
  };
};

export const getPrices = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/price/`);

      dispatch({
        type: GET_PRICES,
        payload: res.data,
      });

      return res.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const updatePrice = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/price/`, data);

      return res.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const getRate = () => {
  return async () => {
    try {
      const res = await axios.get(`/api/price/rate`);

      return res.data;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
};

export const getUsers = () => {
  return async () => {
    try {
      const res = await axios.get(`/api/user/`);

      return res.data[0];
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}

export const getPaidUsers = () => {
  return async () => {
    try {
      const res = await axios.get(`/api/user/paid`);

      return res.data[0];
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}

export const scheduleTrader = () => {
  return async () => {
    try {
      await axios.post(`/api/trader/schedule`);
    } catch (err) {
      console.error(err);
    }
  };
};

export const scheduleIdea = () => {
  return async () => {
    try {
      await axios.post(`/api/idea/schedule`);
    } catch (err) {
      console.error(err);
    }
  };
};
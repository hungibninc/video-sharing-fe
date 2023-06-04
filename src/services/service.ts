import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_API_ENDPOINT;

export const signin = async (email: string, password: string) => {
  return await axios
    .post(
      API_URL + 'auth/signin',
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const signup = async (name: string, email: string, password: string) => {
  return await axios
    .post(
      API_URL + 'auth/signup',
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const auth = async () => {
  return await axios
    .get(API_URL + 'auth', {
      headers: {
        'Accept-Encoding': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};

export const logout = async () => {
  return await axios
    .get(API_URL + 'auth/signout', {
      headers: {
        'Accept-Encoding': 'application/json',
      },
      withCredentials: true,
    })
    .then(() => {
      localStorage.removeItem('user');
    });
};

export const getVideo = async () => {
  return await axios.get(API_URL + 'videos', {
    headers: {
      'Accept-Encoding': 'application/json',
    },
  });
};

export const shareVideo = async (url: string) => {
  return await axios.post(
    API_URL + 'videos',
    {
      url,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

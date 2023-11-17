import { createContext, useEffect, useReducer } from "react";

// Khởi tạo trạng thái ban đầu
const initial_state = {
  username: null,
  id: null,
  role: null,
  userAgent: null,
  token: null,
  loading: false,
  error: null,
};

// Tạo context và reducer
export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        role: action.payload.role,
        userAgent: action.payload.userAgent,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        username: null,
        id: null,
        role: null,
        userAgent: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  // Kiểm tra xem có dữ liệu trong localStorage hay không
  const storedUsername = isValidJsonString(localStorage.getItem("username")) ? JSON.parse(localStorage.getItem("username")) : null;
  const storedId = isValidJsonString(localStorage.getItem("id")) ? JSON.parse(localStorage.getItem("id")) : null;
  const storedRole = isValidJsonString(localStorage.getItem("role")) ? JSON.parse(localStorage.getItem("role")) : null;
  const storedUserAgent = isValidJsonString(localStorage.getItem("userAgent")) ? JSON.parse(localStorage.getItem("userAgent")) : null;
  const storedToken = isValidJsonString(localStorage.getItem("token")) ? JSON.parse(localStorage.getItem("token")) : null;

  const [state, dispatch] = useReducer(AuthReducer, {
    ...initial_state,
    username: storedUsername,
    id: storedId,
    role: storedRole,
    userAgent: storedUserAgent,
    token: storedToken,
  });

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(state.username));
    localStorage.setItem("id", JSON.stringify(state.id));
    localStorage.setItem("role", JSON.stringify(state.role));
    localStorage.setItem("userAgent", JSON.stringify(state.userAgent));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.username, state.id, state.role, state.userAgent, state.token]);

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        id: state.id,
        role: state.role,
        userAgent: state.userAgent,
        token: state.token,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hàm kiểm tra định dạng JSON hợp lệ
const isValidJsonString = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};
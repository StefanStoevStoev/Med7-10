import * as request from "./requester";

const baseUrl = "http://localhost:3030";

export const login = (email, password) => request.post(`${baseUrl}/users/login`, { email, password });

// export const logout = async (id) => {
//   try {
//     const response = await fetch(`${baseUrl}/users/logout`, {
//       headers: {
//         "X-Authorization": accsessToken,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const register = (email, password) =>
  request.post(`${baseUrl}/users/register`, { email, password });

export const edit = (editData, userId) => {
  request.get(`${baseUrl}/jsonstore/${userId}/edit`).then(res => {
    if (res === 204) {
      request.post(`${baseUrl}/jsonstore/${userId}/edit`);
    }
  });
  request.put(`${baseUrl}/jsonstore/${userId}/edit`, { editData });
}

export const productCreate = (editData, userId, productId) => {
  request.get(`${baseUrl}/jsonstore/${userId}/${productId}`).then(res => {
    if (res === 204) {
      request.post(`${baseUrl}/jsonstore/${userId}/${productId}`);
    }
  });
  request.put(`${baseUrl}/jsonstore/${userId}/${productId}`, { editData });
}

export const remove = (userId) => request.del(`${baseUrl}/users/${userId}`);
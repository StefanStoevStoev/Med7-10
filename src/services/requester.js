const request = async (method, url, data) => {
  try {

    const user = localStorage.getItem('auth');

    const auth = JSON.parse(user || '{}');
    let headers = {};

    if (auth.accessToken !== undefined) {
      headers["X-Authorization"] = auth.accessToken;
    } else {
      localStorage.clear();
    }

    console.log(auth);

    let bulidRequest;

    if (method === "GET") {
      bulidRequest = await fetch(url, { headers });
      // .then((response) => response.status);
      if (bulidRequest !== 200) {
        return 204;
      }
      return 200;
    } else {
      bulidRequest = fetch(url, {
        method,
        "content-type": "application/json;charset=UTF-8",
        body: JSON.stringify(data),
      });

      return (await bulidRequest).status;
    }

  } catch (error) {
    console.log(error);
  };
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const patch = request.bind({}, "PATCH");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");

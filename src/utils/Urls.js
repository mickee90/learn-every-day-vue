import router from "@/router";

export function addParamsToLocation(params) {
  history.pushState(
    {},
    null,
    router.currentRoute.path +
      "?" +
      Object.keys(params)
        .map(key => {
          return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        })
        .join("&")
  );
}

export function getQueryStringParams(query) {
  return query
    ? (/^[?#]/.test(query) ? query.slice(1) : query).split("&").reduce((params, param) => {
        let [key, value] = param.split("=");
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
        return params;
      }, {})
    : {};
}

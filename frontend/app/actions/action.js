export const setDistSum = (dist) => ({
  type: "SET_DISTSUM",
  payload: dist,
});

export const IsPlogging = (isPlogging) => ({
  type: "ISPLOGGING",
  payload: isPlogging,
})

export const IsEndPage = (showPloggingEndPage) => ({
  type: "SET_SHOWENDPAGE",
  payload: showPloggingEndPage,
})
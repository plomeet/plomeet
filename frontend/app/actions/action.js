export const setDistSum = (dist) => ({
  type: "SET_DISTSUM",
  payload: dist,
});

export const IsPlogging = (isPlogging) => ({
  type: "ISPLOGGING",
  payload: isPlogging,
});

export const IsEndPage = (showPloggingEndPage) => ({
  type: "SET_SHOWENDPAGE",
  payload: showPloggingEndPage,
});

export const setStart = (startTime) => ({
  type: "SET_STARTTIME",
  payload: startTime,
});

export const setWeatherLoc = (weatherLoc) => ({
  type: "SET_WEATHERLOC",
  payload: weatherLoc,
});

export const setTimeSum = (time) => ({
  type: "SET_TIMESUM",
  payload: time
})

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

export const setImages = (images) => ({
  type: "SET_IMAGES",
  payload: images
})

export const setIsSave = (isSave) => ({
  type: "SET_IS_SAVE",
  payload: isSave
})

export const setPloggingPath = (ploggingPath) => ({
  type: "SET_PLOGGINGPATH",
  payload: ploggingPath
})

export const resetPloggingPath = () => ({
  type: "RESET_PLOGGINGPATH"
})

export const saveLogs = (savedLogs) => ({
  type: "SET_LOGS",
  payload: savedLogs
})

export const setListMonth = (listMonth) => ({
  type: "SET_LISTMONTH",
  payload: listMonth
})
const daysArr = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
export function storeOpenCalculate(storeOpearation) {
  if (storeOpearation) {
    let isOpen = false;
    const dateObj = new Date();
    const currDay = daysArr[dateObj.getDay() - 1];
    const currTime = dateObj.getTime();
    const getDayFromStore = storeOpearation.find(x => x.dayName == currDay);
    if (getDayFromStore) {
      const { openTime, closeTime } = getDayFromStore;
      let openCurrDateObj = new Date();
      let closeCurrDateObj = new Date();
      if (openTime >= closeTime) {
        closeCurrDateObj = new Date(closeCurrDateObj.setDate(closeCurrDateObj.getDate() + 1));
      }

      let tempOpenTime = openCurrDateObj.setHours(new Date(Number(openTime)).getHours(), new Date(Number(openTime)).getMinutes(), new Date(Number(openTime)).getSeconds())
      let tempCloseTime = closeCurrDateObj.setHours(new Date(Number(closeTime)).getHours(), new Date(Number(closeTime)).getMinutes(), new Date(Number(closeTime)).getSeconds())
      if (getDayFromStore.isOpen) {
        if (Number(currTime) >= Number(tempOpenTime)) {
          if (Number(currTime) <= Number(tempCloseTime)) {
            return { isOpen: true, openTime: getOnlyHourMin(openTime), closeTime: getOnlyHourMin(closeTime) };
          } else {
            return { isOpen: false, openTime: getOnlyHourMin(openTime), closeTime: getOnlyHourMin(closeTime) };
          }
        } else {
          return { isOpen: false, openTime: getOnlyHourMin(openTime), closeTime: getOnlyHourMin(closeTime) };
        }
      } else {
        return { isOpen: false, openTime: getOnlyHourMin(openTime), closeTime: getOnlyHourMin(closeTime) };

      }
    } else {
      return { isOpen: false, openTime: null, closeTime: null };
    }
  } else {
    return { isOpen: false, openTime: null, closeTime: null };
  }
}
export function getOnlyHourMin(time) {
  return new Date(Number(time)).toLocaleTimeString().replace(/:\d+ /, ' ')
}
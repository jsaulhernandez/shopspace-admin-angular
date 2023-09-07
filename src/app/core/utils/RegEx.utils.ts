export const OnlyNumbersRegEx = /^[0-9]+$/;
export const OnlyDecimalsNumberSRegEx = /^[0-9]+([.][0-9]{1,2})?$/;
export const OnlyDecimalsNumbersWithPointRegEx =
    /^(\d+(\.\d{0,2})?|\.\d{0,2})$/g; // only use in currency directive
export const OnlyNumbersWithOneDotRegEx = /[^0-9.]+/g; //only use in directive currency
export const GetOnlyNumbers = /[0-9.,]+/g; //for replace string by numbers

export const ValidationEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

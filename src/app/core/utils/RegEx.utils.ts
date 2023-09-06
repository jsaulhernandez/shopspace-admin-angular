export const OnlyNumbersRegEx = /^[0-9]+$/;
export const OnlyDecimalsNumberSRegEx = /^[0-9]+([.][0-9]{1,2})?$/;
export const OnlyDecimalsNumbersWithPointRegEx =
    /^[0-9]+((\.{1})([\d]{1,2})?)?$/; // only use in directives
export const OnlyNumbersWithOneDotRegEx = /[^0-9.]+/g; //only use in directive currency

export const ValidationEmail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

import { constants } from '../config/constant';

export const sendResponse = (
  res: any,
  statusCode: any,
  status: any,
  message: any,
  data: any,
  lang: any = 'en',
  replaceObj: any = {},
) => {
  try {

    statusCode = +statusCode;

    const appLanguageList = constants.APP_LANGUAGE;
    const msg =
      appLanguageList.indexOf(lang) != -1
        ? require(`../lang/${lang}/message`)
        : require(`../lang/en/message`);

    const obj = message.split('.');
    const keyName = obj[0];
    const subKey = obj[1];
    let resMessage: any

    if (message.startsWith("Path") || message.startsWith("Invalid")) {
      resMessage = message
    } else {
      resMessage = msg[keyName][subKey];
    }


    if (replaceObj && Object.keys(replaceObj).length !== 0) {
      resMessage = replaceString(resMessage, replaceObj);
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.write(
      JSON.stringify({
        status: status,
        message: resMessage,
        data: statusCode === 500 ? data.message : data,
      }),
    );
    res.end();
  } catch (err) {
    console.log('Error(sendResponse): ', err);
    throw err;
  }
};


export const sendErrorResponse = (
  res: any,
  statusCode: any,
  status: any,
  err: any,
  data: any,
  lang: any = 'en',
  replaceObj: any = {},
) => {
  try {
    statusCode = +statusCode;
    const formattedError = {};
    let error: any

    if (err.code === 11000) {
       error = err
       const key = Object.keys(error.keyValue)[0];
       formattedError[key.split('.')[1]] = `Duplicate found ${key.split('.')[1]}` 
    } else {
       error = err.errors;
       Object.keys(error).map((key) => {
         let updatedStr: any
         const path = error[key].properties.path;
         const kind = error[key].properties.message;
   
         if (kind.startsWith('Path')) {
           kind.split(' ')[0];
           const newString = kind.replace('Path ', '');
           const modifiedMessage = newString.replace(/`/g, '');
           updatedStr = modifiedMessage;
         } else {
           updatedStr = kind
         }
         if (/[0-9]/.test(key.split('.')[1])) {
           formattedError[path] = `${updatedStr} at index ${key.split('.')[1]}`
         } else {
           formattedError[path] = `${updatedStr}`;
         }
       });
    }
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.write(
      JSON.stringify({
        status: status,
        message: 'Validation error',
        error: formattedError,
        data: statusCode === 500 ? data.message : data,
      }),
    );
    res.end();
  } catch (err) {
    console.log('Error(sendResponse): ', err);
    throw err;
  }
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
function replaceString(_resMessage: any, replaceObj: {}): any {
  throw new Error('Function not implemented.');
}


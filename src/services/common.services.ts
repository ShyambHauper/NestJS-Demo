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

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-types
function replaceString(_resMessage: any, replaceObj: {}): any {
  throw new Error('Function not implemented.');
}


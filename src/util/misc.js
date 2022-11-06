const isRequestActive = (reqArray, req) => {
  return reqArray.findIndex((el) => el === req) !== -1;
};

const setRoutes = (config) => {
  let routes = [...config.routes];

  if (config.settings || config.auth) {
    routes = routes.map((route) => {
      let auth = config.auth ? [...config.auth] : null;
      auth = route.auth ? [...auth, ...route.auth] : auth;
      return {
        ...route,
        settings: { ...config.settings, ...route.settings },
        auth,
      };
    });
  }

  return [...routes];
};

// export const IMAGE_URL = "http://server.elta.com.ng/ajo/uploads/";
export const IMAGE_URL = 'https://ajoo-images.s3.us-west-2.amazonaws.com/';

const generateRoutesFromConfigs = (configs) => {
  let allRoutes = [];
  configs.forEach((config) => {
    allRoutes = [...allRoutes, ...this.setRoutes(config)];
  });
  return allRoutes;
};

const hasPermission = (authArr, userRole) => {
  /**
   * If auth array is not defined
   * Pass and allow
   */
  if (authArr === null || authArr === undefined) {
    // console.info("auth is null || undefined:", authArr);
    return true;
  } else if (authArr.length === 0) {
    /**
     * if auth array is empty means,
     * allow only user role is guest (null or empty[])
     */
    // console.info("auth is empty[]:", authArr);
    return !userRole || userRole.length === 0;
  } else {
    /**
     * Check if user has grants
     */
    // console.info("auth arr:", authArr);
    /*
            Check if user role is array,
            */
    if (userRole && Array.isArray(userRole)) {
      return authArr.some((r) => userRole.indexOf(r) >= 0);
    }

    /*
            Check if user role is string,
            */
    return authArr.includes(userRole);
  }
};

const validateInput = (arg) => {
  let isValid = true;

  for (var key in arg) {
    if (arg[key].error === true || arg[key].error === null) {
      isValid = false;
    }
  }

  return isValid;
};

const moneyFormat = function (
  number,
  decPlaces = 2,
  decSep = '.',
  thouSep = ','
) {
  var regExp = new RegExp('\\d(?=(\\d{3})+\\' + decSep + ')', 'g');
  return parseFloat(number)
    .toFixed(decPlaces)
    .replace(regExp, '$&' + thouSep);
};

const validateHelper = function (event, fields) {
  var { name } = event.target;
  var properties = fields;
  var { rules, value, name: inputName } = properties[name];
  var re;
  var valid;

  const onBlur = (res, name) => {
    const { error, errorMessage } = res;

    if (typeof this === 'undefined') return;

    let newForm = { ...this.state };

    if (
      typeof newForm.emailChangeField !== 'undefined' &&
      newForm.emailChangeField.hasOwnProperty(name)
    ) {
      newForm.emailChangeField[name] = {
        ...newForm.emailChangeField[name],
        error,
        errorMessage,
      };
    } else if (
      typeof newForm.passwordChangeField !== 'undefined' &&
      newForm.passwordChangeField.hasOwnProperty(name)
    ) {
      newForm.passwordChangeField[name] = {
        ...newForm.passwordChangeField[name],
        error,
        errorMessage,
      };
    } else if (
      typeof newForm.basicInformationFields !== 'undefined' &&
      newForm.basicInformationFields.hasOwnProperty(name)
    ) {
      newForm.basicInformationFields[name] = {
        ...newForm.basicInformationFields[name],
        error,
        errorMessage,
      };
    } else if (
      typeof newForm.rewardFields !== 'undefined' &&
      newForm.rewardFields.hasOwnProperty(name)
    ) {
      newForm.rewardFields[name] = {
        ...newForm.rewardFields[name],
        error,
        errorMessage,
      };
    } else {
      newForm.fields[name] = {
        ...newForm.fields[name],
        error,
        errorMessage,
      };
    }

    this._safelySetState
      ? this._safelySetState(newForm)
      : this.setState(newForm);
  };

  const setError = (error) => {
    onBlur({ ...error, name }, name);
    return !error.errorMessage;
  };

  if (rules.maxLength && value.length > rules.maxLength) {
    return setError({
      error: true,
      errorMessage:
        'Value too long. Must be a maximum of ' +
        rules.maxLength +
        ' characters in length.',
    });
  }
  if (rules.minLength && value.length < rules.minLength) {
    return setError({
      error: true,
      errorMessage:
        'Value too short. Must be a minimum of ' +
        rules.minLength +
        ' characters in length.',
    });
  }
  if (rules.email) {
    re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    valid = re.test(value);
    if (!valid) {
      return setError({
        error: true,
        errorMessage: 'Email must be a valid mail.',
      });
    }
  }
  if (rules.password) {
    re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    valid = re.test(value);
    if (!valid) {
      return setError({
        error: true,
        errorMessage:
          'At least a number, a capital letter, and a minimum of 8 characters.',
      });
    }
  }
  if (rules.confirmPassword) {
    if (value !== properties['password'].value) {
      return setError({
        error: true,
        errorMessage: 'Must be equal to the password entry.',
      });
    }
  }
  if (rules.hasPrenumber) {
    var index = value.split('+234');

    if (index[0] !== '') {
      return setError({
        error: true,
        errorMessage: 'Your phone number should start with +234.',
      });
    }
  }
  if (rules.length) {
    if (value.length !== rules.length) {
      return setError({
        error: true,
        errorMessage: 'Your phone number should look like +2348012345678',
      });
    }
  }
  if (rules.required && value.length === 0) {
    return setError({
      error: true,
      errorMessage: `${inputName} can't be empty`,
    });
  }

  return setError({ error: false, errorMessage: '' });
};

const validate = function (context, fields, event) {
  /*Always omit the `event` parameter to the function, when there it is a submit/next action*/

  var passed = true;
  var fieldKeys = Object.keys(fields);

  fieldKeys.map((key) => {
    var e = event ? event : { target: { name: key } };
    if (validateHelper.call(context, e, fields) === false) passed = false;

    return null;
  });

  return passed;
};

export const categoryColor = {
  Health: '#E2FFDF',
  Finance: '#DFF0FF',
  Support: '#FFF2DF',
  Business: '#E2FFDF',
  Nonprofit: '#DFF0FF',
  Emergency: '#FFF2DF',

  Newlywed: '#E2FFDF',
  Family: '#DFF0FF',
  Wishes: '#FFF2DF',
  //Business: "#E2FFDF",
  //Nonprofit: "#DFF0FF",
  //Emergency: "#FFF2DF"
};

export {
  setRoutes,
  generateRoutesFromConfigs,
  hasPermission,
  validateInput,
  isRequestActive,
  validate,
  moneyFormat,
};

/* tslint:disable */
import { InjectionToken } from '@angular/core';

/**
* @ngdoc service
* @name Config
* @module ionic
* @description
* Config allows you to set the modes of your components
*/
import { Platform } from '../platform/platform';
import { isObject, isDefined, isFunction, isArray } from '../util/util';

export class Config {
  private _c: any = {};
  private _s: any = {};
  private _modes: any = {};
  private _trns: any = {};

  /**
   * @private
   */
  plt: Platform;

  /**
   * @private
   */
  init(config: any, plt: Platform) {
    this._s = config && isObject(config) && !isArray(config) ? config : {};
    this.plt = plt;
  }


  /**
   * @name get
   * @description
   * Returns a single config value, given a key.
   *
   * @param {string} [key] - the key for the config value
   * @param {any} [fallbackValue] - a fallback value to use when the config
   * value was not found, or is config value is `null`. Fallback value
   *  defaults to `null`.
   */
  get(key: string, fallbackValue: any = null): any {
    const platform = this.plt;

    if (!isDefined(this._c[key])) {
      if (!isDefined(key)) {
        throw Error('config key is not defined');
      }

      // if the value was already set this will all be skipped
      // if there was no user config then it'll check each of
      // the user config's platforms, which already contains
      // settings from default platform configs

      let userPlatformValue: any = undefined;
      const userDefaultValue: any = this._s[key];
      let userPlatformModeValue: any = undefined;
      let userDefaultModeValue: any = undefined;
      let platformValue: any = undefined;
      let platformModeValue: any = undefined;
      let configObj: any = null;

      if (platform) {
        const queryStringValue = platform.getQueryParam('ionic' + key);
        if (isDefined(queryStringValue)) {
          return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
        }

        // check the platform settings object for this value
        // loop though each of the active platforms

        // array of active platforms, which also knows the hierarchy,
        // with the last one the most important
        const activePlatformKeys = platform.platforms();

        // loop through all of the active platforms we're on
        for (let i = 0, ilen = activePlatformKeys.length; i < ilen; i++) {

          // get user defined platform values
          if (this._s.platforms) {
            configObj = this._s.platforms[activePlatformKeys[i]];
            if (configObj) {
              if (isDefined(configObj[key])) {
                userPlatformValue = configObj[key];
              }
              configObj = this.getModeConfig(configObj.mode);
              if (configObj && isDefined(configObj[key])) {
                userPlatformModeValue = configObj[key];
              }
            }
          }

          // get default platform's setting
          configObj = platform.getPlatformConfig(activePlatformKeys[i]);
          if (configObj && configObj.settings) {

            if (isDefined(configObj.settings[key])) {
              // found a setting for this platform
              platformValue = configObj.settings[key];
            }

            configObj = this.getModeConfig(configObj.settings.mode);
            if (configObj && isDefined(configObj[key])) {
              // found setting for this platform's mode
              platformModeValue = configObj[key];
            }

          }

        }

      }

      configObj = this.getModeConfig(this._s.mode);
      if (configObj && isDefined(configObj[key])) {
        userDefaultModeValue = configObj[key];
      }

      // cache the value
      this._c[key] = isDefined(userPlatformValue) ? userPlatformValue :
                     isDefined(userDefaultValue) ? userDefaultValue :
                     isDefined(userPlatformModeValue) ? userPlatformModeValue :
                     isDefined(userDefaultModeValue) ? userDefaultModeValue :
                     isDefined(platformValue) ? platformValue :
                     isDefined(platformModeValue) ? platformModeValue :
                     null;
    }

    // return key's value
    // either it came directly from the user config
    // or it was from the users platform configs
    // or it was from the default platform configs
    // in that order
    let rtnVal: any = this._c[key];
    if (isFunction(rtnVal)) {
      rtnVal = rtnVal(platform);
    }

    return (rtnVal !== null ? rtnVal : fallbackValue);
  }


  /**
   * @name getBoolean
   * @description
   * Same as `get()`, however always returns a boolean value. If the
   * value from `get()` is `null`, then it'll return the `fallbackValue`
   * which defaults to `false`. Otherwise, `getBoolean()` will return
   * if the config value is truthy or not. It also returns `true` if
   * the config value was the string value `"true"`.
   * @param {string} [key] - the key for the config value
   * @param {boolean} [fallbackValue] - a fallback value to use when the config
   * value was `null`. Fallback value defaults to `false`.
   */
  getBoolean(key: string, fallbackValue = false): boolean {
    const val = this.get(key);
    if (val === null) {
      return fallbackValue;
    }
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  }


  /**
   * @name getNumber
   * @description
   * Same as `get()`, however always returns a number value. Uses `parseFloat()`
   * on the value received from `get()`. If the result from the parse is `NaN`,
   * then it will return the value passed to `fallbackValue`. If no fallback
   * value was provided then it'll default to returning `NaN` when the result
   * is not a valid number.
   * @param {string} [key] - the key for the config value
   * @param {number} [fallbackValue] - a fallback value to use when the config
   * value turned out to be `NaN`. Fallback value defaults to `NaN`.
   */
  getNumber(key: string, fallbackValue: number = NaN): number {
    const val = parseFloat( this.get(key) );
    return isNaN(val) ? fallbackValue : val;
  }

  set(...args: any[]) {
    const arg0 = args[0];
    const arg1 = args[1];

    switch (args.length) {
      case 2:
        // set('key', 'value') = set key/value pair
        // arg1 = value
        this._s[arg0] = arg1;
        delete this._c[arg0]; // clear cache
        break;

      case 3:
        // setting('ios', 'key', 'value') = set key/value pair for platform
        // arg0 = platform
        // arg1 = key
        // arg2 = value
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = this._s.platforms[arg0] || {};
        this._s.platforms[arg0][arg1] = args[2];
        delete this._c[arg1]; // clear cache
        break;

    }

    return this;
  }

  /**
   * @private
   * @name settings()
   * @description
   */
  settings(arg0?: any, arg1?: any) {
    switch (arguments.length) {

      case 0:
        return this._s;

      case 1:
        // settings({...})
        this._s = arg0;
        this._c = {}; // clear cache
        break;

      case 2:
        // settings('ios', {...})
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = arg1;
        this._c = {}; // clear cache
        break;
    }

    return this;
  }

  /**
   * @private
   */
  setModeConfig(modeName: string, modeConfig: any) {
    this._modes[modeName] = modeConfig;
  }

  /**
   * @private
   */
  getModeConfig(modeName: string): any {
    return this._modes[modeName] || null;
  }

  /**
   * @private
   */
  setTransition(trnsName: string, trnsClass: any) {
    this._trns[trnsName] = trnsClass;
  }

  /**
   * @private
   */
  getTransition(trnsName: string): any {
    return this._trns[trnsName] || null;
  }

}

/**
 * @private
 */
export function setupConfig(userConfig: any, plt: Platform): Config {
  const config = new Config();
  config.init(userConfig, plt);

  // add the config obj to the window
  const win: any = plt.win();
  win['Ionic'] = win['Ionic'] || {};
  win['Ionic']['config'] = config;

  return config;
}

/**
 * @private
 */
export const ConfigToken = new InjectionToken<Config>('USERCONFIG');

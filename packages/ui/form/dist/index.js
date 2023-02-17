"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var form_exports = {};
__export(form_exports, {
  Validators: () => Validators
});
module.exports = __toCommonJS(form_exports);

// lib/Validators.tsx
var _Validators = class {
  static validate(value, validators) {
    var _a, _b;
    return (_b = (_a = validators == null ? void 0 : validators.map((validator) => validator(value))) == null ? void 0 : _a.every((v) => v)) != null ? _b : true;
  }
};
var Validators = _Validators;
Validators.isRequired = (isRequired) => (value) => {
  if (!isRequired)
    return true;
  return Boolean(value);
};
Validators.required = (value) => {
  return Boolean(value);
};
Validators.isAnEmail = (value) => {
  return _Validators.isAPattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)(value);
};
Validators.isATelephoneNumber = (value) => {
  return _Validators.isAPattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)(value);
};
Validators.max = (maxValue) => (value) => {
  return !value || value.length <= maxValue;
};
Validators.min = (minValue) => (value) => {
  return !value || value.length >= minValue;
};
Validators.isAPattern = (pattern) => (value) => {
  return !value || !!value.toLowerCase().match(pattern);
};
Validators.customValidator = (f) => (value) => {
  return !value || f(value);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Validators
});

const URL = {
  type: String,
  trim: true,
  match: RegExp(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|https?:\/\/localhost(?:\:\d{1,5})?(?:\/[^\s]*)?)/
  ),
};

const EMAIL = {
  type: String,
  required: true,
  match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  lowercase: true,
  trim: true,
  unique: true,
};

const DEFAULT_STRING = {
  type: String,
  required: true,
  minLength: 2,
  maxLength: 256,
  trim: true,
}

const PHONE = {
  type: String,
  required: true,
  match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
}

export { URL, EMAIL, DEFAULT_STRING, PHONE }
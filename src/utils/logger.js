const base = (level, message, meta) => {
  const time = new Date().toISOString();
  const payload = meta ? ` ${JSON.stringify(meta)}` : "";
  // eslint-disable-next-line no-console
  console[level](`${time} ${message}${payload}`);
};

export const logger = {
  info: (message, meta) => base("log", message, meta),
  warn: (message, meta) => base("warn", message, meta),
  error: (message, meta) => base("error", message, meta),
};

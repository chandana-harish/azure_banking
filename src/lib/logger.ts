type LogLevel = "INFO" | "WARN" | "ERROR";

export function log(level: LogLevel, message: string, context?: Record<string, unknown>) {
  console.log(
    JSON.stringify({
      level,
      message,
      time: new Date().toISOString(),
      ...context
    })
  );
}

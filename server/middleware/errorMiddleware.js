export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found" });
}

export function errorHandler(error, req, res, next) {
  console.error(error.message);
  if (error.code === 11000) return res.status(409).json({ success: false, message: "A record with that value already exists" });
  if (error.name === "CastError") return res.status(400).json({ success: false, message: "Invalid identifier" });
  res.status(error.statusCode || 500).json({ success: false, message: error.statusCode ? error.message : "Internal server error" });
}

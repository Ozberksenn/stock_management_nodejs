class CustomResponse {
  constructor(data = [], message = null, status = 200) {
    this.data = data;
    this.message = message;
    this.status = status;
  }

  success(res) {
    return res.status(this.status).json({
      success: true,
      data: this.data,
      message: this.message ?? "Successful",
    });
  }

  created(res) {
    return res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Successfully created",
    });
  }

  error500(res) {
    return res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Server Error",
    });
  }

  error400(res) {
    return res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Bad Request",
    });
  }

  error401(res) {
    return res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Unauthorized",
    });
  }

  error404(res) {
    return res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Not Found",
    });
  }

  error429(res) {
    return res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Too many requests",
    });
  }
}


module.exports = {CustomResponse}
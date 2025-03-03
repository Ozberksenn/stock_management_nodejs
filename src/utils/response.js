class Response {
    constructor(data = null, message = null, status) {
      this.data = data;
      this.message = message;
      this.status = status;
    }
  
    success(res) {
      return res.status(200).json({
        success: true,
        data: this.data,
        message: this.message ?? "successful",
      });
    }
  
    created(res) {
      return res.status(201).json({
        success: true,
        data: this.data,
        message: this.message ?? "successfulr",
      });
    }
  
    error500(res) {
      return res.status(500).json({
        success: false,
        data: this.data,
        message: this.message ?? "Error",
      });
    }
  
    error400(res) {
      return res.status(400).json({
        success: false,
        data: this.data,
        message: this.message ?? "Error",
      });
    }
  
    error401(res) {
      return res.status(400).json({
        success: false,
        data: this.data,
        message: this.message ?? "Please Sign In",
      });
    }
  
    error404(res) {
      return res.status(400).json({
        success: false,
        data: this.data,
        message: this.message ?? "Error",
      });
    }
  
    error429(res) {
      //ddos atakları vs
      return res.status(400).json({
        success: false,
        data: this.data,
        message: this.message ?? "Too many request",
      });
    }
  }
  
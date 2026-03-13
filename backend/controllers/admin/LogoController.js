export const uploadLogoFile = (req, res) => {
  try {
    const fileName = req.body.fileName;

    if (!fileName) {
      return res.status(400).json({
        message: "fileName is required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "fileLogo is required"
      });
    }

    res.json({
      message: "Logo uploaded successfully",
      savedAs: req.file.filename,
      path: req.file.path
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Upload failed"
    });
  }
};
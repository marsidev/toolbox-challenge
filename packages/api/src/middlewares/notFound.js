const notFoundHandler = (_req, res) => {
  res.status(404).json({
    error: 'Path not found!'
  })
}

export default notFoundHandler

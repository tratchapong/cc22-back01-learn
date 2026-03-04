export default function (req, res) {
  res.status(404)
  res.json({msg : 'have no service in this path'})
}
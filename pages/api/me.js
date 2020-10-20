export default async function me(req, res) {
  try {
    await fetch(`${process.env.API}/users/me`);
    res.json({
      message: "testing",
    });
  } catch (error) {
    // console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}

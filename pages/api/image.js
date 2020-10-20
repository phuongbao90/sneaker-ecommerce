import { parse } from "url";
import axios from "axios";

module.exports = async (req, res) => {
  const {
    query: { url },
  } = parse(req.url || "", true);

  // console.log(`${encodeURIComponent(url)}`);
  // console.log(
  //   encodeURIComponent(
  //     `/uploads/small_5_E5_AD_033_8277_47_EE_B287_371_F03455_C03_80255f9bfc.jpeg`
  //   )
  // );

  const r = await fetch(
    // we get images from notion, but you could get them from AWS etc.
    `${process.env.API}${url}`,
    {
      headers: {
        "content-type": "image/*",
        // maybe an auth header
      },
    }
  );

  // const r = await axios.get(`${process.env.API}${url}`);

  res.setHeader("content-type", r.headers.get("content-type"));
  res.setHeader("cache-control", "s-maxage=1, stale-while-revalidate");
  r.body.pipe(res);
};

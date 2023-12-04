import axios from "axios";

export async function getJokes(req, res) {
  try {
    const response = await axios.get("http://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

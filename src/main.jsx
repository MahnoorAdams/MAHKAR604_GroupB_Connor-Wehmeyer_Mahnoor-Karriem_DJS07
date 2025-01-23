import React, { useState, useEffect } from "react";
import "./index.css"; // Assuming the styles are in `index.css`
import trollFace from "./images/Troll_face_1.png"; // Update file name to remove spaces

export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: trollFace, // Use the local image as the default
  });

  const [allMemes, setAllMemes] = useState([]);

  // Fetch memes from the API when the component mounts
  useEffect(() => {
    async function fetchMemes() {
      try {
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();
        setAllMemes(data.data.memes);
      } catch (error) {
        console.error("Failed to fetch memes:", error);
      }
    }
    fetchMemes();
  }, []);

  // Get a random meme image from the fetched memes
  function getMemeImage() {
    if (allMemes.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMemes.length);
      const url = allMemes[randomIndex].url;
      setMeme((prevMeme) => ({
        ...prevMeme,
        randomImage: url,
      }));
    }
  }

  // Handle text input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="Top Text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Bottom Text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} alt="Meme" className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
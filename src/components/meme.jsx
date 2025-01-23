import React from "react";
import "./Meme.css"; // Assuming styles are moved to a CSS file.

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg", // Default meme image
    });
    const [allMemes, setAllMemes] = React.useState([]);

    // Fetch memes on component mount
    React.useEffect(() => {
        async function getMemes() {
            try {
                const res = await fetch("https://api.imgflip.com/get_memes");
                const data = await res.json();
                setAllMemes(data.data.memes);
            } catch (error) {
                console.error("Error fetching memes:", error);
            }
        }
        getMemes();
    }, []);

    // Get a random meme image
    function getMemeImage() {
        if (allMemes.length > 0) {
            const randomNumber = Math.floor(Math.random() * allMemes.length);
            const url = allMemes[randomNumber].url;
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: url,
            }));
        }
    }

    // Handle text input changes
    function handleChange(event) {
        const { name, value } = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    placeholder="Bottom text"
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
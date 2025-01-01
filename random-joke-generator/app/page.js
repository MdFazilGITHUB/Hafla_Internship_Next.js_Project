"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import styles from "./page.module.css";

export default function Home() {
  const [joke, setJoke] = useState(null); // State to store the joke
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch a joke
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random", {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch the joke");
      }
      const data = await res.json();
      setJoke(data); // Update the state with the fetched joke
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the joke on component mount
  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Only destructure joke if it has data
  if (joke) {
    const { id, icon_url, url, value, created_at } = joke;

    return (
      <div className={styles.page}>
        <main className={styles.main}>
          <div key={id}>
            <div className={styles.grid}>
              <h1 className={styles.title}>Random Chuck Norris Jokes</h1>
              <img src={icon_url} alt={url} />
            </div>
            <p className={styles.description}>{value}</p>
            <p style={{ textAlign: "center" }}>
              Created At:{" "}
              {moment(`${created_at}`).format("MMMM Do YYYY hh:mm:ss")}
            </p>
          </div>
          <button className={styles.button} onClick={fetchJoke}>
            Next Joke
          </button>
        </main>
      </div>
    );
  }

  return null; // If joke is still null (fallback)
}

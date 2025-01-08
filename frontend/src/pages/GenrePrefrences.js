import React, { useState } from "react";

const GenrePreferences = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");

  const genres = [
    { id: 1, name: "Horror", icon: "👻" },
    { id: 2, name: "Fiction", icon: "📚" },
    { id: 3, name: "Science", icon: "🔬" },
    { id: 4, name: "Drama", icon: "🎭" },
    { id: 5, name: "Finance", icon: "💰" },
    { id: 6, name: "Historical", icon: "📜" },
    { id: 7, name: "Politics", icon: "🏛️" },
    { id: 8, name: "Money Mindset", icon: "🧠" },
    { id: 9, name: "Lifestyle", icon: "🌟" },
    { id: 10, name: "Funny", icon: "😄" },
    { id: 11, name: "Comics", icon: "💭" },
    { id: 12, name: "Disney", icon: "🏰" },
  ];

  const handleGenreSelect = (genreId) => {
    setError("");

    if (selectedGenres.includes(genreId)) {
      setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
    } else {
      if (selectedGenres.length >= 5) {
        setError("You can only select up to 5 genres");
        return;
      }
      setSelectedGenres([...selectedGenres, genreId]);
    }
  };

  const handleContinue = () => {
    if (selectedGenres.length === 0) {
      setError("Please select at least one genre");
      return;
    }

    const selectedGenreData = selectedGenres.map((id) =>
      genres.find((genre) => genre.id === id)
    );
    console.log("Selected Genres:", selectedGenreData);
    // Handle navigation or data submission here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-purple-600">
              Choose Your Interests
            </h2>
            <p className="text-gray-500 mt-2">
              Select up to 5 genres you enjoy reading
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedGenres.includes(genre.id)
                    ? "border-purple-600 bg-purple-50 text-purple-600"
                    : "border-gray-200 hover:border-purple-200 hover:bg-purple-50"
                }`}
              >
                <span className="text-2xl mb-2 block">{genre.icon}</span>
                <span className="font-medium block">{genre.name}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-500 text-center">
              Selected {selectedGenres.length}/5 genres
            </p>
            <button
              onClick={handleContinue}
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                selectedGenres.length > 0
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenrePreferences;

import React from "react";

const FetchZipCode = ({ zipCodeSelected, setZipCodeSelected, zipCode }) => {
  return (
    <div className="my-4 flex w-full max-w-xl flex-col items-center gap-2 text-center">
      <label
        htmlFor="zipcode"
        className="text-base font-semibold text-pink-700"
      >
        Choisissez votre arrondissement :
      </label>

      <select
        id="zipcode"
        value={zipCodeSelected}
        onChange={(e) => setZipCodeSelected(e.target.value)}
        className="w-full rounded-lg border border-pink-200 bg-white px-4 py-2 text-black shadow-sm transition hover:border-pink-400 focus:border-pink-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
      >
        {zipCode.map((zip) => (
          <option
            key={zip}
            value={zip}
            className="text-black text-center"
          >
            {zip}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FetchZipCode;

import { useState } from "react";

const zodiacSigns = [
  { start: new Date(0, 0, 20), end: new Date(0, 1, 19), sign: "Capricorn" },
  { start: new Date(0, 1, 19), end: new Date(0, 2, 18), sign: "Aquarius" },
  { start: new Date(0, 2, 18), end: new Date(0, 3, 20), sign: "Pisces" },
  { start: new Date(0, 3, 20), end: new Date(0, 4, 19), sign: "Aries" },
  { start: new Date(0, 4, 19), end: new Date(0, 5, 20), sign: "Taurus" },
  { start: new Date(0, 5, 20), end: new Date(0, 6, 20), sign: "Gemini" },
  { start: new Date(0, 6, 20), end: new Date(0, 7, 22), sign: "Cancer" },
  { start: new Date(0, 7, 22), end: new Date(0, 8, 22), sign: "Leo" },
  { start: new Date(0, 8, 22), end: new Date(0, 9, 22), sign: "Virgo" },
  { start: new Date(0, 9, 22), end: new Date(0, 10, 22), sign: "Libra" },
  { start: new Date(0, 10, 22), end: new Date(0, 11, 21), sign: "Scorpio" },
  {
    start: new Date(0, 11, 21),
    end: new Date(1, 0, 19),
    sign: "Sagittarius",
  },
  { start: new Date(1, 0, 19), end: new Date(1, 1, 19), sign: "Capricorn" },
];

export function ZodiacAgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState({
    date: "",
    month: "",
    year: "",
  });
  const [name, setName] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");
  const [age, setAge] = useState({
    year: "",
    month: "",
    day: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBirthDate({
      ...birthDate,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const { date, month, year } = birthDate;
    const birthDateObj = new Date(year, month - 1, date);

    const birthForZodiac = new Date(0, month, date);

    for (const zodiacSign of zodiacSigns) {
      if (
        birthForZodiac >= zodiacSign.start &&
        birthForZodiac <= zodiacSign.end
      ) {
        setZodiacSign(zodiacSign.sign);
        break;
      }
    }

    const currentDate = new Date();

    const timeDiffInMilliseconds = currentDate - birthDateObj;

    const years = Math.floor(
      timeDiffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    );
    const remainingDays =
      timeDiffInMilliseconds % (1000 * 60 * 60 * 24 * 365.25);
    const months = Math.floor(remainingDays / (1000 * 60 * 60 * 24 * 30.4375));
    const remainingDaysAfterMonths =
      remainingDays % (1000 * 60 * 60 * 24 * 30.4375);
    const days = Math.floor(remainingDaysAfterMonths / (1000 * 60 * 60 * 24));

    const formattedMonths = months > 0 ? months : 0;
    const formattedDays = days > 0 ? days : 0;

    setAge({
      year: years,
      month: formattedMonths,
      day: formattedDays,
    });
  }

  function handleReset() {
    setAge({
      year: "",
      month: "",
      day: "",
    });
    setBirthDate({
      date: "",
      month: "",
      year: "",
    });
    setName("");
    setZodiacSign("");
  }

  return (
    <div>
      <h2 className="text-xl font-bold mt-8">Zodiac Age Calculator</h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mt-8 border border-gray-300 p-5 mx-auto text-left"
      >
        <div className="flex items-center w-full ">
          <label className="w-1/3">Nama</label>
          <input
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            className="border border-gray-300 w-full p-1"
          ></input>
        </div>
        <div className="flex items-center w-full mt-4">
          <label className="w-1/3">Tanggal Lahir</label>
          <div className="flex gap-2">
            <input
              type="number"
              id="date"
              name="date"
              value={birthDate.date}
              onChange={handleInputChange}
              className="border border-gray-300 w-full p-1"
            />
            /
            <input
              type="number"
              id="month"
              name="month"
              min={1}
              max={12}
              value={birthDate.month}
              onChange={handleInputChange}
              className="border border-gray-300 w-full p-1"
            />{" "}
            /{" "}
            <input
              type="number"
              id="year"
              name="year"
              min={1900}
              max={2024}
              value={birthDate.year}
              onChange={handleInputChange}
              className="border border-gray-300 w-full p-1"
            />
          </div>
        </div>
        <div className="flex justify-end mt-5 gap-4">
          <button
            type="button"
            className="w-fit py-2 px-5 bg-gray-300"
            onClick={handleReset}
          >
            Reset
          </button>
          <button type="submit" className="w-fit py-2 px-5 bg-gray-300">
            Submit
          </button>
        </div>
      </form>

      {zodiacSign && (
        <div className="w-1/2 mt-8 border border-gray-300 p-5 mx-auto text-left">
          <p>Hallo {name},</p>
          <p>Usia anda saat ini adalah : </p>
          <p>{age.year} Tahun,</p>
          <p>{age.month} Bulan,</p>
          <p>{age.day} Hari</p>

          <br />
          <p>
            Bintang anda adalah <br /> {zodiacSign}
          </p>
        </div>
      )}
    </div>
  );
}

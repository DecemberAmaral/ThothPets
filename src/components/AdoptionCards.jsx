import AdoptionCard from "./AdoptionCard";

const dummyAnimals = [
  {
    id: 1,
    species: "cachorro",
    sex: "Macho",
    size: "grande",
    state: "PR",
    city: "Ivaiporã",
    age: "2",
    name: "Rex",
    description: "Amigável e brincalhão!",
    location: "Ivaiporã, PR",
    breed: "Vira-lata",
    gender: "Macho",
    image: "",
  },
  {
    id: 2,
    species: "gato",
    sex: "Fêmea",
    size: "pequeno",
    state: "PR",
    city: "Curitiba",
    age: "1",
    name: "Luna",
    description: "Carinhosa e alegre!",
    location: "Curitiba, PR",
    breed: "Persa",
    gender: "Fêmea",
    image: "",
  },
  // Adicione mais animais conforme necessário.
];

export default function AdoptionCards({ filter }) {
  const filteredAnimals = dummyAnimals.filter((animal) => {
    let ageValid = true;
    if (filter.age !== "") {
      const numericAge = parseInt(animal.age, 10);
      if (filter.age === "0-1") {
        ageValid = numericAge >= 0 && numericAge <= 1;
      } else if (filter.age === "1-3") {
        ageValid = numericAge >= 1 && numericAge <= 3;
      } else if (filter.age === "3-5") {
        ageValid = numericAge >= 3 && numericAge <= 5;
      } else if (filter.age === ">5") {
        ageValid = numericAge > 5;
      }
    }
    return (
      (filter.species === "" || animal.species === filter.species) &&
      (filter.sex === "" || animal.gender.toLowerCase() === filter.sex.toLowerCase()) &&
      (filter.size === "" || animal.size === filter.size) &&
      (filter.state === "" || animal.state.toLowerCase() === filter.state.toLowerCase()) &&
      (filter.city === "" || animal.city.toLowerCase() === filter.city.toLowerCase()) &&
      ageValid
    );
  });

  const sortedAnimals = filteredAnimals.sort((a, b) => b.id - a.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
      {sortedAnimals.map((animal) => (
        <AdoptionCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}

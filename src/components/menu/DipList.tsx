import "../../styles/components/menu/dip-list.scss";
import { useEffect, useState } from "react";
import { fetchMenu } from "../../services/api";  // Importera fetchMenu för att hämta menyn från API

const DipList = () => {
  const [dips, setDips] = useState<string[]>([]);  // State för dips
  const [loading, setLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  useEffect(() => {
    const fetchDips = async () => {
      try {
        const menu = await fetchMenu();  // Hämtar hela menyn
        // Filtrera för att bara få dips (t.ex. "DIPSÅS")
        const dipItems = menu.filter((item: any) => item.name.toLowerCase().includes("dip"));

        setDips(dipItems.map((item: any) => item.name));  // Sätt dipsarna i state
        setLoading(false);
      } catch (err) {
        setError("Fel vid hämtning av dips");  // Hantera fel
        setLoading(false);
      }
    };

    fetchDips();  // Hämta dips när komponenten laddas
  }, []);

  if (loading) return <p>Laddar dips...</p>;  // Visa laddning när data hämtas
  if (error) return <p>{error}</p>;  // Visa felmeddelande om något går fel

  return (
    <div className="dip-list">
      {dips.map((dip, index) => (
        <button key={index} className="dip-button">
          {dip} {/* Visa varje dip i en knapp */}
        </button>
      ))}
    </div>
  );
};

export default DipList;

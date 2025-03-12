import "../../styles/components/menu/dip-list.scss";
import { useEffect, useState } from "react";
import { fetchMenu } from "../../services/api"; 

const DipList = () => {
  const [dips, setDips] = useState<string[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchDips = async () => {
      try {
        const menu = await fetchMenu();  
      
        const dipItems = menu.filter((item: any) => item.name.toLowerCase().includes("dip"));

        setDips(dipItems.map((item: any) => item.name));  
        setLoading(false);
      } catch (err) {
        setError("Fel vid hämtning av dips"); 
        setLoading(false);
      }
    };

    fetchDips();  
  }, []);

  if (loading) return <p>Laddar dips...</p>;  
  if (error) return <p>{error}</p>;  

  return (
    <div className="dip-list">
      {dips.map((dip, index) => (
        <button key={index} className="dip-button">
          {dip} 
        </button>
      ))}
    </div>
  );
};

export default DipList;
